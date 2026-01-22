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
│   └── mint.ak             # Minting policy
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

### Giải thích các trường

| Trường | Mô tả |
|--------|-------|
| `name` | Định danh dự án theo format org/project |
| `version` | Phiên bản theo semver |
| `dependencies` | Các package phụ thuộc |

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

### Ví dụ: lib/types.ak

```aiken title="lib/types.ak"
/// Thông tin người dùng
pub type UserInfo {
  owner: ByteArray,
  created_at: Int,
}

/// Trạng thái contract
pub type ContractState {
  Active
  Paused
  Completed
}
```

### Ví dụ: lib/utils.ak

```aiken title="lib/utils.ak"
use aiken/collection/list

/// Kiểm tra danh sách có chứa phần tử
pub fn contains(items: List<a>, target: a) -> Bool {
  list.any(items, fn(item) { item == target })
}

/// Đếm số phần tử thỏa điều kiện
pub fn count_if(items: List<a>, predicate: fn(a) -> Bool) -> Int {
  list.foldr(
    items,
    0,
    fn(item, acc) {
      if predicate(item) {
        acc + 1
      } else {
        acc
      }
    },
  )
}
```

## Thư mục validators/

Chứa các smart contract:

```
validators/
├── lock.ak               # Validator khóa tài sản
├── unlock.ak             # Logic mở khóa
└── nft/
    └── mint.ak           # Minting policy cho NFT
```

### Ví dụ: validators/lock.ak

```aiken title="validators/lock.ak"
use types.{UserInfo}

/// Validator khóa tài sản cho đến deadline
validator time_lock(deadline: Int) {
  spend(datum: Option<UserInfo>, _redeemer, _own_ref, tx) {
    // Lấy thời gian hiện tại từ validity range
    expect Some(user_info) = datum

    // Kiểm tra điều kiện mở khóa
    let current_time = get_current_time(tx)
    current_time > deadline
  }
}

fn get_current_time(tx) -> Int {
  // Logic lấy thời gian từ transaction
  0
}
```

## Thư mục env/ - Cấu hình môi trường

```
env/
├── default.ak            # Cấu hình mặc định
├── testnet.ak            # Cấu hình testnet
└── mainnet.ak            # Cấu hình mainnet
```

### Ví dụ: env/default.ak

```aiken title="env/default.ak"
/// Network ID
pub const network_id = 0

/// Admin public key hash
pub const admin_pkh = #"abc123..."

/// Phí giao dịch tối thiểu
pub const min_fee = 1_000_000
```

### Sử dụng trong code

```aiken
use env

fn check_admin(signer: ByteArray) -> Bool {
  signer == env.admin_pkh
}
```

### Chuyển đổi môi trường

```bash
# Sử dụng cấu hình testnet
aiken build --env testnet

# Sử dụng cấu hình mainnet
aiken build --env mainnet
```

## File plutus.json

Output sau khi build:

```json title="plutus.json"
{
  "preamble": {
    "title": "my-org/my-project",
    "version": "0.1.0",
    "plutusVersion": "v3"
  },
  "validators": [
    {
      "title": "time_lock",
      "hash": "abc123...",
      "compiledCode": "5901...",
      "parameters": [
        {
          "title": "deadline",
          "schema": { "dataType": "integer" }
        }
      ]
    }
  ]
}
```

## Sơ đồ tổng quan

```
┌─────────────────────────────────────────────────────────────┐
│                    PROJECT STRUCTURE                        │
│                                                             │
│   ┌─────────────┐                                          │
│   │ aiken.toml  │ ← Cấu hình + dependencies                │
│   └─────────────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────┐     ┌─────────────┐                      │
│   │    lib/     │────▶│ validators/ │                      │
│   │  (reusable) │     │  (contracts)│                      │
│   └─────────────┘     └─────────────┘                      │
│          │                   │                              │
│          └─────────┬─────────┘                              │
│                    ▼                                        │
│             ┌─────────────┐                                │
│             │ aiken build │                                │
│             └─────────────┘                                │
│                    │                                        │
│                    ▼                                        │
│             ┌─────────────┐                                │
│             │ plutus.json │ ← Compiled output              │
│             └─────────────┘                                │
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

### 3. Tách biệt concerns

```aiken
// ✅ Tốt: Tách logic riêng biệt
// lib/validation/signature.ak
pub fn verify_signature(sig: ByteArray, msg: ByteArray) -> Bool {
  // ...
}

// validators/spend.ak
use validation/signature

validator my_validator {
  spend(datum, redeemer, _, tx) {
    signature.verify_signature(...)
  }
}
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. aiken.toml = Cấu hình + dependencies                   │
│  2. lib/ = Code tái sử dụng (types, utils)                 │
│  3. validators/ = Smart contracts                          │
│  4. env/ = Cấu hình theo môi trường                        │
│  5. plutus.json = Output biên dịch                         │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về biến và hằng số trong Aiken - nền tảng để lưu trữ dữ liệu.
