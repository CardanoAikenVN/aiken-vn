---
title: "08. Luong Dieu Khien (Control Flow)"
sidebar_position: 8
description: "Thanh thao cac cau truc dieu khien trong Aiken: if/else, when/is pattern matching, va cac ky thuat xu ly logic phuc tap."
---

# Luong Dieu Khien (Control Flow)

:::info Muc tieu
Thanh thao cac cau truc dieu khien trong Aiken: if/else, when/is pattern matching, va cac ky thuat xu ly logic phuc tap.
:::

---

## Muc Luc

1. [Tong quan Control Flow](#1-tong-quan-control-flow)
2. [If/Else Expression](#2-ifelse-expression)
3. [When/Is Pattern Matching](#3-whenis-pattern-matching)
4. [Pattern Matching nang cao](#4-pattern-matching-nang-cao)
5. [Guards va Conditions](#5-guards-va-conditions)
6. [Ket hop patterns](#6-ket-hop-patterns)
7. [Best Practices](#7-best-practices)

---

## 1. Tong Quan Control Flow

### Control Flow trong Functional Programming

| Khia canh | Imperative (Java, Python) | Functional (Aiken) |
|-----------|---------------------------|-------------------|
| Dieu kien | `if (x > 0) { return "positive"; } else { return "non-positive"; }` | `if x > 0 { "positive" } else { "non-positive" }` |
| Switch/Case | `switch (action) { case "buy": ... case "sell": ... }` | `when action is { Buy -> ... Sell -> ... }` |

:::warning Quan trong
- Moi expression deu tra ve gia tri
- Khong co "statements", chi co "expressions"
- Pattern matching thay the switch/case
:::

### So sanh cac cau truc

| Cau truc | Khi nao dung | Vi du |
|----------|--------------|-------|
| `if/else` | Dieu kien Boolean don gian | `if x > 0 { ... } else { ... }` |
| `when/is` | Pattern matching tren types | `when action is { Buy -> ... }` |
| Guards | Dieu kien phuc tap trong patterns | `when x is { n if n > 0 -> ... }` |

---

## 2. If/Else Expression

### Cu phap co ban

```aiken
// If/else la EXPRESSION - luon tra ve gia tri
let result = if condition {
  value_if_true
} else {
  value_if_false
}
```

### Vi du chi tiet

```aiken
/// Kiem tra so duong
fn check_positive(n: Int) -> String {
  if n > 0 {
    "Positive"
  } else if n < 0 {
    "Negative"
  } else {
    "Zero"
  }
}

/// Tinh gia tri tuyet doi
fn abs(n: Int) -> Int {
  if n >= 0 {
    n
  } else {
    -n
  }
}

/// Tim so lon nhat
fn max(a: Int, b: Int) -> Int {
  if a > b { a } else { b }
}

/// Tim so nho nhat trong 3 so
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

### Quy tac quan trong

| Quy tac | Dung | Sai |
|---------|------|-----|
| Phai co else branch | `if x > 0 { "yes" } else { "no" }` | `if x > 0 { "yes" }` (Loi: thieu else) |
| Ca hai branch phai cung type | `if x > 0 { 1 } else { 0 }` (Ca hai la Int) | `if x > 0 { 1 } else { "zero" }` (Int vs String) |
| Condition phai la Bool | `if x > 0 { ... }` (x > 0 la Bool) | `if x { ... }` (x phai la Bool) |
| Nen dung when/is cho enum types | `when option is { Some(x) -> x, None -> 0 }` | `if option == Some(1) { ... }` (It ro rang) |

### Nested if/else

```aiken
/// Phan loai diem so
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

/// Kiem tra nam nhuan
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

### Cu phap co ban

```aiken
when value is {
  pattern1 -> expression1
  pattern2 -> expression2
  _ -> default_expression  // Wildcard pattern
}
```

### Pattern Matching voi Enum Types

```aiken
/// Action type cho trading
type TradeAction {
  Buy { amount: Int, price: Int }
  Sell { amount: Int, price: Int }
  Hold
  Cancel { reason: String }
}

/// Xu ly trade action
fn process_trade(action: TradeAction) -> String {
  when action is {
    Buy { amount, price } -> {
      let total = amount * price
      "Buying for total: " // Trong thuc te se format so
    }
    Sell { amount, price } -> {
      let total = amount * price
      "Selling for total: "
    }
    Hold -> "Holding position"
    Cancel { reason } -> reason
  }
}

/// Tinh phi giao dich
fn calculate_fee(action: TradeAction) -> Int {
  when action is {
    Buy { amount, .. } -> amount * 1 / 100  // 1% phi mua
    Sell { amount, .. } -> amount * 2 / 100 // 2% phi ban
    Hold -> 0
    Cancel { .. } -> 50  // Phi huy co dinh
  }
}
```

### Pattern Matching voi Primitive Types

```aiken
/// Chuyen so thanh chu
fn number_to_word(n: Int) -> String {
  when n is {
    0 -> "zero"
    1 -> "one"
    2 -> "two"
    3 -> "three"
    _ -> "many"
  }
}

/// Kiem tra ngay trong tuan
fn is_weekend(day: Int) -> Bool {
  when day is {
    6 -> True   // Saturday
    7 -> True   // Sunday
    _ -> False
  }
}
```

### Pattern Matching voi Option

```aiken
use aiken/option

/// Safe division voi Option
fn safe_divide(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}

/// Xu ly ket qua Option
fn process_division(a: Int, b: Int) -> Int {
  when safe_divide(a, b) is {
    Some(result) -> result
    None -> 0  // Default value khi chia cho 0
  }
}

/// Unwrap voi default
fn unwrap_or_default(opt: Option<Int>, default: Int) -> Int {
  when opt is {
    Some(value) -> value
    None -> default
  }
}
```

### Pattern Matching voi List

```aiken
/// Lay phan tu dau tien
fn head(list: List<a>) -> Option<a> {
  when list is {
    [] -> None
    [first, ..] -> Some(first)
  }
}

/// Lay phan con lai (tail)
fn tail(list: List<a>) -> List<a> {
  when list is {
    [] -> []
    [_, ..rest] -> rest
  }
}

/// Kiem tra do dai
fn length_category(list: List<a>) -> String {
  when list is {
    [] -> "empty"
    [_] -> "single"
    [_, _] -> "pair"
    [_, _, _] -> "triple"
    _ -> "many"
  }
}

/// Tinh tong list
fn sum(list: List<Int>) -> Int {
  when list is {
    [] -> 0
    [first, ..rest] -> first + sum(rest)
  }
}
```

### Pattern Matching voi Tuple

```aiken
/// So sanh hai so
fn compare(pair: (Int, Int)) -> String {
  when pair is {
    (a, b) if a > b -> "first is greater"
    (a, b) if a < b -> "second is greater"
    (_, _) -> "equal"
  }
}

/// Xu ly coordinates
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

## 4. Pattern Matching Nang Cao

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

/// Voi when/is
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
/// Giu reference den toan bo value
fn process_with_original(opt: Option<Int>) -> (Option<Int>, Int) {
  when opt is {
    Some(n) as original -> (original, n * 2)
    None as original -> (original, 0)
  }
}

/// Huu ich khi can ca destructured parts va whole value
type Transaction {
  sender: ByteArray,
  receiver: ByteArray,
  amount: Int,
}

fn validate_and_log(tx: Transaction) -> Bool {
  when tx is {
    Transaction { amount, .. } as full_tx if amount > 0 -> {
      // Co the dung ca `amount` va `full_tx`
      trace @"Processing valid transaction"
      True
    }
    _ -> False
  }
}
```

### Or Patterns

```aiken
/// Nhom nhieu patterns
fn is_vowel(char: Int) -> Bool {
  // Gia su char la ASCII code
  when char is {
    97 | 101 | 105 | 111 | 117 -> True  // a, e, i, o, u
    65 | 69 | 73 | 79 | 85 -> True      // A, E, I, O, U
    _ -> False
  }
}

/// Voi enum types
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

## 5. Guards va Conditions

### Guard Clauses

```aiken
/// Guards cho dieu kien phuc tap
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

### Combining Patterns voi Guards

```aiken
type PaymentMethod {
  Cash { amount: Int }
  Card { card_number: ByteArray, amount: Int }
  Crypto { token: ByteArray, amount: Int }
}

fn process_payment(payment: PaymentMethod, required: Int) -> Bool {
  when payment is {
    // Du tien mat
    Cash { amount } if amount >= required -> True

    // Card voi so hop le va du tien
    Card { card_number, amount }
      if builtin.length_of_bytearray(card_number) == 16 && amount >= required -> True

    // Crypto (gia su co premium 10%)
    Crypto { amount, .. } if amount >= required * 110 / 100 -> True

    // Tat ca truong hop khac
    _ -> False
  }
}
```

### Short-circuit Evaluation

```aiken
/// Guards duoc evaluate tu tren xuong
fn validate_transaction(amount: Int, balance: Int, limit: Int) -> String {
  when (amount, balance, limit) is {
    // Check theo thu tu uu tien
    (a, _, _) if a <= 0 -> "Invalid amount"
    (a, b, _) if a > b -> "Insufficient balance"
    (a, _, l) if a > l -> "Exceeds daily limit"
    _ -> "Valid"
  }
}
```

---

## 6. Ket Hop Patterns

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

### Do's va Don'ts

**Nen lam:**

- Dung when/is cho enum types thay vi if/else chains
- Xu ly tat ca cases (exhaustive matching)
- Dat specific patterns truoc, general patterns sau
- Dung guards cho dieu kien phuc tap
- Su dung destructuring de extract data
- Dung `_` cho values khong can

**Khong nen lam:**

- Khong dung if/else dai cho enums
- Khong quen case (non-exhaustive match)
- Khong dat `_` wildcard dau tien (unreachable patterns)
- Khong nested when qua sau (kho doc)
- Khong duplicate logic giua cac branches

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
    _ -> 0  // Neu them Yellow sau, se khong co warning!
  }
}
```

---

## Bai Tap Thuc Hanh

### Bai 1: Traffic Light

```aiken
type TrafficLight {
  Red
  Yellow
  Green
}

// TODO: Implement
fn next_light(current: TrafficLight) -> TrafficLight {
  // Red -> Green -> Yellow -> Red
  todo
}

fn can_go(light: TrafficLight) -> Bool {
  todo
}
```

### Bai 2: Calculator

```aiken
type Operation {
  Add
  Subtract
  Multiply
  Divide
}

// TODO: Implement
fn calculate(a: Int, b: Int, op: Operation) -> Option<Int> {
  // Handle division by zero!
  todo
}
```

### Bai 3: Fizz Buzz

```aiken
// TODO: Implement
fn fizz_buzz(n: Int) -> String {
  // n divisible by 3 -> "Fizz"
  // n divisible by 5 -> "Buzz"
  // n divisible by both -> "FizzBuzz"
  // otherwise -> show number
  todo
}
```

---

## Checklist Hoan Thanh

- [ ] Hieu if/else expression va quy tac
- [ ] Thanh thao when/is pattern matching
- [ ] Biet destructuring trong patterns
- [ ] Su dung guards cho dieu kien phuc tap
- [ ] Hieu pattern order va exhaustiveness
- [ ] Ap dung best practices

---

## Tai Lieu Tham Khao

- [Aiken Language Tour - Control Flow](https://aiken-lang.org/language-tour/control-flow)
- [Pattern Matching in Aiken](https://aiken-lang.org/language-tour/custom-types#pattern-matching)

---

**Tiep theo**: [Bai 09 - Ham (Functions)](./09_Function.md)
