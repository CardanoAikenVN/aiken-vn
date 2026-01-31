---
title: Datum & Redeemer
sidebar_position: 3
---

# Datum và Redeemer trong Cardano

Bài học này giải thích cách dữ liệu di chuyển giữa giao dịch thông qua Datum và Redeemer để kích hoạt chuyển trạng thái hợp đồng.

## Mục tiêu học tập

- Hiểu vai trò của Datum trong smart contracts
- Nắm cách sử dụng Redeemer để unlock UTxO
- Biết các pattern thiết kế Datum/Redeemer phổ biến
- Áp dụng vào validator thực tế

## Tổng quan: Luồng dữ liệu Smart Contract

```
┌─────────────────────────────────────────────────────────────┐
│              SMART CONTRACT DATA FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   LOCK (Tạo UTxO)                                          │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   User ───▶ TX ───▶ Script Address                   │  │
│   │                      │                               │  │
│   │                      ├── Value: 100 ADA              │  │
│   │                      └── Datum: { owner: "alice" }   │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   UNLOCK (Tiêu UTxO)                                       │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   ┌─────────┐    ┌─────────┐    ┌─────────┐        │  │
│   │   │  Datum  │ +  │Redeemer │ +  │ Script  │        │  │
│   │   │ (state) │    │ (action)│    │ (logic) │        │  │
│   │   └────┬────┘    └────┬────┘    └────┬────┘        │  │
│   │        │              │              │              │  │
│   │        └──────────────┼──────────────┘              │  │
│   │                       │                              │  │
│   │                       ▼                              │  │
│   │              Script Execution                        │  │
│   │                       │                              │  │
│   │            ┌──────────┴──────────┐                  │  │
│   │            ▼                     ▼                  │  │
│   │          True                  False                │  │
│   │       (Unlock OK)           (TX Fail)               │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Datum - Trạng thái UTxO

Datum là dữ liệu được đính kèm vào UTxO tại script address. Nó đại diện cho "state" của smart contract.

### Datum Types

```
┌─────────────────────────────────────────────────────────────┐
│                    DATUM TYPES                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. Inline Datum                                           │
│   ─────────────                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ UTxO                                                 │  │
│   │ ├── Address: script_addr                            │  │
│   │ ├── Value: 100 ADA                                  │  │
│   │ └── Datum: { owner: #"abc", amount: 100 }          │  │
│   │            ↑                                        │  │
│   │            Stored directly in UTxO                  │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   2. Datum Hash Only                                        │
│   ──────────────                                            │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ UTxO                                                 │  │
│   │ ├── Address: script_addr                            │  │
│   │ ├── Value: 100 ADA                                  │  │
│   │ └── DatumHash: #"hash_of_datum"                    │  │
│   │                                                      │  │
│   │ TX Witness                                           │  │
│   │ └── Datum: { owner: #"abc", amount: 100 }          │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Inline Datum được khuyến khích (CIP-32)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Thiết kế Datum hiệu quả

```rust title="lib/datum_design.ak"
//// Các pattern thiết kế Datum

/// ❌ Datum quá lớn - tốn phí
type BadDatum {
  user_name: ByteArray,      // 100 bytes
  user_email: ByteArray,     // 100 bytes
  user_address: ByteArray,   // 200 bytes
  user_history: List<Int>,   // Có thể rất lớn!
}

/// ✅ Datum tối ưu - chỉ lưu essentials
type GoodDatum {
  owner_pkh: ByteArray,      // 28 bytes
  deadline: Int,             // Số slot
  amount: Int,               // Lovelace
}

/// ✅ Reference external data bằng hash
type OptimalDatum {
  owner_pkh: ByteArray,
  metadata_hash: ByteArray,  // Hash của metadata off-chain
}
```

### Ví dụ Datum patterns

```rust title="lib/datum_patterns.ak"
//// Common Datum Patterns

/// Pattern 1: Simple Lock
/// Chỉ cần biết owner để unlock
pub type SimpleLockDatum {
  owner: ByteArray,
}

/// Pattern 2: Time-locked
/// Có thêm điều kiện thời gian
pub type TimeLockDatum {
  owner: ByteArray,
  lock_until: Int,  // POSIX time in milliseconds
}

/// Pattern 3: Multi-sig
/// Yêu cầu nhiều signatures
pub type MultiSigDatum {
  signers: List<ByteArray>,
  required: Int,  // Số signatures tối thiểu
}

/// Pattern 4: State Machine
/// Contract có nhiều trạng thái
pub type AuctionDatum {
  seller: ByteArray,
  highest_bidder: Option<ByteArray>,
  highest_bid: Int,
  deadline: Int,
  status: AuctionStatus,
}

pub type AuctionStatus {
  Open
  Closed
  Settled
}

/// Pattern 5: Reference Script
/// Datum chứa script hash để reference
pub type ProxyDatum {
  implementation_hash: ByteArray,
  admin: ByteArray,
}
```

## Redeemer - Action để Unlock

Redeemer là dữ liệu được cung cấp khi muốn tiêu UTxO từ script address. Nó đại diện cho "action" mà user muốn thực hiện.

```
┌─────────────────────────────────────────────────────────────┐
│                    REDEEMER ROLE                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Redeemer = "Hành động" để unlock UTxO                    │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   enum Redeemer {                                    │  │
│   │     Claim    ───────▶  User muốn claim tiền         │  │
│   │     Cancel   ───────▶  Owner muốn cancel            │  │
│   │     Update   ───────▶  Cập nhật state               │  │
│   │     Bid(amt) ───────▶  Đặt giá trong auction        │  │
│   │   }                                                  │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Validator kiểm tra:                                       │
│   • Redeemer có hợp lệ không?                              │
│   • Điều kiện của action này có thỏa mãn không?            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Thiết kế Redeemer

```rust title="lib/redeemer_design.ak"
//// Redeemer Design Patterns

/// Pattern 1: Unit Redeemer
/// Khi không cần thông tin gì thêm
pub type SimpleRedeemer {
  Unlock
}

/// Pattern 2: Action Enum
/// Nhiều hành động khác nhau
pub type ActionRedeemer {
  Claim
  Cancel
  Extend { extra_days: Int }
}

/// Pattern 3: Data-carrying Redeemer
/// Cần truyền dữ liệu cùng action
pub type BidRedeemer {
  Bid { amount: Int, bidder: ByteArray }
  Accept
  Reject
}

/// Pattern 4: Index-based Redeemer
/// Chỉ định output cụ thể
pub type IndexRedeemer {
  SpendTo { output_index: Int }
}

/// Pattern 5: Proof Redeemer
/// Cung cấp proof để verify
pub type ProofRedeemer {
  WithProof { merkle_proof: List<ByteArray>, leaf: ByteArray }
}
```

## Validator - Logic xử lý

Validator nhận Datum, Redeemer và Transaction context để quyết định có cho phép tiêu UTxO không.

```rust title="lib/validator_example.ak"
use cardano/transaction.{Transaction, OutputReference}
use aiken/collection/list

/// Datum: State của contract
pub type EscrowDatum {
  seller: ByteArray,
  buyer: ByteArray,
  amount: Int,
  deadline: Int,
}

/// Redeemer: Actions có thể thực hiện
pub type EscrowRedeemer {
  /// Buyer xác nhận đã nhận hàng
  Complete
  /// Seller hủy giao dịch (trước deadline)
  Cancel
  /// Refund cho buyer (sau deadline)
  Refund
}

/// Helper: Kiểm tra signature
fn signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}

/// Helper: Kiểm tra thời gian
fn is_after_deadline(tx: Transaction, deadline: Int) -> Bool {
  when tx.validity_range.lower_bound.bound_type is {
    Finite(current_time) -> current_time > deadline
    _ -> False
  }
}

fn is_before_deadline(tx: Transaction, deadline: Int) -> Bool {
  when tx.validity_range.upper_bound.bound_type is {
    Finite(current_time) -> current_time < deadline
    _ -> False
  }
}

/// Validator chính
validator escrow {
  spend(datum: Option<EscrowDatum>, redeemer: EscrowRedeemer, _own_ref: OutputReference, tx: Transaction) {
    expect Some(d) = datum

    when redeemer is {
      Complete -> {
        // Buyer xác nhận đã nhận hàng
        // Seller có thể claim tiền
        signed_by(tx, d.buyer)
      }

      Cancel -> {
        // Seller hủy trước deadline
        // Buyer nhận lại tiền
        and {
          signed_by(tx, d.seller),
          is_before_deadline(tx, d.deadline),
        }
      }

      Refund -> {
        // Sau deadline, buyer có thể claim refund
        and {
          signed_by(tx, d.buyer),
          is_after_deadline(tx, d.deadline),
        }
      }
    }
  }
}
```

## Script Context

Validator còn nhận thêm thông tin về transaction context:

```
┌─────────────────────────────────────────────────────────────┐
│                 SCRIPT CONTEXT                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Validator Parameters:                                     │
│                                                             │
│   spend(                                                    │
│     datum: Option<Datum>,     ← Datum của UTxO này         │
│     redeemer: Redeemer,       ← Action từ user             │
│     own_ref: OutputReference, ← Reference đến UTxO này     │
│     tx: Transaction,          ← Full transaction context   │
│   )                                                         │
│                                                             │
│   Transaction Context (tx):                                 │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ • inputs: List<Input>          Các UTxOs bị tiêu    │  │
│   │ • reference_inputs: List<Input> UTxOs tham chiếu    │  │
│   │ • outputs: List<Output>         UTxOs mới tạo       │  │
│   │ • fee: Int                      Phí giao dịch       │  │
│   │ • mint: Value                   Tokens được mint    │  │
│   │ • certificates: List<Cert>      Stake certificates  │  │
│   │ • withdrawals: Dict             Stake withdrawals   │  │
│   │ • validity_range: Interval      Khoảng thời gian   │  │
│   │ • extra_signatories: List       Required signers    │  │
│   │ • redeemers: Dict               Tất cả redeemers   │  │
│   │ • datums: Dict                  Tất cả datums      │  │
│   │ • id: TransactionId             Hash của TX        │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Best Practices

```
┌─────────────────────────────────────────────────────────────┐
│                    BEST PRACTICES                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   DATUM:                                                    │
│   ✅ Giữ datum nhỏ gọn (giảm phí)                          │
│   ✅ Sử dụng Inline Datum (CIP-32)                         │
│   ✅ Hash dữ liệu lớn, lưu off-chain                       │
│   ✅ Chỉ lưu dữ liệu cần thiết cho validation              │
│   ❌ Không lưu dữ liệu có thể derive từ context            │
│                                                             │
│   REDEEMER:                                                 │
│   ✅ Sử dụng enum cho các actions                          │
│   ✅ Giữ redeemer đơn giản                                 │
│   ✅ Validate tất cả data trong redeemer                   │
│   ❌ Không trust redeemer data blindly                     │
│                                                             │
│   VALIDATOR:                                                │
│   ✅ Handle tất cả redeemer cases                          │
│   ✅ Kiểm tra signatures khi cần                           │
│   ✅ Validate outputs nếu cần đảm bảo state đúng           │
│   ✅ Sử dụng reference inputs cho shared state             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Hoàn thành Part 2

Chúc mừng! Bạn đã hoàn thành **Part 2: Cardano Architecture**. Bạn đã học:

- Kiến trúc tổng quan của Cardano
- Mô hình UTxO và Extended UTxO
- Cách sử dụng Datum và Redeemer trong smart contracts

Tiếp theo, chúng ta sẽ chuyển sang **Part 3: Your First Validator** để xây dựng spending validator đầu tiên.
