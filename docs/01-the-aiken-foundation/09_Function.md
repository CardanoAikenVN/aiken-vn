---
title: Hàm
sidebar_position: 9
---

# Hàm trong Aiken

Bài học này hướng dẫn cách định nghĩa, sử dụng và kết hợp hàm trong Aiken.

## Mục tiêu học tập

- Định nghĩa hàm với fn
- Sử dụng labeled arguments
- Hiểu anonymous functions
- Áp dụng function capturing và higher-order functions

## Định nghĩa hàm cơ bản

### Cú pháp

```rust title="lib/functions.ak"
/// Hàm cộng hai số
fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Hàm không có return type (trả về giá trị cuối)
fn greet(name: ByteArray) -> ByteArray {
  name
}

/// Hàm private (mặc định)
fn internal_helper() -> Int {
  42
}

/// Hàm public (có thể import)
pub fn public_function() -> Int {
  internal_helper()
}
```

### Return implicit

Aiken không có từ khóa `return`. Hàm trả về giá trị của expression cuối cùng:

```rust
fn max(a: Int, b: Int) -> Int {
  if a > b {
    a  // Trả về a
  } else {
    b  // Trả về b
  }
}

fn classify(n: Int) -> ByteArray {
  when n is {
    0 -> "Zero"     // Trả về "Zero"
    _ -> "NonZero"  // Trả về "NonZero"
  }
}
```

## Labeled Arguments

Tăng tính rõ ràng khi gọi hàm:

```rust title="lib/labeled.ak"
/// Định nghĩa với labels
fn create_user(name n: ByteArray, age a: Int, active act: Bool) {
  User { name: n, age: a, active: act }
}

fn usage() {
  // Gọi với labels (thứ tự bất kỳ)
  let user1 = create_user(name: "Alice", age: 25, active: True)
  let user2 = create_user(age: 30, name: "Bob", active: False)

  // Gọi không có labels (theo thứ tự định nghĩa)
  let user3 = create_user("Charlie", 35, True)

  user1
}
```

### Mix positional và labeled

```rust
fn transfer(
  from sender: ByteArray,
  to receiver: ByteArray,
  amount amt: Int,
) -> Bool {
  // Logic transfer
  True
}

fn call_transfer() {
  // Labeled arguments có thể ở bất kỳ vị trí nào
  transfer(#"sender", to: #"receiver", amount: 1000)
}
```

## Anonymous Functions

### Cú pháp cơ bản

```rust title="lib/anonymous.ak"
fn anonymous_examples() {
  // Anonymous function gán vào biến
  let double = fn(x) { x * 2 }
  let add = fn(a, b) { a + b }

  // Sử dụng
  let result = double(5)     // 10
  let sum = add(3, 4)        // 7

  result
}
```

### Sử dụng với higher-order functions

```rust
use aiken/collection/list

fn with_list() {
  let numbers = [1, 2, 3, 4, 5]

  // Map với anonymous function
  let doubled = list.map(numbers, fn(n) { n * 2 })

  // Filter với anonymous function
  let evens = list.filter(numbers, fn(n) { n % 2 == 0 })

  // Foldr với anonymous function
  let sum = list.foldr(numbers, 0, fn(n, acc) { n + acc })

  sum
}
```

## Function Capturing

Tạo partial application với `_`:

```rust title="lib/capturing.ak"
fn add(a: Int, b: Int) -> Int {
  a + b
}

fn multiply(a: Int, b: Int) -> Int {
  a * b
}

fn capturing_examples() {
  // Capture argument thứ 2
  let add_five = add(5, _)
  let result1 = add_five(3)      // add(5, 3) = 8

  // Capture argument thứ 1
  let double = multiply(2, _)
  let result2 = double(10)       // multiply(2, 10) = 20

  // Sử dụng trong list operations
  let numbers = [1, 2, 3, 4, 5]
  let plus_ten = list.map(numbers, add(10, _))
  // [11, 12, 13, 14, 15]

  result1
}
```

## Generic Functions

Hàm hoạt động với bất kỳ kiểu nào:

```rust title="lib/generics.ak"
/// Identity function
fn identity(value: a) -> a {
  value
}

/// Swap pair
fn swap(pair: (a, b)) -> (b, a) {
  let (first, second) = pair
  (second, first)
}

/// First element of pair
fn first(pair: (a, b)) -> a {
  pair.1st
}

/// Apply function to value
fn apply(f: fn(a) -> b, value: a) -> b {
  f(value)
}

/// Compose two functions
fn compose(f: fn(b) -> c, g: fn(a) -> b) -> fn(a) -> c {
  fn(x) { f(g(x)) }
}
```

### Sử dụng generics

```rust
fn generic_usage() {
  // identity với Int
  let n = identity(42)

  // identity với ByteArray
  let s = identity("Hello")

  // swap
  let swapped = swap((1, "one"))  // ("one", 1)

  // compose
  let add_one = fn(x) { x + 1 }
  let double = fn(x) { x * 2 }
  let add_then_double = compose(double, add_one)

  add_then_double(5)  // (5 + 1) * 2 = 12
}
```

## Higher-Order Functions

Hàm nhận hàm làm tham số hoặc trả về hàm:

```rust title="lib/higher_order.ak"
/// Hàm nhận function làm parameter
fn apply_twice(f: fn(Int) -> Int, x: Int) -> Int {
  f(f(x))
}

/// Hàm trả về function
fn make_adder(n: Int) -> fn(Int) -> Int {
  fn(x) { x + n }
}

/// Hàm trả về function với closure
fn make_multiplier(factor: Int) -> fn(Int) -> Int {
  fn(x) { x * factor }
}

fn higher_order_usage() {
  let double = fn(x) { x * 2 }
  let result1 = apply_twice(double, 3)  // double(double(3)) = 12

  let add_10 = make_adder(10)
  let result2 = add_10(5)  // 15

  let triple = make_multiplier(3)
  let result3 = triple(7)  // 21

  result1
}
```

## Backpassing

Cú pháp đặc biệt cho callback-heavy code:

```rust title="lib/backpassing.ak"
fn traditional_callbacks() {
  // Truyền thống (callback hell)
  and_then(
    get_user(user_id),
    fn(user) {
      and_then(
        get_orders(user),
        fn(orders) {
          process_orders(orders)
        },
      )
    },
  )
}

fn with_backpassing() {
  // Với backpassing (dễ đọc hơn)
  let user <- and_then(get_user(user_id))
  let orders <- and_then(get_orders(user))
  process_orders(orders)
}
```

## Documentation với ///

```rust title="lib/documented.ak"
/// Tính diện tích hình chữ nhật
///
/// ## Arguments
///
/// * `width` - Chiều rộng
/// * `height` - Chiều cao
///
/// ## Returns
///
/// Diện tích = width * height
///
/// ## Example
///
/// ```aiken
/// let area = rectangle_area(10, 20)  // 200
/// ```
pub fn rectangle_area(width: Int, height: Int) -> Int {
  width * height
}
```

## Sơ đồ tổng quan

```
┌─────────────────────────────────────────────────────────────┐
│                    FUNCTIONS IN AIKEN                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                                          │
│   │  Named fn   │ fn add(a: Int, b: Int) -> Int            │
│   └─────────────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐                                          │
│   │ Anonymous   │ fn(x) { x * 2 }                          │
│   └─────────────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐                                          │
│   │  Capturing  │ add(5, _) → partial function             │
│   └─────────────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐                                          │
│   │Higher-Order │ fn(f: fn(a) -> b) -> ...                 │
│   └─────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học cách tổ chức code thành modules và quản lý visibility.
