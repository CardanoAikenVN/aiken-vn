---
title: "10. Modules"
sidebar_position: 10
description: "Hieu he thong module trong Aiken: cach to chuc code, import/export, visibility, va best practices cho cau truc du an."
---

# Modules

:::info Muc tieu
Hieu he thong module trong Aiken: cach to chuc code, import/export, visibility, va best practices cho cau truc du an.
:::

---

## Muc Luc

1. [Tong quan Module System](#1-tong-quan-module-system)
2. [Dinh nghia Module](#2-dinh-nghia-module)
3. [Import va Use](#3-import-va-use)
4. [Visibility (pub/private)](#4-visibility-pubprivate)
5. [Module Organization](#5-module-organization)
6. [Standard Library Modules](#6-standard-library-modules)
7. [Best Practices](#7-best-practices)

---

## 1. Tong Quan Module System

### Module System trong Aiken

**Module = File**

- Moi file `.ak` la mot module
- Ten module = duong dan file tu `lib/`
- Tu dong namespace

**Vi du:**

| File | Module | Import |
|------|--------|--------|
| `lib/my_project/utils/math.ak` | `my_project/utils/math` | `use my_project/utils/math` |

**Visibility:**

| Keyword | Mo ta |
|---------|-------|
| `pub fn` | Exported (public) |
| `fn` | Internal (private) |
| `pub type` | Exported type |
| `type` | Internal type |

### So sanh voi cac ngon ngu khac

| Aiken | Rust | JavaScript | Python |
|-------|------|------------|--------|
| `use module` | `use crate::module` | `import * from 'module'` | `from module import *` |
| `use module.{fn1, fn2}` | `use module::{fn1, fn2}` | `import {fn1, fn2}` | `from module import fn1, fn2` |
| `pub fn` | `pub fn` | `export function` | (no keyword) |
| File = Module | File = Module | File = Module | File = Module |

---

## 2. Dinh Nghia Module

### Cau truc co ban

```aiken
// lib/my_project/math.ak
// Module name: my_project/math

// ========== PUBLIC EXPORTS ==========

/// Cong hai so
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Nhan hai so
pub fn multiply(a: Int, b: Int) -> Int {
  a * b
}

/// Type public
pub type Point {
  x: Int,
  y: Int,
}

// ========== PRIVATE (INTERNAL) ==========

// Chi dung trong module nay
fn helper_function(x: Int) -> Int {
  x * 2
}

// Type private
type InternalState {
  value: Int,
  valid: Bool,
}
```

### Module tu File Structure

```
lib/
+-- my_project/
    +-- types.ak           -> Module: my_project/types
    +-- math.ak            -> Module: my_project/math
    +-- utils/
    |   +-- string.ak      -> Module: my_project/utils/string
    |   +-- list.ak        -> Module: my_project/utils/list
    +-- validators/
        +-- common.ak      -> Module: my_project/validators/common
```

### Vi du Module hoan chinh

```aiken
// lib/my_project/types.ak

/// Token identifier
pub type AssetClass {
  policy_id: ByteArray,
  asset_name: ByteArray,
}

/// Amount of a specific token
pub type Token {
  asset: AssetClass,
  amount: Int,
}

/// Vesting contract datum
pub type VestingDatum {
  owner: ByteArray,
  beneficiary: ByteArray,
  deadline: Int,
}

/// Vesting actions
pub type VestingRedeemer {
  Claim
  Cancel
  Extend { new_deadline: Int }
}

// Constructor helpers (public)
pub fn ada() -> AssetClass {
  AssetClass { policy_id: #"", asset_name: #"" }
}

pub fn new_token(policy: ByteArray, name: ByteArray, qty: Int) -> Token {
  Token {
    asset: AssetClass { policy_id: policy, asset_name: name },
    amount: qty,
  }
}
```

---

## 3. Import va Use

### Cu phap Use

```aiken
// Import toan bo module
use my_project/types

// Import specific items
use my_project/types.{VestingDatum, VestingRedeemer, AssetClass}

// Import voi alias
use my_project/utils/math as m

// Import tu standard library
use aiken/collection/list
use aiken/option.{Some, None}
use aiken/bytearray
```

### Cac cach su dung

```aiken
// File: validators/vesting.ak

// Method 1: Import module, dung prefix
use my_project/types

fn example1() {
  let datum = types.VestingDatum {
    owner: #"aabb",
    beneficiary: #"ccdd",
    deadline: 1000,
  }
}

// Method 2: Import specific types
use my_project/types.{VestingDatum, VestingRedeemer}

fn example2() {
  let datum = VestingDatum {
    owner: #"aabb",
    beneficiary: #"ccdd",
    deadline: 1000,
  }

  let action = Claim  // VestingRedeemer variant
}

// Method 3: Import voi alias (cho ten dai)
use my_project/validators/common as vc

fn example3() {
  vc.some_helper_function()
}
```

### Import tu Dependencies

```aiken
// Standard library imports
use aiken/collection/list
use aiken/collection/dict.{Dict}
use aiken/crypto.{hash_data}
use aiken/math
use aiken/option.{Option, Some, None}
use aiken/bytearray
use aiken/cbor
use aiken/interval.{Interval}

// Cardano-specific imports
use cardano/transaction.{Transaction, Input, Output}
use cardano/address.{Address, Script, Credential}
use cardano/assets.{PolicyId, AssetName, Value}
use cardano/certificate.{Certificate}

// External package (from aiken.toml dependencies)
use aiken_lang/fuzz
```

### Import Patterns

```aiken
// Import constructor variants
use my_project/types.{VestingRedeemer, Claim, Cancel, Extend}

fn handle_redeemer(redeemer: VestingRedeemer) {
  when redeemer is {
    Claim -> handle_claim()
    Cancel -> handle_cancel()
    Extend { new_deadline } -> handle_extend(new_deadline)
  }
}

// Import type + constructors cung luc
use aiken/option.{Option, Some, None}

fn safe_div(a: Int, b: Int) -> Option<Int> {
  if b == 0 {
    None
  } else {
    Some(a / b)
  }
}

// Selective imports cho clarity
use aiken/collection/list.{map, filter, foldl, has, find}

fn process(numbers: List<Int>) -> Int {
  numbers
  |> filter(fn(x) { x > 0 })
  |> map(fn(x) { x * 2 })
  |> foldl(0, fn(acc, x) { acc + x })
}
```

---

## 4. Visibility (pub/private)

### Access Modifiers

| Keyword | Mo ta |
|---------|-------|
| `pub fn function()` | Co the import tu module khac |
| `fn function()` | Chi dung trong module hien tai |
| `pub type MyType` | Type co the import |
| `type MyType` | Type chi dung internal |
| `pub const VALUE` | Constant co the import |
| `const VALUE` | Constant chi dung internal |

:::warning Luu y ve Constructor variants
Neu type la `pub`, constructors cung `pub`. Khong the hide constructors cua pub type.
:::

### Vi du Visibility

```aiken
// lib/my_project/token.ak

// ========== PUBLIC API ==========

/// Public type - co the import
pub type Token {
  policy_id: ByteArray,
  asset_name: ByteArray,
  amount: Int,
}

/// Public constant
pub const min_ada: Int = 1_000_000

/// Public function
pub fn create_token(policy: ByteArray, name: ByteArray, qty: Int) -> Token {
  // Validate internal
  let validated_qty = validate_amount(qty)

  Token {
    policy_id: policy,
    asset_name: name,
    amount: validated_qty,
  }
}

/// Public function
pub fn total_value(tokens: List<Token>) -> Int {
  sum_amounts(tokens, 0)
}

// ========== PRIVATE IMPLEMENTATION ==========

// Private type - khong the import
type ValidationResult {
  valid: Bool,
  message: ByteArray,
}

// Private constant
const max_amount: Int = 1_000_000_000_000

// Private function
fn validate_amount(qty: Int) -> Int {
  if qty < 0 {
    0
  } else if qty > max_amount {
    max_amount
  } else {
    qty
  }
}

// Private recursive helper
fn sum_amounts(tokens: List<Token>, acc: Int) -> Int {
  when tokens is {
    [] -> acc
    [token, ..rest] -> sum_amounts(rest, acc + token.amount)
  }
}

// Private validation
fn check_policy(policy: ByteArray) -> ValidationResult {
  if bytearray.length(policy) == 28 {
    ValidationResult { valid: True, message: #"" }
  } else {
    ValidationResult { valid: False, message: #"invalid_policy" }
  }
}
```

### Using from other modules

```aiken
// validators/mint.ak

use my_project/token.{Token, create_token, total_value, min_ada}

fn example() {
  // Can use public items
  let t = create_token(#"aabb", #"MyToken", 1000)
  let total = total_value([t])
  let min = min_ada

  // Cannot use private items
  // let result = validate_amount(100)  // Error: not exported
  // let max = max_amount               // Error: not exported
}
```

### Opaque Types Pattern

```aiken
// lib/my_project/safe_int.ak

/// Opaque type - constructors hidden via documentation
/// Users should use new_safe_int() instead of direct construction
pub opaque type SafeInt {
  value: Int,
}

/// Constructor (validates input)
pub fn new_safe_int(n: Int) -> Option<SafeInt> {
  if n >= 0 && n <= 1_000_000 {
    Some(SafeInt { value: n })
  } else {
    None
  }
}

/// Getter
pub fn get_value(safe: SafeInt) -> Int {
  safe.value
}

/// Operations preserve safety
pub fn add_safe(a: SafeInt, b: SafeInt) -> Option<SafeInt> {
  new_safe_int(a.value + b.value)
}
```

```aiken
// Usage in another module
use my_project/safe_int.{SafeInt, new_safe_int, get_value, add_safe}

fn example() {
  // Use through constructor
  expect Some(a) = new_safe_int(100)
  expect Some(b) = new_safe_int(200)

  // Cannot construct directly (opaque)
  // let bad = SafeInt { value: -999 }  // Compile error

  // Use through operations
  expect Some(sum) = add_safe(a, b)
  let result = get_value(sum)  // 300
}
```

---

## 5. Module Organization

### Recommended Structure

```
my_defi_project/
|
+-- aiken.toml
|
+-- lib/
|   +-- my_defi_project/
|       |
|       +-- types/              <- Data types
|       |   +-- datum.ak        <- Datum definitions
|       |   +-- redeemer.ak     <- Redeemer definitions
|       |   +-- common.ak       <- Shared types
|       |
|       +-- utils/              <- Helper functions
|       |   +-- math.ak         <- Math operations
|       |   +-- validation.ak   <- Validation helpers
|       |   +-- token.ak        <- Token utilities
|       |
|       +-- constants.ak        <- Project constants
|       |
|       +-- tests/              <- Unit tests
|           +-- math_test.ak
|           +-- validation_test.ak
|
+-- validators/                 <- Smart contracts
    +-- pool.ak                 <- Liquidity pool
    +-- swap.ak                 <- Swap validator
    +-- governance.ak           <- Governance
```

### Module Dependencies

```aiken
// lib/my_defi_project/types/common.ak
pub type AssetClass {
  policy_id: ByteArray,
  asset_name: ByteArray,
}

// lib/my_defi_project/types/datum.ak
use my_defi_project/types/common.{AssetClass}

pub type PoolDatum {
  token_a: AssetClass,
  token_b: AssetClass,
  reserve_a: Int,
  reserve_b: Int,
}

// lib/my_defi_project/utils/math.ak
pub fn calculate_output(reserve_in: Int, reserve_out: Int, amount_in: Int) -> Int {
  // AMM formula
  let numerator = amount_in * reserve_out * 997
  let denominator = reserve_in * 1000 + amount_in * 997
  numerator / denominator
}

// validators/pool.ak
use my_defi_project/types/datum.{PoolDatum}
use my_defi_project/types/common.{AssetClass}
use my_defi_project/utils/math

validator pool {
  spend(datum: Option<PoolDatum>, redeemer: Data, _, tx: Transaction) {
    expect Some(d) = datum
    // Use imported types and functions
    let output = math.calculate_output(d.reserve_a, d.reserve_b, 1000)
    output > 0
  }
}
```

### Re-exporting Modules

```aiken
// lib/my_project/prelude.ak
// Re-export commonly used items

pub use my_project/types/datum.{VestingDatum, PoolDatum}
pub use my_project/types/redeemer.{VestingRedeemer, PoolRedeemer}
pub use my_project/types/common.{AssetClass, Token}
pub use my_project/utils/math.{calculate_output, sqrt}
pub use my_project/utils/validation.{must_be_signed_by, is_after}
```

```aiken
// validators/my_validator.ak
// Import everything from prelude
use my_project/prelude.{
  VestingDatum,
  VestingRedeemer,
  AssetClass,
  must_be_signed_by,
  is_after,
}

// Clean imports!
```

---

## 6. Standard Library Modules

### Aiken Standard Library Overview

**aiken/ modules:**

| Module | Mo ta |
|--------|-------|
| `aiken/collection/list` | List operations |
| `aiken/collection/dict` | Key-value dictionary |
| `aiken/collection/pairs` | Pair list operations |
| `aiken/option` | `Option<a>` type |
| `aiken/math` | Math functions |
| `aiken/bytearray` | ByteArray operations |
| `aiken/string` | String utilities |
| `aiken/cbor` | CBOR encoding/decoding |
| `aiken/hash` | Hashing functions |
| `aiken/interval` | Time intervals |
| `aiken/crypto` | Cryptographic functions |

**cardano/ modules:**

| Module | Mo ta |
|--------|-------|
| `cardano/transaction` | Transaction type |
| `cardano/address` | Address types |
| `cardano/assets` | Value, PolicyId, etc. |
| `cardano/certificate` | Stake certificates |
| `cardano/governance` | Governance types (CIP-1694) |

### Common Import Patterns

```aiken
// Collection operations
use aiken/collection/list.{
  map, filter, foldl, foldr,
  has, find, any, all,
  length, reverse, concat,
  head, tail, take, drop,
}

// Option handling
use aiken/option.{Option, Some, None, is_some, is_none}

// Math operations
use aiken/math.{abs, min, max, pow2}

// ByteArray operations
use aiken/bytearray.{
  length, concat, slice,
  push, from_string,
}

// Cardano transaction
use cardano/transaction.{
  Transaction, Input, Output,
  OutputReference, InlineDatum,
  find_input, find_datum,
}

// Cardano assets
use cardano/assets.{
  PolicyId, AssetName, Value,
  lovelace_of, tokens, flatten,
  quantity_of, policies,
}

// Address handling
use cardano/address.{
  Address, Script, Credential,
  Inline, VerificationKey,
}
```

### Stdlib Usage Examples

```aiken
use aiken/collection/list
use aiken/option.{Option, Some, None}
use cardano/transaction.{Transaction}
use cardano/assets

/// Check if transaction has enough ADA
fn has_sufficient_ada(tx: Transaction, required: Int) -> Bool {
  let total_ada = list.foldl(
    tx.outputs,
    0,
    fn(acc, output) { acc + assets.lovelace_of(output.value) }
  )
  total_ada >= required
}

/// Find output to specific address
fn find_output_to(
  outputs: List<Output>,
  target: Address,
) -> Option<Output> {
  list.find(outputs, fn(o) { o.address == target })
}

/// Sum all tokens of a policy
fn sum_policy_tokens(value: Value, policy: PolicyId) -> Int {
  let tokens = assets.tokens(value, policy)
  list.foldl(
    assets.flatten(tokens),
    0,
    fn(acc, token) {
      let (_, _, qty) = token
      acc + qty
    }
  )
}
```

---

## 7. Best Practices

### Do's va Don'ts

**Nen lam:**

- To chuc types vao module rieng
- Export chi nhung gi can thiet (minimal API)
- Dung descriptive module names
- Group related functions cung module
- Tao prelude module cho common imports
- Document public functions

**Khong nen lam:**

- Export internal implementation details
- Circular dependencies giua modules
- Module qua lon (>500 lines)
- Ten module khong ro rang (utils1, helpers2)
- Import tat ca khi chi can mot vai items

### Module Design Guidelines

```aiken
// GOOD: Clear, focused module
// lib/my_project/validation.ak

/// Validation utilities for smart contracts

use aiken/collection/list
use cardano/transaction.{Transaction}

/// Check if public key signed the transaction
pub fn must_be_signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}

/// Check if current time is after deadline
pub fn is_after(tx: Transaction, deadline: Int) -> Bool {
  when tx.validity_range.lower_bound.bound_type is {
    Finite(lower) -> lower > deadline
    _ -> False
  }
}

/// Check if current time is before deadline
pub fn is_before(tx: Transaction, deadline: Int) -> Bool {
  when tx.validity_range.upper_bound.bound_type is {
    Finite(upper) -> upper < deadline
    _ -> False
  }
}

// Internal helpers (not exported)
fn extract_lower_bound(tx: Transaction) -> Option<Int> {
  when tx.validity_range.lower_bound.bound_type is {
    Finite(t) -> Some(t)
    _ -> None
  }
}
```

### Dependency Management

**Allowed:**

- `validators/` can import from `lib/`
- `lib/utils/` can import from `lib/types/`
- `lib/tests/` can import from `lib/utils/`, `lib/types/`

**Not allowed:**

- `lib/` importing from `validators/` (reverse dependency)
- `lib/a/` and `lib/b/` importing each other (circular dependency)

**Dependency flow:** `types -> utils -> validators`

---

## Bai Tap Thuc Hanh

### Bai 1: Create Module Structure

Tao cau truc module cho mot NFT marketplace:

```
lib/nft_market/
+-- types/
|   +-- listing.ak     -> ListingDatum, ListingRedeemer
|   +-- offer.ak       -> OfferDatum, OfferRedeemer
+-- utils/
|   +-- validation.ak  -> validate_signature, validate_payment
|   +-- royalty.ak     -> calculate_royalty, split_payment
+-- constants.ak       -> platform_fee, min_price
```

### Bai 2: Fix Import Errors

```aiken
// Fix the imports in this code:

use types.{MyDatum}  // Wrong path
use aiken/list       // Wrong module name

fn example() {
  let nums = [1, 2, 3]
  list.map(nums, fn(x) { x * 2 })  // Won't work
}
```

### Bai 3: Design Public API

Thiet ke public API cho mot token module:

```aiken
// lib/my_project/token.ak

// TODO: Define types (pub or private?)
// TODO: Define constructor functions
// TODO: Define helper functions
// TODO: Decide what to export

// Requirements:
// - Users can create tokens
// - Users cannot create invalid tokens (negative amount)
// - Internal validation logic should be hidden
```

---

## Checklist Hoan Thanh

- [ ] Hieu module system trong Aiken
- [ ] Biet cach import/use modules
- [ ] Hieu visibility (pub/private)
- [ ] To chuc module structure hieu qua
- [ ] Su dung standard library modules
- [ ] Ap dung best practices

---

## Tai Lieu Tham Khao

- [Aiken Language Tour - Modules](https://aiken-lang.org/language-tour/modules)
- [Aiken Standard Library](https://aiken-lang.github.io/stdlib/)

---

**Tiep theo**: [Bai 11 - Du lieu (Data)](./11_Data.md)
