---
title: "12. Kiểm thử đơn vị (Unit Testing)"
sidebar_position: 12
description: "Viết và chạy tests hiệu quả trong Aiken - Unit tests, Expected failure tests, Property-based testing với Fuzzers"
---

# Bài 12: Kiểm thử đơn vị (Unit Testing)

:::info Mục tiêu
Viết và chạy tests hiệu quả trong Aiken
:::

## Bạn sẽ học

- Viết unit tests với test keyword
- Expected failure tests với fail keyword
- Property-based testing với Fuzzers
- Test organization và best practices
- Đọc hiểu test output và debug

---

## Testing trong Aiken

Aiken có **built-in testing framework** chạy trên cùng VM với on-chain code.

| Loại Test | Cú pháp | Mục đích |
|-----------|---------|----------|
| Unit Tests | `test name() { ... }` | Kiểm tra logic cụ thể |
| Fail Tests | `test name() fail { ... }` | Kiểm tra code nên fail |
| Property Tests | `test name(x via fuzzer) { ... }` | Kiểm tra với random inputs |

:::tip
Tất cả tests chạy trên Plutus VM → giống production
:::

---

## 1. Unit Tests cơ bản

### Syntax

```aiken
// Test đơn giản - return Bool
test my_first_test() {
  1 + 1 == 2
}

// Test với nhiều assertions
test multiple_assertions() {
  let x = 10
  let y = 20

  x < y && x + y == 30 && y - x == 10
}
```

### Test cho Functions

```aiken
fn add(a: Int, b: Int) -> Int {
  a + b
}

fn multiply(a: Int, b: Int) -> Int {
  a * b
}

test add_positive_numbers() {
  add(2, 3) == 5
}

test add_negative_numbers() {
  add(-5, 3) == -2
}

test add_zero() {
  add(0, 0) == 0
}

test multiply_works() {
  multiply(4, 5) == 20
}

test multiply_by_zero() {
  multiply(100, 0) == 0
}
```

---

## 2. Expected Failure Tests

Dùng `fail` để test code **nên fail**.

```aiken
fn divide(a: Int, b: Int) -> Int {
  expect b != 0
  a / b
}

fn unwrap(opt: Option<Int>) -> Int {
  expect Some(value) = opt
  value
}

// Test expect sẽ fail
test divide_by_zero_fails() fail {
  divide(10, 0) == 0
}

test unwrap_none_fails() fail {
  unwrap(None) == 0
}

// Test pattern match fails
test list_head_empty_fails() fail {
  expect [first, ..] = []
  first == 0
}
```

:::info fail Test Logic
`test name() fail { ... }`

- Test **PASS** nếu code bên trong **FAIL**
- Test **FAIL** nếu code bên trong **PASS**

Dùng để verify:
- expect failures
- Invalid input handling
- Edge cases
:::

---

## 3. Property-Based Testing

Aiken hỗ trợ **property-based testing** với random inputs.

### Sử dụng Fuzzers

```aiken
use aiken/fuzz

// Test với random Int
test add_commutative(a via fuzz.int(), b via fuzz.int()) {
  add(a, b) == add(b, a)
}

// Test với random Int trong range
test add_positive_stays_positive(
  a via fuzz.int_between(1, 1000),
  b via fuzz.int_between(1, 1000),
) {
  add(a, b) > 0
}

// Test với random ByteArray
test concat_length(
  a via fuzz.bytearray(),
  b via fuzz.bytearray(),
) {
  bytearray.length(bytearray.concat(a, b)) ==
    bytearray.length(a) + bytearray.length(b)
}
```

### Available Fuzzers

```aiken
use aiken/fuzz

// Primitive fuzzers
fuzz.int()                      // Random Int
fuzz.int_between(min, max)      // Int trong range
fuzz.bytearray()                // Random ByteArray
fuzz.bytearray_between(min, max) // ByteArray với độ dài trong range
fuzz.bool()                     // True hoặc False

// Compound fuzzers
fuzz.list(fuzz.int())           // List of random Ints
fuzz.option(fuzz.int())         // Some(Int) hoặc None
fuzz.either(fuzz.int(), fuzz.bytearray()) // Left hoặc Right
```

### Custom Fuzzers

```aiken
use aiken/fuzz.{Fuzzer}

type Point {
  x: Int,
  y: Int,
}

// Custom fuzzer cho Point
fn point_fuzzer() -> Fuzzer<Point> {
  let x <- fuzz.and_then(fuzz.int_between(-100, 100))
  let y <- fuzz.and_then(fuzz.int_between(-100, 100))
  fuzz.constant(Point { x, y })
}

test point_distance_positive(p via point_fuzzer()) {
  let d = p.x * p.x + p.y * p.y
  d >= 0
}
```

---

## 4. Chạy Tests

### Commands

```bash
# Chạy tất cả tests
aiken check

# Chạy tests trong module cụ thể
aiken check -m my_module

# Chạy tests matching pattern
aiken check -m add

# Exact match
aiken check -m my_module -e test_add_positive

# Tăng số lần chạy property tests
aiken check --max-success=1000
```

### Test Output

```
┍━ my_module ━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ PASS [mem:   5099, cpu:   1884852] add_positive_numbers
│ PASS [mem:   5963, cpu:   3091855] add_negative_numbers
│ PASS [mem:   6100, cpu:   3200000] add_zero
│ FAIL [mem:  11985, cpu:   5076974] multiply_edge_case
│ · with traces
│ | expected: 100
│ | actual: 99
┕━━━━━━━━━━━━━━ 4 tests | 3 passed | 1 failed

Summary 1 error, 0 warning(s)
```

---

## 5. Testing Validators

```aiken
use aiken/collection/list

type Datum {
  owner: ByteArray,
  amount: Int,
}

type Redeemer {
  Withdraw
  Deposit { value: Int }
}

validator my_validator {
  spend(
    datum: Option<Datum>,
    redeemer: Redeemer,
    _output_ref: Data,
    _self: Data,
  ) {
    expect Some(d) = datum

    when redeemer is {
      Withdraw -> d.amount > 0
      Deposit { value } -> value > 0
    }
  }
}

// Testing validator directly
test validator_withdraw_success() {
  let datum = Some(Datum { owner: #"abc", amount: 100 })
  let redeemer = Withdraw

  my_validator.spend(datum, redeemer, "", "")
}

test validator_withdraw_zero_fails() fail {
  let datum = Some(Datum { owner: #"abc", amount: 0 })
  let redeemer = Withdraw

  my_validator.spend(datum, redeemer, "", "")
}

test validator_deposit_positive() {
  let datum = Some(Datum { owner: #"abc", amount: 0 })
  let redeemer = Deposit { value: 50 }

  my_validator.spend(datum, redeemer, "", "")
}

test validator_deposit_negative_fails() fail {
  let datum = Some(Datum { owner: #"abc", amount: 100 })
  let redeemer = Deposit { value: -10 }

  my_validator.spend(datum, redeemer, "", "")
}
```

---

## 6. Test Organization

### Separate Test Modules

```
lib/
├── my_project/
│   ├── types.ak
│   ├── validation.ak
│   └── validation_test.ak    # Tests cho validation
validators/
├── main.ak
└── main_test.ak              # Tests cho validator
```

### validation_test.ak

```aiken
use my_project/validation.{validate_amount, validate_owner}

// Group related tests together

// == Amount Validation Tests ==

test validate_amount_positive() {
  validate_amount(100)
}

test validate_amount_zero() {
  !validate_amount(0)
}

test validate_amount_negative() {
  !validate_amount(-50)
}

// == Owner Validation Tests ==

test validate_owner_correct_length() {
  validate_owner(#"0011223344556677889900112233445566778899001122334455667788")
}

test validate_owner_too_short() {
  !validate_owner(#"001122")
}
```

---

## 7. Testing Best Practices

### NÊN làm

```aiken
// 1. Test tên mô tả rõ ràng
test add_two_positive_integers_returns_sum() {
  add(2, 3) == 5
}

// 2. Test edge cases
test add_handles_max_int() {
  add(9_223_372_036_854_775_807, 0) == 9_223_372_036_854_775_807
}

// 3. Test failure cases
test divide_by_zero_fails() fail {
  divide(10, 0) == 0
}

// 4. Dùng property tests cho properties
test addition_is_commutative(a via fuzz.int(), b via fuzz.int()) {
  add(a, b) == add(b, a)
}

// 5. Group related tests
// == Positive Cases ==
test scenario_a_works() { ... }
test scenario_b_works() { ... }

// == Negative Cases ==
test invalid_input_fails() fail { ... }
```

### KHÔNG NÊN làm

```aiken
// 1. Tên không rõ ràng
test test1() { ... }

// 2. Nhiều assertions không liên quan
test everything() {
  add(1, 1) == 2 &&
  multiply(2, 2) == 4 &&
  divide(10, 2) == 5
}

// 3. Quên test edge cases
// Missing: empty list, None, zero, negative, etc.

// 4. Hardcode magic numbers
test some_calculation() {
  calculate(42, 17) == 714  // What is 714?
}
```

---

## Code mẫu hoàn chỉnh

```aiken
// ═══════════════════════════════════════════════════════════
// Bài 12: Unit Testing - Code Examples
// ═══════════════════════════════════════════════════════════

use aiken/collection/list
use aiken/fuzz

// ─────────────────────────────────────────────────────────────
// CODE TO TEST
// ─────────────────────────────────────────────────────────────

/// Stack data structure
pub opaque type Stack<a> {
  items: List<a>,
}

/// Create empty stack
pub fn empty() -> Stack<a> {
  Stack { items: [] }
}

/// Push item onto stack
pub fn push<a>(stack: Stack<a>, item: a) -> Stack<a> {
  Stack { items: [item, ..stack.items] }
}

/// Pop item from stack
pub fn pop<a>(stack: Stack<a>) -> (Option<a>, Stack<a>) {
  when stack.items is {
    [] -> (None, stack)
    [top, ..rest] -> (Some(top), Stack { items: rest })
  }
}

/// Peek at top item
pub fn peek<a>(stack: Stack<a>) -> Option<a> {
  when stack.items is {
    [] -> None
    [top, ..] -> Some(top)
  }
}

/// Check if stack is empty
pub fn is_empty<a>(stack: Stack<a>) -> Bool {
  stack.items == []
}

/// Get stack size
pub fn size<a>(stack: Stack<a>) -> Int {
  list.length(stack.items)
}

// ─────────────────────────────────────────────────────────────
// BASIC UNIT TESTS
// ─────────────────────────────────────────────────────────────

test empty_stack_is_empty() {
  is_empty(empty())
}

test empty_stack_size_is_zero() {
  size(empty()) == 0
}

test push_increases_size() {
  let stack = empty()
  let stack = push(stack, 1)
  size(stack) == 1
}

test push_multiple_items() {
  let stack = empty()
  let stack = push(stack, 1)
  let stack = push(stack, 2)
  let stack = push(stack, 3)
  size(stack) == 3
}

test pop_returns_last_pushed() {
  let stack = empty()
  let stack = push(stack, 1)
  let stack = push(stack, 2)
  let (top, _) = pop(stack)
  top == Some(2)
}

test pop_decreases_size() {
  let stack = empty()
  let stack = push(stack, 1)
  let stack = push(stack, 2)
  let (_, stack) = pop(stack)
  size(stack) == 1
}

test peek_returns_top_without_removing() {
  let stack = empty()
  let stack = push(stack, 42)
  let top = peek(stack)
  top == Some(42) && size(stack) == 1
}

// ─────────────────────────────────────────────────────────────
// EDGE CASE TESTS
// ─────────────────────────────────────────────────────────────

test pop_empty_returns_none() {
  let (top, _) = pop(empty())
  top == None
}

test peek_empty_returns_none() {
  peek(empty()) == None
}

test push_then_pop_leaves_empty() {
  let stack = empty()
  let stack = push(stack, 1)
  let (_, stack) = pop(stack)
  is_empty(stack)
}

// ─────────────────────────────────────────────────────────────
// PROPERTY-BASED TESTS
// ─────────────────────────────────────────────────────────────

test push_pop_identity(x via fuzz.int()) {
  let stack = empty()
  let stack = push(stack, x)
  let (popped, _) = pop(stack)
  popped == Some(x)
}

test push_increases_size_by_one(
  initial_items via fuzz.list(fuzz.int()),
  new_item via fuzz.int(),
) {
  let stack = list.foldl(initial_items, empty(), fn(s, i) { push(s, i) })
  let old_size = size(stack)
  let stack = push(stack, new_item)
  size(stack) == old_size + 1
}

test lifo_order(items via fuzz.list(fuzz.int())) {
  // Push all items
  let stack = list.foldl(items, empty(), fn(s, i) { push(s, i) })

  // Pop all items and collect
  let reversed = collect_all(stack, [])

  // Should be in reverse order
  reversed == items
}

fn collect_all(stack: Stack<Int>, acc: List<Int>) -> List<Int> {
  when pop(stack) is {
    (None, _) -> acc
    (Some(x), rest) -> collect_all(rest, [x, ..acc])
  }
}

// ─────────────────────────────────────────────────────────────
// VALIDATION FUNCTION TESTS
// ─────────────────────────────────────────────────────────────

fn validate_positive(n: Int) -> Bool {
  n > 0
}

fn validate_in_range(n: Int, min: Int, max: Int) -> Bool {
  n >= min && n <= max
}

fn validate_non_empty(bytes: ByteArray) -> Bool {
  bytearray.length(bytes) > 0
}

test validate_positive_true() {
  validate_positive(1) &&
  validate_positive(100) &&
  validate_positive(999999)
}

test validate_positive_false() {
  !validate_positive(0) &&
  !validate_positive(-1) &&
  !validate_positive(-100)
}

test validate_in_range_true() {
  validate_in_range(5, 1, 10) &&
  validate_in_range(1, 1, 10) &&
  validate_in_range(10, 1, 10)
}

test validate_in_range_false() {
  !validate_in_range(0, 1, 10) &&
  !validate_in_range(11, 1, 10)
}

test validate_non_empty_true() {
  validate_non_empty("hello") &&
  validate_non_empty(#"00")
}

test validate_non_empty_false() {
  !validate_non_empty("")
}

// ─────────────────────────────────────────────────────────────
// EXPECTED FAILURE TESTS
// ─────────────────────────────────────────────────────────────

fn must_be_positive(n: Int) -> Int {
  expect n > 0
  n
}

fn must_have_value(opt: Option<Int>) -> Int {
  expect Some(v) = opt
  v
}

test must_be_positive_fails_on_zero() fail {
  must_be_positive(0) == 0
}

test must_be_positive_fails_on_negative() fail {
  must_be_positive(-5) == -5
}

test must_have_value_fails_on_none() fail {
  must_have_value(None) == 0
}
```

---

## Tổng kết

| Cú pháp | Mục đích |
|---------|----------|
| `test name() { bool_expression }` | Unit test |
| `test name() fail { ... }` | Expected failure |
| `test name(x via fuzzer) { ... }` | Property test |

| Command | Mô tả |
|---------|-------|
| `aiken check` | Run all tests |
| `aiken check -m module` | Filter by module |
| `aiken check --max-success=N` | Property iterations |

**Best Practices:**
- Descriptive test names
- Test edge cases
- Use property tests for invariants
- Organize tests logically

---

## Bài tiếp theo

[Bài 13: Xử lý lỗi](/docs/01-the-aiken-foundation/13_Troubleshooting)
