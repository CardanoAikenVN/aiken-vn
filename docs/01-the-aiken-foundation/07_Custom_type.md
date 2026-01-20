---
title: "07. Kiểu Dữ Liệu Tuỳ Chỉnh"
sidebar_position: 7
description: "Định nghĩa và sử dụng các cấu trúc dữ liệu phức tạp với custom types"
---

# Bài 07: Kiểu Dữ Liệu Tuỳ Chỉnh (Custom Types)

> **Mục tiêu:** Định nghĩa và sử dụng các cấu trúc dữ liệu phức tạp với custom types

---

## Giới thiệu

Custom types trong Aiken là **Algebraic Data Types (ADTs)** - cho phép bạn tạo các kiểu dữ liệu mới bằng cách kết hợp các kiểu đã có.

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| Records (Product) | Tập hợp các fields | `type Person { name: ByteArray, age: Int }` |
| Enums (Sum) | Một trong nhiều variants | `type Status { Active, Inactive, Pending(Int) }` |
| Generics (Params) | Types với type parameters | `type Box<a> { value: a, label: ByteArray }` |

---

## 1. Record Types (Product Types)

Records là tập hợp các fields có tên và kiểu cụ thể.

### Cú pháp cơ bản

```aiken
// Record với named fields
type Person {
  name: ByteArray,
  age: Int,
  email: ByteArray,
}

// Tạo instance
let alice = Person {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
}

// Access fields
let person_name = alice.name
let person_age = alice.age
```

### Single constructor shorthand

Khi type chỉ có 1 constructor cùng tên với type:

```aiken
// Viết đầy đủ
type Wallet {
  Wallet { owner: ByteArray, balance: Int }
}

// Shorthand (constructor name = type name)
type Wallet {
  owner: ByteArray,
  balance: Int,
}

// Cả hai cách đều tạo ra kết quả giống nhau
let my_wallet = Wallet { owner: "Alice", balance: 1000 }
```

### Updating Records

```aiken
type Config {
  timeout: Int,
  retries: Int,
  enabled: Bool,
}

fn update_timeout(config: Config, new_timeout: Int) -> Config {
  // Spread syntax để copy và update
  Config { ..config, timeout: new_timeout }
}

fn disable(config: Config) -> Config {
  Config { ..config, enabled: False }
}

// Ví dụ
let cfg = Config { timeout: 30, retries: 3, enabled: True }
let new_cfg = update_timeout(cfg, 60)
// new_cfg = Config { timeout: 60, retries: 3, enabled: True }
```

---

## 2. Enum Types (Sum Types)

Enums đại diện cho một trong nhiều variants có thể.

### Basic Enum

```aiken
// Simple enum
type Status {
  Active
  Inactive
  Suspended
}

fn is_active(status: Status) -> Bool {
  when status is {
    Active -> True
    _ -> False
  }
}
```

### Enum với Data

```aiken
// Enum variants có thể chứa data
type Result {
  Success { value: Int }
  Failure { error_code: Int, message: ByteArray }
}

fn handle_result(result: Result) -> Int {
  when result is {
    Success { value } -> value
    Failure { error_code, .. } -> error_code
  }
}
```

### Pattern Matching với Enum

```aiken
type Action {
  Deposit { amount: Int }
  Withdraw { amount: Int }
  Transfer { to: ByteArray, amount: Int }
  CheckBalance
}

fn describe_action(action: Action) -> ByteArray {
  when action is {
    Deposit { amount } -> "Depositing"
    Withdraw { amount } -> "Withdrawing"
    Transfer { to, amount } -> "Transferring"
    CheckBalance -> "Checking balance"
  }
}

fn calculate_fee(action: Action) -> Int {
  when action is {
    Deposit { .. } -> 0
    Withdraw { amount } -> amount / 100
    Transfer { amount, .. } -> amount / 50
    CheckBalance -> 0
  }
}
```

---

## 3. Generic Types (Parametric Types)

Types có thể có type parameters.

```aiken
// Generic container
type Box<a> {
  value: a,
}

// Sử dụng với các kiểu cụ thể
let int_box: Box<Int> = Box { value: 42 }
let string_box: Box<ByteArray> = Box { value: "hello" }

// Generic enum (như Option trong Rust)
type Maybe<a> {
  Nothing
  Just(a)
}

// Sử dụng
fn safe_head(list: List<a>) -> Maybe<a> {
  when list is {
    [] -> Nothing
    [head, ..] -> Just(head)
  }
}
```

### Multiple Type Parameters

```aiken
// Hai type parameters
type Pair<a, b> {
  first: a,
  second: b,
}

type Either<left, right> {
  Left(left)
  Right(right)
}

// Sử dụng
let pair: Pair<Int, ByteArray> = Pair { first: 1, second: "one" }
let result: Either<ByteArray, Int> = Right(42)
```

---

## 4. Type Aliases

```aiken
// Alias cho readability
type Address = ByteArray
type Amount = Int
type Timestamp = Int

type Transaction {
  from: Address,
  to: Address,
  amount: Amount,
  timestamp: Timestamp,
}

// Tuple alias
type Point = (Int, Int)

fn distance(p1: Point, p2: Point) -> Int {
  let (x1, y1) = p1
  let (x2, y2) = p2
  // Simplified - không có sqrt trong Aiken
  (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
}
```

---

## 5. Recursive Types

Types có thể refer đến chính nó.

```aiken
// Linked list
type LinkedList<a> {
  Empty
  Node { value: a, next: LinkedList<a> }
}

// Binary tree
type Tree<a> {
  Leaf
  Branch { value: a, left: Tree<a>, right: Tree<a> }
}

// Ví dụ sử dụng
fn list_length(list: LinkedList<a>) -> Int {
  when list is {
    Empty -> 0
    Node { next, .. } -> 1 + list_length(next)
  }
}

fn tree_size(tree: Tree<a>) -> Int {
  when tree is {
    Leaf -> 0
    Branch { left, right, .. } -> 1 + tree_size(left) + tree_size(right)
  }
}
```

---

## 6. Data Encoding

Aiken custom types được encode thành Plutus Data (CBOR).

```aiken
// Constructor tags được assign tự động theo thứ tự định nghĩa
type Color {
  Red     // tag = 0
  Green   // tag = 1
  Blue    // tag = 2
}

// Có thể explicitly specify tags
type Status {
  Active = 1     // tag = 1
  Inactive = 0   // tag = 0
}
```

### Opaque Types

```aiken
// Opaque type ẩn implementation
pub opaque type PositiveInt {
  inner: Int,
}

// Chỉ có thể tạo qua function
pub fn new_positive(n: Int) -> Option<PositiveInt> {
  if n > 0 {
    Some(PositiveInt { inner: n })
  } else {
    None
  }
}

pub fn get_value(p: PositiveInt) -> Int {
  p.inner
}
```

---

## 7. Destructuring Patterns

### Full Destructuring

```aiken
type Person {
  name: ByteArray,
  age: Int,
  active: Bool,
}

fn greet(person: Person) -> ByteArray {
  let Person { name, age, active } = person
  name
}
```

### Partial Destructuring

```aiken
fn get_name(person: Person) -> ByteArray {
  let Person { name, .. } = person
  name
}

// Hoặc trong function signature
fn is_adult(Person { age, .. }: Person) -> Bool {
  age >= 18
}
```

### Nested Destructuring

```aiken
type Address {
  city: ByteArray,
  country: ByteArray,
}

type User {
  name: ByteArray,
  address: Address,
}

fn get_country(user: User) -> ByteArray {
  let User { address: Address { country, .. }, .. } = user
  country
}
```

---

## Code Examples

### main.ak

```aiken
// lib/custom_types/main.ak

use aiken/collection/list

/// ============================================================
/// Datum & Redeemer cho smart contract
/// ============================================================

pub type Datum {
  owner: ByteArray,
  beneficiary: ByteArray,
  deadline: Int,
  amount: Int,
}

pub type Redeemer {
  Claim
  Refund
  Update { new_deadline: Int }
}

/// ============================================================
/// Token representation
/// ============================================================

pub type AssetClass {
  policy_id: ByteArray,
  asset_name: ByteArray,
}

pub type Token {
  asset: AssetClass,
  amount: Int,
}

/// ============================================================
/// Transaction status
/// ============================================================

pub type TxStatus {
  Pending { submitted_at: Int }
  Confirmed { block_height: Int, confirmations: Int }
  Failed { error: ByteArray }
}

/// ============================================================
/// Generic Result type
/// ============================================================

pub type Result<ok, err> {
  Ok(ok)
  Err(err)
}

/// ============================================================
/// Functions
/// ============================================================

/// Tạo một Token mới
pub fn new_token(policy: ByteArray, name: ByteArray, qty: Int) -> Token {
  Token {
    asset: AssetClass { policy_id: policy, asset_name: name },
    amount: qty,
  }
}

/// Kiểm tra token có phải native ADA không
pub fn is_ada(token: Token) -> Bool {
  let Token { asset: AssetClass { policy_id, asset_name }, .. } = token
  policy_id == "" && asset_name == ""
}

/// Kiểm tra xem transaction đã confirm chưa
pub fn is_confirmed(status: TxStatus) -> Bool {
  when status is {
    Confirmed { .. } -> True
    _ -> False
  }
}

/// Lấy số confirmations
pub fn get_confirmations(status: TxStatus) -> Option<Int> {
  when status is {
    Confirmed { confirmations, .. } -> Some(confirmations)
    _ -> None
  }
}

/// Validate redeemer action
pub fn is_valid_action(datum: Datum, redeemer: Redeemer, current_time: Int, signer: ByteArray) -> Bool {
  when redeemer is {
    Claim ->
      // Chỉ beneficiary có thể claim sau deadline
      signer == datum.beneficiary && current_time >= datum.deadline

    Refund ->
      // Chỉ owner có thể refund trước deadline
      signer == datum.owner && current_time < datum.deadline

    Update { new_deadline } ->
      // Chỉ owner có thể update, deadline mới phải sau deadline cũ
      signer == datum.owner && new_deadline > datum.deadline
  }
}

/// Map over Result
pub fn map_result(result: Result<a, e>, f: fn(a) -> b) -> Result<b, e> {
  when result is {
    Ok(value) -> Ok(f(value))
    Err(error) -> Err(error)
  }
}

/// Merge tokens với cùng asset class
pub fn merge_tokens(tokens: List<Token>) -> List<Token> {
  // Group và sum by asset class
  list.foldl(
    tokens,
    [],
    fn(acc, token) {
      if list.any(acc, fn(t) { t.asset == token.asset }) {
        list.map(acc, fn(t) {
          if t.asset == token.asset {
            Token { ..t, amount: t.amount + token.amount }
          } else {
            t
          }
        })
      } else {
        list.push(acc, token)
      }
    }
  )
}
```

### test.ak

```aiken
// lib/custom_types/test.ak

use custom_types/main.{
  Datum,
  Redeemer,
  Token,
  AssetClass,
  TxStatus,
  Result,
  new_token,
  is_ada,
  is_confirmed,
  get_confirmations,
  is_valid_action,
  map_result,
  merge_tokens,
  Claim,
  Refund,
  Update,
  Pending,
  Confirmed,
  Failed,
  Ok,
  Err,
}

// ===== Token Tests =====

test new_token_creates_correctly() {
  let token = new_token(#"abc123", "MyToken", 1000)
  token.amount == 1000 && token.asset.asset_name == "MyToken"
}

test is_ada_true_for_empty_policy() {
  let ada = Token {
    asset: AssetClass { policy_id: "", asset_name: "" },
    amount: 1_000_000,
  }
  is_ada(ada) == True
}

test is_ada_false_for_custom_token() {
  let token = new_token(#"abc", "Token", 100)
  is_ada(token) == False
}

// ===== TxStatus Tests =====

test is_confirmed_true() {
  let status = Confirmed { block_height: 1000, confirmations: 10 }
  is_confirmed(status) == True
}

test is_confirmed_false_for_pending() {
  let status = Pending { submitted_at: 12345 }
  is_confirmed(status) == False
}

test is_confirmed_false_for_failed() {
  let status = Failed { error: "Network error" }
  is_confirmed(status) == False
}

test get_confirmations_some() {
  let status = Confirmed { block_height: 1000, confirmations: 15 }
  get_confirmations(status) == Some(15)
}

test get_confirmations_none() {
  let status = Pending { submitted_at: 0 }
  get_confirmations(status) == None
}

// ===== Datum/Redeemer Validation Tests =====

test valid_claim_after_deadline() {
  let datum = Datum {
    owner: "owner_key",
    beneficiary: "beneficiary_key",
    deadline: 100,
    amount: 1000,
  }
  is_valid_action(datum, Claim, 150, "beneficiary_key") == True
}

test invalid_claim_before_deadline() {
  let datum = Datum {
    owner: "owner_key",
    beneficiary: "beneficiary_key",
    deadline: 100,
    amount: 1000,
  }
  is_valid_action(datum, Claim, 50, "beneficiary_key") == False
}

test invalid_claim_wrong_signer() {
  let datum = Datum {
    owner: "owner_key",
    beneficiary: "beneficiary_key",
    deadline: 100,
    amount: 1000,
  }
  is_valid_action(datum, Claim, 150, "wrong_key") == False
}

test valid_refund_before_deadline() {
  let datum = Datum {
    owner: "owner_key",
    beneficiary: "beneficiary_key",
    deadline: 100,
    amount: 1000,
  }
  is_valid_action(datum, Refund, 50, "owner_key") == True
}

test valid_update_new_deadline() {
  let datum = Datum {
    owner: "owner_key",
    beneficiary: "beneficiary_key",
    deadline: 100,
    amount: 1000,
  }
  is_valid_action(datum, Update { new_deadline: 200 }, 50, "owner_key") == True
}

// ===== Result Tests =====

test map_result_ok() {
  let result: Result<Int, ByteArray> = Ok(5)
  let mapped = map_result(result, fn(x) { x * 2 })
  mapped == Ok(10)
}

test map_result_err() {
  let result: Result<Int, ByteArray> = Err("error")
  let mapped = map_result(result, fn(x) { x * 2 })
  mapped == Err("error")
}

// ===== Merge Tokens Tests =====

test merge_tokens_same_asset() {
  let tokens = [
    new_token(#"abc", "Token", 100),
    new_token(#"abc", "Token", 200),
  ]
  let merged = merge_tokens(tokens)
  expect [Token { amount, .. }] = merged
  amount == 300
}

test merge_tokens_different_assets() {
  let tokens = [
    new_token(#"abc", "TokenA", 100),
    new_token(#"def", "TokenB", 200),
  ]
  let merged = merge_tokens(tokens)
  list.length(merged) == 2
}
```

---

## Custom Types Reference

| Type Kind | Example | Use Case |
|-----------|---------|----------|
| Record (Product) | `type User { name: ByteArray, age: Int }` | Grouping related data |
| Enum (Sum) | `type Status { Active, Inactive }` | One of several options |
| Enum with Data | `type Result { Ok(Int), Err(ByteArray) }` | Options with associated data |
| Generic | `type Box<a> { value: a }` | Reusable with different types |
| Recursive | `type List<a> { Nil, Cons(a, List<a>) }` | Self-referential structures |
| Type Alias | `type Address = ByteArray` | Semantic naming |

---

## Checklist hoàn thành

- [ ] Tạo được Record types
- [ ] Tạo được Enum types với/không data
- [ ] Sử dụng Generic types
- [ ] Hiểu và dùng Type aliases
- [ ] Pattern matching với custom types
- [ ] Destructuring records
- [ ] Tạo Datum và Redeemer types cho smart contract

---

➡️ **Tiếp theo**: [Bài 08 - Control Flow](./08_Control_flow.md)
