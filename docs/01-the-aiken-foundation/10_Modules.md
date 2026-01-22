---
title: Modules
sidebar_position: 10
---

# Modules trong Aiken

Bài học này hướng dẫn cách tổ chức code thành modules và quản lý visibility.

## Mục tiêu học tập

- Hiểu cách tổ chức code thành modules
- Nắm các kiểu import: qualified và unqualified
- Sử dụng pub để quản lý visibility
- Hiểu opaque types

## Module Basics

### Tên module từ đường dẫn file

```
lib/
├── utils.ak              → module: utils
├── helpers/
│   ├── math.ak           → module: helpers/math
│   └── string.ak         → module: helpers/string
└── validators/
    └── spend.ak          → module: validators/spend
```

### Định nghĩa module

```aiken title="lib/math.ak"
//// Module xử lý toán học
//// Sử dụng //// cho module-level docs

/// Cộng hai số
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Nhân hai số
pub fn multiply(a: Int, b: Int) -> Int {
  a * b
}

// Hàm private - không thể import từ bên ngoài
fn internal_helper(x: Int) -> Int {
  x * 2
}
```

## Visibility - Phạm vi truy cập

### Public vs Private

```aiken title="lib/wallet.ak"
// ❌ Private - mặc định
fn calculate_fee(amount: Int) -> Int {
  amount / 100
}

// ✅ Public - có thể import
pub fn transfer(from: ByteArray, to: ByteArray, amount: Int) -> Bool {
  let fee = calculate_fee(amount)
  // Logic transfer
  True
}

// ❌ Private type
type InternalState {
  value: Int,
}

// ✅ Public type
pub type Transaction {
  sender: ByteArray,
  receiver: ByteArray,
  amount: Int,
}
```

### Public constant

```aiken
// ❌ Private constant
const internal_fee = 1000

// ✅ Public constant
pub const min_utxo_value = 1_000_000
pub const ada_to_lovelace = 1_000_000
```

## Import Styles

### Qualified Import

```aiken title="lib/main.ak"
use helpers/math

fn calculate() -> Int {
  // Sử dụng với prefix module
  math.add(10, 20)
}
```

### Alias Import

```aiken
use helpers/math as m

fn calculate() -> Int {
  m.add(10, 20)
}
```

### Unqualified Import

```aiken
use helpers/math.{add, multiply}

fn calculate() -> Int {
  // Sử dụng trực tiếp không cần prefix
  add(10, multiply(5, 4))
}
```

### Mix Import Styles

```aiken
use helpers/math.{add} as m

fn calculate() -> Int {
  // Cả hai cách đều hoạt động
  add(10, 20)      // Unqualified
  m.multiply(5, 4) // Qualified với alias
}
```

## Opaque Types

Ẩn implementation, chỉ expose API:

```aiken title="lib/amount.ak"
/// Lovelace amount - không thể tạo trực tiếp từ bên ngoài
pub opaque type Lovelace {
  Lovelace(Int)
}

/// Constructor - cách duy nhất để tạo Lovelace
pub fn from_int(n: Int) -> Option<Lovelace> {
  if n >= 0 {
    Some(Lovelace(n))
  } else {
    None
  }
}

/// Accessor - cách duy nhất để lấy giá trị
pub fn to_int(amount: Lovelace) -> Int {
  let Lovelace(n) = amount
  n
}

/// Safe addition
pub fn add(a: Lovelace, b: Lovelace) -> Lovelace {
  Lovelace(to_int(a) + to_int(b))
}
```

Sử dụng từ module khác:

```aiken title="lib/payment.ak"
use amount.{Lovelace}

fn process_payment() {
  // ✅ Tạo qua constructor function
  expect Some(amt) = amount.from_int(1_000_000)

  // ❌ Không thể tạo trực tiếp
  // let amt = Lovelace(1_000_000)  // Lỗi!

  // ❌ Không thể pattern match
  // let Lovelace(n) = amt  // Lỗi!

  // ✅ Dùng accessor
  let value = amount.to_int(amt)

  value
}
```

## Environment Modules (env/)

Cấu hình theo môi trường:

```
env/
├── default.ak            # Bắt buộc
├── testnet.ak
└── mainnet.ak
```

```aiken title="env/default.ak"
pub const network_id = 0
pub const admin_pkh = #"default_admin_pkh..."
```

```aiken title="env/testnet.ak"
pub const network_id = 0
pub const admin_pkh = #"testnet_admin_pkh..."
```

```aiken title="env/mainnet.ak"
pub const network_id = 1
pub const admin_pkh = #"mainnet_admin_pkh..."
```

Sử dụng:

```aiken title="lib/config.ak"
use env

fn is_mainnet() -> Bool {
  env.network_id == 1
}

fn get_admin() -> ByteArray {
  env.admin_pkh
}
```

Build với môi trường:

```bash
aiken build --env testnet
aiken build --env mainnet
```

## Prelude - Module tự động import

Các items tự động có sẵn không cần import:

```aiken
// Tự động có sẵn từ prelude
let some_value: Option<Int> = Some(42)
let no_value: Option<Int> = None
let nothing: Void = Void
let ordering: Ordering = Less
```

## Builtin Module

Truy cập các hàm Plutus Core:

```aiken
use aiken/builtin

fn hash_data(data: ByteArray) -> ByteArray {
  builtin.blake2b_256(data)
}

fn verify_ed25519(key: ByteArray, msg: ByteArray, sig: ByteArray) -> Bool {
  builtin.verify_ed25519_signature(key, msg, sig)
}
```

## Sơ đồ module system

```
┌─────────────────────────────────────────────────────────────┐
│                    MODULE SYSTEM                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐     ┌─────────────┐                      │
│   │  File Path  │ ──▶ │ Module Name │                      │
│   └─────────────┘     └─────────────┘                      │
│                              │                              │
│                              ▼                              │
│   ┌─────────────────────────────────────────┐              │
│   │            Visibility Control            │              │
│   │  ┌─────────┐          ┌─────────┐       │              │
│   │  │   pub   │          │ private │       │              │
│   │  │ (export)│          │(default)│       │              │
│   │  └─────────┘          └─────────┘       │              │
│   └─────────────────────────────────────────┘              │
│                              │                              │
│                              ▼                              │
│   ┌─────────────────────────────────────────┐              │
│   │            Import Styles                 │              │
│   │  • use module                           │              │
│   │  • use module as alias                  │              │
│   │  • use module.{item1, item2}            │              │
│   └─────────────────────────────────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Ví dụ thực hành

### Code: lib/token.ak

```aiken title="lib/token.ak"
//// Module quản lý token

use aiken/collection/list

/// Asset ID
pub type AssetId {
  policy_id: ByteArray,
  asset_name: ByteArray,
}

/// Token amount
pub opaque type TokenAmount {
  TokenAmount { asset: AssetId, quantity: Int }
}

/// Tạo token amount mới
pub fn new(policy_id: ByteArray, asset_name: ByteArray, quantity: Int) -> Option<TokenAmount> {
  if quantity > 0 {
    Some(TokenAmount {
      asset: AssetId { policy_id, asset_name },
      quantity,
    })
  } else {
    None
  }
}

/// Lấy policy ID
pub fn policy_id(token: TokenAmount) -> ByteArray {
  token.asset.policy_id
}

/// Lấy asset name
pub fn asset_name(token: TokenAmount) -> ByteArray {
  token.asset.asset_name
}

/// Lấy số lượng
pub fn quantity(token: TokenAmount) -> Int {
  token.quantity
}

/// Kiểm tra cùng asset
pub fn same_asset(a: TokenAmount, b: TokenAmount) -> Bool {
  a.asset == b.asset
}

/// Cộng hai token (phải cùng asset)
pub fn add(a: TokenAmount, b: TokenAmount) -> Option<TokenAmount> {
  if same_asset(a, b) {
    Some(TokenAmount {
      asset: a.asset,
      quantity: a.quantity + b.quantity,
    })
  } else {
    None
  }
}
```

### Code: lib/bundle.ak

```aiken title="lib/bundle.ak"
//// Module quản lý bundle of tokens

use token.{TokenAmount}
use aiken/collection/list

/// Bundle chứa nhiều tokens
pub type Bundle = List<TokenAmount>

/// Tạo bundle rỗng
pub fn empty() -> Bundle {
  []
}

/// Thêm token vào bundle
pub fn add_token(bundle: Bundle, token: TokenAmount) -> Bundle {
  [token, ..bundle]
}

/// Tính tổng số loại token
pub fn count(bundle: Bundle) -> Int {
  list.length(bundle)
}

/// Tìm token theo policy ID
pub fn find_by_policy(bundle: Bundle, policy_id: ByteArray) -> List<TokenAmount> {
  bundle
    |> list.filter(fn(t) { token.policy_id(t) == policy_id })
}

/// Kiểm tra bundle có chứa token
pub fn contains(bundle: Bundle, policy_id: ByteArray, asset_name: ByteArray) -> Bool {
  bundle
    |> list.any(fn(t) {
      token.policy_id(t) == policy_id && token.asset_name(t) == asset_name
    })
}
```

### Test: lib/token_test.ak

```aiken title="lib/token_test.ak"
use token
use bundle

test test_create_token() {
  expect Some(t) = token.new(#"policy1", #"asset1", 100)
  and {
    token.policy_id(t) == #"policy1",
    token.asset_name(t) == #"asset1",
    token.quantity(t) == 100,
  }
}

test test_invalid_quantity() {
  token.new(#"policy1", #"asset1", 0) == None
}

test test_add_tokens() {
  expect Some(t1) = token.new(#"policy1", #"asset1", 100)
  expect Some(t2) = token.new(#"policy1", #"asset1", 50)
  expect Some(sum) = token.add(t1, t2)

  token.quantity(sum) == 150
}

test test_bundle_operations() {
  expect Some(t1) = token.new(#"policy1", #"asset1", 100)
  expect Some(t2) = token.new(#"policy2", #"asset2", 200)

  let b = bundle.empty()
    |> bundle.add_token(t1)
    |> bundle.add_token(t2)

  and {
    bundle.count(b) == 2,
    bundle.contains(b, #"policy1", #"asset1"),
    !bundle.contains(b, #"policy3", #"asset3"),
  }
}
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. Module name = File path (lib/a/b.ak → a/b)             │
│  2. pub = Export ra ngoài module                           │
│  3. use module.{item} = Unqualified import                 │
│  4. use module as alias = Aliased import                   │
│  5. opaque type = Ẩn implementation details                │
│  6. env/ = Cấu hình theo môi trường                        │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về Data - cách serialize và deserialize dữ liệu trong Aiken.
