---
title: "09. Ham (Functions)"
sidebar_position: 9
description: "Thanh thao cach dinh nghia, su dung ham trong Aiken: named functions, anonymous functions, higher-order functions, va currying."
---

# Ham (Functions)

:::info Muc tieu
Thanh thao cach dinh nghia, su dung ham trong Aiken: named functions, anonymous functions, higher-order functions, va currying.
:::

---

## Muc Luc

1. [Tong quan ve Functions](#1-tong-quan-ve-functions)
2. [Dinh nghia Functions](#2-dinh-nghia-functions)
3. [Anonymous Functions (Lambdas)](#3-anonymous-functions-lambdas)
4. [Higher-Order Functions](#4-higher-order-functions)
5. [Currying va Partial Application](#5-currying-va-partial-application)
6. [Recursion](#6-recursion)
7. [Function Composition](#7-function-composition)
8. [Best Practices](#8-best-practices)

---

## 1. Tong Quan ve Functions

### Functions trong Functional Programming

**Dac diem Functions trong Aiken:**

| Dac diem | Mo ta |
|----------|-------|
| Pure Functions | Cung input tra ve cung output (deterministic), khong side effects |
| First-Class Citizens | Co the assign vao variables, pass lam arguments, return tu functions khac |
| Immutable | Khong the modify arguments, return new values thay vi mutate |

### Cac loai Functions

| Loai | Mo ta | Vi du |
|------|-------|-------|
| Named Function | Ham co ten, dinh nghia voi `fn` | `fn add(a, b) { a + b }` |
| Anonymous Function | Lambda, khong co ten | `fn(x) { x * 2 }` |
| Higher-Order | Nhan/tra ve function | `fn apply(f, x) { f(x) }` |
| Recursive | Goi chinh no | `fn fact(n) { ... fact(n-1) }` |

---

## 2. Dinh Nghia Functions

### Cu phap co ban

```aiken
// Public function (exported)
pub fn function_name(param1: Type1, param2: Type2) -> ReturnType {
  // body - expression cuoi cung la return value
  expression
}

// Private function (internal only)
fn helper_function(x: Int) -> Int {
  x * 2
}
```

### Vi du chi tiet

```aiken
/// Cong hai so
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Tinh dien tich hinh chu nhat
pub fn rectangle_area(width: Int, height: Int) -> Int {
  width * height
}

/// Kiem tra so chan
pub fn is_even(n: Int) -> Bool {
  n % 2 == 0
}

/// Tim so lon nhat trong 3 so
pub fn max3(a: Int, b: Int, c: Int) -> Int {
  let max_ab = if a > b { a } else { b }
  if max_ab > c { max_ab } else { c }
}
```

### Type Annotations

```aiken
// Explicit type annotations (khuyen nghi cho public functions)
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

### Functions voi Records

```aiken
type Person {
  name: ByteArray,
  age: Int,
  email: ByteArray,
}

/// Tao Person moi
pub fn new_person(name: ByteArray, age: Int, email: ByteArray) -> Person {
  Person { name, age, email }
}

/// Lay tuoi
pub fn get_age(person: Person) -> Int {
  person.age
}

/// Cap nhat tuoi (tra ve Person moi)
pub fn with_age(person: Person, new_age: Int) -> Person {
  Person { ..person, age: new_age }
}

/// Co du tuoi khong
pub fn is_adult(person: Person) -> Bool {
  person.age >= 18
}
```

### Multiple Return Values (Tuples)

```aiken
/// Chia va lay phan du
pub fn div_mod(a: Int, b: Int) -> (Int, Int) {
  let quotient = a / b
  let remainder = a % b
  (quotient, remainder)
}

/// Min va Max
pub fn min_max(a: Int, b: Int) -> (Int, Int) {
  if a < b {
    (a, b)
  } else {
    (b, a)
  }
}

// Su dung
fn example() {
  let (min, max) = min_max(5, 3)
  // min = 3, max = 5
}
```

---

## 3. Anonymous Functions (Lambdas)

### Cu phap

```aiken
// Cu phap day du
fn(param1: Type1, param2: Type2) -> ReturnType { body }

// Voi type inference
fn(x, y) { x + y }

// Single parameter
fn(x) { x * 2 }
```

### Vi du su dung

```aiken
use aiken/collection/list

fn examples() {
  // Lambda don gian
  let double = fn(x) { x * 2 }
  let result = double(5)  // 10

  // Lambda voi multiple parameters
  let add = fn(a, b) { a + b }
  let sum = add(3, 4)  // 7

  // Lambda trong list operations
  let numbers = [1, 2, 3, 4, 5]

  // Map: nhan doi moi phan tu
  let doubled = list.map(numbers, fn(x) { x * 2 })
  // [2, 4, 6, 8, 10]

  // Filter: loc so chan
  let evens = list.filter(numbers, fn(x) { x % 2 == 0 })
  // [2, 4]

  // Fold: tinh tong
  let total = list.foldl(numbers, 0, fn(acc, x) { acc + x })
  // 15
}
```

### Closures

```aiken
/// Closures capture variables tu outer scope
fn make_adder(n: Int) -> fn(Int) -> Int {
  // Lambda nay "captures" n
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

### Khai niem

Higher-Order Function (HOF) la function ma:

1. **Nhan function lam argument**: HOF nhan vao mot function va data, tra ve result
2. **Tra ve function**: HOF nhan vao arguments va tra ve mot function moi

### Common HOFs trong Aiken

```aiken
use aiken/collection/list

/// MAP: Transform moi phan tu
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

/// FILTER: Loc theo dieu kien
fn filter_example() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // Signature: filter(list, fn(a) -> Bool) -> List<a>
  let evens = list.filter(numbers, fn(x) { x % 2 == 0 })
  // [2, 4, 6, 8, 10]

  let big_numbers = list.filter(numbers, fn(x) { x > 5 })
  // [6, 7, 8, 9, 10]
}

/// FOLD: Reduce list thanh single value
fn fold_example() {
  let numbers = [1, 2, 3, 4, 5]

  // Signature: foldl(list, initial, fn(acc, elem) -> acc) -> acc

  // Tinh tong
  let sum = list.foldl(numbers, 0, fn(acc, x) { acc + x })
  // 15

  // Tinh tich
  let product = list.foldl(numbers, 1, fn(acc, x) { acc * x })
  // 120

  // Tim max
  let max = list.foldl(numbers, 0, fn(acc, x) {
    if x > acc { x } else { acc }
  })
  // 5

  // Dem so chan
  let even_count = list.foldl(numbers, 0, fn(acc, x) {
    if x % 2 == 0 { acc + 1 } else { acc }
  })
  // 2
}
```

### Tu implement HOFs

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

## 5. Currying va Partial Application

### Khai niem

**Currying:** Chuyen function nhieu arguments thanh chuoi functions moi function nhan 1 argument

| Dang | Vi du |
|------|-------|
| Uncurried | `add(a, b) = a + b` va `add(2, 3) = 5` |
| Curried | `add(a)(b) = a + b` va `add(2)(3) = 5` |
| Partial Application | `let add2 = add(2)` sau do `add2(3) = 5` va `add2(5) = 7` |

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
  // Aiken khong co pipe operator, dung nested calls:
  let result = filter_above(25)(multiply_each(2)(add_to_each(10)(numbers)))
}
```

---

## 6. Recursion

### Co ban ve Recursion

**Recursion = Function goi chinh no**

Cau truc:

1. **Base case**: Dieu kien dung
2. **Recursive case**: Goi lai voi input nho hon

Vi du: `factorial(5) = 5 * 4! = 5 * 4 * 3! = 5 * 4 * 3 * 2! = ... = 120`

### Vi du Recursion

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

**Tail Call:** Recursive call la operation cuoi cung

| Loai | Mo ta | Vi du |
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
  // Gia lap pipeline: filter -> map -> sum
  let filtered = list.filter(numbers, fn(x) { x > 0 })
  let doubled = list.map(filtered, fn(x) { x * 2 })
  let total = list.foldl(doubled, 0, fn(acc, x) { acc + x })
  total
}

/// Using composition
fn process_with_compose() {
  // Aiken khong co |> operator, phai viet nested:
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

### Do's va Don'ts

**Nen lam:**

- Type annotate public functions
- Su dung descriptive names
- Prefer tail recursion cho large lists
- Keep functions small va focused
- Use helper functions de break down complexity
- Document voi `///` comments

**Khong nen lam:**

- Deep recursion khong tail-optimized
- Functions qua dai (>50 lines)
- Qua nhieu parameters (>5)
- Nested lambdas qua sau
- Thieu base case trong recursion

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

## Bai Tap Thuc Hanh

### Bai 1: Higher-Order Functions

```aiken
// TODO: Implement these HOFs

/// Apply function to each element, keep only Some results
pub fn filter_map(list: List<a>, f: fn(a) -> Option<b>) -> List<b> {
  todo
}

/// Find first element matching predicate
pub fn find(list: List<a>, predicate: fn(a) -> Bool) -> Option<a> {
  todo
}

/// Check if all elements match predicate
pub fn all(list: List<a>, predicate: fn(a) -> Bool) -> Bool {
  todo
}

/// Check if any element matches predicate
pub fn any(list: List<a>, predicate: fn(a) -> Bool) -> Bool {
  todo
}
```

### Bai 2: Currying Practice

```aiken
// TODO: Create curried versions

/// Curried between checker
pub fn is_between(min: Int) -> fn(Int) -> fn(Int) -> Bool {
  // is_between(1)(10)(5) == True
  todo
}

/// Curried string formatter
pub fn format_with_prefix(prefix: ByteArray) -> fn(ByteArray) -> ByteArray {
  todo
}
```

### Bai 3: Tail Recursion

```aiken
// TODO: Convert to tail recursive

/// Count occurrences of element in list (make it tail recursive)
pub fn count(list: List<a>, target: a) -> Int {
  todo
}

/// Find maximum in list (tail recursive)
pub fn maximum(list: List<Int>) -> Option<Int> {
  todo
}
```

---

## Checklist Hoan Thanh

- [ ] Hieu cach dinh nghia functions
- [ ] Su dung anonymous functions (lambdas)
- [ ] Hieu va ap dung higher-order functions
- [ ] Biet currying va partial application
- [ ] Viet tail recursive functions
- [ ] Ap dung function composition
- [ ] Tuan thu best practices

---

## Tai Lieu Tham Khao

- [Aiken Language Tour - Functions](https://aiken-lang.org/language-tour/functions)
- [Aiken Standard Library - List](https://aiken-lang.github.io/stdlib/aiken/collection/list.html)

---

**Tiep theo**: [Bai 10 - Modules](./10_Modules.md)
