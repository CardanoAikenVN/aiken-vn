---
title: Luồng điều khiển
sidebar_position: 8
---

# Luồng điều khiển trong Aiken

Bài học này hướng dẫn các cấu trúc điều khiển trong Aiken: if/else, when/is, piping và đệ quy.

## Mục tiêu học tập

- Sử dụng if/else cho điều kiện đơn giản
- Làm chủ pattern matching với when/is
- Hiểu pipe operator và function composition
- Viết hàm đệ quy thay cho loops

## Blocks - Khối lệnh

Mọi block đều là expression và trả về giá trị cuối cùng:

```aiken title="lib/blocks.ak"
fn block_examples() {
  // Block trả về giá trị cuối
  let result = {
    let a = 10
    let b = 20
    a + b  // Giá trị trả về: 30
  }

  // Block thay đổi độ ưu tiên phép toán
  let celsius = { 100 - 32 } * 5 / 9  // (100 - 32) * 5 / 9

  result
}
```

## If/Else - Điều kiện

### Cú pháp cơ bản

```aiken title="lib/conditional.ak"
fn check_age(age: Int) -> ByteArray {
  if age >= 18 {
    "Adult"
  } else {
    "Minor"
  }
}

fn classify_score(score: Int) -> ByteArray {
  if score >= 90 {
    "Excellent"
  } else if score >= 70 {
    "Good"
  } else if score >= 50 {
    "Pass"
  } else {
    "Fail"
  }
}
```

### If/Else là expression

```aiken
fn abs(n: Int) -> Int {
  if n >= 0 { n } else { -n }
}

fn max(a: Int, b: Int) -> Int {
  if a > b { a } else { b }
}
```

## When/Is - Pattern Matching

### Cú pháp cơ bản

```aiken title="lib/patterns.ak"
fn describe_number(n: Int) -> ByteArray {
  when n is {
    0 -> "Zero"
    1 -> "One"
    2 -> "Two"
    _ -> "Many"  // Wildcard - match tất cả
  }
}
```

### Pattern matching với custom types

```aiken
type Color {
  Red
  Green
  Blue
  Rgb { r: Int, g: Int, b: Int }
}

fn color_to_hex(color: Color) -> ByteArray {
  when color is {
    Red -> "#FF0000"
    Green -> "#00FF00"
    Blue -> "#0000FF"
    Rgb { r, g, b } -> "custom"
  }
}
```

### Guards trong patterns

```aiken
fn classify_number(n: Int) -> ByteArray {
  when n is {
    0 -> "Zero"
    x if x > 0 -> "Positive"
    x if x < 0 -> "Negative"
    _ -> "Unknown"
  }
}

fn validate_age(age: Int) -> ByteArray {
  when age is {
    a if a < 0 -> "Invalid"
    a if a < 13 -> "Child"
    a if a < 20 -> "Teen"
    a if a < 60 -> "Adult"
    _ -> "Senior"
  }
}
```

### Alternative patterns (|)

```aiken
fn is_weekend(day: ByteArray) -> Bool {
  when day is {
    "Saturday" | "Sunday" -> True
    _ -> False
  }
}

fn is_vowel(char: ByteArray) -> Bool {
  when char is {
    "a" | "e" | "i" | "o" | "u" -> True
    "A" | "E" | "I" | "O" | "U" -> True
    _ -> False
  }
}
```

### Spread pattern (..)

```aiken
type User {
  name: ByteArray,
  age: Int,
  email: ByteArray,
  active: Bool,
}

fn is_active_adult(user: User) -> Bool {
  when user is {
    User { age, active: True, .. } if age >= 18 -> True
    _ -> False
  }
}
```

### Pattern matching với List

```aiken
fn sum_list(numbers: List<Int>) -> Int {
  when numbers is {
    [] -> 0
    [single] -> single
    [first, second] -> first + second
    [head, ..tail] -> head + sum_list(tail)
  }
}

fn first_two(items: List<a>) -> Option<(a, a)> {
  when items is {
    [a, b, ..] -> Some((a, b))
    _ -> None
  }
}
```

## If/Is - Soft casting

Thử cast mà không fail nếu không match:

```aiken
fn safe_extract(data: Data) -> Int {
  if data is n: Int {
    n
  } else {
    0  // Fallback nếu không phải Int
  }
}

type Result {
  Ok(Int)
  Err(ByteArray)
}

fn get_value(result: Result) -> Int {
  if result is Ok(value) {
    value
  } else {
    0
  }
}
```

## Expect - Unsafe extraction

```aiken
fn must_get_value(result: Result) {
  // Sẽ fail nếu không phải Ok
  expect Ok(value) = result
  value
}

fn must_have_head(items: List<Int>) {
  // Sẽ fail nếu list rỗng
  expect [head, ..] = items
  head
}
```

## Fail & Todo

### Fail - Dừng thực thi có chủ đích

```aiken
fn must_be_positive(n: Int) -> Int {
  if n > 0 {
    n
  } else {
    fail @"Number must be positive"
  }
}

fn unreachable_case(status: OrderStatus) -> Int {
  when status is {
    Pending -> 1
    Processing -> 2
    _ -> fail @"Unexpected status"
  }
}
```

### Todo - Đánh dấu chưa implement

```aiken
fn complex_calculation() -> Int {
  todo @"Implement this later"
}

fn partial_implementation(n: Int) -> Int {
  if n > 0 {
    n * 2
  } else {
    todo @"Handle negative numbers"
  }
}
```

## Pipe Operator (|>)

Chain function calls dễ đọc:

```aiken title="lib/piping.ak"
use aiken/collection/list

fn process_numbers(numbers: List<Int>) -> Int {
  // Không dùng pipe (khó đọc)
  // list.foldr(list.filter(list.map(numbers, fn(n) { n * 2 }), fn(n) { n > 10 }), 0, fn(n, acc) { n + acc })

  // Dùng pipe (dễ đọc)
  numbers
    |> list.map(fn(n) { n * 2 })
    |> list.filter(fn(n) { n > 10 })
    |> list.foldr(0, fn(n, acc) { n + acc })
}
```

### Ví dụ thực tế

```aiken
use aiken/collection/list
use aiken/bytearray

fn validate_signatures(
  signers: List<ByteArray>,
  required: List<ByteArray>,
) -> Bool {
  required
    |> list.all(fn(req) { list.has(signers, req) })
}

fn count_valid_outputs(
  outputs: List<Output>,
  min_value: Int,
) -> Int {
  outputs
    |> list.filter(fn(o) { o.value >= min_value })
    |> list.length()
}
```

## Recursion - Đệ quy

Aiken không có loops, thay vào đó dùng đệ quy:

```aiken title="lib/recursion.ak"
/// Tính giai thừa
fn factorial(n: Int) -> Int {
  if n <= 1 {
    1
  } else {
    n * factorial(n - 1)
  }
}

/// Fibonacci
fn fibonacci(n: Int) -> Int {
  when n is {
    0 -> 0
    1 -> 1
    _ -> fibonacci(n - 1) + fibonacci(n - 2)
  }
}

/// Tìm phần tử trong list
fn find(items: List<a>, predicate: fn(a) -> Bool) -> Option<a> {
  when items is {
    [] -> None
    [head, ..tail] ->
      if predicate(head) {
        Some(head)
      } else {
        find(tail, predicate)
      }
  }
}
```

### Tail recursion (tối ưu)

```aiken
/// Factorial với tail recursion
fn factorial_tail(n: Int) -> Int {
  factorial_helper(n, 1)
}

fn factorial_helper(n: Int, acc: Int) -> Int {
  if n <= 1 {
    acc
  } else {
    factorial_helper(n - 1, n * acc)
  }
}

/// Sum với tail recursion
fn sum_tail(items: List<Int>) -> Int {
  sum_helper(items, 0)
}

fn sum_helper(items: List<Int>, acc: Int) -> Int {
  when items is {
    [] -> acc
    [head, ..tail] -> sum_helper(tail, acc + head)
  }
}
```

## Sơ đồ luồng điều khiển

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTROL FLOW IN AIKEN                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                                          │
│   │   if/else   │  → Điều kiện đơn giản                    │
│   └─────────────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐                                          │
│   │   when/is   │  → Pattern matching đầy đủ               │
│   └─────────────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐                                          │
│   │    if/is    │  → Soft casting (có fallback)            │
│   └─────────────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐                                          │
│   │   expect    │  → Hard extraction (fail nếu ko match)   │
│   └─────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Ví dụ tổng hợp

### Code: lib/validation.ak

```aiken title="lib/validation.ak"
use aiken/collection/list

pub type ValidationResult {
  Valid
  Invalid { reason: ByteArray }
}

pub type Transaction {
  inputs: List<Input>,
  outputs: List<Output>,
  signers: List<ByteArray>,
}

pub type Input {
  tx_id: ByteArray,
  index: Int,
}

pub type Output {
  address: ByteArray,
  value: Int,
}

/// Validate transaction
pub fn validate_tx(tx: Transaction) -> ValidationResult {
  // Chain validations
  when validate_inputs(tx.inputs) is {
    Invalid { reason } -> Invalid { reason }
    Valid ->
      when validate_outputs(tx.outputs) is {
        Invalid { reason } -> Invalid { reason }
        Valid ->
          when validate_signers(tx.signers) is {
            Invalid { reason } -> Invalid { reason }
            Valid -> Valid
          }
      }
  }
}

fn validate_inputs(inputs: List<Input>) -> ValidationResult {
  if list.is_empty(inputs) {
    Invalid { reason: "No inputs" }
  } else {
    Valid
  }
}

fn validate_outputs(outputs: List<Output>) -> ValidationResult {
  let invalid_outputs =
    outputs
      |> list.filter(fn(o) { o.value <= 0 })
      |> list.length()

  if invalid_outputs > 0 {
    Invalid { reason: "Invalid output value" }
  } else {
    Valid
  }
}

fn validate_signers(signers: List<ByteArray>) -> ValidationResult {
  if list.is_empty(signers) {
    Invalid { reason: "No signers" }
  } else {
    Valid
  }
}
```

### Test: lib/validation_test.ak

```aiken title="lib/validation_test.ak"
use validation.{Transaction, Input, Output, ValidationResult, validate_tx}

test test_valid_transaction() {
  let tx = Transaction {
    inputs: [Input { tx_id: #"abc", index: 0 }],
    outputs: [Output { address: #"def", value: 1_000_000 }],
    signers: [#"signer1"],
  }

  validate_tx(tx) == Valid
}

test test_no_inputs() {
  let tx = Transaction {
    inputs: [],
    outputs: [Output { address: #"def", value: 1_000_000 }],
    signers: [#"signer1"],
  }

  when validate_tx(tx) is {
    Invalid { reason } -> reason == "No inputs"
    Valid -> False
  }
}

test test_invalid_output_value() {
  let tx = Transaction {
    inputs: [Input { tx_id: #"abc", index: 0 }],
    outputs: [Output { address: #"def", value: 0 }],
    signers: [#"signer1"],
  }

  when validate_tx(tx) is {
    Invalid { reason } -> reason == "Invalid output value"
    Valid -> False
  }
}
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. if/else = Điều kiện boolean đơn giản                   │
│  2. when/is = Pattern matching exhaustive                  │
│  3. if/is = Soft casting với fallback                      │
│  4. expect = Hard extraction, fail nếu không match         │
│  5. |> = Pipe operator cho function composition            │
│  6. Recursion = Thay thế for/while loops                   │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học cách định nghĩa và sử dụng hàm trong Aiken.
