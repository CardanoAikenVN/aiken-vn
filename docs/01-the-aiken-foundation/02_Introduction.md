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

```text
┌─────────────────────────────────────────────────────────┐
│                    AIKEN FEATURES                       │
├─────────────────────────────────────────────────────────┤
│  ✓ Purely Functional     - Không có side effects        │
│  ✓ Strong Static Types   - Phát hiện lỗi compile-time   │
│  ✓ Type Inference        - Compiler tự suy luận kiểu    │
│  ✓ First-class Functions - Hàm là giá trị               │
│  ✓ Pattern Matching      - Xử lý dữ liệu mạnh mẽ        │
│  ✓ Built-in Testing      - Unit test & property test    │
└─────────────────────────────────────────────────────────┘
```

## Vì sao chọn Aiken?

### 1. Cú pháp quen thuộc

Aiken lấy cảm hứng từ Rust, Elm và Gleam:

```rust
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

## So sánh với các ngôn ngữ khác

| Đặc điểm   | Aiken      | Plutus (Haskell) |
| ---------- | ---------- | ---------------- |
| Paradigm   | Functional | Functional       |
| Học dễ     | ⭐⭐⭐⭐⭐      | ⭐⭐               |
| An toàn    | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐⭐            |
| Tooling    | ⭐⭐⭐⭐⭐      | ⭐⭐⭐              |
| Blockchain | Cardano    | Cardano          |

## Quy trình phát triển với Aiken

```text
┌─────────────────────────────────────────────────────────┐
│                 DEVELOPMENT WORKFLOW                    │
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│   │  Write   │───▶│  Check   │───▶│  Build   │         │
│   │  .ak     │    │  Tests   │    │  UPLC    │         │
│   └──────────┘    └──────────┘    └──────────┘         │
│        │               │               │                │
│        ▼               ▼               ▼                │
│   Aiken Source    aiken check     Plutus Binary         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Hello World trong Aiken

```rust title="validators/hello.ak"
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

| Phần          | Ý nghĩa                           |
| ------------- | --------------------------------- |
| `validator`   | Từ khóa khai báo validator        |
| `hello_world` | Tên validator                     |
| `spend`       | Handler xử lý chi tiêu UTxO       |
| `_datum`      | Dữ liệu đính kèm (bỏ qua với `_`) |
| `_redeemer`   | Dữ liệu unlock (bỏ qua)           |
| `True`        | Kết quả - cho phép giao dịch      |

## Tài nguyên học tập

- [Aiken Official Docs](https://aiken-lang.org)
- [Aiken GitHub](https://github.com/aiken-lang)
- [Cardano Developer Portal](https://developers.cardano.org)

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học cách sử dụng Aiken CLI để quản lý dự án hiệu quả.
