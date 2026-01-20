---
title: "05. Biến & Hằng số"
sidebar_position: 5
description: "Hiểu cách khai báo và sử dụng biến, hằng số trong Aiken"
---

# Bài 05: Biến & Hằng số (Variables & Constants)

> **Mục tiêu:** Hiểu cách khai báo và sử dụng biến, hằng số trong Aiken

---

## Giới thiệu

Trong Aiken, có hai cách để gán giá trị cho một identifier:

| Từ khóa | Mô tả |
|---------|-------|
| `let` | Local binding, trong function/block. Có thể shadowing |
| `const` | Module-level constant. Được inline khi compile, Evaluated at compile-time |

---

## Let Bindings (Biến cục bộ)

### Cú pháp cơ bản

```aiken
// Khai báo với type inference (tự suy luận kiểu)
let x = 42
let name = "Alice"
let is_valid = True

// Khai báo với type annotation (chỉ định kiểu)
let age: Int = 25
let greeting: ByteArray = "Hello"
let flag: Bool = False
```

### Immutability (Bất biến)

**Quan trọng:** Trong Aiken, tất cả bindings đều là **immutable** (không thể thay đổi sau khi gán).

```aiken
fn example() {
  let x = 10
  // x = 20  // ❌ LỖI! Không thể reassign

  // Thay vào đó, sử dụng shadowing
  let x = 20  // ✅ OK - tạo binding mới với cùng tên
  x
}
```

### Shadowing

```aiken
fn shadowing_example() -> Int {
  let x = 1
  let x = x + 10   // Shadow biến x cũ, x = 11
  let x = x * 2    // Shadow lần nữa, x = 22
  x                // Return 22
}
```

**Shadowing Visualization:**

| Scope | Statement | Giá trị x |
|-------|-----------|-----------|
| 1 | `let x = 1` | 1 |
| 2 | `let x = x + 10` (shadow) | 11 (cũ bị che) |
| 3 | `let x = x * 2` (shadow) | 22 (final) |

---

## Constants (Hằng số)

### Khai báo Constants

Constants được khai báo ở module level (ngoài function):

```aiken
// Module level constants
const max_supply = 21_000_000
const token_name = "ADA"
const pi = 314159

// Constants với type annotation
const threshold: Int = 100
const admin_key: ByteArray = #"abcd1234"
```

### Đặc điểm của Constants

```aiken
// ✅ Constants có thể reference other constants
const summer = "Summer"
const autumn = "Autumn"
const winter = "Winter"
const spring = "Spring"
const seasons = [summer, autumn, winter, spring]

// ✅ Constants được evaluate at compile-time
const computed = 10 + 20 + 30  // = 60 khi compile

// ❌ Constants KHÔNG thể reference constants defined sau nó
// const a = b  // Error nếu b được define sau a
// const b = 10
```

### Sử dụng Constants trong Pattern Matching

```aiken
const success_code = 200
const error_code = 500

fn check_status(code: Int) -> ByteArray {
  when code is {
    success_code -> "Success!"
    error_code -> "Error!"
    _ -> "Unknown"
  }
}
```

---

## Type Annotations

Aiken có type inference mạnh, nhưng đôi khi bạn cần type annotation:

```aiken
// Không cần annotation - type được suy luận
let number = 42           // Int
let text = "hello"        // ByteArray
let flag = True           // Bool
let items = [1, 2, 3]     // List<Int>

// Cần annotation cho clarity
let balance: Int = get_balance()

// Cần annotation khi type không rõ ràng
let empty_list: List<Int> = []

// Annotated function parameters (khuyến khích)
fn greet(name: ByteArray, times: Int) -> ByteArray {
  name
}
```

---

## Destructuring với Let

Aiken hỗ trợ destructuring patterns trong let bindings:

### Tuple Destructuring

```aiken
fn tuple_example() {
  let pair = (10, "ten")
  let (number, word) = pair  // destructure

  // number = 10
  // word = "ten"
}
```

### Record Destructuring

```aiken
type Person {
  name: ByteArray,
  age: Int,
}

fn record_example() {
  let alice = Person { name: "Alice", age: 30 }

  // Destructure
  let Person { name, age } = alice

  // Hoặc rename
  let Person { name: person_name, age: person_age } = alice
}
```

### Partial Destructuring với Wildcard

```aiken
fn partial_destruct() {
  let triple = (1, 2, 3)
  let (first, _, third) = triple  // Bỏ qua phần tử giữa

  // first = 1
  // third = 3
}
```

---

## Best Practices

### 1. Đặt tên biến

```aiken
// ✅ Good - snake_case, descriptive
let total_amount = 1000
let user_balance = 500
let is_valid_signature = True

// ❌ Bad
let x = 1000
let tA = 500
let b = True
```

### 2. Sử dụng Constants cho Magic Numbers

```aiken
// ❌ Bad - magic number
fn check_age(age: Int) -> Bool {
  age >= 18
}

// ✅ Good - use constant
const minimum_age = 18

fn check_age(age: Int) -> Bool {
  age >= minimum_age
}
```

### 3. Type Annotations cho Public Functions

```aiken
// ✅ Good - explicit types cho documentation
pub fn calculate_fee(amount: Int, rate: Int) -> Int {
  amount * rate / 100
}
```

---

## Code Examples

### main.ak

```aiken
// lib/variables_demo/main.ak

/// Constants ở module level
const max_amount: Int = 1_000_000
const min_amount: Int = 1_000
const token_symbol: ByteArray = "tADA"

/// Type cho ví dụ
pub type Wallet {
  owner: ByteArray,
  balance: Int,
}

/// Ví dụ về let bindings
pub fn create_wallet(owner: ByteArray, initial_balance: Int) -> Wallet {
  // Let binding với validation
  let validated_balance =
    if initial_balance >= min_amount {
      initial_balance
    } else {
      min_amount
    }

  // Tạo và return wallet
  Wallet { owner, balance: validated_balance }
}

/// Ví dụ về shadowing
pub fn double_then_add_ten(x: Int) -> Int {
  let x = x * 2      // Shadow: x = x * 2
  let x = x + 10     // Shadow: x = x + 10
  x
}

/// Ví dụ về destructuring
pub fn get_wallet_info(wallet: Wallet) -> (ByteArray, Int) {
  let Wallet { owner, balance } = wallet
  (owner, balance)
}

/// Kiểm tra số dư hợp lệ
pub fn is_valid_balance(balance: Int) -> Bool {
  balance >= min_amount && balance <= max_amount
}
```

### test.ak

```aiken
// lib/variables_demo/test.ak

use variables_demo/main.{
  create_wallet,
  double_then_add_ten,
  get_wallet_info,
  is_valid_balance,
  Wallet,
}

// ===== Test Constants =====

test test_min_balance() {
  let wallet = create_wallet("Alice", 500)
  // Balance should be min_amount (1000) since 500 < 1000
  wallet.balance == 1000
}

test test_valid_balance() {
  let wallet = create_wallet("Bob", 5000)
  wallet.balance == 5000
}

// ===== Test Shadowing =====

test test_double_then_add_ten() {
  // x = 5
  // x = 5 * 2 = 10
  // x = 10 + 10 = 20
  double_then_add_ten(5) == 20
}

test test_double_then_add_ten_zero() {
  // x = 0
  // x = 0 * 2 = 0
  // x = 0 + 10 = 10
  double_then_add_ten(0) == 10
}

// ===== Test Destructuring =====

test test_get_wallet_info() {
  let wallet = Wallet { owner: "Charlie", balance: 10000 }
  let (owner, balance) = get_wallet_info(wallet)
  owner == "Charlie" && balance == 10000
}

// ===== Test Validation =====

test test_valid_balance_true() {
  is_valid_balance(50000) == True
}

test test_valid_balance_too_low() {
  is_valid_balance(500) == False
}

test test_valid_balance_too_high() {
  is_valid_balance(2_000_000) == False
}

test test_valid_balance_at_min() {
  is_valid_balance(1000) == True
}

test test_valid_balance_at_max() {
  is_valid_balance(1_000_000) == True
}
```

---

## Chạy Tests

```bash
# Build và chạy tests
aiken check

# Output mong đợi:
#     Testing ...
#
#     ┍━ variables_demo/test ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#     │ PASS test_min_balance
#     │ PASS test_valid_balance
#     │ PASS test_double_then_add_ten
#     │ PASS test_double_then_add_ten_zero
#     │ PASS test_get_wallet_info
#     │ PASS test_valid_balance_true
#     │ PASS test_valid_balance_too_low
#     │ PASS test_valid_balance_too_high
#     │ PASS test_valid_balance_at_min
#     │ PASS test_valid_balance_at_max
#     ┕━━━━━━━━━━━━━━ 10 tests | 10 passed | 0 failed
```

---

## Bài tập thực hành

### Bài 1: Khai báo constants

Tạo các constants cho một token:
- `token_name`: "MyToken"
- `max_supply`: 1 tỷ (1_000_000_000)
- `decimals`: 6

### Bài 2: Viết function với shadowing

Viết function `transform(x: Int)` thực hiện:
1. Cộng 5
2. Nhân 3
3. Trừ 10
4. Return kết quả

### Bài 3: Destructuring

Cho type:
```aiken
type Token {
  policy_id: ByteArray,
  asset_name: ByteArray,
  amount: Int,
}
```
Viết function `get_token_amount(token: Token) -> Int` sử dụng destructuring.

---

## Checklist hoàn thành

- [ ] Hiểu sự khác biệt giữa `let` và `const`
- [ ] Biết cách sử dụng type annotations
- [ ] Hiểu về immutability và shadowing
- [ ] Biết cách destructure tuples và records
- [ ] Viết được tests cho functions

---

➡️ **Tiếp theo**: [Bài 06 - Kiểu dữ liệu nguyên thuỷ](./06_Primitive_type.md)
