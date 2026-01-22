---
title: Xây dựng Hợp đồng Escrow
sidebar_position: 1
---

# Xây dựng Hợp đồng Escrow hoàn chỉnh

Bài học này hướng dẫn thiết kế và triển khai một hợp đồng Escrow hoàn chỉnh - ứng dụng thực tế của smart contract trên Cardano.

## Mục tiêu học tập

- Hiểu khái niệm và use cases của Escrow
- Thiết kế Datum và Redeemer cho các scenarios
- Xử lý disputes và refunds
- Viết tests toàn diện
- Best practices cho production contracts

## Escrow là gì?

```
┌─────────────────────────────────────────────────────────────┐
│                     ESCROW CONCEPT                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Escrow = Bên thứ 3 giữ tiền cho đến khi điều kiện        │
│            được đáp ứng                                     │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │     BUYER ──────▶ ESCROW ──────▶ SELLER            │  │
│   │       │            │  │            │                │  │
│   │       │            │  │            │                │  │
│   │    Gửi tiền      Giữ │          Giao hàng          │  │
│   │                   tiền│                             │  │
│   │                      │                              │  │
│   │               ┌──────┴──────┐                      │  │
│   │               ▼             ▼                      │  │
│   │           Confirm       Dispute                    │  │
│   │               │             │                      │  │
│   │               ▼             ▼                      │  │
│   │          → Seller      Arbitration                │  │
│   │            gets $                                  │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Use cases:                                                │
│   • P2P Trading                                            │
│   • Freelance payments                                     │
│   • Real estate deposits                                   │
│   • Online marketplace                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Thiết kế Contract

### Flow diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   ESCROW FLOW                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────────────────────────────────────────────┐ │
│   │                     CREATE                            │ │
│   │  Seller ──▶ Lock ADA with Datum                      │ │
│   │              • Buyer PKH                              │ │
│   │              • Price                                  │ │
│   │              • Deadline                               │ │
│   └────────────────────────┬─────────────────────────────┘ │
│                            │                                │
│                            ▼                                │
│   ┌──────────────────────────────────────────────────────┐ │
│   │                   ACTIVE STATE                        │ │
│   │                                                       │ │
│   │  3 possible outcomes:                                 │ │
│   │                                                       │ │
│   │  1. COMPLETE (Buyer confirms)                        │ │
│   │     → Seller gets payment                            │ │
│   │                                                       │ │
│   │  2. CANCEL (Seller cancels before deadline)          │ │
│   │     → Seller gets refund                             │ │
│   │                                                       │ │
│   │  3. REFUND (Buyer claims after deadline)             │ │
│   │     → Buyer gets refund                              │ │
│   │                                                       │ │
│   │  4. DISPUTE (Optional - needs arbitrator)            │ │
│   │     → Arbitrator decides                             │ │
│   │                                                       │ │
│   └──────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Types Definition

```aiken title="lib/escrow/types.ak"
//// Types cho Escrow Contract

/// Trạng thái của Escrow
pub type EscrowState {
  /// Đang chờ xác nhận từ buyer
  AwaitingDelivery
  /// Buyer đã xác nhận nhận hàng
  DeliveryConfirmed
  /// Có dispute, cần arbitrator
  Disputed
  /// Đã hoàn thành
  Completed
}

/// Datum lưu trong UTxO
pub type EscrowDatum {
  /// Public key hash của seller
  seller: ByteArray,
  /// Public key hash của buyer
  buyer: ByteArray,
  /// Số tiền escrow (lovelace)
  amount: Int,
  /// Deadline để buyer confirm (POSIX timestamp)
  deadline: Int,
  /// Arbitrator (optional) - xử lý disputes
  arbitrator: Option<ByteArray>,
  /// Trạng thái hiện tại
  state: EscrowState,
}

/// Redeemer - các actions có thể thực hiện
pub type EscrowRedeemer {
  /// Buyer xác nhận đã nhận hàng/dịch vụ
  Complete
  /// Seller hủy trước deadline
  Cancel
  /// Buyer claim refund sau deadline
  Refund
  /// Buyer hoặc Seller raise dispute
  RaiseDispute
  /// Arbitrator quyết định cho bên nào
  ResolveDispute { winner: DisputeWinner }
}

/// Kết quả dispute
pub type DisputeWinner {
  /// Seller thắng - nhận tiền
  SellerWins
  /// Buyer thắng - được refund
  BuyerWins
}
```

## Validator Implementation

```aiken title="validators/escrow.ak"
//// Escrow Validator
//// Hợp đồng ký quỹ đơn giản

use aiken/collection/list
use aiken/interval
use cardano/assets.{lovelace_of}
use cardano/transaction.{OutputReference, Transaction}

// ============================================
// TYPES
// ============================================

pub type EscrowDatum {
  seller: ByteArray,
  buyer: ByteArray,
  amount: Int,
  deadline: Int,
}

pub type EscrowRedeemer {
  Complete
  Cancel
  Refund
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/// Kiểm tra signature
fn signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}

/// Kiểm tra thời gian trước deadline sử dụng interval module
fn before_deadline(tx: Transaction, deadline: Int) -> Bool {
  interval.is_entirely_before(tx.validity_range, deadline)
}

/// Kiểm tra thời gian sau deadline sử dụng interval module
fn after_deadline(tx: Transaction, deadline: Int) -> Bool {
  interval.is_entirely_after(tx.validity_range, deadline)
}

/// Kiểm tra có output với đủ tiền
fn has_sufficient_output(tx: Transaction, min_amount: Int) -> Bool {
  list.any(tx.outputs, fn(output) { lovelace_of(output.value) >= min_amount })
}

// ============================================
// MAIN VALIDATOR
// ============================================

validator escrow {
  spend(
    datum: Option<EscrowDatum>,
    redeemer: EscrowRedeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      // Buyer confirms receipt -> seller gets paid
      Complete ->
        signed_by(tx, d.buyer) && has_sufficient_output(tx, d.amount)

      // Seller cancels before deadline
      Cancel ->
        signed_by(tx, d.seller) && before_deadline(tx, d.deadline)

      // Buyer claims refund after deadline
      Refund ->
        signed_by(tx, d.buyer) && after_deadline(tx, d.deadline) && has_sufficient_output(
          tx,
          d.amount,
        )
    }
  }

  else(_) {
    fail
  }
}
```

## Phiên bản đơn giản (không có dispute)

Phiên bản chính của escrow contract ở trên đã là phiên bản đơn giản và đầy đủ, sử dụng module `aiken/interval` cho xử lý thời gian.

## Comprehensive Tests

```aiken title="lib/escrow/escrow_test.ak"
//// Tests cho Escrow Contract

// ============================================
// MOCK TYPES
// ============================================

type MockDatum {
  seller: ByteArray,
  buyer: ByteArray,
  amount: Int,
  deadline: Int,
}

type MockRedeemer {
  Complete
  Cancel
  Refund
}

// Hex constants for testing (phải dùng hex hợp lệ)
const seller_pkh: ByteArray = #"aabbccdd11223344"
const buyer_pkh: ByteArray = #"eeff00112233445566"
const random_pkh: ByteArray = #"99887766554433221100"

// ============================================
// VALIDATION LOGIC
// ============================================

fn validate_complete(datum: MockDatum, signer: ByteArray) -> Bool {
  datum.buyer == signer
}

fn validate_cancel(
  datum: MockDatum,
  signer: ByteArray,
  current_time: Int,
) -> Bool {
  datum.seller == signer && current_time < datum.deadline
}

fn validate_refund(
  datum: MockDatum,
  signer: ByteArray,
  current_time: Int,
) -> Bool {
  datum.buyer == signer && current_time > datum.deadline
}

fn validate_escrow(
  datum: MockDatum,
  redeemer: MockRedeemer,
  signer: ByteArray,
  current_time: Int,
) -> Bool {
  when redeemer is {
    Complete -> validate_complete(datum, signer)
    Cancel -> validate_cancel(datum, signer, current_time)
    Refund -> validate_refund(datum, signer, current_time)
  }
}

// ============================================
// TESTS: COMPLETE
// ============================================

test test_complete_by_buyer() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  validate_escrow(datum, Complete, buyer_pkh, 500) == True
}

test test_complete_by_seller_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Seller không thể complete
  validate_escrow(datum, Complete, seller_pkh, 500) == False
}

// ============================================
// TESTS: CANCEL
// ============================================

test test_cancel_by_seller_before_deadline() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  validate_escrow(datum, Cancel, seller_pkh, 500) == True
}

test test_cancel_by_seller_after_deadline_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Không thể cancel sau deadline
  validate_escrow(datum, Cancel, seller_pkh, 1500) == False
}

// ============================================
// TESTS: REFUND
// ============================================

test test_refund_by_buyer_after_deadline() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  validate_escrow(datum, Refund, buyer_pkh, 1500) == True
}

test test_refund_by_buyer_before_deadline_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Không thể refund trước deadline
  validate_escrow(datum, Refund, buyer_pkh, 500) == False
}
```

## Off-chain Integration

### Lucid (TypeScript)

```typescript
import { Lucid, Data, fromText } from "lucid-cardano";

// Types matching Aiken
const EscrowDatum = Data.Object({
  seller: Data.Bytes(),
  buyer: Data.Bytes(),
  amount: Data.Integer(),
  deadline: Data.Integer(),
});

type EscrowDatum = Data.Static<typeof EscrowDatum>;

const EscrowRedeemer = Data.Enum([
  Data.Literal("Complete"),
  Data.Literal("Cancel"),
  Data.Literal("Refund"),
]);

type EscrowRedeemer = Data.Static<typeof EscrowRedeemer>;

// Create Escrow
async function createEscrow(
  lucid: Lucid,
  validator: any,
  buyerPkh: string,
  amount: bigint,
  deadlineMinutes: number
) {
  const sellerPkh = lucid.utils.getAddressDetails(
    await lucid.wallet.address()
  ).paymentCredential!.hash;

  const deadline = BigInt(Date.now() + deadlineMinutes * 60 * 1000);

  const datum: EscrowDatum = {
    seller: sellerPkh,
    buyer: buyerPkh,
    amount,
    deadline,
  };

  const validatorAddress = lucid.utils.validatorToAddress(validator);

  const tx = await lucid
    .newTx()
    .payToContract(
      validatorAddress,
      { inline: Data.to(datum, EscrowDatum) },
      { lovelace: amount }
    )
    .complete();

  const signedTx = await tx.sign().complete();
  return await signedTx.submit();
}

// Complete Escrow (Buyer confirms)
async function completeEscrow(
  lucid: Lucid,
  validator: any,
  utxo: any
) {
  const redeemer = Data.to("Complete", EscrowRedeemer);
  const datum = Data.from(utxo.datum!, EscrowDatum);

  // Get seller address
  const sellerAddress = lucid.utils.credentialToAddress({
    type: "Key",
    hash: datum.seller,
  });

  const tx = await lucid
    .newTx()
    .collectFrom([utxo], redeemer)
    .attachSpendingValidator(validator)
    .payToAddress(sellerAddress, { lovelace: datum.amount })
    .addSignerKey(datum.buyer)
    .complete();

  const signedTx = await tx.sign().complete();
  return await signedTx.submit();
}

// Cancel Escrow (Seller cancels)
async function cancelEscrow(
  lucid: Lucid,
  validator: any,
  utxo: any
) {
  const redeemer = Data.to("Cancel", EscrowRedeemer);
  const datum = Data.from(utxo.datum!, EscrowDatum);

  const tx = await lucid
    .newTx()
    .collectFrom([utxo], redeemer)
    .attachSpendingValidator(validator)
    .addSignerKey(datum.seller)
    .validTo(Number(datum.deadline) - 60000) // Before deadline
    .complete();

  const signedTx = await tx.sign().complete();
  return await signedTx.submit();
}

// Refund Escrow (Buyer claims after deadline)
async function refundEscrow(
  lucid: Lucid,
  validator: any,
  utxo: any
) {
  const redeemer = Data.to("Refund", EscrowRedeemer);
  const datum = Data.from(utxo.datum!, EscrowDatum);

  // Get buyer address
  const buyerAddress = lucid.utils.credentialToAddress({
    type: "Key",
    hash: datum.buyer,
  });

  const tx = await lucid
    .newTx()
    .collectFrom([utxo], redeemer)
    .attachSpendingValidator(validator)
    .payToAddress(buyerAddress, { lovelace: datum.amount })
    .addSignerKey(datum.buyer)
    .validFrom(Number(datum.deadline) + 60000) // After deadline
    .complete();

  const signedTx = await tx.sign().complete();
  return await signedTx.submit();
}
```

## Security Considerations

```
┌─────────────────────────────────────────────────────────────┐
│              SECURITY CONSIDERATIONS                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. TIME MANIPULATION                                      │
│   ─────────────────────                                     │
│   • Slot time có độ trễ ~20 giây                           │
│   • Set deadline với buffer                                 │
│   • Sử dụng validity_range đúng cách                       │
│                                                             │
│   2. OUTPUT VALIDATION                                      │
│   ─────────────────────                                     │
│   • Luôn verify output address                             │
│   • Kiểm tra đủ amount                                     │
│   • Cẩn thận với address format                            │
│                                                             │
│   3. DATUM INTEGRITY                                        │
│   ──────────────────                                        │
│   • Validate datum khi create                              │
│   • Không trust datum từ input mà không verify             │
│   • Check state transitions                                 │
│                                                             │
│   4. ACCESS CONTROL                                         │
│   ─────────────────                                         │
│   • Verify signatures cho mọi action                       │
│   • Không hardcode PKHs trong production                   │
│   • Consider multi-sig cho high-value                      │
│                                                             │
│   5. ECONOMIC ATTACKS                                       │
│   ────────────────────                                      │
│   • Min UTxO requirements                                  │
│   • Transaction fees                                       │
│   • Dust attacks                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Production Checklist

```
┌─────────────────────────────────────────────────────────────┐
│              PRODUCTION CHECKLIST                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   □ Code Review                                             │
│     • Peer review bởi experienced developer                │
│     • Security audit nếu high-value                        │
│                                                             │
│   □ Testing                                                 │
│     • Unit tests cho mọi branch                            │
│     • Property-based testing                               │
│     • Integration tests on testnet                         │
│     • Stress testing                                       │
│                                                             │
│   □ Documentation                                           │
│     • Clear datum/redeemer specs                           │
│     • User guide cho off-chain                             │
│     • Error handling guide                                 │
│                                                             │
│   □ Deployment                                              │
│     • Deploy to testnet first                              │
│     • Test with real transactions                          │
│     • Monitor for issues                                   │
│     • Gradual mainnet rollout                              │
│                                                             │
│   □ Operations                                              │
│     • Monitoring setup                                     │
│     • Alert system                                         │
│     • Incident response plan                               │
│     • Upgrade path (if needed)                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. Escrow = Bên thứ 3 (contract) giữ tiền                 │
│  2. States: AwaitingDelivery → Complete/Cancel/Refund      │
│  3. Time-based conditions quan trọng cho disputes          │
│  4. Validate outputs để ensure correct payment             │
│  5. Test all branches và edge cases                        │
│  6. Consider security implications trước mainnet           │
│  7. Off-chain integration cần match on-chain logic         │
└─────────────────────────────────────────────────────────────┘
```

## Hoàn thành Khóa học

Chúc mừng! Bạn đã hoàn thành toàn bộ khóa học **Aiken Smart Contract Development**!

### Những gì bạn đã học:

**Part 1: The Aiken Foundation**
- Cài đặt và sử dụng Aiken CLI
- Cấu trúc dự án và modules
- Types, functions, và control flow
- Testing và troubleshooting

**Part 2: Cardano Architecture**
- Kiến trúc Cardano và Ouroboros
- Mô hình UTxO và eUTxO
- Datum và Redeemer

**Part 3: Your First Validator**
- Spending validators
- Gift contract pattern

**Part 4: Minting Tokens & NFTs**
- Fungible và Non-Fungible tokens
- Minting policies
- One-shot pattern

**Part 5: Escrow Contract**
- Real-world dApp design
- Dispute resolution
- Production considerations

### Bước tiếp theo

- Thực hành xây dựng projects riêng
- Tham gia cộng đồng Aiken
- Đọc documentation chính thức
- Contribute to open source projects

**Happy building on Cardano!**
