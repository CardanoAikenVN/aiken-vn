---
title: Giới thiệu
sidebar_position: 2
---

# Giới thiệu về Aiken

Bài học này giới thiệu tổng quan về Aiken - ngôn ngữ lập trình smart contract hiện đại cho Cardano.

## Mục tiêu học tập

- Hiểu Aiken là gì và vì sao được tạo ra
- Nắm các đặc điểm chính của ngôn ngữ
- So sánh Aiken với các ngôn ngữ smart contract khác

## Aiken là gì?

**Aiken** là ngôn ngữ lập trình hàm (functional programming) được thiết kế đặc biệt cho việc viết smart contract trên blockchain Cardano.

### Đặc điểm nổi bật

```
┌─────────────────────────────────────────────────────────┐
│                    AIKEN FEATURES                       │
├─────────────────────────────────────────────────────────┤
│  ✓ Purely Functional    - Không có side effects        │
│  ✓ Strong Static Types  - Phát hiện lỗi compile-time   │
│  ✓ Type Inference       - Compiler tự suy luận kiểu    │
│  ✓ First-class Functions- Hàm là giá trị               │
│  ✓ Pattern Matching     - Xử lý dữ liệu mạnh mẽ        │
│  ✓ Built-in Testing     - Unit test & property test    │
└─────────────────────────────────────────────────────────┘
```

## Vì sao chọn Aiken?

### 1. Được thiết kế cho Cardano

Không giống các ngôn ngữ được "điều chỉnh" cho blockchain, Aiken được xây dựng từ đầu cho Cardano:

```aiken
// Aiken code biên dịch trực tiếp sang UPLC
// (Untyped Plutus Core) - định dạng native của Cardano

validator hello_world {
  spend(_datum, _redeemer, _ref, _tx) {
    True
  }
}
```

### 2. Cú pháp quen thuộc

Aiken lấy cảm hứng từ Rust, Elm và Gleam:

```aiken
// Khai báo hàm giống Rust
fn add(a: Int, b: Int) -> Int {
  a + b
}

// Pattern matching giống Elm
fn describe(n: Int) -> String {
  when n is {
    0 -> @"Zero"
    1 -> @"One"
    _ -> @"Many"
  }
}
```

### 3. Công cụ hoàn chỉnh

```
┌────────────────────────────────────────────────────────┐
│                   AIKEN TOOLCHAIN                      │
├────────────────────────────────────────────────────────┤
│  aiken new      →  Tạo dự án mới                      │
│  aiken build    →  Biên dịch sang Plutus              │
│  aiken check    →  Chạy test + type check             │
│  aiken fmt      →  Format code tự động               │
│  aiken docs     →  Tạo tài liệu HTML                  │
│  aiken lsp      →  Language Server cho editors        │
└────────────────────────────────────────────────────────┘
```

## So sánh với các ngôn ngữ khác

| Đặc điểm | Aiken | Plutus (Haskell) | Solidity |
|----------|-------|------------------|----------|
| Paradigm | Functional | Functional | Imperative |
| Học dễ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| An toàn | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Tooling | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Blockchain | Cardano | Cardano | Ethereum |

## Lập trình hàm là gì?

Trong lập trình hàm, chúng ta:

### Sử dụng hàm thuần túy (Pure Functions)

```aiken
// Hàm thuần túy - cùng input luôn cho cùng output
fn double(x: Int) -> Int {
  x * 2
}

// Không có biến thay đổi (mutation)
// Không có side effects
```

### Dữ liệu bất biến (Immutable Data)

```aiken
// Không thể thay đổi giá trị đã gán
let x = 5
// x = 10  // ❌ Lỗi! Không thể gán lại

// Thay vào đó, tạo giá trị mới
let y = x + 5  // y = 10
```

### Kết hợp hàm (Function Composition)

```aiken
fn add_one(x: Int) -> Int {
  x + 1
}

fn double(x: Int) -> Int {
  x * 2
}

// Pipe operator kết hợp hàm
let result = 5 |> add_one |> double  // (5 + 1) * 2 = 12
```

## Quy trình phát triển với Aiken

```
┌─────────────────────────────────────────────────────────┐
│                 DEVELOPMENT WORKFLOW                    │
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐        │
│   │  Write   │───▶│  Check   │───▶│  Build   │        │
│   │  .ak     │    │  Tests   │    │  UPLC    │        │
│   └──────────┘    └──────────┘    └──────────┘        │
│        │               │               │               │
│        ▼               ▼               ▼               │
│   Aiken Source    aiken check    Plutus Binary        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Hello World trong Aiken

```aiken title="validators/hello.ak"
use aiken/collection/list

/// Validator đơn giản nhất
validator hello_world {
  spend(_datum, _redeemer, _own_ref, _tx) {
    // Luôn cho phép chi tiêu
    True
  }
}
```

### Giải thích từng phần

| Phần | Ý nghĩa |
|------|---------|
| `validator` | Từ khóa khai báo validator |
| `hello_world` | Tên validator |
| `spend` | Handler xử lý chi tiêu UTxO |
| `_datum` | Dữ liệu đính kèm (bỏ qua với `_`) |
| `_redeemer` | Dữ liệu unlock (bỏ qua) |
| `True` | Kết quả - cho phép giao dịch |

## Tài nguyên học tập

- [Aiken Official Docs](https://aiken-lang.org)
- [Aiken GitHub](https://github.com/aiken-lang)
- [Cardano Developer Portal](https://developers.cardano.org)

## Tóm tắt

```
┌─────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                        │
├─────────────────────────────────────────────────────────┤
│  1. Aiken = Ngôn ngữ hàm cho Cardano smart contracts   │
│  2. Cú pháp giống Rust, dễ học                         │
│  3. Strong typing + inference = ít lỗi runtime         │
│  4. Toolchain hoàn chỉnh: build, test, format, docs    │
│  5. Biên dịch sang UPLC - native Cardano format        │
└─────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học cách sử dụng Aiken CLI để quản lý dự án hiệu quả.
