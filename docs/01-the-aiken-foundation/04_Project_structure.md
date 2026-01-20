---
title: "04. Cấu Trúc Dự Án"
sidebar_position: 4
description: "Hiểu rõ cấu trúc thư mục của một dự án Aiken, vai trò của từng file/folder, và cách tổ chức code hiệu quả cho smart contracts"
---

# Bài 04: Cấu Trúc Dự Án Aiken

> **Mục tiêu:** Hiểu rõ cấu trúc thư mục của một dự án Aiken, vai trò của từng file/folder, và cách tổ chức code hiệu quả cho smart contracts.

---

## Tổng Quan Cấu Trúc Dự Án

### Cấu trúc cơ bản

Khi tạo dự án với `aiken new`, bạn sẽ có cấu trúc sau:

| Thành phần | Mô tả |
|------------|-------|
| `aiken.toml` | Cấu hình dự án (bắt buộc) |
| `README.md` | Tài liệu dự án |
| `lib/` | Thư viện helper (tùy chọn) |
| `lib/my_project/` | Module chính |
| `lib/my_project/types.ak` | Định nghĩa types |
| `lib/my_project/utils.ak` | Helper functions |
| `lib/my_project/tests.ak` | Unit tests |
| `validators/` | Smart contracts (bắt buộc) |
| `validators/vesting.ak` | Spending validator |
| `validators/nft.ak` | Minting policy |
| `plutus.json` | Blueprint (sau khi build) |

### Vai trò của từng thành phần

| Thành phần | Vai trò | Bắt buộc |
|------------|---------|----------|
| `aiken.toml` | Cấu hình dự án, dependencies | ✅ Có |
| `lib/` | Code chia sẻ, types, helpers | ❌ Không |
| `validators/` | Smart contract code | ✅ Có |
| `plutus.json` | Compiled contracts | 🔄 Tự động tạo |

---

## File aiken.toml

### Cấu trúc cơ bản

```toml
# Tên dự án (format: organization/project)
name = "vbi-academy/my_project"

# Phiên bản dự án
version = "0.0.1"

# Phiên bản compiler tối thiểu
compiler = "v1.1.0"

# Plutus version (V1, V2, V3)
plutus = "v3"

# License
license = "Apache-2.0"

# Mô tả
description = "My awesome smart contract project"

# Dependencies
[dependencies]
aiken-lang/stdlib = "v2.2.0"

# Môi trường runtime (tùy chọn)
[config]
# Cấu hình cho build
```

### Giải thích chi tiết

| Trường | Mô tả | Ví dụ |
|--------|-------|-------|
| `name` | Format: "organization/project" | "sundaeswap/order-book" |
| `version` | Semantic Versioning (x.y.z) | "0.0.1" |
| `plutus` | Phiên bản Plutus | v1: Legacy, v2: Reference scripts, v3: Governance (khuyến nghị) |
| `dependencies` | Packages từ GitHub hoặc local | aiken-lang/stdlib |

### Quản lý Dependencies

```toml
[dependencies]
# Standard library (bắt buộc)
aiken-lang/stdlib = "v2.2.0"

# Package từ GitHub
aiken-lang/fuzz = "v1.0.0"

# Package với branch cụ thể
# sundaeswap/math = { version = "main", source = "github" }
```

**Cách thêm dependency:**
```bash
# Thêm qua CLI
aiken add aiken-lang/fuzz

# Hoặc thêm trực tiếp vào aiken.toml và chạy
aiken build
```

---

## Thư Mục lib/

### Mục đích

Thư mục `lib/` chứa code có thể tái sử dụng - không compile trực tiếp thành validators mà được import bởi validators.

| File | Mô tả |
|------|-------|
| `types.ak` | Datum, Redeemer, custom types - Định nghĩa data structures |
| `utils.ak` | Helper functions - Validation, Math, Time/date helpers |
| `constants.ak` | Hằng số toàn dự án - Policy IDs, Token names, Fee amounts |
| `tests.ak` | Unit tests cho utils và types |

### Ví dụ: lib/my_project/types.ak

```aiken
// lib/my_project/types.ak

/// Datum cho vesting contract
pub type VestingDatum {
  /// Người có quyền nhận
  beneficiary: ByteArray,
  /// Thời điểm unlock
  deadline: Int,
  /// Số lượng ADA (lovelace)
  amount: Int,
}

/// Các action có thể thực hiện
pub type VestingRedeemer {
  /// Beneficiary claim sau deadline
  Claim
  /// Owner cancel trước deadline
  Cancel
}

/// Kết quả validation
pub type ValidationResult {
  Valid
  Invalid { reason: ByteArray }
}
```

### Ví dụ: lib/my_project/utils.ak

```aiken
// lib/my_project/utils.ak

use aiken/collection/list

/// Kiểm tra signature có trong danh sách
pub fn has_signature(signatories: List<ByteArray>, key: ByteArray) -> Bool {
  list.has(signatories, key)
}

/// Kiểm tra thời gian hiện tại > deadline
pub fn is_after_deadline(validity_range: (Int, Int), deadline: Int) -> Bool {
  let (lower, _upper) = validity_range
  lower > deadline
}

/// Kiểm tra thời gian hiện tại < deadline
pub fn is_before_deadline(validity_range: (Int, Int), deadline: Int) -> Bool {
  let (_lower, upper) = validity_range
  upper < deadline
}

/// Tính phần trăm
pub fn percentage(value: Int, percent: Int) -> Int {
  value * percent / 100
}
```

### Ví dụ: lib/my_project/tests.ak

```aiken
// lib/my_project/tests.ak

use my_project/utils.{has_signature, percentage}

test has_signature_found() {
  let signers = [#"aabb", #"ccdd", #"eeff"]
  has_signature(signers, #"ccdd")
}

test has_signature_not_found() {
  let signers = [#"aabb", #"ccdd"]
  !has_signature(signers, #"1234")
}

test percentage_calculation() {
  // 10% của 1000 = 100
  percentage(1000, 10) == 100
}

test percentage_zero() {
  percentage(1000, 0) == 0
}
```

---

## Thư Mục validators/

### Mục đích

Thư mục `validators/` chứa smart contract code - code sẽ được compile thành UPLC và deploy lên blockchain.

| File | Loại | Mô tả |
|------|------|-------|
| `vesting.ak` | Spending Validator | Lock ADA với điều kiện, Validate khi spend UTXO |
| `nft.ak` | Minting Policy | Kiểm soát mint/burn tokens, Tạo NFT, fungible tokens |
| `staking.ak` | Staking Validator | Withdraw rewards, Delegate stake |

**Quan trọng:**
- Mỗi file chứa 1+ validators
- Validators có signature đặc biệt
- Code phải có side effect (True/False hoặc fail)

### Ví dụ: validators/vesting.ak

```aiken
// validators/vesting.ak

use cardano/transaction.{Transaction, find_input, OutputReference}
use my_project/types.{VestingDatum, VestingRedeemer, Claim, Cancel}
use my_project/utils.{has_signature, is_after_deadline, is_before_deadline}

/// Vesting validator - lock ADA cho beneficiary
///
/// Datum: VestingDatum (beneficiary, deadline, amount)
/// Redeemer: Claim | Cancel
validator vesting(owner: ByteArray) {
  spend(
    datum: Option<VestingDatum>,
    redeemer: VestingRedeemer,
    _own_ref: OutputReference,
    tx: Transaction,
  ) {
    // Unwrap datum
    expect Some(d) = datum

    // Lấy thông tin từ transaction
    let signatories = tx.extra_signatories
    let validity_range = tx.validity_range

    when redeemer is {
      // Beneficiary claim sau deadline
      Claim -> {
        let signed_by_beneficiary = has_signature(signatories, d.beneficiary)
        let past_deadline = is_after_deadline(validity_range, d.deadline)

        signed_by_beneficiary && past_deadline
      }

      // Owner cancel trước deadline
      Cancel -> {
        let signed_by_owner = has_signature(signatories, owner)
        let before_deadline = is_before_deadline(validity_range, d.deadline)

        signed_by_owner && before_deadline
      }
    }
  }
}
```

### Ví dụ: validators/nft.ak

```aiken
// validators/nft.ak

use cardano/transaction.{Transaction, OutputReference, find_input}
use cardano/assets.{PolicyId, flatten}

/// NFT minting policy - one-shot mint
///
/// Dùng UTXO reference để đảm bảo chỉ mint 1 lần
validator nft(utxo_ref: OutputReference) {
  mint(redeemer: Data, policy_id: PolicyId, tx: Transaction) {
    // Kiểm tra UTXO được consume
    let utxo_consumed =
      find_input(tx.inputs, utxo_ref) |> option.is_some

    // Lấy tokens được mint với policy này
    let minted = assets.tokens(tx.mint, policy_id) |> flatten

    when redeemer is {
      // Mint: phải consume UTXO và chỉ mint 1 token
      _ if utxo_consumed -> {
        expect [(_, _, qty)] = minted
        qty == 1
      }

      // Burn: cho phép burn bất kỳ lúc nào
      _ -> {
        expect [(_, _, qty)] = minted
        qty < 0
      }
    }
  }
}
```

### Quy tắc quan trọng cho validators

| Quy tắc | Chi tiết |
|---------|----------|
| Handler phù hợp | `spend()` → Spending validator, `mint()` → Minting policy, `withdraw()` → Staking validator, `publish()` → Certificate validator |
| Return value | PHẢI trả về Bool hoặc fail: True → Transaction valid, False/fail → Transaction invalid |
| Parameters | Được "bake" vào compiled code, thay đổi param = contract address khác |
| Datum/Redeemer | Được pass từ transaction: `spend(datum, redeemer, ...)`, `mint(redeemer, policy_id, ...)` |

---

## File plutus.json (Blueprint)

### Tổng quan

File `plutus.json` được tạo tự động khi chạy `aiken build`. Đây là **CIP-57 Blueprint** - chuẩn mô tả compiled validators.

### Cấu trúc

```json
{
  "preamble": {
    "title": "my_project",
    "version": "0.0.1",
    "plutusVersion": "v3"
  },
  "validators": [
    {
      "title": "vesting.vesting",
      "datum": { "schema": {...} },
      "redeemer": { "schema": {...} },
      "parameters": [...],
      "compiledCode": "59035d0100...",
      "hash": "abc123..."
    }
  ],
  "definitions": {
    "VestingDatum": { ... },
    "VestingRedeemer": { ... }
  }
}
```

### Sử dụng với Off-chain

```javascript
// JavaScript/TypeScript
import blueprint from './plutus.json';

// Lấy validator đầu tiên
const vestingValidator = blueprint.validators.find(
  v => v.title === 'vesting.vesting'
);

// Script cho Mesh.js / Lucid
const script = {
  type: "PlutusV3",
  script: vestingValidator.compiledCode,
};

// Script hash (policy ID cho minting)
const scriptHash = vestingValidator.hash;

// Address
const scriptAddress = lucid.utils.validatorToAddress(script);
```

---

## Tổ Chức Code Quy Mô Lớn

### Dự án phức tạp

Với dự án lớn như DeFi protocol, bạn nên chia nhỏ thành các module:

| Thư mục | Nội dung |
|---------|----------|
| `lib/defi_protocol/types/` | datum.ak, redeemer.ak, common.ak |
| `lib/defi_protocol/utils/` | math.ak, time.ak, signature.ak, token.ak |
| `lib/defi_protocol/tests/` | math_test.ak, time_test.ak, integration_test.ak |
| `validators/pool/` | liquidity_pool.ak, swap.ak |
| `validators/governance/` | voting.ak, treasury.ak |
| `validators/tokens/` | lp_token.ak, governance_token.ak |

### Ví dụ module organization

```aiken
// lib/defi_protocol/types/datum.ak

/// Pool state datum
pub type PoolDatum {
  token_a: AssetClass,
  token_b: AssetClass,
  reserve_a: Int,
  reserve_b: Int,
  lp_token: AssetClass,
  total_lp: Int,
  fee_numerator: Int,
  fee_denominator: Int,
}

/// Swap order datum
pub type SwapDatum {
  owner: ByteArray,
  input_token: AssetClass,
  output_token: AssetClass,
  min_output: Int,
  deadline: Int,
}
```

```aiken
// lib/defi_protocol/utils/math.ak

/// Tính output swap với constant product formula
/// x * y = k
pub fn calculate_swap_output(
  reserve_in: Int,
  reserve_out: Int,
  amount_in: Int,
  fee_num: Int,
  fee_denom: Int,
) -> Int {
  let amount_with_fee = amount_in * (fee_denom - fee_num)
  let numerator = amount_with_fee * reserve_out
  let denominator = reserve_in * fee_denom + amount_with_fee
  numerator / denominator
}
```

---

## Best Practices

### Do's (Nên làm)

- Chia types vào `lib/project/types.ak`
- Chia helpers vào `lib/project/utils.ak`
- Đặt tests cùng folder với code được test
- Sử dụng tên module mô tả (vesting, escrow, nft)
- Document public functions với `///`
- Export chỉ những gì cần thiết (`pub`)
- Giữ validators ngắn gọn, delegate logic vào lib

### Don'ts (Không nên làm)

- Không viết tất cả code trong 1 file validator
- Không duplicate types giữa các files
- Không hardcode values - dùng constants.ak
- Không đặt tests trong validators/
- Không export internal helper functions
- Không quên format với `aiken fmt`

### Naming Conventions

| Loại | Convention | Ví dụ |
|------|------------|-------|
| Files & Folders | snake_case | my_project/, liquidity_pool.ak |
| Types | PascalCase | VestingDatum, PoolRedeemer |
| Functions | snake_case | calculate_output, is_valid_signature |
| Constants | snake_case hoặc SCREAMING_CASE | min_ada, MAX_SUPPLY |
| Validators | snake_case | validator vesting, validator liquidity_pool |

### Import Strategy

```aiken
// ✅ Good: Import cụ thể
use my_project/types.{VestingDatum, VestingRedeemer}
use my_project/utils.{has_signature, is_after_deadline}

// ✅ Good: Import module để dùng prefix
use my_project/math
// Sử dụng: math.sqrt(100)

// ❌ Bad: Không import, copy code
// fn has_signature(...) { ... } <- Duplicate code
```

---

## Bài Tập Thực Hành

### Bài 1: Tạo cấu trúc dự án

```bash
# 1. Tạo dự án mới
aiken new my_defi_project

# 2. Tạo cấu trúc thư mục
cd my_defi_project
mkdir -p lib/my_defi_project/types
mkdir -p lib/my_defi_project/utils

# 3. Tạo files
touch lib/my_defi_project/types/datum.ak
touch lib/my_defi_project/types/redeemer.ak
touch lib/my_defi_project/utils/math.ak
touch lib/my_defi_project/utils/validation.ak
```

### Bài 2: Organize existing code

Cho đoạn code sau, hãy tách thành các files phù hợp:

```aiken
// Tất cả trong 1 file - KHÔNG TỐT!

type LockDatum {
  owner: ByteArray,
  deadline: Int,
}

type LockRedeemer {
  Unlock
}

fn is_signed_by(signers: List<ByteArray>, key: ByteArray) -> Bool {
  list.has(signers, key)
}

validator simple_lock {
  spend(datum: Option<LockDatum>, redeemer: LockRedeemer, _ref, tx) {
    expect Some(d) = datum
    is_signed_by(tx.extra_signatories, d.owner)
  }
}
```

**Giải pháp:**

| File | Nội dung |
|------|----------|
| `lib/my_project/types.ak` | LockDatum, LockRedeemer |
| `lib/my_project/utils.ak` | is_signed_by |
| `validators/simple_lock.ak` | validator simple_lock |

---

## Checklist Hoàn Thành

- [ ] Hiểu vai trò của từng thành phần trong dự án Aiken
- [ ] Biết cấu hình `aiken.toml` đúng cách
- [ ] Biết tổ chức code trong `lib/`
- [ ] Biết viết validators trong `validators/`
- [ ] Hiểu cấu trúc `plutus.json` blueprint
- [ ] Có thể tổ chức dự án quy mô lớn
- [ ] Áp dụng naming conventions đúng

---

## Tài Liệu Tham Khảo

- [Aiken Project Structure](https://aiken-lang.org/language-tour/modules)
- [CIP-57 Blueprint Specification](https://cips.cardano.org/cips/cip57)
- [Aiken Standard Library](https://aiken-lang.github.io/stdlib/)

---

➡️ **Tiếp theo**: [Bài 05 - Biến và Hằng số](./05_Variable_Constant.md)
