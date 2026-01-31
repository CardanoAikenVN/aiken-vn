---
title: Kiểm thử đơn vị
sidebar_position: 12
---

# Kiểm thử đơn vị trong Aiken

Bài học này hướng dẫn cách viết và chạy unit tests trong Aiken.

## Mục tiêu học tập

- Viết unit tests cơ bản
- Sử dụng property-based testing
- Đọc kết quả test và metrics
- Áp dụng test-driven development

## Unit Test cơ bản

### Cú pháp test

```rust title="lib/math_test.ak"
/// Test đơn giản nhất
test test_addition() {
  1 + 1 == 2
}

/// Test với logic
test test_is_positive() {
  let n = 42
  n > 0
}

/// Test với and block
test test_multiple_conditions() {
  let a = 10
  let b = 20

  and {
    a < b,
    a + b == 30,
    a * 2 == b,
  }
}
```

### Chạy tests

```bash
# Chạy tất cả tests
aiken check

# Output mẫu
    Compiling my-project 0.0.0
      Testing ...

    ┍━ math_test ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 1234, cpu: 5678] test_addition
    │ PASS [mem: 2345, cpu: 6789] test_is_positive
    │ PASS [mem: 3456, cpu: 7890] test_multiple_conditions
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━ 3 tests | 3 passed | 0 failed
```

### Test với custom types

```rust title="lib/user_test.ak"
type User {
  name: ByteArray,
  age: Int,
  active: Bool,
}

fn create_user(name: ByteArray, age: Int) -> User {
  User { name, age, active: True }
}

fn is_adult(user: User) -> Bool {
  user.age >= 18
}

test test_create_user() {
  let user = create_user("Alice", 25)

  and {
    user.name == "Alice",
    user.age == 25,
    user.active == True,
  }
}

test test_is_adult_true() {
  let adult = create_user("Bob", 30)
  is_adult(adult) == True
}

test test_is_adult_false() {
  let minor = create_user("Charlie", 15)
  is_adult(minor) == False
}
```

## Expected Failure Tests

Test phải fail để pass:

```rust title="lib/fail_test.ak"
/// Test này pass nếu expression evaluates to False
test test_division_by_zero() fail {
  let result = 10 / 0
  True  // Sẽ không đến đây - fail trước
}

/// Test expect với pattern không match
test test_expect_none_fails() fail {
  let value: Option<Int> = None
  expect Some(n) = value
  n > 0
}
```

## Property-Based Testing

Tự động sinh test cases:

```rust title="lib/property_test.ak"
use aiken/fuzz

/// Property: Cộng số dương luôn lớn hơn operand
test prop_addition_increases(n: Int via fuzz.int()) {
  n + 1 > n
}

/// Property: Danh sách đảo ngược hai lần = gốc
test prop_reverse_twice(xs: List<Int> via fuzz.list(fuzz.int())) {
  reverse(reverse(xs)) == xs
}

fn reverse(xs: List<a>) -> List<a> {
  reverse_helper(xs, [])
}

fn reverse_helper(xs: List<a>, acc: List<a>) -> List<a> {
  when xs is {
    [] -> acc
    [head, ..tail] -> reverse_helper(tail, [head, ..acc])
  }
}
```

### Custom Fuzzers

```rust
use aiken/fuzz

/// Fuzzer cho số dương
fn positive_int() -> Fuzzer<Int> {
  fuzz.int()
    |> fuzz.map(fn(n) { if n < 0 { -n } else { n } })
    |> fuzz.such_that(fn(n) { n > 0 })
}

/// Fuzzer cho User
fn user_fuzzer() -> Fuzzer<User> {
  fuzz.map2(
    fuzz.bytearray_between(1, 20),
    fuzz.int_between(0, 120),
    fn(name, age) { User { name, age, active: True } },
  )
}

test prop_user_age_valid(user: User via user_fuzzer()) {
  user.age >= 0 && user.age <= 120
}
```

## Trace và Debug

### Sử dụng trace

```rust
fn calculate(a: Int, b: Int) -> Int {
  trace @"Starting calculation..."
  let result = a + b
  trace @"Result calculated"
  result
}

test test_with_trace() {
  let result = calculate(10, 20)
  trace @"Testing result..."
  result == 30
}
```

### Trace operator (?)

```rust
test test_with_trace_operator() {
  let a = 10
  let b = 20

  // ? traces khi condition là False
  (a > 0)? && (b > 0)? && (a + b == 30)?
}
```

Chạy với trace:

```bash
aiken check --trace-level verbose
```

## Test Filtering

```bash
# Chạy tests trong module cụ thể
aiken check -m "user_test"

# Chạy test cụ thể
aiken check -m "user_test.{test_is_adult_true}"

# Match chính xác
aiken check -m "user_test" -e

# Bỏ qua tests
aiken check --skip "slow_test"
```

## Test Metrics

```
PASS [mem: 1234, cpu: 5678] test_name
      │           │
      │           └── CPU units consumed
      └────────────── Memory units consumed
```

### Tối ưu dựa trên metrics

```rust
// Version 1: Recursive (tốn resource)
fn sum_v1(xs: List<Int>) -> Int {
  when xs is {
    [] -> 0
    [head, ..tail] -> head + sum_v1(tail)
  }
}

// Version 2: Tail recursive (tối ưu hơn)
fn sum_v2(xs: List<Int>) -> Int {
  sum_helper(xs, 0)
}

fn sum_helper(xs: List<Int>, acc: Int) -> Int {
  when xs is {
    [] -> acc
    [head, ..tail] -> sum_helper(tail, acc + head)
  }
}

test test_sum_v1() {
  sum_v1([1, 2, 3, 4, 5]) == 15
}

test test_sum_v2() {
  sum_v2([1, 2, 3, 4, 5]) == 15
}

// So sánh metrics để chọn version tốt hơn
```

## Test-Driven Development

### Workflow TDD

```text
┌─────────────────────────────────────────────────────────────┐
│                     TDD WORKFLOW                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. Write Test (RED)                                       │
│          │                                                  │
│          ▼                                                  │
│   2. Run Test → FAIL                                        │
│          │                                                  │
│          ▼                                                  │
│   3. Write Code (GREEN)                                     │
│          │                                                  │
│          ▼                                                  │
│   4. Run Test → PASS                                        │
│          │                                                  │
│          ▼                                                  │
│   5. Refactor (REFACTOR)                                    │
│          │                                                  │
│          └───────────────▶ Repeat                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ TDD

```rust title="lib/calculator_test.ak"
// Step 1: Write tests first

test test_add() {
  add(2, 3) == 5
}

test test_subtract() {
  subtract(10, 4) == 6
}

test test_multiply() {
  multiply(3, 4) == 12
}

test test_divide() {
  divide(10, 2) == Some(5)
}

test test_divide_by_zero() {
  divide(10, 0) == None
}
```

```rust title="lib/calculator.ak"
// Step 2: Implement to make tests pass

pub fn add(a: Int, b: Int) -> Int {
  a + b
}

pub fn subtract(a: Int, b: Int) -> Int {
  a - b
}

pub fn multiply(a: Int, b: Int) -> Int {
  a * b
}

pub fn divide(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}
```

## Code mẫu

Xem code mẫu đầy đủ trong thư mục `examples/`:

| File | Mô tả | Tests |
|------|-------|-------|
| `lib/syntax_test.ak` | Test syntax & data types | 53 tests |
| `lib/gift_test.ak` | Test Gift validator | 7 tests |
| `lib/simple_ft_test.ak` | Test Fungible Token | 2 tests |
| `lib/escrow_test.ak` | Test Escrow contract | 14 tests |
| `lib/nft_test.ak` | Test NFT policy | 4 tests |

```bash
# Chạy tất cả tests (80 tests)
cd examples
aiken check

# Chạy tests với trace
aiken check --trace-level verbose

# Chạy tests của module cụ thể
aiken check -m "syntax_test"
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về Troubleshooting - cách debug và xử lý lỗi trong Aiken.
