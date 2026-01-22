---
title: Dữ liệu (Data)
sidebar_position: 11
---

# Data trong Aiken

Bài học này hướng dẫn cách làm việc với kiểu Data - nền tảng serialization trong Cardano.

## Mục tiêu học tập

- Hiểu kiểu Data và vai trò trong Cardano
- Nắm cách upcast và downcast
- Serialize/deserialize custom types
- Tối ưu kích thước dữ liệu on-chain

## Data là gì?

`Data` là kiểu dữ liệu tổng quát trong Plutus - mọi dữ liệu on-chain đều là Data:

```
┌─────────────────────────────────────────────────────────────┐
│                    PLUTUS DATA                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                                          │
│   │   Integer   │  Số nguyên                               │
│   └─────────────┘                                          │
│   ┌─────────────┐                                          │
│   │  ByteArray  │  Mảng bytes                              │
│   └─────────────┘                                          │
│   ┌─────────────┐                                          │
│   │    List     │  Danh sách Data                          │
│   └─────────────┘                                          │
│   ┌─────────────┐                                          │
│   │     Map     │  Key-value pairs                         │
│   └─────────────┘                                          │
│   ┌─────────────┐                                          │
│   │    Constr   │  Constructor với tag + fields            │
│   └─────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Upcast - Chuyển đổi lên Data

Mọi kiểu Aiken đều có thể chuyển sang Data (an toàn):

```aiken title="lib/data_demo.ak"
fn upcast_examples() {
  // Int -> Data
  let int_data: Data = 42

  // ByteArray -> Data
  let bytes_data: Data = #"abc123"

  // List -> Data
  let list_data: Data = [1, 2, 3]

  // Custom type -> Data
  let user = User { name: "Alice", age: 25 }
  let user_data: Data = user

  int_data
}
```

### Sử dụng builtin.serialise_data

```aiken
use aiken/builtin

fn serialize_example() {
  let user = User { name: "Alice", age: 25 }

  // Serialize sang CBOR bytes
  let cbor_bytes = builtin.serialise_data(user)

  cbor_bytes
}
```

## Downcast - Chuyển đổi xuống từ Data

Chuyển từ Data về kiểu cụ thể - có thể thất bại:

### Với expect (fail nếu không match)

```aiken
fn downcast_with_expect(data: Data) {
  // Sẽ fail nếu data không phải User
  expect user: User = data

  user.name
}
```

### Với if/is (an toàn)

```aiken
fn downcast_with_if(data: Data) -> Option<User> {
  if data is user: User {
    Some(user)
  } else {
    None
  }
}
```

### Với pattern matching

```aiken
fn process_data(data: Data) -> Int {
  // Downcast thủ công
  when data is {
    // Integer
    n: Int -> n
    // ByteArray
    _: ByteArray -> 0
    // Không match
    _ -> -1
  }
}
```

## Custom Types và Data Encoding

### Encoding mặc định (Constr)

```aiken
type User {
  name: ByteArray,
  age: Int,
}

// Encoded as: Constr 0 [<name>, <age>]
```

### Tùy chỉnh constructor tag

```aiken
@tag(100)
type SpecialUser {
  name: ByteArray,
  age: Int,
}

// Encoded as: Constr 100 [<name>, <age>]
```

### Encoding dạng List

```aiken
@list
type Point {
  x: Int,
  y: Int,
}

// Encoded as: List [<x>, <y>]
// Nhẹ hơn Constr!
```

### Encoding cho Enum

```aiken
type Status {
  Pending    // Constr 0 []
  Active     // Constr 1 []
  Completed  // Constr 2 []
}

// Custom tags
type CustomStatus {
  @tag(10)
  Pending
  @tag(20)
  Active
  @tag(30)
  Completed
}
```

## Datum và Redeemer

### Datum - Dữ liệu đính kèm UTxO

```aiken title="lib/datum.ak"
pub type LockDatum {
  owner: ByteArray,
  deadline: Int,
  description: ByteArray,
}

// Trong validator
validator lock {
  spend(datum: Option<LockDatum>, _redeemer, _ref, tx) {
    expect Some(d) = datum

    // Sử dụng datum
    is_owner_signing(tx, d.owner) && is_after_deadline(tx, d.deadline)
  }
}
```

### Redeemer - Dữ liệu unlock

```aiken title="lib/redeemer.ak"
pub type UnlockRedeemer {
  Claim { signature: ByteArray }
  Cancel
  Extend { new_deadline: Int }
}

validator lock {
  spend(datum: Option<LockDatum>, redeemer: UnlockRedeemer, _ref, tx) {
    expect Some(d) = datum

    when redeemer is {
      Claim { signature } -> verify_signature(signature, d.owner)
      Cancel -> is_owner_signing(tx, d.owner)
      Extend { new_deadline } ->
        is_owner_signing(tx, d.owner) && new_deadline > d.deadline
    }
  }
}
```

## Tối ưu kích thước Data

### 1. Sử dụng @list thay vì Constr

```aiken
// ❌ Lớn hơn
type UserConstr {
  name: ByteArray,
  age: Int,
}

// ✅ Nhỏ hơn
@list
type UserList {
  name: ByteArray,
  age: Int,
}
```

### 2. Dùng Int thay vì Bool

```aiken
// ❌ Bool = Constr 0 [] hoặc Constr 1 []
type WithBool {
  is_active: Bool,
}

// ✅ Int = 0 hoặc 1 (nhỏ hơn)
type WithInt {
  is_active: Int,  // 0 = false, 1 = true
}
```

### 3. Giảm số fields

```aiken
// ❌ Nhiều fields nhỏ
type Verbose {
  field1: Int,
  field2: Int,
  field3: Int,
  field4: Int,
}

// ✅ Pack thành tuple nếu có thể
type Compact {
  fields: (Int, Int, Int, Int),
}
```

### 4. Sử dụng references

```aiken
// ❌ Duplicate data
type Order {
  user_info: UserInfo,  // Copy toàn bộ
  items: List<Item>,
}

// ✅ Reference by hash
type Order {
  user_hash: ByteArray,  // Chỉ lưu hash
  items: List<Item>,
}
```

## Working với Pairs

```aiken
use aiken/pairs

fn pair_examples() {
  // Tạo pair list
  let items: Pairs<ByteArray, Int> = [
    Pair("key1", 100),
    Pair("key2", 200),
  ]

  // Tìm giá trị
  let value = pairs.get_first(items, "key1")  // Some(100)

  // Thêm item
  let new_items = pairs.insert(items, "key3", 300)

  value
}
```

## Sơ đồ Data flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐         ┌─────────────┐                  │
│   │ Custom Type │ ──────▶ │    Data     │ ──── On-chain    │
│   │  (Aiken)    │ Upcast  │  (Plutus)   │                  │
│   └─────────────┘         └─────────────┘                  │
│          ▲                       │                          │
│          │                       │                          │
│          │ Downcast              │                          │
│          │ (expect/if is)        │                          │
│          │                       ▼                          │
│   ┌─────────────┐         ┌─────────────┐                  │
│   │ Custom Type │ ◀────── │    CBOR     │ ──── Storage     │
│   │  (Aiken)    │         │   (Bytes)   │                  │
│   └─────────────┘         └─────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Ví dụ thực hành

### Code: lib/escrow_datum.ak

```aiken title="lib/escrow_datum.ak"
//// Datum và Redeemer cho Escrow contract

/// Thông tin escrow
@list  // Tối ưu kích thước
pub type EscrowDatum {
  seller: ByteArray,
  buyer: ByteArray,
  amount: Int,
  deadline: Int,
}

/// Hành động unlock
pub type EscrowRedeemer {
  /// Buyer xác nhận đã nhận hàng
  Confirm
  /// Seller hủy sau deadline
  Cancel
  /// Dispute cần arbitrator
  Dispute { arbitrator: ByteArray }
}

/// Tạo datum mới
pub fn new_escrow(
  seller: ByteArray,
  buyer: ByteArray,
  amount: Int,
  deadline: Int,
) -> EscrowDatum {
  EscrowDatum { seller, buyer, amount, deadline }
}

/// Serialize datum để đưa on-chain
pub fn serialize(datum: EscrowDatum) -> Data {
  datum
}

/// Deserialize từ Data
pub fn deserialize(data: Data) -> Option<EscrowDatum> {
  if data is datum: EscrowDatum {
    Some(datum)
  } else {
    None
  }
}
```

### Test: lib/escrow_datum_test.ak

```aiken title="lib/escrow_datum_test.ak"
use escrow_datum.{EscrowDatum, EscrowRedeemer, new_escrow, serialize, deserialize}

test test_create_datum() {
  let datum = new_escrow(#"seller", #"buyer", 1_000_000, 1000)

  and {
    datum.seller == #"seller",
    datum.buyer == #"buyer",
    datum.amount == 1_000_000,
    datum.deadline == 1000,
  }
}

test test_serialize_deserialize() {
  let original = new_escrow(#"seller", #"buyer", 1_000_000, 1000)
  let data = serialize(original)
  expect Some(restored) = deserialize(data)

  original == restored
}

test test_redeemer_patterns() {
  let confirm = Confirm
  let cancel = Cancel
  let dispute = Dispute { arbitrator: #"arb" }

  // Test pattern matching
  let is_confirm = when confirm is {
    Confirm -> True
    _ -> False
  }

  let is_dispute = when dispute is {
    Dispute { arbitrator } -> arbitrator == #"arb"
    _ -> False
  }

  and { is_confirm, is_dispute }
}
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. Data = Kiểu tổng quát cho mọi dữ liệu on-chain         │
│  2. Upcast = Custom type → Data (luôn an toàn)             │
│  3. Downcast = Data → Custom type (có thể fail)            │
│  4. expect = Downcast + fail nếu không match               │
│  5. @list = Encoding nhẹ hơn Constr                        │
│  6. Datum = Dữ liệu lock, Redeemer = Dữ liệu unlock        │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về Unit Testing - cách viết và chạy tests trong Aiken.
