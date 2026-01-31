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

```text
┌─────────────────────────────────────────────────────────────┐
│                      PLUTUS DATA                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                                           │
│   │   Integer   │  Số nguyên                                │
│   └─────────────┘                                           │
│   ┌─────────────┐                                           │
│   │  ByteArray  │  Mảng bytes                               │
│   └─────────────┘                                           │
│   ┌─────────────┐                                           │
│   │    List     │  Danh sách Data                           │
│   └─────────────┘                                           │
│   ┌─────────────┐                                           │
│   │     Map     │  Key-value pairs                          │
│   └─────────────┘                                           │
│   ┌─────────────┐                                           │
│   │    Constr   │  Constructor với tag + fields             │
│   └─────────────┘                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Upcast - Chuyển đổi lên Data

Mọi kiểu Aiken đều có thể chuyển sang Data (an toàn):

```rust title="lib/data_demo.ak"
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

```rust
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

```rust
fn downcast_with_expect(data: Data) {
  // Sẽ fail nếu data không phải User
  expect user: User = data

  user.name
}
```

### Với if/is (an toàn)

```rust
fn downcast_with_if(data: Data) -> Option<User> {
  if data is user: User {
    Some(user)
  } else {
    None
  }
}
```

### Với pattern matching

```rust
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

```rust
type User {
  name: ByteArray,
  age: Int,
}

// Encoded as: Constr 0 [<name>, <age>]
```

### Tùy chỉnh constructor tag

```rust
@tag(100)
type SpecialUser {
  name: ByteArray,
  age: Int,
}

// Encoded as: Constr 100 [<name>, <age>]
```

### Encoding dạng List

```rust
@list
type Point {
  x: Int,
  y: Int,
}

// Encoded as: List [<x>, <y>]
// Nhẹ hơn Constr!
```

### Encoding cho Enum

```rust
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

## Sơ đồ Data flow

```text
┌─────────────────────────────────────────────────────────────┐
│                       DATA FLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐         ┌─────────────┐                   │
│   │ Custom Type │ ──────▶ │    Data     │ ──── On-chain     │
│   │  (Aiken)    │ Upcast  │  (Plutus)   │                   │
│   └─────────────┘         └─────────────┘                   │
│          ▲                       │                          │
│          │                       │                          │
│          │ Downcast              │                          │
│          │ (expect/if is)        │                          │
│          │                       ▼                          │
│   ┌─────────────┐         ┌─────────────┐                   │
│   │ Custom Type │ ◀────── │    CBOR     │ ──── Storage      │
│   │  (Aiken)    │         │   (Bytes)   │                   │
│   └─────────────┘         └─────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về Unit Testing - cách viết và chạy tests trong Aiken.
