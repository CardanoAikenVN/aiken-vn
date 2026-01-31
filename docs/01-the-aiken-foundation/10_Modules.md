---
title: Modules
sidebar_position: 10
---

# Modules trong Aiken

Bài học này hướng dẫn cách tổ chức code thành modules và quản lý visibility.

## Mục tiêu học tập

- Hiểu cách tổ chức code thành modules
- Nắm các kiểu import: qualified và unqualified
- Sử dụng pub để quản lý visibility
- Hiểu opaque types

## Module Basics

### Tên module từ đường dẫn file

```rust
lib/
├── utils.ak              → module: utils
├── helpers/
│   ├── math.ak           → module: helpers/math
│   └── string.ak         → module: helpers/string
└── validators/
    └── spend.ak          → module: validators/spend
```

### Định nghĩa module

```rust title="lib/math.ak"
//// Module xử lý toán học
//// Sử dụng //// cho module-level docs

/// Cộng hai số
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Nhân hai số
pub fn multiply(a: Int, b: Int) -> Int {
  a * b
}

// Hàm private - không thể import từ bên ngoài
fn internal_helper(x: Int) -> Int {
  x * 2
}
```

## Visibility - Phạm vi truy cập

### Public vs Private

```rust title="lib/wallet.ak"
// ❌ Private - mặc định
fn calculate_fee(amount: Int) -> Int {
  amount / 100
}

// ✅ Public - có thể import
pub fn transfer(from: ByteArray, to: ByteArray, amount: Int) -> Bool {
  let fee = calculate_fee(amount)
  // Logic transfer
  True
}

// ❌ Private type
type InternalState {
  value: Int,
}

// ✅ Public type
pub type Transaction {
  sender: ByteArray,
  receiver: ByteArray,
  amount: Int,
}
```

### Public constant

```rust
// ❌ Private constant
const internal_fee = 1000

// ✅ Public constant
pub const min_utxo_value = 1_000_000
pub const ada_to_lovelace = 1_000_000
```

## Import Styles

### Qualified Import

```rust title="lib/main.ak"
use helpers/math

fn calculate() -> Int {
  // Sử dụng với prefix module
  math.add(10, 20)
}
```

### Alias Import

```rust
use helpers/math as m

fn calculate() -> Int {
  m.add(10, 20)
}
```

### Unqualified Import

```rust
use helpers/math.{add, multiply}

fn calculate() -> Int {
  // Sử dụng trực tiếp không cần prefix
  add(10, multiply(5, 4))
}
```

### Mix Import Styles

```rust
use helpers/math.{add} as m

fn calculate() -> Int {
  // Cả hai cách đều hoạt động
  add(10, 20)      // Unqualified
  m.multiply(5, 4) // Qualified với alias
}
```

## Opaque Types

Ẩn implementation, chỉ expose API:

```rust title="lib/amount.ak"
/// Lovelace amount - không thể tạo trực tiếp từ bên ngoài
pub opaque type Lovelace {
  Lovelace(Int)
}

/// Constructor - cách duy nhất để tạo Lovelace
pub fn from_int(n: Int) -> Option<Lovelace> {
  if n >= 0 {
    Some(Lovelace(n))
  } else {
    None
  }
}

/// Accessor - cách duy nhất để lấy giá trị
pub fn to_int(amount: Lovelace) -> Int {
  let Lovelace(n) = amount
  n
}

/// Safe addition
pub fn add(a: Lovelace, b: Lovelace) -> Lovelace {
  Lovelace(to_int(a) + to_int(b))
}
```

Sử dụng từ module khác:

```rust title="lib/payment.ak"
use amount.{Lovelace}

fn process_payment() {
  // ✅ Tạo qua constructor function
  expect Some(amt) = amount.from_int(1_000_000)

  // ❌ Không thể tạo trực tiếp
  // let amt = Lovelace(1_000_000)  // Lỗi!

  // ❌ Không thể pattern match
  // let Lovelace(n) = amt  // Lỗi!

  // ✅ Dùng accessor
  let value = amount.to_int(amt)

  value
}
```

## Prelude - Module tự động import

Các items tự động có sẵn không cần import:

```rust
// Tự động có sẵn từ prelude
let some_value: Option<Int> = Some(42)
let no_value: Option<Int> = None
let nothing: Void = Void
let ordering: Ordering = Less
```

## Builtin Module

Truy cập các hàm Plutus Core:

```rust
use aiken/builtin

fn hash_data(data: ByteArray) -> ByteArray {
  builtin.blake2b_256(data)
}

fn verify_ed25519(key: ByteArray, msg: ByteArray, sig: ByteArray) -> Bool {
  builtin.verify_ed25519_signature(key, msg, sig)
}
```

## Sơ đồ module system

```
┌─────────────────────────────────────────────────────────────┐
│                    MODULE SYSTEM                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐     ┌─────────────┐                      │
│   │  File Path  │ ──▶ │ Module Name │                      │
│   └─────────────┘     └─────────────┘                      │
│                              │                              │
│                              ▼                              │
│   ┌─────────────────────────────────────────┐              │
│   │            Visibility Control            │              │
│   │  ┌─────────┐          ┌─────────┐       │              │
│   │  │   pub   │          │ private │       │              │
│   │  │ (export)│          │(default)│       │              │
│   │  └─────────┘          └─────────┘       │              │
│   └─────────────────────────────────────────┘              │
│                              │                              │
│                              ▼                              │
│   ┌─────────────────────────────────────────┐              │
│   │            Import Styles                 │              │
│   │  • use module                           │              │
│   │  • use module as alias                  │              │
│   │  • use module.{item1, item2}            │              │
│   └─────────────────────────────────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về Data - cách serialize và deserialize dữ liệu trong Aiken.
