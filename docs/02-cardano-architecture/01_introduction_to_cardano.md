---
title: Giới thiệu Cardano
sidebar_position: 1
---

# Giới thiệu về Cardano

Bài học này cung cấp cái nhìn tổng quan về Cardano blockchain và lý do nó là nền tảng lý tưởng cho smart contract an toàn.

## Mục tiêu học tập

- Hiểu kiến trúc tổng quan của Cardano
- Nắm được cơ chế đồng thuận Ouroboros
- Biết các thành phần chính của Cardano stack
- Hiểu vì sao Cardano phù hợp cho smart contract

## Cardano là gì?

Cardano là blockchain thế hệ thứ 3, được xây dựng dựa trên nghiên cứu học thuật peer-reviewed và phương pháp phát triển formal verification.

```
┌─────────────────────────────────────────────────────────────┐
│                    CARDANO OVERVIEW                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              Generation 3 Blockchain                 │  │
│   │                                                      │  │
│   │  • Peer-reviewed research                           │  │
│   │  • Formal verification methods                      │  │
│   │  • Proof-of-Stake (Ouroboros)                      │  │
│   │  • Native assets                                    │  │
│   │  • Extended UTxO model                              │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Gen 1          Gen 2              Gen 3                   │
│   Bitcoin   →    Ethereum    →      Cardano                 │
│   (Payment)      (Smart Contracts)  (Scalability +          │
│                                      Sustainability)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Kiến trúc phân tầng

Cardano được thiết kế theo kiến trúc phân tầng (layered architecture):

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYERED ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │           Computation Layer (Plutus)                 │  │
│   │                                                      │  │
│   │   • Smart Contracts                                  │  │
│   │   • Validators (Aiken compiles to this)             │  │
│   │   • Script execution                                 │  │
│   └─────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          ▼                                  │
│   ┌─────────────────────────────────────────────────────┐  │
│   │          Settlement Layer (Cardano SL)               │  │
│   │                                                      │  │
│   │   • ADA transactions                                 │  │
│   │   • Native assets                                    │  │
│   │   • UTxO management                                  │  │
│   └─────────────────────────────────────────────────────┘  │
│                          │                                  │
│                          ▼                                  │
│   ┌─────────────────────────────────────────────────────┐  │
│   │         Consensus Layer (Ouroboros)                  │  │
│   │                                                      │  │
│   │   • Block production                                 │  │
│   │   • Chain selection                                  │  │
│   │   • Stake delegation                                 │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Settlement Layer

Xử lý các giao dịch cơ bản:
- Chuyển ADA giữa các địa chỉ
- Quản lý native assets (tokens)
- Theo dõi UTxO set

### Computation Layer (Plutus)

Thực thi smart contracts:
- Validators kiểm tra điều kiện giao dịch
- Scripts được viết bằng Aiken hoặc Plutus
- Deterministic execution

## Ouroboros - Cơ chế đồng thuận

Ouroboros là giao thức Proof-of-Stake đầu tiên được chứng minh an toàn về mặt toán học.

```
┌─────────────────────────────────────────────────────────────┐
│                    OUROBOROS CONSENSUS                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Time ──────────────────────────────────────────────▶      │
│                                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│   │ Epoch 1 │  │ Epoch 2 │  │ Epoch 3 │  │ Epoch 4 │       │
│   │ ~5 days │  │ ~5 days │  │ ~5 days │  │ ~5 days │       │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│        │            │            │            │             │
│        ▼            ▼            ▼            ▼             │
│   ┌─────────────────────────────────────────────────┐      │
│   │              Slots (432,000 per epoch)           │      │
│   │                                                  │      │
│   │   [S1][S2][S3]...[Sn] = 1 second each           │      │
│   │                                                  │      │
│   │   Slot Leader được chọn ngẫu nhiên              │      │
│   │   dựa trên stake proportion                      │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   Stake Pool với nhiều ADA stake = Xác suất được           │
│   chọn làm Slot Leader cao hơn                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Đặc điểm của Ouroboros

| Đặc điểm | Mô tả |
|----------|-------|
| **Proof-of-Stake** | Không cần mining hardware |
| **Energy Efficient** | Tiêu thụ năng lượng thấp |
| **Mathematically Proven** | An toàn được chứng minh |
| **Delegation** | Cho phép delegate stake |
| **Rewards** | Stakers nhận rewards định kỳ |

## Native Assets

Cardano hỗ trợ native assets (tokens) mà không cần smart contract:

```
┌─────────────────────────────────────────────────────────────┐
│                    NATIVE ASSETS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                    Asset Bundle                      │  │
│   │                                                      │  │
│   │   ┌─────────────┐   ┌─────────────────────────┐    │  │
│   │   │     ADA     │   │    Native Tokens        │    │  │
│   │   │  (Lovelace) │   │                         │    │  │
│   │   │  1 ADA =    │   │  • Policy ID + Name     │    │  │
│   │   │  1,000,000  │   │  • Quantity             │    │  │
│   │   │  Lovelace   │   │  • No smart contract    │    │  │
│   │   └─────────────┘   │    needed to transfer   │    │  │
│   │                     └─────────────────────────┘    │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Example UTxO:                                             │
│   ┌────────────────────────────────────────────────────┐   │
│   │ Address: addr1...                                   │   │
│   │ Value:                                              │   │
│   │   - 10 ADA                                         │   │
│   │   - 100 TokenA (policy: abc123...)                 │   │
│   │   - 50 TokenB (policy: def456...)                  │   │
│   └────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## So sánh với các blockchain khác

```
┌─────────────────────────────────────────────────────────────┐
│               BLOCKCHAIN COMPARISON                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Feature        │ Cardano    │ Ethereum   │ Bitcoin       │
│   ───────────────┼────────────┼────────────┼───────────────│
│   Consensus      │ PoS        │ PoS        │ PoW           │
│   Model          │ eUTxO      │ Account    │ UTxO          │
│   Native Assets  │ Yes        │ No (ERC20) │ No            │
│   Smart Contract │ Plutus     │ Solidity   │ Limited       │
│   Deterministic  │ Yes        │ No         │ N/A           │
│   Fees           │ Predictable│ Variable   │ Variable      │
│   Throughput     │ ~250 TPS   │ ~15 TPS    │ ~7 TPS        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tại sao Cardano phù hợp cho Smart Contracts?

### 1. Tính xác định (Determinism)

```aiken
// Trong Aiken/Cardano, kết quả validator LUÔN xác định
// Không phụ thuộc vào trạng thái global

validator example {
  spend(_datum, _redeemer, _own_ref, _tx) {
    // Kết quả chỉ phụ thuộc vào inputs
    // Có thể predict trước khi submit
    True
  }
}
```

**Lợi ích:**
- Có thể simulate transaction trước khi submit
- Phí gas biết trước, không bị surprise
- Không có front-running attacks

### 2. Native Assets không cần contract

```
Ethereum:                          Cardano:
─────────                          ────────
Transfer ERC20:                    Transfer Token:
1. Call contract                   1. Build UTxO
2. Execute code                    2. Sign & Submit
3. Update storage                  (Không cần code!)
4. Pay gas for execution
```

### 3. Parallel Processing

```
┌─────────────────────────────────────────────────────────────┐
│                PARALLEL PROCESSING                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   UTxO Model cho phép xử lý song song:                      │
│                                                             │
│   ┌───────┐  ┌───────┐  ┌───────┐                          │
│   │ UTxO1 │  │ UTxO2 │  │ UTxO3 │                          │
│   └───┬───┘  └───┬───┘  └───┬───┘                          │
│       │          │          │                               │
│       ▼          ▼          ▼                               │
│   ┌───────┐  ┌───────┐  ┌───────┐                          │
│   │  Tx1  │  │  Tx2  │  │  Tx3  │  ← Có thể xử lý          │
│   └───────┘  └───────┘  └───────┘    đồng thời!            │
│                                                             │
│   Các UTxO độc lập = Transactions độc lập                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Plutus và UPLC

Smart contracts trên Cardano chạy dưới dạng UPLC (Untyped Plutus Core):

```
┌─────────────────────────────────────────────────────────────┐
│              COMPILATION PIPELINE                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐           │
│   │  Aiken   │────▶│  UPLC    │────▶│ On-chain │           │
│   │  Code    │     │ (bytecode)│     │ Execution│           │
│   └──────────┘     └──────────┘     └──────────┘           │
│        │                                                    │
│        │           ┌──────────┐                            │
│   ┌────┴────┐     │  Plutus  │                            │
│   │ aiken   │     │   Tx     │                            │
│   │ build   │     │ Haskell  │                            │
│   └─────────┘     └────┬─────┘                            │
│                        │                                   │
│                        ▼                                   │
│                   Cùng đích: UPLC                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Aiken và Cardano types

Aiken cung cấp các types tương ứng với Cardano:

```aiken
use cardano/address.{Address, Credential}
use cardano/assets.{AssetName, PolicyId, Value}
use cardano/transaction.{Transaction, Input, Output}

// Address - Địa chỉ Cardano
// pub type Address {
//   payment_credential: Credential,
//   stake_credential: Option<Credential>,
// }

// Value - Bundle of assets
// Chứa ADA và native tokens

// Transaction - Giao dịch hoàn chỉnh
// Inputs, outputs, fee, validity range, etc.
```

## Lovelace và ADA

```
┌─────────────────────────────────────────────────────────────┐
│                    ADA DENOMINATION                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1 ADA = 1,000,000 Lovelace                               │
│                                                             │
│   ┌──────────────────────────────────────┐                 │
│   │ Unit          │ Lovelace             │                 │
│   ├───────────────┼──────────────────────┤                 │
│   │ 1 Lovelace    │ 1                    │                 │
│   │ 1 ADA         │ 1,000,000            │                 │
│   │ Min UTxO      │ ~1,000,000           │                 │
│   │ Typical Fee   │ ~200,000             │                 │
│   └──────────────────────────────────────┘                 │
│                                                             │
│   Trong Aiken, luôn làm việc với Lovelace:                 │
│                                                             │
│   let one_ada = 1_000_000                                  │
│   let min_utxo = 1_000_000                                 │
│   let ten_ada = 10_000_000                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Ví dụ: Đọc thông tin từ Transaction

```aiken title="lib/tx_info.ak"
use cardano/transaction.{Transaction, Input, Output}
use cardano/assets.{Value, lovelace_of}
use aiken/collection/list

/// Tính tổng ADA trong outputs
pub fn total_output_lovelace(tx: Transaction) -> Int {
  tx.outputs
    |> list.map(fn(output) { lovelace_of(output.value) })
    |> list.foldr(0, fn(a, b) { a + b })
}

/// Đếm số lượng inputs
pub fn input_count(tx: Transaction) -> Int {
  list.length(tx.inputs)
}

/// Đếm số lượng outputs
pub fn output_count(tx: Transaction) -> Int {
  list.length(tx.outputs)
}

/// Kiểm tra có ít nhất n outputs
pub fn has_min_outputs(tx: Transaction, n: Int) -> Bool {
  output_count(tx) >= n
}
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. Cardano = Blockchain Gen 3 với nghiên cứu học thuật    │
│  2. Ouroboros = PoS consensus đầu tiên được chứng minh     │
│  3. Native Assets = Tokens không cần smart contract        │
│  4. Determinism = Kết quả biết trước, phí dự đoán được     │
│  5. eUTxO = Parallel processing, scalability               │
│  6. Aiken compiles to UPLC = Chạy trên Plutus platform    │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ đi sâu vào **Mô hình UTxO** - nền tảng quan trọng nhất để hiểu cách Cardano hoạt động và cách viết smart contracts.
