---
title: Kiểu dữ liệu tùy chỉnh
sidebar_position: 7
---

# Kiểu dữ liệu tùy chỉnh trong Aiken

Bài học này hướng dẫn cách định nghĩa các kiểu dữ liệu phức tạp phù hợp với domain của bạn.

## Mục tiêu học tập

- Tạo record types với named fields
- Định nghĩa enum types (variants)
- Sử dụng generic types
- Hiểu pattern matching với custom types

## Record Types

### Cú pháp cơ bản

```rust title="lib/types.ak"
/// Thông tin người dùng
pub type User {
  name: ByteArray,
  age: Int,
  is_active: Bool,
}

fn create_user() {
  // Tạo instance
  let alice = User {
    name: "Alice",
    age: 25,
    is_active: True,
  }

  alice
}
```

### Truy cập fields

```rust
fn access_fields() {
  let user = User { name: "Bob", age: 30, is_active: True }

  // Dot notation
  let name = user.name        // "Bob"
  let age = user.age          // 30
  let active = user.is_active // True

  name
}
```

### Cập nhật record (spread syntax)

```rust
fn update_record() {
  let user = User { name: "Bob", age: 30, is_active: True }

  // Tạo bản sao với một số fields thay đổi
  let updated = User { ..user, age: 31 }

  // Có thể thay đổi nhiều fields
  let deactivated = User { ..user, is_active: False, age: 32 }

  updated
}
```

## Enum Types

### Enum đơn giản (không có dữ liệu)

```rust title="lib/status.ak"
/// Trạng thái đơn hàng
pub type OrderStatus {
  Pending
  Processing
  Shipped
  Delivered
  Cancelled
}

fn check_status(status: OrderStatus) -> ByteArray {
  when status is {
    Pending -> "Đang chờ"
    Processing -> "Đang xử lý"
    Shipped -> "Đã gửi"
    Delivered -> "Đã giao"
    Cancelled -> "Đã hủy"
  }
}
```

### Enum với dữ liệu (Tagged Unions)

```rust title="lib/payment.ak"
/// Phương thức thanh toán
pub type PaymentMethod {
  /// Thanh toán bằng ADA
  Ada { amount: Int }
  /// Thanh toán bằng token
  Token { policy_id: ByteArray, asset_name: ByteArray, amount: Int }
  /// Thanh toán bằng NFT
  Nft { policy_id: ByteArray, asset_name: ByteArray }
}

fn process_payment(method: PaymentMethod) -> Int {
  when method is {
    Ada { amount } -> amount
    Token { amount, .. } -> amount
    Nft { .. } -> 0  // NFT không có số lượng
  }
}
```

## Generic Types

### Định nghĩa generic type

```rust title="lib/container.ak"
/// Hộp chứa giá trị bất kỳ
pub type Box<a> {
  value: a,
}

/// Cặp giá trị
pub type Pair<a, b> {
  first: a,
  second: b,
}

fn generic_examples() {
  // Box chứa Int
  let int_box = Box { value: 42 }

  // Box chứa ByteArray
  let str_box = Box { value: "Hello" }

  // Pair với các kiểu khác nhau
  let pair = Pair { first: 10, second: "Ten" }

  int_box
}
```

### Option type (built-in)

```rust
fn option_examples() {
  let some_value: Option<Int> = Some(42)
  let no_value: Option<Int> = None

  // Pattern matching
  let result = when some_value is {
    Some(n) -> n * 2
    None -> 0
  }

  // Với expect (fail nếu None)
  expect Some(value) = some_value

  result
}
```

## Pattern Matching

### Cú pháp when/is

```rust
type Shape {
  Circle { radius: Int }
  Rectangle { width: Int, height: Int }
  Triangle { base: Int, height: Int }
}

fn calculate_area(shape: Shape) -> Int {
  when shape is {
    Circle { radius } -> 314 * radius * radius / 100
    Rectangle { width, height } -> width * height
    Triangle { base, height } -> base * height / 2
  }
}
```

### Wildcard patterns

```rust
fn describe_shape(shape: Shape) -> ByteArray {
  when shape is {
    Circle { .. } -> "A circle"
    Rectangle { width, .. } if width > 10 -> "Wide rectangle"
    Rectangle { .. } -> "Rectangle"
    _ -> "Other shape"
  }
}
```

### Alternative patterns

```rust
type Animal {
  Dog { name: ByteArray }
  Cat { name: ByteArray }
  Bird { name: ByteArray }
}

fn get_name(animal: Animal) -> ByteArray {
  when animal is {
    Dog { name } | Cat { name } | Bird { name } -> name
  }
}
```

### Nested patterns

```rust
type Container {
  Empty
  Single(Int)
  Multiple(List<Int>)
}

fn first_value(container: Container) -> Option<Int> {
  when container is {
    Empty -> None
    Single(n) -> Some(n)
    Multiple([]) -> None
    Multiple([first, ..]) -> Some(first)
  }
}
```

## Type Aliases

```rust title="lib/aliases.ak"
/// Bí danh cho public key hash
pub type PubKeyHash = ByteArray

/// Bí danh cho số lovelace
pub type Lovelace = Int

/// Bí danh cho transaction ID
pub type TxId = ByteArray

fn use_aliases() {
  let owner: PubKeyHash = #"abc123..."
  let amount: Lovelace = 1_000_000
  let tx: TxId = #"def456..."

  amount
}
```

## Opaque Types

Ẩn implementation details, chỉ cho phép truy cập qua API:

```rust title="lib/counter.ak"
/// Counter không thể truy cập value trực tiếp từ bên ngoài
pub opaque type Counter {
  Counter { value: Int }
}

/// Tạo counter mới
pub fn new() -> Counter {
  Counter { value: 0 }
}

/// Tăng giá trị
pub fn increment(counter: Counter) -> Counter {
  Counter { value: counter.value + 1 }
}

/// Giảm giá trị
pub fn decrement(counter: Counter) -> Counter {
  Counter { value: counter.value - 1 }
}

/// Lấy giá trị hiện tại
pub fn get_value(counter: Counter) -> Int {
  counter.value
}
```

Sử dụng từ module khác:

```aiken
use counter

fn use_counter() {
  let c = counter.new()
  let c = counter.increment(c)
  let c = counter.increment(c)

  counter.get_value(c)  // 2

  // ❌ Lỗi: không thể truy cập trực tiếp
  // c.value
}
```

## Sơ đồ quan hệ

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOM TYPES IN AIKEN                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │   Record    │     │    Enum     │     │   Generic   │   │
│  │   (struct)  │     │  (variant)  │     │   (param)   │   │
│  └─────────────┘     └─────────────┘     └─────────────┘   │
│        │                   │                   │           │
│        └───────────────────┴───────────────────┘           │
│                            │                               │
│                            ▼                               │
│                   ┌─────────────────┐                      │
│                   │ Pattern Matching│                      │
│                   │    (when/is)    │                      │
│                   └─────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về luồng điều khiển - if/else, when/is và các cấu trúc rẽ nhánh khác.
