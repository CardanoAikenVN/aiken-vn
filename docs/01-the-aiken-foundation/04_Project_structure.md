---
title: Cấu trúc dự án
sidebar_position: 4
---

# Cấu trúc dự án Aiken

Bài học này giúp bạn hiểu cách tổ chức một dự án Aiken chuyên nghiệp.

## Mục tiêu học tập

- Hiểu cấu trúc thư mục chuẩn
- Biết mục đích từng thành phần
- Nắm cách cấu hình dự án

## Cấu trúc thư mục chuẩn

```
my-project/
├── aiken.toml              # File cấu hình dự án
├── plutus.json             # Output sau khi build
├── lib/                    # Thư viện nội bộ
│   ├── types.ak            # Định nghĩa types
│   ├── utils.ak            # Hàm tiện ích
│   └── my_module/
│       └── helpers.ak
├── validators/             # Smart contracts
│   ├── spend.ak            # Spending validator
└── env/                    # Cấu hình môi trường
    └── default.ak
```

## Chi tiết từng thành phần

### aiken.toml - File cấu hình

```toml title="aiken.toml"
name = "my-org/my-project"
version = "0.1.0"
license = "Apache-2.0"
description = "Mô tả dự án của bạn"

[repository]
user = "my-org"
project = "my-project"
platform = "github"

[[dependencies]]
name = "aiken-lang/stdlib"
version = "v2.2.0"
source = "github"

[[dependencies]]
name = "aiken-lang/fuzz"
version = "v2.1.0"
source = "github"
```

## Thư mục lib/

Chứa code thư viện có thể tái sử dụng:

```
lib/
├── types.ak              # Types dùng chung
├── utils.ak              # Hàm helper
└── validation/
    ├── signature.ak      # Logic xác thực chữ ký
    └── time.ak           # Logic xử lý thời gian
```

## Thư mục validators/

Chứa các smart contract:

```
validators/
├── spend.ak              # Spending validator
```

## Thư mục env/ - Cấu hình môi trường

```
env/
├── default.ak            # Cấu hình mặc định
├── testnet.ak            # Cấu hình testnet
└── mainnet.ak            # Cấu hình mainnet
```

### Chuyển đổi môi trường

```bash
# Sử dụng cấu hình testnet
aiken build --env testnet

# Sử dụng cấu hình mainnet
aiken build --env mainnet
```

## File plutus.json

## Sơ đồ tổng quan

```text
┌─────────────────────────────────────────────────────────────┐
│                    PROJECT STRUCTURE                        │
│                                                             │
│   ┌─────────────┐                                           │
│   │ aiken.toml  │ ← Cấu hình + dependencies                 │
│   └─────────────┘                                           │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐     ┌─────────────┐                       │
│   │    lib/     │────▶│ validators/ │                       │
│   │  (reusable) │     │  (contracts)│                       │
│   └─────────────┘     └─────────────┘                       │
│          │                   │                              │
│          └─────────┬─────────┘                              │
│                    ▼                                        │
│             ┌─────────────┐                                 │
│             │ aiken build │                                 │
│             └─────────────┘                                 │
│                    │                                        │
│                    ▼                                        │
│             ┌─────────────┐                                 │
│             │ plutus.json │ ← Compiled output               │
│             └─────────────┘                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Best Practices

### 1. Tổ chức theo tính năng

```
lib/
├── auction/
│   ├── types.ak
│   ├── validation.ak
│   └── helpers.ak
└── marketplace/
    ├── types.ak
    └── validation.ak
```

### 2. Đặt tên nhất quán

| Loại | Convention | Ví dụ |
|------|------------|-------|
| File | snake_case | `user_info.ak` |
| Type | PascalCase | `UserInfo` |
| Function | snake_case | `validate_user` |
| Constant | snake_case | `min_amount` |

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về biến và hằng số trong Aiken - nền tảng để lưu trữ dữ liệu.
