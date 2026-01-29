---
title: "08. Luồng Điều Khiển (Control Flow)"
sidebar_position: 8
description: "Thành thạo các cấu trúc điều khiển trong Aiken: if/else, when/is pattern matching, và các kỹ thuật xử lý logic phức tạp."
---

# Luồng Điều Khiển (Control Flow)

:::info Mục tiêu
Thành thạo các cấu trúc điều khiển trong Aiken: if/else, when/is pattern matching, và các kỹ thuật xử lý logic phức tạp.
:::

---

## Mục Lục

1. [Tổng quan Control Flow](#1-tổng-quan-control-flow)
2. [If/Else Expression](#2-ifelse-expression)
3. [When/Is Pattern Matching](#3-whenis-pattern-matching)
4. [Pattern Matching nâng cao](#4-pattern-matching-nâng-cao)
5. [Guards và Conditions](#5-guards-và-conditions)
6. [Kết hợp patterns](#6-kết-hợp-patterns)
7. [Best Practices](#7-best-practices)

---

## 1. Tổng Quan Control Flow

### Control Flow trong Functional Programming

| Khía cạnh | Imperative (Java, Python) | Functional (Aiken) |
|-----------|---------------------------|-------------------|
| Điều kiện | `if (x > 0) { return "positive"; } else { return "non-positive"; }` | `if x > 0 { "positive" } else { "non-positive" }` |
| Switch/Case | `switch (action) { case "buy": ... case "sell": ... }` | `when action is { Buy -> ... Sell -> ... }` |

:::warning Quan trọng
- Mọi expression đều trả về giá trị
- Không có "statements", chỉ có "expressions"
- Pattern matching thay thế switch/case
:::

### So sánh các cấu trúc

| Cấu trúc | Khi nào dùng | Ví dụ |
|----------|--------------|-------|
| `if/else` | Điều kiện Boolean đơn giản | `if x > 0 { ... } else { ... }` |
| `when/is` | Pattern matching trên types | `when action is { Buy -> ... }` |
| Guards | Điều kiện phức tạp trong patterns | `when x is { n if n > 0 -> ... }` |

---

## 2. If/Else Expression

### Cú pháp cơ bản

```aiken
// If/else là EXPRESSION - luôn trả về giá trị
let result = if condition {
  value_if_true
} else {
  value_if_false
}
```

### Ví dụ chi tiết

```aiken
/// Kiểm tra số dương
fn check_positive(n: Int) -> String {
  if n > 0 {
    "Positive"
  } else if n < 0 {
    "Negative"
  } else {
    "Zero"
  }
}

/// Tính giá trị tuyệt đối
fn abs(n: Int) -> Int {
  if n >= 0 {
    n
  } else {
    -n
  }
}

/// Tìm số lớn nhất
fn max(a: Int, b: Int) -> Int {
  if a > b { a } else { b }
}

/// Tìm số nhỏ nhất trong 3 số
fn min3(a: Int, b: Int, c: Int) -> Int {
  if a <= b && a <= c {
    a
  } else if b <= c {
    b
  } else {
    c
  }
}
```

### Quy tắc quan trọng

| Quy tắc | Đúng | Sai |
|---------|------|-----|
| Phải có else branch | `if x > 0 { "yes" } else { "no" }` | `if x > 0 { "yes" }` (Lỗi: thiếu else) |
| Cả hai branch phải cùng type | `if x > 0 { 1 } else { 0 }` (Cả hai là Int) | `if x > 0 { 1 } else { "zero" }` (Int vs String) |
| Condition phải là Bool | `if x > 0 { ... }` (x > 0 là Bool) | `if x { ... }` (x phải là Bool) |
| Nên dùng when/is cho enum types | `when option is { Some(x) -> x, None -> 0 }` | `if option == Some(1) { ... }` (Ít rõ ràng) |

### Nested if/else

```aiken
/// Phân loại điểm số
fn grade(score: Int) -> String {
  if score >= 90 {
    "A"
  } else if score >= 80 {
    "B"
  } else if score >= 70 {
    "C"
  } else if score >= 60 {
    "D"
  } else {
    "F"
  }
}

/// Kiểm tra năm nhuận
fn is_leap_year(year: Int) -> Bool {
  if year % 400 == 0 {
    True
  } else if year % 100 == 0 {
    False
  } else if year % 4 == 0 {
    True
  } else {
    False
  }
}
```

---

## 3. When/Is Pattern Matching

### Cú pháp cơ bản

```aiken
when value is {
  pattern1 -> expression1
  pattern2 -> expression2
  _ -> default_expression  // Wildcard pattern
}
```

### Pattern Matching với Enum Types

```aiken
/// Action type cho trading
type TradeAction {
  Buy { amount: Int, price: Int }
  Sell { amount: Int, price: Int }
  Hold
  Cancel { reason: String }
}

/// Xử lý trade action
fn process_trade(action: TradeAction) -> String {
  when action is {
    Buy { amount, price } -> {
      let total = amount * price
      "Buying for total: " // Trong thực tế sẽ format số
    }
    Sell { amount, price } -> {
      let total = amount * price
      "Selling for total: "
    }
    Hold -> "Holding position"
    Cancel { reason } -> reason
  }
}

/// Tính phí giao dịch
fn calculate_fee(action: TradeAction) -> Int {
  when action is {
    Buy { amount, .. } -> amount * 1 / 100  // 1% phí mua
    Sell { amount, .. } -> amount * 2 / 100 // 2% phí bán
    Hold -> 0
    Cancel { .. } -> 50  // Phí hủy cố định
  }
}
```

### Pattern Matching với Primitive Types

```aiken
/// Chuyển số thành chữ
fn number_to_word(n: Int) -> String {
  when n is {
    0 -> "zero"
    1 -> "one"
    2 -> "two"
    3 -> "three"
    _ -> "many"
  }
}

/// Kiểm tra ngày trong tuần
fn is_weekend(day: Int) -> Bool {
  when day is {
    6 -> True   // Saturday
    7 -> True   // Sunday
    _ -> False
  }
}
```

### Pattern Matching với Option

```aiken
use aiken/option

/// Safe division với Option
fn safe_divide(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}

/// Xử lý kết quả Option
fn process_division(a: Int, b: Int) -> Int {
  when safe_divide(a, b) is {
    Some(result) -> result
    None -> 0  // Default value khi chia cho 0
  }
}

/// Unwrap với default
fn unwrap_or_default(opt: Option<Int>, default: Int) -> Int {
  when opt is {
    Some(value) -> value
    None -> default
  }
}
```

### Pattern Matching với List

```aiken
/// Lấy phần tử đầu tiên
fn head(list: List<a>) -> Option<a> {
  when list is {
    [] -> None
    [first, ..] -> Some(first)
  }
}

/// Lấy phần còn lại (tail)
fn tail(list: List<a>) -> List<a> {
  when list is {
    [] -> []
    [_, ..rest] -> rest
  }
}

/// Kiểm tra độ dài
fn length_category(list: List<a>) -> String {
  when list is {
    [] -> "empty"
    [_] -> "single"
    [_, _] -> "pair"
    [_, _, _] -> "triple"
    _ -> "many"
  }
}

/// Tính tổng list
fn sum(list: List<Int>) -> Int {
  when list is {
    [] -> 0
    [first, ..rest] -> first + sum(rest)
  }
}
```

### Pattern Matching với Tuple

```aiken
/// So sánh hai số
fn compare(pair: (Int, Int)) -> String {
  when pair is {
    (a, b) if a > b -> "first is greater"
    (a, b) if a < b -> "second is greater"
    (_, _) -> "equal"
  }
}

/// Xử lý coordinates
fn quadrant(point: (Int, Int)) -> String {
  when point is {
    (0, 0) -> "origin"
    (x, 0) if x > 0 -> "positive x-axis"
    (x, 0) if x < 0 -> "negative x-axis"
    (0, y) if y > 0 -> "positive y-axis"
    (0, y) if y < 0 -> "negative y-axis"
    (x, y) if x > 0 && y > 0 -> "quadrant I"
    (x, y) if x < 0 && y > 0 -> "quadrant II"
    (x, y) if x < 0 && y < 0 -> "quadrant III"
    (_, _) -> "quadrant IV"
  }
}
```

---

## 4. Pattern Matching Nâng Cao

### Destructuring trong Patterns

```aiken
/// Nested type
type Order {
  order_id: Int,
  customer: Customer,
  items: List<Item>,
}

type Customer {
  name: ByteArray,
  address: Address,
}

type Address {
  city: ByteArray,
  country: ByteArray,
}

type Item {
  product_id: Int,
  quantity: Int,
  price: Int,
}

/// Deep destructuring
fn get_customer_city(order: Order) -> ByteArray {
  let Order { customer: Customer { address: Address { city, .. }, .. }, .. } = order
  city
}

/// Với when/is
fn process_order(order: Order) -> Int {
  when order is {
    Order { items: [], .. } -> 0  // Empty order
    Order { items: [single_item], .. } -> single_item.price * single_item.quantity
    Order { items, .. } -> calculate_total(items)
  }
}

fn calculate_total(items: List<Item>) -> Int {
  when items is {
    [] -> 0
    [Item { quantity, price, .. }, ..rest] ->
      quantity * price + calculate_total(rest)
  }
}
```

### As Patterns (Alias)

```aiken
/// Giữ reference đến toàn bộ value
fn process_with_original(opt: Option<Int>) -> (Option<Int>, Int) {
  when opt is {
    Some(n) as original -> (original, n * 2)
    None as original -> (original, 0)
  }
}

/// Hữu ích khi cần cả destructured parts và whole value
type Transaction {
  sender: ByteArray,
  receiver: ByteArray,
  amount: Int,
}

fn validate_and_log(tx: Transaction) -> Bool {
  when tx is {
    Transaction { amount, .. } as full_tx if amount > 0 -> {
      // Có thể dùng cả `amount` và `full_tx`
      trace @"Processing valid transaction"
      True
    }
    _ -> False
  }
}
```

### Or Patterns

```aiken
/// Nhóm nhiều patterns
fn is_vowel(char: Int) -> Bool {
  // Giả sử char là ASCII code
  when char is {
    97 | 101 | 105 | 111 | 117 -> True  // a, e, i, o, u
    65 | 69 | 73 | 79 | 85 -> True      // A, E, I, O, U
    _ -> False
  }
}

/// Với enum types
type Status {
  Pending
  Processing
  Completed
  Failed
  Cancelled
}

fn is_final_status(status: Status) -> Bool {
  when status is {
    Completed | Failed | Cancelled -> True
    Pending | Processing -> False
  }
}

fn is_active(status: Status) -> Bool {
  when status is {
    Pending | Processing -> True
    _ -> False
  }
}
```

---

## 5. Guards và Conditions

### Guard Clauses

```aiken
/// Guards cho điều kiện phức tạp
fn categorize_age(age: Int) -> String {
  when age is {
    n if n < 0 -> "invalid"
    n if n < 13 -> "child"
    n if n < 20 -> "teenager"
    n if n < 60 -> "adult"
    _ -> "senior"
  }
}

/// Multiple conditions trong guard
fn shipping_cost(weight: Int, distance: Int) -> Int {
  when (weight, distance) is {
    (w, d) if w <= 0 || d <= 0 -> 0
    (w, d) if w <= 1000 && d <= 100 -> 50
    (w, d) if w <= 1000 -> 100
    (w, d) if d <= 100 -> 150
    _ -> 200
  }
}
```

### Combining Patterns với Guards

```aiken
type PaymentMethod {
  Cash { amount: Int }
  Card { card_number: ByteArray, amount: Int }
  Crypto { token: ByteArray, amount: Int }
}

fn process_payment(payment: PaymentMethod, required: Int) -> Bool {
  when payment is {
    // Đủ tiền mặt
    Cash { amount } if amount >= required -> True

    // Card với số hợp lệ và đủ tiền
    Card { card_number, amount }
      if builtin.length_of_bytearray(card_number) == 16 && amount >= required -> True

    // Crypto (giả sử có premium 10%)
    Crypto { amount, .. } if amount >= required * 110 / 100 -> True

    // Tất cả trường hợp khác
    _ -> False
  }
}
```

### Short-circuit Evaluation

```aiken
/// Guards được evaluate từ trên xuống
fn validate_transaction(amount: Int, balance: Int, limit: Int) -> String {
  when (amount, balance, limit) is {
    // Check theo thứ tự ưu tiên
    (a, _, _) if a <= 0 -> "Invalid amount"
    (a, b, _) if a > b -> "Insufficient balance"
    (a, _, l) if a > l -> "Exceeds daily limit"
    _ -> "Valid"
  }
}
```

---

## 6. Kết Hợp Patterns

### Real-world Examples

```aiken
/// Validator redeemer pattern
type VestingRedeemer {
  Claim
  Cancel
  Extend { new_deadline: Int }
}

type VestingDatum {
  owner: ByteArray,
  beneficiary: ByteArray,
  deadline: Int,
  amount: Int,
}

fn validate_vesting_action(
  datum: VestingDatum,
  redeemer: VestingRedeemer,
  current_time: Int,
  signatories: List<ByteArray>,
) -> Bool {
  when redeemer is {
    // Claim: beneficiary signs, past deadline
    Claim -> {
      let VestingDatum { beneficiary, deadline, .. } = datum
      let signed = list.has(signatories, beneficiary)
      let past_deadline = current_time > deadline
      signed && past_deadline
    }

    // Cancel: owner signs, before deadline
    Cancel -> {
      let VestingDatum { owner, deadline, .. } = datum
      let signed = list.has(signatories, owner)
      let before_deadline = current_time < deadline
      signed && before_deadline
    }

    // Extend: owner signs, new deadline > current deadline
    Extend { new_deadline } -> {
      let VestingDatum { owner, deadline, .. } = datum
      let signed = list.has(signatories, owner)
      let valid_extension = new_deadline > deadline
      signed && valid_extension
    }
  }
}
```

### Chaining Pattern Matches

```aiken
/// Multi-step validation
type InputValidation {
  Valid { value: Int }
  InvalidFormat
  OutOfRange
  Empty
}

fn validate_input(input: Option<ByteArray>) -> InputValidation {
  when input is {
    None -> Empty
    Some(bytes) -> {
      when parse_int(bytes) is {
        None -> InvalidFormat
        Some(n) if n < 0 || n > 1000 -> OutOfRange
        Some(n) -> Valid { value: n }
      }
    }
  }
}

// Helper function (simplified)
fn parse_int(bytes: ByteArray) -> Option<Int> {
  // Simplified: just check if it's a valid number representation
  if builtin.length_of_bytearray(bytes) > 0 {
    Some(1) // Placeholder
  } else {
    None
  }
}
```

### State Machine Pattern

```aiken
/// Order state machine
type OrderState {
  Created
  Paid { amount: Int }
  Shipped { tracking: ByteArray }
  Delivered
  Refunded
}

type OrderAction {
  Pay { amount: Int }
  Ship { tracking: ByteArray }
  Deliver
  Refund
}

/// State transitions
fn transition(state: OrderState, action: OrderAction) -> Option<OrderState> {
  when (state, action) is {
    // Created -> Paid
    (Created, Pay { amount }) if amount > 0 ->
      Some(Paid { amount })

    // Paid -> Shipped
    (Paid { .. }, Ship { tracking }) ->
      Some(Shipped { tracking })

    // Shipped -> Delivered
    (Shipped { .. }, Deliver) ->
      Some(Delivered)

    // Paid -> Refunded (before shipping)
    (Paid { .. }, Refund) ->
      Some(Refunded)

    // Invalid transitions
    _ -> None
  }
}

/// Check if action is valid
fn can_transition(state: OrderState, action: OrderAction) -> Bool {
  when transition(state, action) is {
    Some(_) -> True
    None -> False
  }
}
```

---

## 7. Best Practices

### Do's và Don'ts

**Nên làm:**

- Dùng when/is cho enum types thay vì if/else chains
- Xử lý tất cả cases (exhaustive matching)
- Đặt specific patterns trước, general patterns sau
- Dùng guards cho điều kiện phức tạp
- Sử dụng destructuring để extract data
- Dùng `_` cho values không cần

**Không nên làm:**

- Không dùng if/else dài cho enums
- Không quên case (non-exhaustive match)
- Không đặt `_` wildcard đầu tiên (unreachable patterns)
- Không nested when quá sâu (khó đọc)
- Không duplicate logic giữa các branches

### Pattern Order

```aiken
// GOOD: Specific to general
fn process(value: Option<Int>) -> Int {
  when value is {
    Some(0) -> 0           // Most specific
    Some(n) if n < 0 -> -1 // Specific with guard
    Some(n) -> n           // General Some
    None -> 0              // None case
  }
}

// BAD: General before specific (unreachable code)
fn process_bad(value: Option<Int>) -> Int {
  when value is {
    Some(n) -> n           // This catches everything!
    Some(0) -> 0           // Unreachable!
    None -> 0
  }
}
```

### Exhaustiveness

```aiken
type Color {
  Red
  Green
  Blue
}

// GOOD: All cases covered
fn color_code(c: Color) -> Int {
  when c is {
    Red -> 1
    Green -> 2
    Blue -> 3
  }
}

// WARNING: Using wildcard hides missing cases
fn color_code_risky(c: Color) -> Int {
  when c is {
    Red -> 1
    _ -> 0  // Nếu thêm Yellow sau, sẽ không có warning!
  }
}
```

---

## Tài Liệu Tham Khảo

- [Aiken Language Tour - Control Flow](https://aiken-lang.org/language-tour/control-flow)
- [Pattern Matching in Aiken](https://aiken-lang.org/language-tour/custom-types#pattern-matching)

---

**Tiếp theo**: [Bài 09 - Hàm (Functions)](./09_Function.md)
