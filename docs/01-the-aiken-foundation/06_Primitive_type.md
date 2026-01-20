---
title: "06. Kiểu Dữ Liệu Nguyên Thuỷ"
sidebar_position: 6
description: "Hiểu và sử dụng thành thạo các kiểu dữ liệu cơ bản trong Aiken"
---

# Bài 06: Kiểu Dữ Liệu Nguyên Thuỷ (Primitive Types)

> **Mục tiêu:** Hiểu và sử dụng thành thạo các kiểu dữ liệu cơ bản trong Aiken

---

## Tổng quan

Aiken có **6 kiểu dữ liệu nguyên thuỷ** và một số kiểu **compound types**:

**Primitives:**

| Kiểu | Mô tả |
|------|-------|
| Int | Số nguyên không giới hạn |
| ByteArray | Mảng byte (strings, hashes, addresses) |
| Bool | Boolean (True/False) |
| String | Chuỗi cho diagnostic (@"...") |
| Data | Dynamic type |
| Void | Kiểu rỗng |

**Compound Types:**

| Kiểu | Mô tả |
|------|-------|
| List | Danh sách |
| Tuple | Bộ giá trị |
| Pair | Cặp đặc biệt |
| Option | Giá trị có thể null |

---

## 1. Int (Số nguyên)

### Đặc điểm

- **Arbitrary precision** - không giới hạn kích thước
- Hỗ trợ cả số âm và số dương
- Có thể dùng `_` làm separator cho readability

```aiken
// Số nguyên cơ bản
let small = 42
let negative = -100
let big = 1_000_000_000_000

// Lưu ý: KHÔNG có Int8, Int32, Int64 như các ngôn ngữ khác
// Aiken sử dụng arbitrary-precision integers
```

### Phép toán số học

```aiken
let a = 10
let b = 3

// Phép toán cơ bản
let sum = a + b         // 13
let diff = a - b        // 7
let product = a * b     // 30
let quotient = a / b    // 3 (integer division)
let remainder = a % b   // 1 (modulo)

// So sánh
let is_equal = a == b       // False
let is_greater = a > b      // True
let is_less = a < b         // False
let is_gte = a >= b         // True
let is_lte = a <= b         // False
```

### Ví dụ thực tế

```aiken
/// Tính phí giao dịch
fn calculate_fee(amount: Int, fee_percent: Int) -> Int {
  amount * fee_percent / 100
}

/// Kiểm tra số chẵn
fn is_even(n: Int) -> Bool {
  n % 2 == 0
}

/// Tính luỹ thừa (đơn giản)
fn power(base: Int, exp: Int) -> Int {
  if exp == 0 {
    1
  } else {
    base * power(base, exp - 1)
  }
}
```

---

## 2. ByteArray (Mảng byte)

### Đặc điểm

- Dùng cho strings, hashes, public keys, addresses
- Có thể khởi tạo bằng nhiều cách
- **Đây là kiểu được dùng nhiều nhất** trong smart contracts

```aiken
// String literal (UTF-8 encoded)
let name: ByteArray = "Hello, World!"

// Hex literal (bắt đầu bằng #)
let hash: ByteArray = #"deadbeef"
let pubkey: ByteArray = #"abcd1234567890"

// Empty bytearray
let empty: ByteArray = ""
let empty_hex: ByteArray = #""
```

### Các phép toán

```aiken
use aiken/primitive/bytearray

let a = "Hello"
let b = " World"

// Concatenate (nối)
let greeting = bytearray.concat(a, b)  // "Hello World"

// Length
let len = bytearray.length(a)  // 5

// So sánh
let same = a == "Hello"  // True

// Slice (cắt)
let sub = bytearray.slice(a, 0, 3)  // "Hel"

// Index (lấy byte tại vị trí)
let first_byte = bytearray.at(a, 0)  // Some(72) - ASCII của 'H'
```

### Ví dụ: Kiểm tra signature

```aiken
/// Kiểm tra xem một public key có trong danh sách signatories không
fn is_signed_by(signatories: List<ByteArray>, pubkey: ByteArray) -> Bool {
  list.has(signatories, pubkey)
}
```

---

## 3. Bool (Boolean)

### Đặc điểm

- Chỉ có 2 giá trị: `True` và `False`
- **Lưu ý**: Viết hoa chữ cái đầu!

```aiken
let is_valid = True
let is_empty = False

// Boolean operators
let and_result = True && False  // False
let or_result = True || False   // True
let not_result = !True          // False

// Short-circuit evaluation
let result = False && expensive_check()  // expensive_check() không được gọi
```

### Chained comparisons

```aiken
// ✅ Cách viết đẹp
fn is_in_range(x: Int, min: Int, max: Int) -> Bool {
  x >= min && x <= max
}

// Alternative với and/or blocks
fn validate(a: Bool, b: Bool, c: Bool) -> Bool {
  // Thay vì: a && b || c
  or {
    and {
      a,
      b,
    },
    c,
  }
}
```

---

## 4. String (Chuỗi - @"...")

### Đặc điểm

- Dùng cho **diagnostic messages** (trace, error messages)
- **Không nên dùng** trong validator logic - tốn chi phí
- Syntax: `@"string content"`

```aiken
// String type (cho traces/errors)
let message: String = @"This is for debugging"

// Trace để debug
fn my_function(x: Int) -> Int {
  trace @"Entering my_function"
  x + 1
}
```

### So sánh String vs ByteArray

| Đặc điểm | String | ByteArray |
|----------|--------|-----------|
| Syntax | @"hello" | "hello" hoặc #"..." |
| Mục đích | Debug/trace | Data thực tế |
| On-chain cost | Cao (nếu trace) | Thấp |
| Sử dụng | Ít | Nhiều |

---

## 5. Data (Dynamic type)

### Đặc điểm

- **Opaque type** - có thể chứa bất kỳ serializable value nào
- Dùng cho datum và redeemer generic
- Type-safe downcasting với `expect`

```aiken
// Upcast - tự động (implicit)
let x: Data = 42
let y: Data = "hello"
let z: Data = [1, 2, 3]

// Downcast - cần expect
fn from_data(data: Data) -> Int {
  expect value: Int = data
  value
}
```

### Ví dụ thực tế

```aiken
type MyDatum {
  owner: ByteArray,
  deadline: Int,
}

fn parse_datum(raw: Data) -> MyDatum {
  expect datum: MyDatum = raw
  datum
}
```

---

## 6. Void (Kiểu rỗng)

### Đặc điểm

- Đại diện cho **absence of value**
- Tương tự `()` trong Rust hoặc `unit` trong functional languages
- Ít khi dùng trực tiếp

```aiken
// Void có một giá trị duy nhất: Void
let nothing: Void = Void

// Thường dùng cho functions không return gì có ý nghĩa
fn log_something() -> Void {
  trace @"Something happened"
  Void
}
```

---

## Compound Types

### List (Danh sách)

```aiken
// List of integers
let numbers: List<Int> = [1, 2, 3, 4, 5]

// Empty list
let empty: List<Int> = []

// List operations
use aiken/collection/list

let first = list.head(numbers)      // Some(1)
let rest = list.tail(numbers)       // Some([2, 3, 4, 5])
let len = list.length(numbers)      // 5
let has_3 = list.has(numbers, 3)    // True

// Map
let doubled = list.map(numbers, fn(x) { x * 2 })  // [2, 4, 6, 8, 10]

// Filter
let evens = list.filter(numbers, fn(x) { x % 2 == 0 })  // [2, 4]

// Fold (reduce)
let sum = list.foldl(numbers, 0, fn(acc, x) { acc + x })  // 15
```

### Tuple (Bộ giá trị)

```aiken
// Tuple với 2 phần tử
let pair: (Int, ByteArray) = (42, "answer")

// Tuple với 3 phần tử
let triple: (Int, ByteArray, Bool) = (1, "test", True)

// Access bằng pattern matching
let (num, text) = pair
// num = 42
// text = "answer"

// Access bằng ordinals
let first = pair.1st   // 42
let second = pair.2nd  // "answer"
```

### Pair (Cặp đặc biệt)

```aiken
// Pair type - tương tự 2-tuple nhưng khác encoding
let my_pair: Pair<Int, ByteArray> = Pair(42, "hello")

// Access
let key = my_pair.1st
let value = my_pair.2nd

// Dùng trong Dict (dictionary)
use aiken/collection/dict
let my_dict = dict.from_pairs([Pair("a", 1), Pair("b", 2)])
```

### Option (Giá trị có thể null)

```aiken
// Option type - Some hoặc None
type Option<a> {
  None
  Some(a)
}

// Sử dụng
fn safe_divide(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}

// Pattern match
fn handle_option(opt: Option<Int>) -> Int {
  when opt is {
    None -> 0
    Some(value) -> value
  }
}
```

---

## Code Examples

### main.ak

```aiken
// lib/primitive_types/main.ak

use aiken/collection/list
use aiken/primitive/bytearray

/// Tính tổng các số trong list
pub fn sum_list(numbers: List<Int>) -> Int {
  list.foldl(numbers, 0, fn(acc, x) { acc + x })
}

/// Kiểm tra địa chỉ hợp lệ (độ dài = 56 hex chars = 28 bytes)
pub fn is_valid_address(addr: ByteArray) -> Bool {
  bytearray.length(addr) == 28
}

/// Safe division với Option
pub fn safe_div(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}

/// Lấy phần tử đầu tiên thoả điều kiện
pub fn find_first_even(numbers: List<Int>) -> Option<Int> {
  list.find(numbers, fn(x) { x % 2 == 0 })
}

/// Đếm số True trong list
pub fn count_true(flags: List<Bool>) -> Int {
  list.foldl(flags, 0, fn(acc, flag) {
    if flag { acc + 1 } else { acc }
  })
}

/// Concat nhiều ByteArrays
pub fn join_bytearrays(items: List<ByteArray>, separator: ByteArray) -> ByteArray {
  when items is {
    [] -> ""
    [x] -> x
    [x, ..rest] ->
      bytearray.concat(
        bytearray.concat(x, separator),
        join_bytearrays(rest, separator)
      )
  }
}

/// Validate range
pub fn in_range(value: Int, min: Int, max: Int) -> Bool {
  value >= min && value <= max
}
```

### test.ak

```aiken
// lib/primitive_types/test.ak

use primitive_types/main.{
  sum_list,
  is_valid_address,
  safe_div,
  find_first_even,
  count_true,
  join_bytearrays,
  in_range,
}

// ===== Int Tests =====

test sum_list_basic() {
  sum_list([1, 2, 3, 4, 5]) == 15
}

test sum_list_empty() {
  sum_list([]) == 0
}

test sum_list_negative() {
  sum_list([-1, -2, 3]) == 0
}

// ===== ByteArray Tests =====

test valid_address_correct_length() {
  // 28 bytes = 56 hex characters
  let addr = #"0123456789abcdef0123456789abcdef0123456789abcdef01234567"
  is_valid_address(addr) == True
}

test valid_address_too_short() {
  let addr = #"0123456789"
  is_valid_address(addr) == False
}

test join_bytearrays_basic() {
  let items = ["a", "b", "c"]
  join_bytearrays(items, ",") == "a,b,c"
}

test join_bytearrays_empty() {
  join_bytearrays([], ",") == ""
}

test join_bytearrays_single() {
  join_bytearrays(["hello"], ",") == "hello"
}

// ===== Bool Tests =====

test count_true_mixed() {
  count_true([True, False, True, True, False]) == 3
}

test count_true_all_true() {
  count_true([True, True, True]) == 3
}

test count_true_all_false() {
  count_true([False, False]) == 0
}

// ===== Option Tests =====

test safe_div_normal() {
  safe_div(10, 2) == Some(5)
}

test safe_div_by_zero() {
  safe_div(10, 0) == None
}

test find_first_even_found() {
  find_first_even([1, 3, 4, 5, 6]) == Some(4)
}

test find_first_even_not_found() {
  find_first_even([1, 3, 5, 7]) == None
}

// ===== Range Tests =====

test in_range_inside() {
  in_range(50, 0, 100) == True
}

test in_range_at_min() {
  in_range(0, 0, 100) == True
}

test in_range_at_max() {
  in_range(100, 0, 100) == True
}

test in_range_below() {
  in_range(-1, 0, 100) == False
}

test in_range_above() {
  in_range(101, 0, 100) == False
}
```

---

## Type Summary Chart

| Type | Example | Usage |
|------|---------|-------|
| Int | 42, -100, 1_000 | Amounts, counts, timestamps |
| ByteArray | "hello", #"cafe" | Addresses, hashes, names |
| Bool | True, False | Flags, conditions |
| String | @"debug msg" | Traces, error messages |
| Data | (any value) | Generic datum/redeemer |
| Void | Void | No meaningful return |
| List\<a\> | [1, 2, 3] | Collections |
| (a, b) | (1, "hi") | Multiple values |
| Option\<a\> | Some(1), None | Nullable values |

---

## Checklist hoàn thành

- [ ] Hiểu và sử dụng được Int với các phép toán
- [ ] Phân biệt ByteArray và String
- [ ] Sử dụng Bool và boolean operators
- [ ] Hiểu Data type và downcasting
- [ ] Làm việc với List, Tuple, Option
- [ ] Viết tests cho các function

---

➡️ **Tiếp theo**: [Bài 07 - Custom Types](./07_Custom_type.md)
