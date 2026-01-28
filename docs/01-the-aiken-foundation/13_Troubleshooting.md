---
title: "13. Xử lý lỗi (Troubleshooting)"
sidebar_position: 13
description: "Học cách debug và xử lý lỗi trong Aiken - Đọc hiểu error messages, common errors và debugging với trace"
---

# Bài 13: Xử lý lỗi (Troubleshooting)

:::info Mục tiêu
Học cách debug và xử lý lỗi trong Aiken
:::

## Bạn sẽ học

- Đọc hiểu error messages
- Common errors và cách fix
- Debugging với trace
- Verbose mode và trace levels
- Best practices để tránh bugs

---

## Aiken Error Messages

Aiken có **error messages rất chi tiết và thân thiện**.

### Cấu trúc Error Message

| Thành phần | Mô tả |
|------------|-------|
| Error code | `err::aiken::check::unknown_record_field` - dùng để search documentation |
| Mô tả vấn đề | "I looked for the field 'foo' but didn't find it." |
| Vị trí lỗi | File, line, column với code snippet |
| Gợi ý fix | "help: Did you mean 'fee'?" |

---

## 1. Common Type Errors

### Unknown Record Field

```
Error: err::aiken::check::unknown_record_field

× I looked for the field 'ammount' in a record of type 'Datum'
  but didn't find it.

help: Did you mean 'amount'?
```

**Fix:** Kiểm tra spelling của field name.

```aiken
// Wrong
datum.ammount

// Correct
datum.amount
```

### Type Mismatch

```
Error: err::aiken::check::type_mismatch

× Expected: Int
  Found: ByteArray
```

**Fix:** Đảm bảo types match.

```aiken
// Wrong
fn add(a: Int, b: Int) -> Int {
  a + "hello"  // ByteArray, không phải Int
}

// Correct
fn add(a: Int, b: Int) -> Int {
  a + b
}
```

### Unknown Variable

```
Error: err::aiken::check::unknown_variable

× I don't know what 'total' refers to.
```

**Fix:** Khai báo biến trước khi sử dụng.

```aiken
// Wrong
fn calculate() -> Int {
  total + 10  // 'total' chưa được khai báo
}

// Correct
fn calculate() -> Int {
  let total = 100
  total + 10
}
```

### Non-Exhaustive Pattern

```
Error: err::aiken::check::non_exhaustive_pattern

× This pattern matching is not exhaustive.
  Missing: None
```

**Fix:** Cover tất cả cases trong when/is.

```aiken
// Wrong - thiếu None case
fn unwrap(opt: Option<Int>) -> Int {
  when opt is {
    Some(x) -> x
    // Missing: None
  }
}

// Correct
fn unwrap(opt: Option<Int>) -> Int {
  when opt is {
    Some(x) -> x
    None -> 0
  }
}
```

---

## 2. Common Runtime Errors

### Expect Failure

```
× Transaction failed because a validator returned False
  or some 'expect' failed.
```

**Causes:**
- `expect` pattern không match
- Validator return `False`

```aiken
// Sẽ fail nếu datum là None
expect Some(d) = datum

// Handle cả None case
when datum is {
  Some(d) -> process(d)
  None -> fail @"No datum provided"
}
```

### Division by Zero

```aiken
// Sẽ fail nếu b == 0
fn divide(a: Int, b: Int) -> Int {
  a / b
}

// Check trước
fn safe_divide(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}
```

### Empty List Access

```aiken
// Sẽ fail nếu list rỗng
expect [first, ..] = my_list

// Check trước
when my_list is {
  [] -> fail @"List is empty"
  [first, ..rest] -> process(first, rest)
}
```

---

## 3. Debugging với Trace

### Basic Trace

```aiken
fn debug_function(x: Int) -> Int {
  trace @"Starting calculation"
  let result = x * 2
  trace @"Calculation done"
  result
}
```

### Trace với Values

```aiken
use aiken/cbor

fn debug_with_value(datum: MyDatum) -> Bool {
  // In ra CBOR diagnostic của datum
  trace cbor.diagnostic(datum)

  let owner = datum.owner
  trace cbor.diagnostic(owner)

  owner == expected_owner
}
```

### Conditional Trace

```aiken
fn debug_conditional(amount: Int) -> Bool {
  if amount < 0 {
    trace @"WARNING: Negative amount detected!"
    fail @"Amount must be positive"
  } else {
    True
  }
}
```

---

## 4. Verbose Mode

### Running Tests with Traces

```bash
# Normal mode - traces ẩn
aiken check

# Verbose mode - hiện traces
aiken check --trace-level verbose

# Compact trace
aiken check --trace-level compact
```

### Trace Levels

| Level | Description |
|-------|-------------|
| `silent` | Không trace nào được hiện |
| `compact` | Chỉ traces từ failed tests |
| `verbose` | Tất cả traces |

### Example Output

```
┍━ my_module ━━━━━━━━━━━━━━━━━━━━━━━━
│ PASS [mem: 5099, cpu: 1884852] test_positive
│ · with traces
│ | Starting calculation
│ | amount = 100
│ | Calculation done
│ FAIL [mem: 6000, cpu: 2000000] test_negative
│ · with traces
│ | Starting calculation
│ | WARNING: Negative amount detected!
┕━━━━━━━━━━━━━━ 2 tests | 1 passed | 1 failed
```

---

## 5. Common Build Errors

### Import Not Found

```
Error: err::aiken::check::unknown_module

× I couldn't find a module named 'my_project/helpers'.
```

**Fix:** Kiểm tra:
1. File tồn tại trong đúng thư mục
2. Module path match với folder structure
3. File có extension `.ak`

```
lib/
└── my_project/
    └── helpers.ak  ← File phải ở đây cho 'my_project/helpers'
```

### Duplicate Definition

```
Error: err::aiken::check::duplicate_definition

× The name 'process' is already defined in this module.
```

**Fix:** Rename một trong hai definitions.

```aiken
// Wrong
fn process(x: Int) -> Int { x }
fn process(x: ByteArray) -> ByteArray { x }  // Duplicate!

// Correct
fn process_int(x: Int) -> Int { x }
fn process_bytes(x: ByteArray) -> ByteArray { x }
```

### Cyclic Dependency

```
Error: err::aiken::check::cyclic_module_dependency

× Module 'a' imports 'b' which imports 'a'.
```

**Fix:** Restructure modules để tránh circular imports.

```aiken
// Wrong
// a.ak
use b
// b.ak
use a  // Circular!

// Correct - extract shared code
// common.ak - shared types/functions
// a.ak - uses common
// b.ak - uses common
```

---

## 6. Validator-Specific Errors

### Script Size Too Large

```
× The script exceeds the maximum size limit.
```

**Fix:**
1. Optimize code
2. Move logic off-chain
3. Split into multiple validators

```aiken
// Large validator với nhiều logic
validator huge {
  spend(...) {
    // Nhiều complex logic
  }
}

// Split thành nhỏ hơn
validator main {
  spend(...) {
    // Minimal on-chain logic
    check_signature(ctx) && check_deadline(ctx)
  }
}

// Complex logic trong lib modules, được inline khi build
```

### Budget Exceeded

```
× Transaction exceeds execution budget.
  Memory: 14000000 / 10000000
  CPU: 10000000000 / 10000000000
```

**Fix:**
1. Optimize algorithms
2. Reduce data processed on-chain
3. Use more efficient data structures

```aiken
// Expensive - O(n) list search
fn find_in_list(items: List<Int>, target: Int) -> Bool {
  list.has(items, target)
}

// Cheaper - sử dụng sorted list + binary search
// hoặc move lookup off-chain
```

---

## 7. Debug Techniques

### 1. Isolate the Problem

```aiken
// Tạo test nhỏ cho từng phần
test debug_step_1() {
  let datum = create_datum()
  datum.amount > 0  // Test datum creation
}

test debug_step_2() {
  let datum = create_datum()
  let redeemer = create_redeemer()
  validate_redeemer(redeemer)  // Test redeemer
}

test debug_step_3() {
  let datum = create_datum()
  let redeemer = create_redeemer()
  process(datum, redeemer)  // Test combination
}
```

### 2. Add Traces at Key Points

```aiken
fn complex_validation(datum: Datum, ctx: Context) -> Bool {
  trace @"Step 1: Checking owner"
  let owner_ok = check_owner(datum, ctx)
  trace cbor.diagnostic(owner_ok)

  trace @"Step 2: Checking amount"
  let amount_ok = check_amount(datum)
  trace cbor.diagnostic(amount_ok)

  trace @"Step 3: Checking deadline"
  let deadline_ok = check_deadline(datum, ctx)
  trace cbor.diagnostic(deadline_ok)

  owner_ok && amount_ok && deadline_ok
}
```

### 3. Use fail with Message

```aiken
fn validate(datum: Datum, redeemer: Redeemer) -> Bool {
  if datum.amount <= 0 {
    fail @"Invalid amount: must be positive"
  } else if datum.deadline < 0 {
    fail @"Invalid deadline: must be non-negative"
  } else {
    True
  }
}
```

---

## 8. Best Practices

### NÊN làm (Prevent Bugs)

```aiken
// 1. Use strong types
pub type Amount = Int  // Type alias cho clarity

pub opaque type PositiveInt {
  value: Int,
}

pub fn positive(n: Int) -> Option<PositiveInt> {
  if n > 0 {
    Some(PositiveInt { value: n })
  } else {
    None
  }
}

// 2. Validate early
pub fn process(amount: Int) -> Bool {
  // Validate at entry point
  expect amount > 0
  expect amount < 1000000000

  // Rest of logic
  True
}

// 3. Use Option/Result thay vì expect
pub fn safe_get(items: List<Int>, index: Int) -> Option<Int> {
  list.at(items, index)
}

// 4. Write tests for edge cases
test handle_empty_list() {
  safe_get([], 0) == None
}

test handle_negative_index() {
  safe_get([1, 2, 3], -1) == None
}
```

### KHÔNG NÊN làm (Avoid Common Pitfalls)

```aiken
// 1. Không assume data structure
// Wrong
expect [a, b, c] = my_list  // Fails nếu không đúng 3 elements

// Correct
when my_list is {
  [a, b, c] -> process(a, b, c)
  _ -> fail @"Expected exactly 3 elements"
}

// 2. Không ignore errors
// Wrong
let _ = potentially_failing_op()

// Correct
when potentially_failing_op() is {
  Ok(result) -> use(result)
  Err(e) -> handle_error(e)
}

// 3. Không hardcode values
// Wrong
fn validate(pkh: ByteArray) -> Bool {
  pkh == #"abc123..."  // Hardcoded!
}

// Correct
fn validate(pkh: ByteArray, expected: ByteArray) -> Bool {
  pkh == expected
}
```

---

## Troubleshooting Checklist

:::tip Debug Checklist
- [ ] Đọc kỹ error message
- [ ] Check line number được báo
- [ ] Verify types match
- [ ] Check spelling (typos)
- [ ] Verify imports correct
- [ ] Run với `--trace-level verbose`
- [ ] Add traces tại key points
- [ ] Tạo minimal test case
- [ ] Check edge cases (empty, None, 0, negative)
- [ ] Verify pattern matching exhaustive
:::

---

## Tổng kết

| Chủ đề | Chi tiết |
|--------|----------|
| **Error Messages** | Đọc error code, check vị trí lỗi, theo gợi ý "help:" |
| **Debugging** | `trace @"message"`, `trace cbor.diagnostic(value)`, `aiken check --trace-level verbose` |
| **Prevention** | Strong typing, Early validation, Comprehensive tests, Handle all cases in when/is |

---

## Hoàn thành Part 1!

Chúc mừng bạn đã hoàn thành **Part 1: Foundation**!

Bạn đã học:
- Cài đặt và cấu hình Aiken
- Hiểu cấu trúc dự án
- Các kiểu dữ liệu cơ bản và nâng cao
- Control flow và functions
- Module system
- Testing và debugging

---

## Tiếp theo

[Part 2: Kiến trúc Cardano](../02-cardano-architecture/index.md)
