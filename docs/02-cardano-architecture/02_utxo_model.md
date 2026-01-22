---
title: Mô hình UTxO
sidebar_position: 2
---

# Mô hình UTxO trong Cardano

Bài học này giới thiệu mô hình UTxO (Unspent Transaction Output) - nền tảng của Cardano và cách nó khác biệt với account-based model.

## Mục tiêu học tập

- Hiểu khái niệm UTxO cơ bản
- So sánh UTxO với Account-based model
- Nắm được Extended UTxO (eUTxO)
- Hiểu tại sao UTxO quan trọng cho smart contracts

## UTxO là gì?

UTxO = **U**nspent **T**ransaction **O**utput - Output chưa được sử dụng từ một giao dịch trước đó.

```
┌─────────────────────────────────────────────────────────────┐
│                    UTXO CONCEPT                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Giống như "tiền mặt điện tử":                             │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                     UTxO                             │  │
│   │  ┌─────────────┐                                    │  │
│   │  │   Address   │  Địa chỉ sở hữu                    │  │
│   │  ├─────────────┤                                    │  │
│   │  │   Value     │  Số tiền (ADA + tokens)            │  │
│   │  ├─────────────┤                                    │  │
│   │  │   Datum     │  Dữ liệu đính kèm (optional)       │  │
│   │  └─────────────┘                                    │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   UTxO = "Tờ tiền" với mệnh giá cố định                     │
│   Muốn tiêu = Phải tiêu hết tờ, trả lại tiền thừa          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Cách Transaction hoạt động

```
┌─────────────────────────────────────────────────────────────┐
│                 TRANSACTION FLOW                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   INPUTS (UTxOs bị tiêu)         OUTPUTS (UTxOs mới)       │
│                                                             │
│   ┌─────────────┐               ┌─────────────┐            │
│   │ UTxO #1     │               │ UTxO #A     │            │
│   │ Alice: 50₳  │ ─────┐   ┌───▶│ Bob: 30₳    │            │
│   └─────────────┘      │   │    └─────────────┘            │
│                        │   │                                │
│   ┌─────────────┐      ▼   │    ┌─────────────┐            │
│   │ UTxO #2     │ ─▶ ┌─────┴─┐  │ UTxO #B     │            │
│   │ Alice: 20₳  │    │  TX   │──▶│ Alice: 39₳  │ (change)  │
│   └─────────────┘    └───────┘  └─────────────┘            │
│                         │                                   │
│                         ▼                                   │
│                    Fee: 1₳                                  │
│                                                             │
│   Tổng Input: 70₳                                          │
│   Tổng Output: 69₳                                         │
│   Fee: 1₳                                                  │
│   Balance: 70 - 69 - 1 = 0 ✓                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Quy tắc cơ bản

1. **Inputs** = Tham chiếu đến UTxOs hiện có (sẽ bị "tiêu")
2. **Outputs** = UTxOs mới được tạo
3. **Fee** = Inputs - Outputs (phải > 0)
4. **Mỗi UTxO chỉ được tiêu một lần** (double-spending prevention)

## So sánh UTxO vs Account-based

```
┌─────────────────────────────────────────────────────────────┐
│              UTXO vs ACCOUNT MODEL                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   UTxO Model (Cardano, Bitcoin)                            │
│   ─────────────────────────────                            │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                         │
│   │ 10₳ │ │ 20₳ │ │ 5₳  │ │ 15₳ │  ← Nhiều "tờ tiền"      │
│   └─────┘ └─────┘ └─────┘ └─────┘                         │
│   Total: 50₳ (distributed across UTxOs)                    │
│                                                             │
│   Account Model (Ethereum)                                  │
│   ────────────────────────                                  │
│   ┌─────────────────────────────┐                          │
│   │ Address: 0x123...           │                          │
│   │ Balance: 50 ETH             │  ← Một "tài khoản"       │
│   │ Nonce: 42                   │                          │
│   └─────────────────────────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### So sánh chi tiết

| Aspect | UTxO | Account |
|--------|------|---------|
| **State** | Phân tán (nhiều UTxOs) | Tập trung (một account) |
| **Concurrency** | Tốt (parallel processing) | Kém (sequential nonce) |
| **Privacy** | Tốt hơn (mỗi tx dùng UTxO khác) | Kém hơn (cùng address) |
| **Determinism** | Cao (inputs xác định) | Thấp (global state) |
| **Complexity** | Phức tạp hơn | Đơn giản hơn |
| **Fee Prediction** | Chính xác | Không chắc chắn |

## Extended UTxO (eUTxO)

Cardano mở rộng UTxO model với **Datum** và **Redeemer**:

```
┌─────────────────────────────────────────────────────────────┐
│                    EXTENDED UTXO                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Standard UTxO (Bitcoin):                                  │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  Address  │  Value                                   │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Extended UTxO (Cardano):                                  │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  Address  │  Value  │  Datum (optional)              │  │
│   └─────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                    Script Address                    │  │
│   │  ┌───────────┐  ┌───────────┐  ┌───────────┐       │  │
│   │  │   Datum   │  │  Redeemer │  │  Script   │       │  │
│   │  │  (state)  │  │  (action) │  │ (logic)   │       │  │
│   │  └───────────┘  └───────────┘  └───────────┘       │  │
│   │                                                      │  │
│   │  Script kiểm tra: Datum + Redeemer + Context        │  │
│   │  → True = UTxO có thể được tiêu                     │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Các thành phần eUTxO

```aiken
// Datum - Dữ liệu "state" đính kèm UTxO
type Datum {
  owner: ByteArray,
  deadline: Int,
  amount: Int,
}

// Redeemer - "Action" để unlock UTxO
type Redeemer {
  Claim
  Cancel
  Update { new_amount: Int }
}

// Validator - Logic kiểm tra
validator example {
  spend(datum: Option<Datum>, redeemer: Redeemer, _own_ref, tx) {
    // Kiểm tra điều kiện để cho phép tiêu UTxO
    when redeemer is {
      Claim -> check_claim_conditions(datum, tx)
      Cancel -> check_cancel_conditions(datum, tx)
      Update { new_amount } -> check_update_conditions(datum, new_amount, tx)
    }
  }
}
```

## UTxO Set và Global State

```
┌─────────────────────────────────────────────────────────────┐
│                    UTXO SET                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Blockchain State = Tập hợp tất cả UTxOs chưa tiêu         │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                   UTxO Set                           │  │
│   │                                                      │  │
│   │   [UTxO_a] [UTxO_b] [UTxO_c] [UTxO_d] [UTxO_e]      │  │
│   │   [UTxO_f] [UTxO_g] [UTxO_h] [UTxO_i] [UTxO_j]      │  │
│   │   [UTxO_k] [UTxO_l] [UTxO_m] [UTxO_n] [UTxO_o]      │  │
│   │   ...                                                │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Transaction = Biến đổi UTxO Set                           │
│                                                             │
│   UTxO Set₀ ──▶ TX₁ ──▶ UTxO Set₁ ──▶ TX₂ ──▶ UTxO Set₂   │
│                                                             │
│   • Remove: UTxOs được consume                              │
│   • Add: UTxOs mới được tạo                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## OutputReference - Định danh UTxO

```
┌─────────────────────────────────────────────────────────────┐
│                OUTPUT REFERENCE                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Mỗi UTxO được định danh bằng OutputReference:             │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  OutputReference                                     │  │
│   │  ┌───────────────────┐  ┌───────────────────┐       │  │
│   │  │ Transaction Hash  │  │ Output Index      │       │  │
│   │  │ (32 bytes)        │  │ (0, 1, 2, ...)    │       │  │
│   │  └───────────────────┘  └───────────────────┘       │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Example:                                                  │
│   TX_HASH: abc123...def456                                 │
│   ├── Output #0: 10 ADA to Alice                           │
│   ├── Output #1: 20 ADA to Bob                             │
│   └── Output #2: 5 ADA to Charlie                          │
│                                                             │
│   OutputReference cho Bob: (abc123...def456, 1)            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Trong Aiken:

```aiken
use cardano/transaction.{OutputReference, Input}

// OutputReference structure
// type OutputReference {
//   transaction_id: ByteArray,
//   output_index: Int,
// }

fn find_own_input(inputs: List<Input>, own_ref: OutputReference) -> Option<Input> {
  inputs
    |> list.find(fn(input) { input.output_reference == own_ref })
}
```

## Concurrency và UTxO

### Vấn đề Contention

```
┌─────────────────────────────────────────────────────────────┐
│                 UTXO CONTENTION                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Scenario: Nhiều users muốn tương tác cùng lúc            │
│                                                             │
│   ┌─────────────┐                                          │
│   │ Smart       │                                          │
│   │ Contract    │  ← Chỉ có 1 UTxO!                        │
│   │ UTxO        │                                          │
│   └──────┬──────┘                                          │
│          │                                                  │
│    ┌─────┼─────┬─────┐                                     │
│    │     │     │     │                                     │
│    ▼     ▼     ▼     ▼                                     │
│   TX1   TX2   TX3   TX4   ← Tất cả muốn consume!           │
│    │     │     │     │                                     │
│    └─────┴─────┴─────┘                                     │
│          │                                                  │
│          ▼                                                  │
│   CHỈ 1 TX THÀNH CÔNG, còn lại FAIL!                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Giải pháp: Multi-UTxO Pattern

```
┌─────────────────────────────────────────────────────────────┐
│              MULTI-UTXO PATTERN                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Giải pháp: Nhiều UTxOs song song                          │
│                                                             │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                  │
│   │UTxO #1│ │UTxO #2│ │UTxO #3│ │UTxO #4│                  │
│   └───┬───┘ └───┬───┘ └───┬───┘ └───┬───┘                  │
│       │         │         │         │                       │
│       ▼         ▼         ▼         ▼                       │
│      TX1       TX2       TX3       TX4  ← Xử lý song song!  │
│       │         │         │         │                       │
│       ▼         ▼         ▼         ▼                       │
│      ✓         ✓         ✓         ✓   ← Tất cả thành công │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Determinism trong UTxO

```
┌─────────────────────────────────────────────────────────────┐
│                    DETERMINISM                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   UTxO Model = DETERMINISTIC                                │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   Inputs (cụ thể)                                    │  │
│   │       +                                              │  │
│   │   Redeemer (cụ thể)         ═══▶   Kết quả xác định │  │
│   │       +                                              │  │
│   │   Script (cố định)                                   │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Lợi ích:                                                  │
│   • Simulate trước khi submit                              │
│   • Phí biết trước chính xác                               │
│   • Không có surprise failures                             │
│   • Không có front-running (MEV)                           │
│                                                             │
│   So với Account Model:                                     │
│   • Global state có thể thay đổi giữa submit và execute    │
│   • Gas có thể khác với estimation                         │
│   • Transaction có thể fail sau khi submit                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Ví dụ: UTxO Validator đơn giản

```aiken title="lib/simple_lock.ak"
use cardano/transaction.{OutputReference, Transaction, Input, Output}
use cardano/address.{Address, Credential, VerificationKey}
use cardano/assets.{lovelace_of}
use aiken/collection/list

/// Datum chứa owner public key hash
pub type LockDatum {
  owner_pkh: ByteArray,
}

/// Redeemer để unlock
pub type LockRedeemer {
  Unlock
}

/// Kiểm tra signature
fn signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}

/// Validator: Chỉ owner mới unlock được
validator simple_lock {
  spend(datum: Option<LockDatum>, redeemer: LockRedeemer, _own_ref: OutputReference, tx: Transaction) {
    expect Some(d) = datum

    when redeemer is {
      Unlock -> signed_by(tx, d.owner_pkh)
    }
  }
}
```

### Test UTxO operations

```aiken title="lib/utxo_helpers_test.ak"
use aiken/collection/list

// Mock types for testing
type MockUTxO {
  id: Int,
  value: Int,
}

// Tính tổng value từ nhiều UTxOs
fn sum_utxos(utxos: List<MockUTxO>) -> Int {
  utxos
    |> list.map(fn(u) { u.value })
    |> list.foldr(0, fn(a, b) { a + b })
}

// Filter UTxOs có value lớn hơn threshold
fn filter_large_utxos(utxos: List<MockUTxO>, threshold: Int) -> List<MockUTxO> {
  utxos
    |> list.filter(fn(u) { u.value > threshold })
}

// Tìm UTxO theo ID
fn find_utxo_by_id(utxos: List<MockUTxO>, id: Int) -> Option<MockUTxO> {
  utxos
    |> list.find(fn(u) { u.id == id })
}

test test_sum_utxos() {
  let utxos = [
    MockUTxO { id: 1, value: 100 },
    MockUTxO { id: 2, value: 200 },
    MockUTxO { id: 3, value: 300 },
  ]

  sum_utxos(utxos) == 600
}

test test_filter_large_utxos() {
  let utxos = [
    MockUTxO { id: 1, value: 50 },
    MockUTxO { id: 2, value: 150 },
    MockUTxO { id: 3, value: 250 },
  ]

  let large = filter_large_utxos(utxos, 100)
  list.length(large) == 2
}

test test_find_utxo_by_id() {
  let utxos = [
    MockUTxO { id: 1, value: 100 },
    MockUTxO { id: 2, value: 200 },
  ]

  expect Some(found) = find_utxo_by_id(utxos, 2)
  found.value == 200
}

test test_utxo_not_found() {
  let utxos = [
    MockUTxO { id: 1, value: 100 },
  ]

  find_utxo_by_id(utxos, 999) == None
}
```

## UTxO Selection Strategies

```
┌─────────────────────────────────────────────────────────────┐
│              UTXO SELECTION STRATEGIES                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Khi cần 75 ADA, có các UTxOs: [10, 20, 30, 50, 100]      │
│                                                             │
│   Strategy 1: Largest First                                 │
│   ─────────────────────────                                 │
│   Chọn: [100]                                              │
│   Change: 25 ADA                                           │
│   Pros: Ít inputs, phí thấp                                │
│   Cons: Có thể tạo dust UTxOs                              │
│                                                             │
│   Strategy 2: Smallest First                                │
│   ─────────────────────────                                 │
│   Chọn: [10, 20, 30, 50] = 110                             │
│   Change: 35 ADA                                           │
│   Pros: Consolidate small UTxOs                            │
│   Cons: Nhiều inputs, phí cao hơn                          │
│                                                             │
│   Strategy 3: Random Improve                                │
│   ─────────────────────────                                 │
│   Chọn ngẫu nhiên, tối ưu change                           │
│   Tốt cho privacy                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. UTxO = "Tiền mặt điện tử" - tiêu hết, nhận thừa        │
│  2. Transaction = Consume inputs → Create outputs          │
│  3. eUTxO = UTxO + Datum + Redeemer (smart contracts)      │
│  4. OutputReference = (TX_Hash, Output_Index)              │
│  5. Determinism = Kết quả biết trước, phí chính xác        │
│  6. Contention = Vấn đề khi nhiều TX cùng consume 1 UTxO   │
│  7. Solution = Multi-UTxO pattern cho concurrency          │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ tìm hiểu chi tiết về **Datum và Redeemer** - cơ chế truyền dữ liệu quan trọng trong smart contracts Cardano.
