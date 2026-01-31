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

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ tìm hiểu chi tiết về **Datum và Redeemer** - cơ chế truyền dữ liệu quan trọng trong smart contracts Cardano.
