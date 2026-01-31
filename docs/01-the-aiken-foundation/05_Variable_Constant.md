---
title: Biến & Hằng số
sidebar_position: 5
---

# Biến & Hằng số trong Aiken

Bài học này hướng dẫn cách khai báo và sử dụng biến, hằng số trong Aiken.

## Mục tiêu học tập

- Hiểu cách khai báo biến với `let`
- Nắm tính bất biến của dữ liệu
- Sử dụng hằng số với `const`

## Let Binding - Khai báo biến

Trong Aiken, biến được khai báo với từ khóa `let`:

```rust title="lib/main.ak"
fn example() {
  // Khai báo biến cơ bản
  let name = "Cardano"
  let age = 7
  let is_active = True

  // Biến có annotation kiểu (optional)
  let amount: Int = 1_000_000
  let owner: ByteArray = #"abc123"

  name
}
```

### Tính bất biến (Immutability)

**Quan trọng**: Biến trong Aiken là **bất biến** - không thể thay đổi sau khi gán:

```rust
fn immutability_demo() {
  let x = 5
  // x = 10  // ❌ Lỗi! Không thể gán lại

  // ✅ Thay vào đó, tạo biến mới
  let y = x + 5
  y  // 10
}
```

### Shadowing - Che khuất biến

Bạn có thể khai báo biến mới cùng tên (shadowing):

```rust
fn shadowing_demo() {
  let value = 10
  let value = value * 2  // Shadow biến cũ
  let value = value + 5  // Shadow lần nữa

  value  // 25
}
```

```text
┌─────────────────────────────────────────────────────────────┐
│                     SHADOWING FLOW                          │
│                                                             │
│   let value = 10        →  value = 10                       │
│         │                                                   │
│         ▼                                                   │
│   let value = value * 2 →  value = 20 (shadow)              │
│         │                                                   │
│         ▼                                                   │
│   let value = value + 5 →  value = 25 (shadow)              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Const - Hằng số

Hằng số được khai báo ở cấp module với `const`:

```rust title="lib/constants.ak"
/// Số lovelace trong 1 ADA
pub const lovelace_per_ada = 1_000_000

/// Admin public key hash
pub const admin_pkh = #"abc123def456..."

/// Tên token
pub const token_name = "MyToken"

/// Danh sách whitelist
pub const whitelist = [#"aaa...", #"bbb...", #"ccc..."]
```

### Sử dụng hằng số

```aiken title="lib/main.ak"
use constants.{lovelace_per_ada, admin_pkh}

fn calculate_ada(lovelace: Int) -> Int {
  lovelace / lovelace_per_ada
}

fn is_admin(pkh: ByteArray) -> Bool {
  pkh == admin_pkh
}
```

## So sánh let vs const

| Đặc điểm | `let` | `const` |
|----------|-------|---------|
| Phạm vi | Trong function/block | Module-level |
| Thời điểm | Runtime | Compile-time |
| Export | Không | Có (với `pub`) |
| Giá trị | Bất kỳ | Literals only |

## Expect - Khai báo với assertion

`expect` giống `let` nhưng sẽ **fail** nếu pattern không match:

```rust
fn expect_demo() {
  let maybe_value = Some(42)

  // Sẽ fail nếu maybe_value là None
  expect Some(value) = maybe_value

  value  // 42
}
```

### So sánh let vs expect

```rust
fn comparison() {
  let result = Some(100)

  // Với let: Phải handle tất cả cases
  let value = when result is {
    Some(v) -> v
    None -> 0
  }

  // Với expect: Chỉ handle case mong đợi
  expect Some(v) = result
  // Nếu result = None -> fail

  value
}
```

## Ví dụ thực hành

### Code: lib/wallet.ak

```aiken title="lib/wallet.ak"
/// Số lovelace trong 1 ADA
pub const ada_to_lovelace = 1_000_000

/// Phí giao dịch tối thiểu (0.17 ADA)
pub const min_fee = 170_000

/// Kiểu dữ liệu ví
pub type Wallet {
  owner: ByteArray,
  balance: Int,
}

/// Tính số ADA từ lovelace
pub fn to_ada(lovelace: Int) -> Int {
  lovelace / ada_to_lovelace
}

/// Tính tổng balance sau khi trừ phí
pub fn net_balance(wallet: Wallet) -> Int {
  let Wallet { balance, .. } = wallet
  let net = balance - min_fee

  if net > 0 {
    net
  } else {
    0
  }
}

/// Kiểm tra ví có đủ tiền
pub fn has_sufficient_funds(wallet: Wallet, amount: Int) -> Bool {
  let Wallet { balance, .. } = wallet
  balance >= amount + min_fee
}
```

### Test: lib/wallet_test.ak

```aiken title="lib/wallet_test.ak"
use wallet.{Wallet, ada_to_lovelace, to_ada, net_balance, has_sufficient_funds}

test test_to_ada() {
  to_ada(5_000_000) == 5
}

test test_net_balance() {
  let w = Wallet { owner: #"abc", balance: 1_000_000 }
  net_balance(w) == 830_000  // 1_000_000 - 170_000
}

test test_has_sufficient_funds_true() {
  let w = Wallet { owner: #"abc", balance: 1_000_000 }
  has_sufficient_funds(w, 500_000) == True
}

test test_has_sufficient_funds_false() {
  let w = Wallet { owner: #"abc", balance: 100_000 }
  has_sufficient_funds(w, 500_000) == False
}
```

## Code mẫu

Xem code mẫu đầy đủ trong thư mục `examples/`:

- **lib/syntax.ak** - Demo các kiểu dữ liệu và hàm cơ bản
- **lib/syntax_test.ak** - Test cases cho syntax

```bash
# Chạy tests
cd examples
aiken check
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về các kiểu dữ liệu nguyên thủy trong Aiken - nền tảng để xây dựng logic phức tạp.
