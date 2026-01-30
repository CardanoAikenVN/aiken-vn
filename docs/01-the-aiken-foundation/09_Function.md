---
title: "09. Hàm (Functions)"
sidebar_position: 9
description: "Thành thạo cách định nghĩa, sử dụng hàm trong Aiken: named functions, anonymous functions, higher-order functions, và currying."
---

# Hàm (Functions)

:::info Mục tiêu
Thành thạo cách định nghĩa, sử dụng hàm trong Aiken: named functions, anonymous functions, higher-order functions, và currying.
:::

---

## Mục Lục

1. [Tổng quan về Functions](#1-tổng-quan-về-functions)
2. [Định nghĩa Functions](#2-định-nghĩa-functions)
3. [Anonymous Functions (Lambdas)](#3-anonymous-functions-lambdas)
4. [Higher-Order Functions](#4-higher-order-functions)
5. [Currying và Partial Application](#5-currying-và-partial-application)
6. [Recursion](#6-recursion)
7. [Function Composition](#7-function-composition)
8. [Best Practices](#8-best-practices)

---

## 1. Tổng Quan về Functions

### Functions trong Functional Programming

**Đặc điểm Functions trong Aiken:**

| Đặc điểm | Mô tả |
|----------|-------|
| Pure Functions | Cùng input trả về cùng output (deterministic), không side effects |
| First-Class Citizens | Có thể assign vào variables, pass làm arguments, return từ functions khác |
| Immutable | Không thể modify arguments, return new values thay vì mutate |

### Các loại Functions

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| Named Function | Hàm có tên, định nghĩa với `fn` | `fn add(a, b) { a + b }` |
| Anonymous Function | Lambda, không có tên | `fn(x) { x * 2 }` |
| Higher-Order | Nhận/trả về function | `fn apply(f, x) { f(x) }` |
| Recursive | Gọi chính nó | `fn fact(n) { ... fact(n-1) }` |

---

## 2. Định Nghĩa Functions

### Cú pháp cơ bản

```aiken
// Public function (exported)
pub fn function_name(param1: Type1, param2: Type2) -> ReturnType {
  // body - expression cuối cùng là return value
  expression
}

// Private function (internal only)
fn helper_function(x: Int) -> Int {
  x * 2
}
```

### Ví dụ chi tiết

```aiken
/// Cộng hai số
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Tính diện tích hình chữ nhật
pub fn rectangle_area(width: Int, height: Int) -> Int {
  width * height
}

/// Kiểm tra số chẵn
pub fn is_even(n: Int) -> Bool {
  n % 2 == 0
}

/// Tìm số lớn nhất trong 3 số
pub fn max3(a: Int, b: Int, c: Int) -> Int {
  let max_ab = if a > b { a } else { b }
  if max_ab > c { max_ab } else { c }
}
```

### Type Annotations

```aiken
// Explicit type annotations (khuyến nghị cho public functions)
pub fn divide(dividend: Int, divisor: Int) -> Option<Int> {
  if divisor == 0 {
    None
  } else {
    Some(dividend / divisor)
  }
}

// Type inference (OK cho private/simple functions)
fn double(x) {
  x * 2
}

// Generic functions
pub fn identity<a>(value: a) -> a {
  value
}

pub fn swap<a, b>(pair: (a, b)) -> (b, a) {
  let (first, second) = pair
  (second, first)
}
```

### Functions với Records

```aiken
type Person {
  name: ByteArray,
  age: Int,
  email: ByteArray,
}

/// Tạo Person mới
pub fn new_person(name: ByteArray, age: Int, email: ByteArray) -> Person {
  Person { name, age, email }
}

/// Lấy tuổi
pub fn get_age(person: Person) -> Int {
  person.age
}

/// Cập nhật tuổi (trả về Person mới)
pub fn with_age(person: Person, new_age: Int) -> Person {
  Person { ..person, age: new_age }
}

/// Có đủ tuổi không
pub fn is_adult(person: Person) -> Bool {
  person.age >= 18
}
```

### Multiple Return Values (Tuples)

```aiken
/// Chia và lấy phần dư
pub fn div_mod(a: Int, b: Int) -> (Int, Int) {
  let quotient = a / b
  let remainder = a % b
  (quotient, remainder)
}

/// Min và Max
pub fn min_max(a: Int, b: Int) -> (Int, Int) {
  if a < b {
    (a, b)
  } else {
    (b, a)
  }
}

// Sử dụng
fn example() {
  let (min, max) = min_max(5, 3)
  // min = 3, max = 5
}
```

---

## 3. Anonymous Functions (Lambdas)

### Cú pháp

```aiken
// Cú pháp đầy đủ
fn(param1: Type1, param2: Type2) -> ReturnType { body }

// Với type inference
fn(x, y) { x + y }

// Single parameter
fn(x) { x * 2 }
```

### Ví dụ sử dụng

```aiken
use aiken/collection/list

fn examples() {
  // Lambda đơn giản
  let double = fn(x) { x * 2 }
  let result = double(5)  // 10

  // Lambda với multiple parameters
  let add = fn(a, b) { a + b }
  let sum = add(3, 4)  // 7

  // Lambda trong list operations
  let numbers = [1, 2, 3, 4, 5]

  // Map: nhân đôi mọi phần tử
  let doubled = list.map(numbers, fn(x) { x * 2 })
  // [2, 4, 6, 8, 10]

  // Filter: lọc số chẵn
  let evens = list.filter(numbers, fn(x) { x % 2 == 0 })
  // [2, 4]

  // Fold: tính tổng
  let total = list.foldl(numbers, 0, fn(acc, x) { acc + x })
  // 15
}
```

### Closures

```aiken
/// Closures capture variables từ outer scope
fn make_adder(n: Int) -> fn(Int) -> Int {
  // Lambda này "captures" n
  fn(x) { x + n }
}

fn closure_example() {
  let add_5 = make_adder(5)
  let add_10 = make_adder(10)

  let result1 = add_5(3)   // 8
  let result2 = add_10(3)  // 13
}

/// Multiplier factory
fn make_multiplier(factor: Int) -> fn(Int) -> Int {
  fn(x) { x * factor }
}

fn multiplier_example() {
  let double = make_multiplier(2)
  let triple = make_multiplier(3)

  let a = double(5)  // 10
  let b = triple(5)  // 15
}
```

---

## 4. Higher-Order Functions

### Khái niệm

Higher-Order Function (HOF) là function mà:

1. **Nhận function làm argument**: HOF nhận vào một function và data, trả về result
2. **Trả về function**: HOF nhận vào arguments và trả về một function mới

### Common HOFs trong Aiken

```aiken
use aiken/collection/list

/// MAP: Transform mọi phần tử
fn map_example() {
  let numbers = [1, 2, 3, 4, 5]

  // Signature: map(list, fn(a) -> b) -> List<b>
  let squares = list.map(numbers, fn(x) { x * x })
  // [1, 4, 9, 16, 25]

  let strings = list.map(numbers, fn(x) {
    if x % 2 == 0 { "even" } else { "odd" }
  })
  // ["odd", "even", "odd", "even", "odd"]
}

/// FILTER: Lọc theo điều kiện
fn filter_example() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // Signature: filter(list, fn(a) -> Bool) -> List<a>
  let evens = list.filter(numbers, fn(x) { x % 2 == 0 })
  // [2, 4, 6, 8, 10]

  let big_numbers = list.filter(numbers, fn(x) { x > 5 })
  // [6, 7, 8, 9, 10]
}

/// FOLD: Reduce list thành single value
fn fold_example() {
  let numbers = [1, 2, 3, 4, 5]

  // Signature: foldl(list, initial, fn(acc, elem) -> acc) -> acc

  // Tính tổng
  let sum = list.foldl(numbers, 0, fn(acc, x) { acc + x })
  // 15

  // Tính tích
  let product = list.foldl(numbers, 1, fn(acc, x) { acc * x })
  // 120

  // Tìm max
  let max = list.foldl(numbers, 0, fn(acc, x) {
    if x > acc { x } else { acc }
  })
  // 5

  // Đếm số chẵn
  let even_count = list.foldl(numbers, 0, fn(acc, x) {
    if x % 2 == 0 { acc + 1 } else { acc }
  })
  // 2
}
```

### Tự implement HOFs

```aiken
/// Custom map
pub fn my_map(list: List<a>, f: fn(a) -> b) -> List<b> {
  when list is {
    [] -> []
    [head, ..tail] -> [f(head), ..my_map(tail, f)]
  }
}

/// Custom filter
pub fn my_filter(list: List<a>, predicate: fn(a) -> Bool) -> List<a> {
  when list is {
    [] -> []
    [head, ..tail] -> {
      if predicate(head) {
        [head, ..my_filter(tail, predicate)]
      } else {
        my_filter(tail, predicate)
      }
    }
  }
}

/// Custom fold left
pub fn my_foldl(list: List<a>, initial: b, f: fn(b, a) -> b) -> b {
  when list is {
    [] -> initial
    [head, ..tail] -> my_foldl(tail, f(initial, head), f)
  }
}

/// Custom fold right
pub fn my_foldr(list: List<a>, initial: b, f: fn(a, b) -> b) -> b {
  when list is {
    [] -> initial
    [head, ..tail] -> f(head, my_foldr(tail, initial, f))
  }
}
```

### Advanced HOF Patterns

```aiken
/// Apply function n times
pub fn apply_n(f: fn(a) -> a, n: Int, initial: a) -> a {
  if n <= 0 {
    initial
  } else {
    apply_n(f, n - 1, f(initial))
  }
}

fn apply_n_example() {
  let double = fn(x) { x * 2 }
  let result = apply_n(double, 3, 1)  // 1 -> 2 -> 4 -> 8
}

/// Compose two functions
pub fn compose<a, b, c>(f: fn(b) -> c, g: fn(a) -> b) -> fn(a) -> c {
  fn(x) { f(g(x)) }
}

fn compose_example() {
  let add_one = fn(x) { x + 1 }
  let double = fn(x) { x * 2 }

  let add_then_double = compose(double, add_one)
  let result = add_then_double(3)  // (3 + 1) * 2 = 8
}

/// Pipe (reverse compose)
pub fn pipe<a, b, c>(f: fn(a) -> b, g: fn(b) -> c) -> fn(a) -> c {
  fn(x) { g(f(x)) }
}
```

---

## 5. Currying và Partial Application

### Khái niệm

**Currying:** Chuyển function nhiều arguments thành chuỗi functions mỗi function nhận 1 argument

| Dạng | Ví dụ |
|------|-------|
| Uncurried | `add(a, b) = a + b` và `add(2, 3) = 5` |
| Curried | `add(a)(b) = a + b` và `add(2)(3) = 5` |
| Partial Application | `let add2 = add(2)` sau đó `add2(3) = 5` và `add2(5) = 7` |

### Curried Functions

```aiken
/// Curried add
pub fn add_curried(a: Int) -> fn(Int) -> Int {
  fn(b) { a + b }
}

/// Curried multiply
pub fn multiply_curried(a: Int) -> fn(Int) -> Int {
  fn(b) { a * b }
}

fn currying_example() {
  // Partial application
  let add_10 = add_curried(10)
  let triple = multiply_curried(3)

  let x = add_10(5)     // 15
  let y = triple(7)     // 21

  // Chain calls
  let z = add_curried(1)(2)  // 3
}

/// Curried comparison
pub fn is_greater_than(threshold: Int) -> fn(Int) -> Bool {
  fn(value) { value > threshold }
}

fn comparison_example() {
  let numbers = [1, 5, 10, 15, 20]

  // Reusable predicates
  let greater_than_10 = is_greater_than(10)
  let greater_than_5 = is_greater_than(5)

  let big = list.filter(numbers, greater_than_10)    // [15, 20]
  let medium = list.filter(numbers, greater_than_5)  // [10, 15, 20]
}
```

### Utility Curried Functions

```aiken
/// Curried list operations
pub fn add_to_each(n: Int) -> fn(List<Int>) -> List<Int> {
  fn(list) { list.map(list, fn(x) { x + n }) }
}

pub fn multiply_each(n: Int) -> fn(List<Int>) -> List<Int> {
  fn(list) { list.map(list, fn(x) { x * n }) }
}

pub fn filter_above(threshold: Int) -> fn(List<Int>) -> List<Int> {
  fn(list) { list.filter(list, fn(x) { x > threshold }) }
}

fn pipeline_example() {
  let numbers = [1, 2, 3, 4, 5]

  // Build pipeline
  // [1,2,3,4,5] -> [11,12,13,14,15] -> [22,24,26,28,30] -> [26,28,30]
  // Aiken không có pipe operator, dùng nested calls:
  let result = filter_above(25)(multiply_each(2)(add_to_each(10)(numbers)))
}
```

---

## 6. Recursion

### Cơ bản về Recursion

**Recursion = Function gọi chính nó**

Cấu trúc:

1. **Base case**: Điều kiện dừng
2. **Recursive case**: Gọi lại với input nhỏ hơn

Ví dụ: `factorial(5) = 5 * 4! = 5 * 4 * 3! = 5 * 4 * 3 * 2! = ... = 120`

### Ví dụ Recursion

```aiken
/// Factorial
pub fn factorial(n: Int) -> Int {
  if n <= 1 {
    1  // Base case
  } else {
    n * factorial(n - 1)  // Recursive case
  }
}

/// Fibonacci
pub fn fibonacci(n: Int) -> Int {
  when n is {
    0 -> 0
    1 -> 1
    _ -> fibonacci(n - 1) + fibonacci(n - 2)
  }
}

/// Sum of list
pub fn sum_list(list: List<Int>) -> Int {
  when list is {
    [] -> 0
    [head, ..tail] -> head + sum_list(tail)
  }
}

/// Length of list
pub fn length(list: List<a>) -> Int {
  when list is {
    [] -> 0
    [_, ..tail] -> 1 + length(tail)
  }
}

/// Reverse list
pub fn reverse(list: List<a>) -> List<a> {
  reverse_helper(list, [])
}

fn reverse_helper(list: List<a>, acc: List<a>) -> List<a> {
  when list is {
    [] -> acc
    [head, ..tail] -> reverse_helper(tail, [head, ..acc])
  }
}
```

### Tail Recursion

**Tail Call:** Recursive call là operation cuối cùng

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| Non-tail recursive | Stack grows | `fn sum(list) = head + sum(tail)` |
| Tail recursive | Constant stack | `fn sum(list, acc) = sum(tail, acc + head)` |

```aiken
/// Non-tail recursive sum
fn sum_bad(list: List<Int>) -> Int {
  when list is {
    [] -> 0
    [head, ..tail] -> head + sum_bad(tail)  // NOT tail call
  }
}

/// Tail recursive sum
pub fn sum_good(list: List<Int>) -> Int {
  sum_tail(list, 0)
}

fn sum_tail(list: List<Int>, acc: Int) -> Int {
  when list is {
    [] -> acc
    [head, ..tail] -> sum_tail(tail, acc + head)  // Tail call!
  }
}

/// Tail recursive factorial
pub fn factorial_tail(n: Int) -> Int {
  fact_helper(n, 1)
}

fn fact_helper(n: Int, acc: Int) -> Int {
  if n <= 1 {
    acc
  } else {
    fact_helper(n - 1, n * acc)  // Tail call
  }
}

/// Tail recursive fibonacci
pub fn fibonacci_tail(n: Int) -> Int {
  fib_helper(n, 0, 1)
}

fn fib_helper(n: Int, a: Int, b: Int) -> Int {
  when n is {
    0 -> a
    _ -> fib_helper(n - 1, b, a + b)  // Tail call
  }
}

/// Tail recursive map
pub fn map_tail(list: List<a>, f: fn(a) -> b) -> List<b> {
  map_helper(list, f, []) |> reverse
}

fn map_helper(list: List<a>, f: fn(a) -> b, acc: List<b>) -> List<b> {
  when list is {
    [] -> acc
    [head, ..tail] -> map_helper(tail, f, [f(head), ..acc])
  }
}
```

---

## 7. Function Composition

### Composing Functions

```aiken
/// Compose two functions: (f . g)(x) = f(g(x))
pub fn compose<a, b, c>(f: fn(b) -> c, g: fn(a) -> b) -> fn(a) -> c {
  fn(x) { f(g(x)) }
}

/// Compose three functions
pub fn compose3<a, b, c, d>(
  f: fn(c) -> d,
  g: fn(b) -> c,
  h: fn(a) -> b,
) -> fn(a) -> d {
  fn(x) { f(g(h(x))) }
}

fn composition_example() {
  let add_1 = fn(x) { x + 1 }
  let multiply_2 = fn(x) { x * 2 }
  let square = fn(x) { x * x }

  // (x + 1) * 2
  let f1 = compose(multiply_2, add_1)
  let r1 = f1(3)  // (3 + 1) * 2 = 8

  // ((x + 1) * 2)^2
  let f2 = compose3(square, multiply_2, add_1)
  let r2 = f2(3)  // ((3 + 1) * 2)^2 = 64
}
```

### Pipeline Pattern

```aiken
/// Helper for pipeline-like composition
pub fn then<a, b, c>(f: fn(a) -> b, g: fn(b) -> c) -> fn(a) -> c {
  fn(x) { g(f(x)) }
}

/// Process data through pipeline
fn process_numbers(numbers: List<Int>) -> Int {
  // Giả lập pipeline: filter -> map -> sum
  let filtered = list.filter(numbers, fn(x) { x > 0 })
  let doubled = list.map(filtered, fn(x) { x * 2 })
  let total = list.foldl(doubled, 0, fn(acc, x) { acc + x })
  total
}

/// Using composition
fn process_with_compose() {
  // Aiken không có |> operator, phải viết nested:
  let process = fn(numbers: List<Int>) -> Int {
    list.foldl(
      list.map(
        list.filter(numbers, fn(x) { x > 0 }),
        fn(x) { x * 2 }
      ),
      0,
      fn(acc, x) { acc + x }
    )
  }
}
```

---

## 8. Best Practices

### Do's và Don'ts

**Nên làm:**

- Type annotate public functions
- Sử dụng descriptive names
- Prefer tail recursion cho large lists
- Keep functions small và focused
- Use helper functions để break down complexity
- Document với `///` comments

**Không nên làm:**

- Deep recursion không tail-optimized
- Functions quá dài (>50 lines)
- Quá nhiều parameters (>5)
- Nested lambdas quá sâu
- Thiếu base case trong recursion

### Function Design Guidelines

```aiken
// GOOD: Small, focused, documented
/// Calculate the area of a circle
///
/// ## Arguments
/// * `radius` - The radius of the circle (must be positive)
///
/// ## Returns
/// The area, or 0 if radius is invalid
pub fn circle_area(radius: Int) -> Int {
  if radius <= 0 {
    0
  } else {
    // Approximation: pi ~ 314159 / 100000
    radius * radius * 314159 / 100000
  }
}

// BAD: Too many responsibilities
fn do_everything(a, b, c, d, e, f) {
  // 100 lines of mixed logic...
  todo
}

// GOOD: Break down into helpers
fn process_order(order: Order) -> Result<Receipt, Error> {
  let validated = validate_order(order)?
  let priced = calculate_prices(validated)?
  let taxed = apply_taxes(priced)?
  create_receipt(taxed)
}

fn validate_order(order: Order) -> Result<Order, Error> {
  // Focused validation logic
  todo
}

fn calculate_prices(order: Order) -> Result<Order, Error> {
  // Focused pricing logic
  todo
}
```

---

## Tài Liệu Tham Khảo

- [Aiken Language Tour - Functions](https://aiken-lang.org/language-tour/functions)
- [Aiken Standard Library - List](https://aiken-lang.github.io/stdlib/aiken/collection/list.html)

---

**Tiếp theo**: [Bài 10 - Modules](./10_Modules.md)
