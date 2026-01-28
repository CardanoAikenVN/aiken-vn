---
title: "11. Dữ liệu (Data)"
sidebar_position: 11
description: "Hiểu và làm việc với kiểu Data trong Aiken - Upcasting, Downcasting, Serialization với CBOR và PlutusData encoding"
---

# Bài 11: Dữ liệu (Data)

:::info Mục tiêu
Hiểu và làm việc với kiểu Data trong Aiken
:::

## Bạn sẽ học

- Data type là gì và tại sao quan trọng
- Upcasting (to Data) và Downcasting (from Data)
- Serialization với CBOR
- PlutusData encoding
- Làm việc với datum và redeemer

---

## Data Type Overview

`Data` là kiểu **generic** đại diện cho bất kỳ dữ liệu Plutus nào. Đây là cầu nối giữa Aiken types và on-chain data.

| Thành phần | Mô tả |
|------------|-------|
| On-chain (Plutus Core) | Data (CBOR) |
| Aiken (High-level) | Custom Types (Structs) |
| Cầu nối | Serialization |

**Data có thể là:**
- Integer
- ByteString
- List\<Data\>
- Map\<Data, Data\>
- Constructor(tag, List\<Data\>)

---

## 1. Data Representations

Trong Plutus Core, Data có 5 constructors:

```aiken
// Nếu Data là một Aiken type, nó sẽ trông như thế này:
// (Đây chỉ là minh họa - không phải code thực)
type PlutusData {
  Integer(Int)
  ByteString(ByteArray)
  List(List<PlutusData>)
  Map(List<(PlutusData, PlutusData)>)
  Constr { tag: Int, fields: List<PlutusData> }
}
```

### Cách Aiken encode types thành Data

| Aiken Type | Data Representation |
|------------|---------------------|
| `Int` | `Integer(n)` |
| `ByteArray` | `ByteString(bytes)` |
| `List<T>` | `List([...])` |
| `Bool` | `Constr { tag: 0/1, fields: [] }` |
| `Option<T>` | `Constr { tag: 0/1, ... }` |
| Custom Types | `Constr { tag: variant_index, fields: [...] }` |

---

## 2. Upcasting (to Data)

Chuyển từ **specific type → Data**. Xảy ra **tự động**.

```aiken
type MyDatum {
  owner: ByteArray,
  amount: Int,
}

fn upcast_example() {
  let datum = MyDatum { owner: #"abc123", amount: 1000 }

  // Upcasting tự động khi assign cho Data variable
  let as_data: Data = datum

  // Hoặc khi pass vào function nhận Data
  process_data(datum)  // datum được upcast thành Data
}

fn process_data(d: Data) -> Bool {
  True
}
```

### Explicit Upcasting

```aiken
use aiken/builtin

fn explicit_upcast() {
  // Int to Data
  let int_data: Data = builtin.i_data(42)

  // ByteArray to Data
  let bytes_data: Data = builtin.b_data(#"hello")

  // List to Data
  let list_data: Data = builtin.list_data([int_data, bytes_data])

  int_data
}
```

---

## 3. Downcasting (from Data)

Chuyển từ **Data → specific type**. Cần dùng `expect` hoặc `if/is`.

### Với expect (fails if wrong type)

```aiken
fn downcast_expect(data: Data) -> Int {
  // Sẽ fail nếu data không phải Int
  expect value: Int = data
  value
}

fn downcast_custom_type(data: Data) -> MyDatum {
  // Sẽ fail nếu structure không match
  expect datum: MyDatum = data
  datum
}
```

### Với if/is (safe casting)

```aiken
fn downcast_safe(data: Data) -> Option<Int> {
  if data is value: Int {
    Some(value)
  } else {
    None
  }
}

fn downcast_custom_safe(data: Data) -> Option<MyDatum> {
  if data is datum: MyDatum {
    Some(datum)
  } else {
    None
  }
}
```

---

## 4. Serialization với CBOR

Data được encode thành **CBOR** (Concise Binary Object Representation).

```aiken
use aiken/cbor

fn serialization_example() {
  let value = 42

  // Serialize thành ByteArray (CBOR)
  let serialized: ByteArray = cbor.serialise(value)

  // Diagnostic output (for debugging)
  trace cbor.diagnostic(value)

  serialized
}

fn serialize_custom_type() {
  let datum = MyDatum { owner: #"abc", amount: 100 }

  // Custom types cũng có thể serialize
  let serialized = cbor.serialise(datum)

  serialized
}
```

### CBOR Diagnostic

```aiken
// Trong verbose mode, trace sẽ hiển thị CBOR diagnostic format:

// Int: 42
// ByteArray: h'616263' (hex of "abc")
// List: [1, 2, 3]
// Custom type: 121([h'616263', 100])
//              ^ constructor tag
```

---

## 5. Làm việc với Datum và Redeemer

Trong validators, datum và redeemer thường được nhận dưới dạng `Data`.

### Option\<Data\> Pattern (Mới)

```aiken
validator my_validator {
  spend(
    datum: Option<Data>,     // Datum có thể None
    redeemer: Data,          // Redeemer luôn có
    _output_ref: Data,
    _self: Data,
  ) {
    // Downcast datum
    expect Some(raw_datum) = datum
    expect my_datum: MyDatum = raw_datum

    // Downcast redeemer
    expect my_redeemer: MyRedeemer = redeemer

    // Validation logic
    my_datum.amount > 0
  }
}
```

### Typed Datum Pattern

```aiken
// Có thể khai báo type trực tiếp trong validator signature
validator typed_validator {
  spend(
    datum: Option<MyDatum>,   // Typed datum
    redeemer: MyRedeemer,     // Typed redeemer
    _output_ref: Data,
    _self: Data,
  ) {
    expect Some(d) = datum
    d.amount > 0
  }
}
```

---

## 6. PlutusData Encoding

### Custom Type Encoding

```aiken
// Single constructor type
type Simple {
  value: Int,
}
// Encodes as: Constr(0, [Integer(value)])

// Multiple constructors
type Status {
  Active      // Constr(0, [])
  Inactive    // Constr(1, [])
  Pending     // Constr(2, [])
}

type Result {
  Ok(Int)        // Constr(0, [Integer(n)])
  Err(ByteArray) // Constr(1, [ByteString(msg)])
}
```

### Constructor Tags

```aiken
// Tags được gán theo thứ tự định nghĩa

type Action {
  First    // tag = 0
  Second   // tag = 1
  Third    // tag = 2
}

// Với data
type ActionWithData {
  Create { name: ByteArray }     // tag = 0, fields = [name]
  Update { id: Int, value: Int } // tag = 1, fields = [id, value]
  Delete { id: Int }             // tag = 2, fields = [id]
}
```

---

## 7. Working with Opaque Data

Đôi khi bạn cần làm việc với Data mà không biết type cụ thể.

```aiken
use aiken/builtin

/// Extract integer from Data
pub fn unwrap_int(data: Data) -> Int {
  expect value: Int = data
  value
}

/// Check if Data is an integer
pub fn is_int(data: Data) -> Bool {
  if data is _: Int {
    True
  } else {
    False
  }
}

/// Get constructor index of Data
pub fn get_constr_index(data: Data) -> Option<Int> {
  // This requires working with raw CBOR
  todo @"Complex implementation"
}
```

---

## Code mẫu hoàn chỉnh

```aiken
// ═══════════════════════════════════════════════════════════
// Bài 11: Data - Code Examples
// ═══════════════════════════════════════════════════════════

use aiken/cbor

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

/// Token information
pub type TokenInfo {
  policy_id: ByteArray,
  asset_name: ByteArray,
  quantity: Int,
}

/// Datum for a simple vault
pub type VaultDatum {
  owner: ByteArray,
  locked_until: Int,
  tokens: List<TokenInfo>,
}

/// Redeemer actions
pub type VaultAction {
  Deposit { token: TokenInfo }
  Withdraw { amount: Int }
  Extend { new_deadline: Int }
}

// ─────────────────────────────────────────────────────────────
// UPCASTING
// ─────────────────────────────────────────────────────────────

/// Upcast to Data (implicit)
pub fn upcast_implicit() -> Data {
  let datum = VaultDatum {
    owner: #"abc123",
    locked_until: 1000,
    tokens: [],
  }

  // Implicit upcasting
  datum
}

/// Upcast with explicit annotation
pub fn upcast_explicit() -> Data {
  let token = TokenInfo {
    policy_id: #"policy",
    asset_name: "Token",
    quantity: 100,
  }

  let as_data: Data = token
  as_data
}

// ─────────────────────────────────────────────────────────────
// DOWNCASTING
// ─────────────────────────────────────────────────────────────

/// Downcast with expect (unsafe)
pub fn downcast_unsafe(data: Data) -> VaultDatum {
  expect datum: VaultDatum = data
  datum
}

/// Downcast with if/is (safe)
pub fn downcast_safe(data: Data) -> Option<VaultDatum> {
  if data is datum: VaultDatum {
    Some(datum)
  } else {
    None
  }
}

/// Extract specific field from Data
pub fn get_owner(data: Data) -> ByteArray {
  expect datum: VaultDatum = data
  datum.owner
}

// ─────────────────────────────────────────────────────────────
// VALIDATION HELPERS
// ─────────────────────────────────────────────────────────────

/// Validate datum structure
pub fn validate_datum(raw_datum: Data) -> Bool {
  if raw_datum is datum: VaultDatum {
    datum.locked_until > 0 &&
    bytearray.length(datum.owner) == 28
  } else {
    False
  }
}

/// Parse redeemer action
pub fn parse_action(raw_redeemer: Data) -> Option<VaultAction> {
  if raw_redeemer is action: VaultAction {
    Some(action)
  } else {
    None
  }
}

/// Process action
pub fn process_action(
  datum: VaultDatum,
  action: VaultAction,
  current_time: Int,
) -> Bool {
  when action is {
    Deposit { token } -> {
      // Allow deposit anytime
      token.quantity > 0
    }

    Withdraw { amount } -> {
      // Only after lock expires
      current_time > datum.locked_until && amount > 0
    }

    Extend { new_deadline } -> {
      // Can only extend, not shorten
      new_deadline > datum.locked_until
    }
  }
}

// ─────────────────────────────────────────────────────────────
// SERIALIZATION
// ─────────────────────────────────────────────────────────────

/// Serialize datum to bytes
pub fn serialize_datum(datum: VaultDatum) -> ByteArray {
  cbor.serialise(datum)
}

/// Create datum hash (conceptual)
pub fn datum_bytes(owner: ByteArray, deadline: Int) -> ByteArray {
  let datum = VaultDatum {
    owner: owner,
    locked_until: deadline,
    tokens: [],
  }
  cbor.serialise(datum)
}

// ─────────────────────────────────────────────────────────────
// TESTS
// ─────────────────────────────────────────────────────────────

test upcast_and_downcast() {
  let original = VaultDatum {
    owner: #"aabbccdd",
    locked_until: 500,
    tokens: [],
  }

  // Upcast
  let as_data: Data = original

  // Downcast
  expect recovered: VaultDatum = as_data

  recovered.owner == original.owner &&
  recovered.locked_until == original.locked_until
}

test safe_downcast_success() {
  let datum = VaultDatum { owner: #"abc", locked_until: 100, tokens: [] }
  let data: Data = datum

  when downcast_safe(data) is {
    Some(d) -> d.owner == #"abc"
    None -> False
  }
}

test safe_downcast_failure() {
  // Int cannot be cast to VaultDatum
  let data: Data = 42

  downcast_safe(data) == None
}

test validate_datum_valid() {
  let datum = VaultDatum {
    owner: #"0011223344556677889900112233445566778899001122334455667788",
    locked_until: 1000,
    tokens: [],
  }
  let data: Data = datum

  validate_datum(data)
}

test process_deposit() {
  let datum = VaultDatum { owner: #"abc", locked_until: 1000, tokens: [] }
  let action = Deposit { token: TokenInfo { policy_id: #"", asset_name: "T", quantity: 10 } }

  process_action(datum, action, 500)
}

test process_withdraw_before_deadline() {
  let datum = VaultDatum { owner: #"abc", locked_until: 1000, tokens: [] }
  let action = Withdraw { amount: 100 }

  !process_action(datum, action, 500)  // Should fail
}

test process_withdraw_after_deadline() {
  let datum = VaultDatum { owner: #"abc", locked_until: 1000, tokens: [] }
  let action = Withdraw { amount: 100 }

  process_action(datum, action, 1500)  // Should pass
}

test serialization_deterministic() {
  let datum1 = VaultDatum { owner: #"abc", locked_until: 100, tokens: [] }
  let datum2 = VaultDatum { owner: #"abc", locked_until: 100, tokens: [] }

  serialize_datum(datum1) == serialize_datum(datum2)
}
```

---

## Tổng kết

| Khái niệm | Mô tả |
|-----------|-------|
| **Data** | Generic Plutus data type |
| **Upcasting (to Data)** | Automatic khi assigned to Data variable. Any serializable type can become Data |
| **Downcasting (from Data)** | `expect value: Type = data` (fails if mismatch) hoặc `if data is value: Type` (returns Option) |
| **Serialization** | `cbor.serialise(value)` → ByteArray, `cbor.diagnostic(value)` → trace output |
| **Trong validators** | `datum: Option<Data>` hoặc `Option<MyType>`, `redeemer: Data` hoặc `MyRedeemer` |

---

## Bài tiếp theo

[Bài 12: Kiểm thử đơn vị](/docs/01-the-aiken-foundation/12_Unit_test)
