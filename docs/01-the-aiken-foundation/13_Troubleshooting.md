---
title: Khắc phục sự cố
sidebar_position: 13
---

# Khắc phục sự cố trong Aiken

Bài học này hướng dẫn cách debug và xử lý các lỗi thường gặp trong Aiken.

## Mục tiêu học tập

- Đọc hiểu error messages
- Debug với trace
- Xử lý lỗi compilation phổ biến
- Best practices để tránh bugs

## Các loại lỗi

```
┌─────────────────────────────────────────────────────────────┐
│                    ERROR TYPES                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                                          │
│   │ Compilation │ → Lỗi cú pháp, type mismatch             │
│   └─────────────┘                                          │
│                                                             │
│   ┌─────────────┐                                          │
│   │  Test Fail  │ → Logic sai, assertion fail              │
│   └─────────────┘                                          │
│                                                             │
│   ┌─────────────┐                                          │
│   │   Runtime   │ → expect fail, division by zero          │
│   └─────────────┘                                          │
│                                                             │
│   ┌─────────────┐                                          │
│   │  On-chain   │ → Script execution fail                  │
│   └─────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Lỗi Compilation

### Type Mismatch

```aiken
// ❌ Lỗi: Type mismatch
fn add_wrong(a: Int, b: ByteArray) -> Int {
  a + b  // Error: Cannot add Int and ByteArray
}
```

**Error message:**
```
Error: Type mismatch

   ┌── lib/main.ak:3:3
   │
 3 │   a + b
   │   ^^^^^ expected `Int`, got `ByteArray`
```

**Fix:**
```aiken
// ✅ Đúng
fn add_correct(a: Int, b: Int) -> Int {
  a + b
}
```

### Missing Pattern

```aiken
// ❌ Lỗi: Non-exhaustive pattern match
type Status {
  Active
  Pending
  Completed
}

fn describe(status: Status) -> ByteArray {
  when status is {
    Active -> "Active"
    Pending -> "Pending"
    // Missing: Completed
  }
}
```

**Error message:**
```
Error: Non-exhaustive pattern match

   ┌── lib/main.ak:8:3
   │
 8 │   when status is {
   │   ^^^^^^^^^^^^^^^ missing pattern: Completed
```

**Fix:**
```aiken
// ✅ Đúng
fn describe(status: Status) -> ByteArray {
  when status is {
    Active -> "Active"
    Pending -> "Pending"
    Completed -> "Completed"
  }
}
```

### Unknown Variable

```aiken
// ❌ Lỗi
fn calculate() -> Int {
  let x = 10
  x + y  // Error: Unknown variable 'y'
}
```

**Fix:**
```aiken
// ✅ Đúng
fn calculate() -> Int {
  let x = 10
  let y = 20
  x + y
}
```

### Import Error

```aiken
// ❌ Lỗi: Module not found
use nonexistent/module
```

**Fix:**
- Kiểm tra đường dẫn file
- Đảm bảo module tồn tại
- Kiểm tra dependencies trong aiken.toml

## Lỗi Test

### Assertion Failed

```aiken
test test_fails() {
  1 + 1 == 3  // False -> Test FAIL
}
```

**Output:**
```
┍━ main ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ FAIL [mem: 1234, cpu: 5678] test_fails
│
│ ↪ 1 + 1 == 3
│   │
│   └─ expected: True
│      got:      False
```

### Debug với trace

```aiken
test test_with_debug() {
  let a = 10
  trace @"a = 10"

  let b = 20
  trace @"b = 20"

  let sum = a + b
  trace @"sum calculated"

  // Debug intermediate values
  sum == 30
}
```

Chạy với trace:
```bash
aiken check --trace-level verbose
```

### Trace operator (?)

```aiken
test test_trace_on_fail() {
  let a = 10
  let b = 20

  // ? sẽ trace khi expression là False
  (a > 0)?      // Sẽ trace nếu a <= 0
  (b > 0)?      // Sẽ trace nếu b <= 0
  (a + b == 30)? // Sẽ trace nếu sum != 30
}
```

## Lỗi Runtime

### Expect Failure

```aiken
fn unsafe_unwrap(opt: Option<Int>) -> Int {
  expect Some(value) = opt  // Fail nếu None!
  value
}

test test_expect_fail() fail {
  unsafe_unwrap(None)  // Runtime error
  True
}
```

**Fix với if/is:**
```aiken
fn safe_unwrap(opt: Option<Int>) -> Int {
  if opt is Some(value) {
    value
  } else {
    0  // Default value
  }
}
```

### Division by Zero

```aiken
fn divide(a: Int, b: Int) -> Int {
  a / b  // Fail nếu b == 0!
}
```

**Fix:**
```aiken
fn safe_divide(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}
```

## Debug Strategies

### 1. Isolate the Problem

```aiken
// Chia nhỏ logic để debug
fn complex_validation(data: Data) -> Bool {
  let step1 = validate_structure(data)
  trace @"Step 1 done"

  let step2 = validate_values(data)
  trace @"Step 2 done"

  let step3 = validate_signatures(data)
  trace @"Step 3 done"

  step1 && step2 && step3
}
```

### 2. Print Intermediate Values

```aiken
use aiken/cbor

fn debug_value(label: String, value: a) -> a {
  trace label
  trace cbor.diagnostic(value)
  value
}

fn calculate() -> Int {
  let a = debug_value(@"a", 10)
  let b = debug_value(@"b", 20)
  let sum = debug_value(@"sum", a + b)
  sum
}
```

### 3. Test Edge Cases

```aiken
// Test boundary conditions
test test_empty_list() {
  process_list([]) == 0
}

test test_single_element() {
  process_list([1]) == 1
}

test test_negative() {
  process_list([-1, -2, -3]) == -6
}

test test_large_numbers() {
  process_list([1_000_000_000, 2_000_000_000]) == 3_000_000_000
}
```

### 4. Property-Based Testing

```aiken
use aiken/fuzz

// Tìm edge cases tự động
test prop_reverse_length(xs: List<Int> via fuzz.list(fuzz.int())) {
  list.length(reverse(xs)) == list.length(xs)
}
```

## Common Pitfalls

### 1. Off-by-one Errors

```aiken
// ❌ Sai
fn is_valid_index(list: List<a>, index: Int) -> Bool {
  index <= list.length(list)  // Should be <
}

// ✅ Đúng
fn is_valid_index(list: List<a>, index: Int) -> Bool {
  index >= 0 && index < list.length(list)
}
```

### 2. Incorrect Pattern Matching Order

```aiken
// ❌ Sai - wildcard đầu tiên match tất cả
fn check(n: Int) -> ByteArray {
  when n is {
    _ -> "other"  // Match mọi thứ!
    0 -> "zero"   // Không bao giờ đến đây
    1 -> "one"
  }
}

// ✅ Đúng - specific patterns trước
fn check(n: Int) -> ByteArray {
  when n is {
    0 -> "zero"
    1 -> "one"
    _ -> "other"
  }
}
```

### 3. Forgetting Recursion Base Case

```aiken
// ❌ Sai - infinite recursion
fn sum_bad(xs: List<Int>) -> Int {
  when xs is {
    [head, ..tail] -> head + sum_bad(tail)
    // Missing: [] -> 0
  }
}

// ✅ Đúng
fn sum_good(xs: List<Int>) -> Int {
  when xs is {
    [] -> 0  // Base case
    [head, ..tail] -> head + sum_good(tail)
  }
}
```

### 4. Mutation Expectations

```aiken
// ❌ Sai - expecting mutation
fn update_wrong(user: User) {
  user.age = 30  // Error! Cannot mutate
}

// ✅ Đúng - create new value
fn update_correct(user: User) -> User {
  User { ..user, age: 30 }
}
```

## Error Handling Patterns

### Result Type

```aiken
type Result<a, e> {
  Ok(a)
  Err(e)
}

fn safe_operation(input: Int) -> Result<Int, ByteArray> {
  if input < 0 {
    Err("Negative input not allowed")
  } else {
    Ok(input * 2)
  }
}

fn use_result() {
  when safe_operation(-5) is {
    Ok(value) -> value
    Err(msg) -> {
      trace msg
      0
    }
  }
}
```

### Validation Chain

```aiken
fn validate_all(data: Data) -> Result<Data, ByteArray> {
  validate_step1(data)
    |> and_then(validate_step2)
    |> and_then(validate_step3)
}

fn and_then(result: Result<a, e>, f: fn(a) -> Result<b, e>) -> Result<b, e> {
  when result is {
    Ok(value) -> f(value)
    Err(e) -> Err(e)
  }
}
```

## Checklist Debug

```
┌─────────────────────────────────────────────────────────────┐
│                 DEBUG CHECKLIST                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  □ Đọc kỹ error message                                    │
│  □ Kiểm tra line number trong error                        │
│  □ Thêm trace statements                                   │
│  □ Chạy với --trace-level verbose                          │
│  □ Test từng hàm riêng biệt                                │
│  □ Kiểm tra edge cases                                     │
│  □ Verify types match                                      │
│  □ Check pattern matching exhaustiveness                   │
│  □ Look for off-by-one errors                              │
│  □ Ensure base cases in recursion                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. Đọc error messages cẩn thận - chúng rất hữu ích        │
│  2. Dùng trace và ? operator để debug                      │
│  3. Test edge cases: empty, single, negative, large        │
│  4. Pattern match phải exhaustive                          │
│  5. Recursion cần base case                                │
│  6. Aiken immutable - không mutation                       │
└─────────────────────────────────────────────────────────────┘
```

## Hoàn thành Part 1

Chúc mừng! Bạn đã hoàn thành **Part 1: The Aiken Foundation**. Bạn đã học:

- Cài đặt và sử dụng Aiken CLI
- Cấu trúc dự án và modules
- Biến, hằng số và các kiểu dữ liệu
- Control flow và functions
- Data serialization
- Unit testing và troubleshooting

Tiếp theo, chúng ta sẽ chuyển sang **Part 2: Cardano Architecture** để hiểu cách Aiken tương tác với blockchain Cardano.
