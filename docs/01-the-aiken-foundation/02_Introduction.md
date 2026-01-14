---
title: "02. Giới Thiệu về Aiken"
sidebar_position: 2
description: "Hiểu về Aiken, tại sao nên sử dụng Aiken và các đặc điểm nổi bật của ngôn ngữ"
---

# Bài 02: Giới Thiệu về Aiken

> **Mục tiêu**: Hiểu về Aiken, tại sao nên sử dụng Aiken và các đặc điểm nổi bật của ngôn ngữ

---

## Aiken là gì?

> *"Aiken is a modern programming language and toolkit for developing smart contracts on the Cardano blockchain"*

**Aiken** là ngôn ngữ lập trình **functional** (hàm) được thiết kế đặc biệt cho việc phát triển smart contract trên blockchain **Cardano**.

:::info Về tên gọi
Aiken được đặt tên theo **Howard Aiken** - nhà vật lý Mỹ, tiên phong trong lĩnh vực máy tính.
:::

---

## Tại sao cần Aiken?

### Vấn đề với Plutus-Tx (Haskell)

Trước Aiken, để viết smart contract trên Cardano, developer phải sử dụng **Plutus-Tx** - một framework dựa trên Haskell.

**Những thách thức với Plutus-Tx:**
- ❌ Haskell có learning curve rất dốc
- ❌ Cấu hình phức tạp, cần GHC và nhiều dependencies
- ❌ Thời gian compile lâu
- ❌ Error messages khó hiểu
- ❌ Khó debug và test

### Giải pháp: Aiken

**Aiken mang đến:**
- ✅ Cú pháp đơn giản, dễ học (giống Rust/Elm/Gleam)
- ✅ Zero configuration - chỉ cần 1 tool
- ✅ Error messages thân thiện và helpful
- ✅ Build cực nhanh
- ✅ Test framework tích hợp sẵn
- ✅ LSP support cho editor

---

## Đặc điểm chính của Aiken

### 1. Pure Functional Programming

```aiken
// Aiken là ngôn ngữ functional thuần tuý
// Mọi thứ đều là expression (biểu thức)

fn add(x: Int, y: Int) -> Int {
  x + y  // Không cần return keyword
}

// Functions là first-class citizens
fn apply_twice(f: fn(Int) -> Int, x: Int) -> Int {
  f(f(x))
}
```

### 2. Strong Static Typing với Type Inference

```aiken
// Type inference: compiler tự suy luận kiểu
let x = 42        // Int được suy luận tự động
let name = "Ada"  // ByteArray được suy luận

// Bạn cũng có thể explicit type annotation
let age: Int = 25
let greeting: ByteArray = "Hello"
```

### 3. Custom Types (Algebraic Data Types)

```aiken
// Record type
type User {
  name: ByteArray,
  age: Int,
  is_active: Bool,
}

// Enum type
type Status {
  Active
  Inactive
  Pending { reason: ByteArray }
}

// Generic type
type Option<a> {
  None
  Some(a)
}
```

### 4. Pattern Matching

```aiken
fn describe_age(age: Int) -> ByteArray {
  when age is {
    0 -> "newborn"
    1 | 2 | 3 -> "toddler"
    n if n < 13 -> "child"
    n if n < 20 -> "teenager"
    _ -> "adult"
  }
}
```

---

## Kiến trúc Aiken

**Aiken Toolchain Pipeline:**

| Bước | Input | Output |
|------|-------|--------|
| 1. Source | File `.ak` | - |
| 2. Parser | Source code | AST |
| 3. Type Check | AST | Typed AST |
| 4. Compile | Typed AST | UPLC Output |

**Aiken Features:**

| Feature | Mô tả |
|---------|-------|
| Package Manager | Quản lý dependencies |
| Test Framework | Unit tests & property tests |
| Doc Generator | Tạo documentation HTML |
| LSP Server | Editor integration |
| Formatter | Code formatting |
| Cost Evaluator | Đánh giá chi phí execution |

---

## So sánh với các ngôn ngữ khác

| Đặc điểm | Aiken | Plutus-Tx | Solidity |
|----------|-------|-----------|----------|
| Blockchain | Cardano | Cardano | Ethereum |
| Paradigm | Functional | Functional | Imperative |
| Learning Curve | Dễ học | Khó học | Trung bình |
| Type System | Strong + Inference | Strong + Inference | Weak |
| Build Time | Rất nhanh | Chậm | Nhanh |
| Tooling | Tích hợp | Phức tạp | Tốt |

---

## Nguồn cảm hứng thiết kế

Aiken lấy cảm hứng từ nhiều ngôn ngữ hiện đại:

| Ngôn ngữ | Ảnh hưởng |
|----------|-----------|
| **Rust** | Syntax familiar, Pattern matching, Result/Option types |
| **Elm** | Friendly errors, Type inference, Simple language |
| **Gleam** | Target BEAM/JS, Simple syntax, Great tooling |
| **Haskell** | Pure functional, Strong types, ADTs |

---

## Hello World trong Aiken

Hãy xem một validator đơn giản:

```aiken
// validators/hello_world.ak

use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction}

/// Datum chứa thông tin owner
pub type Datum {
  owner: ByteArray,
}

/// Redeemer là message cần gửi
pub type Redeemer {
  msg: ByteArray,
}

/// Validator chính
validator hello_world {
  spend(
    datum: Option<Datum>,
    redeemer: Redeemer,
    _own_ref: OutputReference,
    self: Transaction,
  ) -> Bool {
    // Unwrap datum
    expect Some(Datum { owner }) = datum

    // Kiểm tra message
    let must_say_hello = redeemer.msg == "Hello, World!"

    // Kiểm tra signature
    let must_be_signed = list.has(self.extra_signatories, owner)

    // Cả hai điều kiện phải đúng
    must_say_hello && must_be_signed
  }
}
```

---

## Các dự án nổi bật sử dụng Aiken

| Dự án | Mô tả |
|-------|-------|
| **SundaeSwap** | DEX với 2016% improvement so với V1 |
| **JPG.store** | NFT Marketplace V3 |
| **Lenfi (V2)** | Lending Protocol |
| **Butane** | CDP Protocol |
| **MinSwap** | Top DEX on Cardano |

---

## Những điều cần nhớ

### Aiken CHỈ dành cho On-chain Code

| On-chain (Aiken) | Off-chain (JS/TS/Py) |
|------------------|----------------------|
| Validators | Build Tx |
| Minting Policies | Submit Tx |
| | Query Chain |

### On-chain vs Off-chain

| Aspect | On-chain (Aiken) | Off-chain |
|--------|------------------|-----------|
| Chức năng | Validate transactions | Build & submit transactions |
| Ngôn ngữ | Aiken | JavaScript, TypeScript, Python, etc. |
| Thực thi | Trên Cardano nodes | Trên client/server |
| Chi phí | Tốn phí (execution units) | Miễn phí |

---

## Quiz kiểm tra kiến thức

1. **Aiken compile xuống định dạng nào?**
   - [ ] EVM bytecode
   - [x] UPLC (Untyped Plutus Core)
   - [ ] WebAssembly
   - [ ] JVM bytecode

2. **Aiken là ngôn ngữ thuộc paradigm nào?**
   - [ ] Object-Oriented
   - [ ] Imperative
   - [x] Functional
   - [ ] Logic

3. **Aiken có thể dùng để làm gì?**
   - [ ] Build web frontend
   - [x] Viết validator scripts
   - [ ] Tạo mobile app
   - [ ] Query blockchain

---

## Bài tập

### Bài tập 1: Khám phá Playground
1. Truy cập https://play.aiken-lang.org
2. Chọn một ví dụ và đọc code
3. Thử modify và observe changes

### Bài tập 2: Đọc documentation
1. Truy cập https://aiken-lang.org/language-tour
2. Đọc qua các section cơ bản
3. Note lại 3 features bạn thấy thú vị nhất

---

## Checklist hoàn thành

- [ ] Hiểu Aiken là gì và tại sao cần Aiken
- [ ] Biết các đặc điểm chính của ngôn ngữ
- [ ] Phân biệt được on-chain và off-chain code
- [ ] Biết các dự án nổi bật sử dụng Aiken
- [ ] Thử nghiệm trên Playground

---

**Tuyệt vời! Bạn đã hiểu tổng quan về Aiken!**

➡️ **Tiếp theo**: [Bài 03 - Aiken CLI](./03_Aiken_CLI.md)
