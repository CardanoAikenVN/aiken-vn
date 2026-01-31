---
title: Aiken CLI
sidebar_position: 3
---

# Aiken CLI

Bài học này hướng dẫn sử dụng Aiken Command Line Interface (CLI) - công cụ chính để phát triển smart contract.

## Mục tiêu học tập

- Làm chủ các lệnh Aiken CLI
- Hiểu workflow phát triển chuẩn
- Biết cách debug và tối ưu

## Tổng quan các lệnh

```
┌────────────────────────────────────────────────────────────┐
│                    AIKEN CLI COMMANDS                      │
├────────────────────────────────────────────────────────────┤
│  new        │  Tạo dự án mới                               │
│  build      │  Biên dịch validators sang Plutus            │
│  check      │  Kiểm tra types + chạy tests                 │
│  fmt        │  Format mã nguồn                             │
│  docs       │  Tạo tài liệu HTML                           │
│  blueprint  │  Xuất/chuyển đổi blueprint                   │
│  lsp        │  Khởi động Language Server                   │
│  completion │  Tạo shell completions                       │
└────────────────────────────────────────────────────────────┘
```

## aiken new - Tạo dự án

### Cú pháp

```bash
aiken new <owner>/<project-name>
```

### Ví dụ

```bash
aiken new aiken-vn/hello-world
```

Output:
```
     Created aiken-vn/hello-world
```

### Cấu trúc được tạo

```
hello-world/
├── aiken.toml           # Cấu hình dự án
├── lib/                 # Thư viện chia sẻ
│   └── .gitkeep
└── validators/          # Smart contracts
    └── .gitkeep
```

## aiken build - Biên dịch

### Cú pháp cơ bản

```bash
aiken build
```

### Các options

```bash
# Hiển thị trace logs
aiken build --trace-level verbose

# Giữ tên biến trong output (debug)
aiken build --keep-traces

# Chỉ định thư mục output
aiken build --out-dir ./dist
```

### Output

```
    Compiling aiken-vn/hello-world 0.0.0
    Finished compilation in 0.15s

    Wrote plutus.json
```

## aiken check - Kiểm tra và Test

### Chạy tất cả tests

```bash
aiken check
```

Output mẫu:
```
    Compiling aiken-vn/hello-world 0.0.0
      Testing ...

    ┍━ hello_world ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    │ PASS [mem: 1234, cpu: 5678] test_always_succeeds
    │ PASS [mem: 2345, cpu: 6789] test_with_datum
    ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2 tests | 2 passed | 0 failed

Summary
    0 errors, 0 warnings
```

### Lọc tests theo pattern

```bash
# Chạy tests trong module cụ thể
aiken check -m "hello_world"

# Match chính xác tên
aiken check -m "hello_world" -e

# Chạy test cụ thể
aiken check -m "hello_world.{test_always_succeeds}"
```

### Hiển thị traces

```bash
aiken check --trace-level verbose
```

## aiken fmt - Format code

### Format toàn bộ dự án

```bash
aiken fmt
```

### Chỉ kiểm tra (không sửa)

```bash
aiken fmt --check
```

Output khi có file cần format:
```
The following files need to be formatted:
  - validators/hello.ak
```

## aiken docs - Tạo tài liệu

### Tạo tài liệu HTML

```bash
aiken docs
```

Output được tạo trong `docs/`:
```
docs/
├── index.html
├── hello_world.html
└── assets/
    ├── style.css
    └── search.js
```

### Mở tài liệu

```bash
aiken docs --open
```

## aiken blueprint - Quản lý Blueprint

### Xuất blueprint

```bash
aiken blueprint convert
```

### Áp dụng parameters

```bash
aiken blueprint apply <param-file>
```

### Hiển thị địa chỉ validator

```bash
aiken blueprint address
```

## Workflow phát triển chuẩn

```
┌─────────────────────────────────────────────────────────────┐
│                 STANDARD DEV WORKFLOW                       │
│                                                             │
│   1. aiken new              ← Khởi tạo dự án               │
│          │                                                  │
│          ▼                                                  │
│   2. Viết code .ak          ← Phát triển logic             │
│          │                                                  │
│          ▼                                                  │
│   3. aiken check            ← Test liên tục                │
│          │                                                  │
│          ├── FAIL ──────────┐                              │
│          │                  ▼                              │
│          │            Fix lỗi → quay lại 3                 │
│          │                                                  │
│          ▼ PASS                                            │
│   4. aiken build            ← Biên dịch production         │
│          │                                                  │
│          ▼                                                  │
│   5. Deploy plutus.json     ← Triển khai on-chain          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ tìm hiểu chi tiết cấu trúc dự án Aiken và cách tổ chức code hiệu quả.
