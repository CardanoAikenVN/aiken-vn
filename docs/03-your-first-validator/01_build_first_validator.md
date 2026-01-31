---
title: Xây dựng Spending Validator đầu tiên
sidebar_position: 1
---

# Xây dựng Spending Validator đầu tiên

Bài học này hướng dẫn tạo validator chi tiêu đầu tiên - từ thiết kế, viết code, biên dịch đến kiểm thử.

## Mục tiêu học tập

- Hiểu cấu trúc của spending validator
- Viết validator đơn giản "gift contract"
- Biên dịch và deploy validator
- Viết tests cho validator
- Tương tác với validator on-chain

## Spending Validator là gì?

Spending Validator là script quyết định ai có thể tiêu (spend) UTxO được lock tại script address.

```
┌─────────────────────────────────────────────────────────────┐
│                 SPENDING VALIDATOR                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   User ───▶ Lock ADA ───▶ Script Address            │  │
│   │                              │                       │  │
│   │                              ├── Value: 100 ADA      │  │
│   │                              └── Datum: { owner }    │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   Someone ───▶ Spend UTxO ───▶ Validator checks:    │  │
│   │                                                      │  │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐            │  │
│   │   │ Datum   │ +│Redeemer │ +│Context  │            │  │
│   │   └────┬────┘  └────┬────┘  └────┬────┘            │  │
│   │        │            │            │                  │  │
│   │        └────────────┼────────────┘                  │  │
│   │                     │                               │  │
│   │                     ▼                               │  │
│   │              ┌──────────────┐                       │  │
│   │              │  Validator   │                       │  │
│   │              │    Logic     │                       │  │
│   │              └──────┬───────┘                       │  │
│   │                     │                               │  │
│   │           ┌─────────┴─────────┐                    │  │
│   │           ▼                   ▼                    │  │
│   │         True               False                   │  │
│   │     (Can Spend)        (TX Rejected)               │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Bài tập: Gift Contract

Chúng ta sẽ xây dựng một "Gift Contract" đơn giản:
- **Lock**: Ai cũng có thể lock ADA vào contract với một "secret password"
- **Unlock**: Ai có password đúng có thể claim ADA

```
┌─────────────────────────────────────────────────────────────┐
│                    GIFT CONTRACT                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   LOCK (Tạo gift)                                          │
│   ───────────────                                          │
│   Alice ───▶ Lock 10 ADA                                   │
│              Datum: hash("secret_password")                │
│                                                             │
│   UNLOCK (Claim gift)                                      │
│   ─────────────────                                        │
│   Bob ───▶ Redeemer: "secret_password"                     │
│                │                                            │
│                ▼                                            │
│        hash("secret_password") == Datum?                   │
│                │                                            │
│        ┌───────┴───────┐                                   │
│        ▼               ▼                                   │
│       Yes              No                                   │
│    (Bob gets 10 ADA)  (TX Fails)                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Bước 1: Tạo dự án mới

```bash
# Tạo project mới
aiken new gift_contract
cd gift_contract

# Cấu trúc project
gift_contract/
├── aiken.toml           # Project configuration
├── lib/                 # Library modules
│   └── gift_contract/
│       └── validators.ak
├── validators/          # Validator scripts
│   └── gift.ak
└── README.md
```

## Bước 2: Định nghĩa Types

```rust title="lib/gift_contract/types.ak"
//// Types cho Gift Contract

use aiken/crypto.{Blake2b_224, Hash}

/// Datum: Chứa hash của password
/// Khi lock ADA, người tạo gift sẽ hash password và lưu vào datum
pub type GiftDatum {
  /// Hash của secret password (32 bytes)
  password_hash: ByteArray,
}

/// Redeemer: Password plaintext để unlock
/// Người claim phải cung cấp password đúng
pub type GiftRedeemer {
  /// Password plaintext để verify
  password: ByteArray,
}
```

## Bước 3: Viết Validator

```rust title="validators/gift.ak"
//// Gift Contract Validator
//// Cho phép ai có password đúng có thể claim ADA

use aiken/crypto.{blake2b_256}
use cardano/transaction.{OutputReference, Transaction}

/// Datum: Hash của password
pub type GiftDatum {
  password_hash: ByteArray,
}

/// Redeemer: Password plaintext
pub type GiftRedeemer {
  password: ByteArray,
}

/// Gift Validator
/// Kiểm tra: hash(redeemer.password) == datum.password_hash
validator gift {
  spend(
    datum: Option<GiftDatum>,
    redeemer: GiftRedeemer,
    _own_ref: OutputReference,
    _tx: Transaction,
  ) {
    // Lấy datum, fail nếu không có
    expect Some(d) = datum

    // Hash password từ redeemer
    let provided_hash = blake2b_256(redeemer.password)

    // So sánh với hash trong datum
    provided_hash == d.password_hash
  }
}
```

## Bước 4: Viết Tests

```rust title="lib/gift_contract/gift_test.ak"
//// Tests cho Gift Contract

use aiken/crypto.{blake2b_256}

/// Datum type
type GiftDatum {
  password_hash: ByteArray,
}

/// Redeemer type
type GiftRedeemer {
  password: ByteArray,
}

/// Core validation logic
fn validate_gift(datum: GiftDatum, redeemer: GiftRedeemer) -> Bool {
  let provided_hash = blake2b_256(redeemer.password)
  provided_hash == datum.password_hash
}

/// Helper: Tạo datum từ password
fn create_datum(password: ByteArray) -> GiftDatum {
  GiftDatum { password_hash: blake2b_256(password) }
}

// ============================================
// TESTS
// ============================================

test test_correct_password() {
  let secret = "my_secret_password"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: secret }

  validate_gift(datum, redeemer) == True
}

test test_wrong_password() {
  let secret = "my_secret_password"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "wrong_password" }

  validate_gift(datum, redeemer) == False
}

test test_empty_password() {
  let secret = ""
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "" }

  validate_gift(datum, redeemer) == True
}

test test_case_sensitive() {
  let secret = "Secret"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "secret" }

  // Password should be case-sensitive
  validate_gift(datum, redeemer) == False
}

test test_special_characters() {
  let secret = "p@ssw0rd!#$%"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "p@ssw0rd!#$%" }

  validate_gift(datum, redeemer) == True
}

test test_long_password() {
  let secret = "this_is_a_very_long_password_that_should_still_work_correctly_12345"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: secret }

  validate_gift(datum, redeemer) == True
}

test test_hash_uniqueness() {
  let password1 = "password1"
  let password2 = "password2"

  let hash1 = blake2b_256(password1)
  let hash2 = blake2b_256(password2)

  // Different passwords should produce different hashes
  hash1 != hash2
}
```

## Bước 5: Build và Check

```bash
# Kiểm tra syntax và chạy tests
aiken check

# Output mong đợi:
#     Compiling gift_contract 0.0.0
#       Checking ...
#
#     ┍━ gift_test ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#     │ PASS [mem: xxx, cpu: xxx] test_correct_password
#     │ PASS [mem: xxx, cpu: xxx] test_wrong_password
#     │ PASS [mem: xxx, cpu: xxx] test_empty_password
#     │ PASS [mem: xxx, cpu: xxx] test_case_sensitive
#     │ PASS [mem: xxx, cpu: xxx] test_special_characters
#     │ PASS [mem: xxx, cpu: xxx] test_long_password
#     │ PASS [mem: xxx, cpu: xxx] test_hash_uniqueness
#     ┕━━━━━━━━━━━━━━━━━━━━━━━━━━ 7 tests | 7 passed | 0 failed

# Build validator
aiken build

# Output file: plutus.json
# Chứa compiled validator script
```

## Bước 6: Xem Blueprint

Sau khi build, file `plutus.json` chứa blueprint của validator:

```json
{
  "preamble": {
    "title": "gift_contract",
    "description": "Aiken contracts for project 'gift_contract'",
    "version": "0.0.0",
    "plutusVersion": "v3",
    "compiler": {
      "name": "Aiken",
      "version": "v1.1.0"
    }
  },
  "validators": [
    {
      "title": "gift.gift.spend",
      "datum": {
        "title": "GiftDatum",
        "schema": {
          "$ref": "#/definitions/gift~1GiftDatum"
        }
      },
      "redeemer": {
        "title": "GiftRedeemer",
        "schema": {
          "$ref": "#/definitions/gift~1GiftRedeemer"
        }
      },
      "compiledCode": "5901a201000...",
      "hash": "abc123..."
    }
  ],
  "definitions": {
    "gift/GiftDatum": {
      "title": "GiftDatum",
      "dataType": "constructor",
      "fields": [
        {
          "title": "password_hash",
          "dataType": "bytes"
        }
      ]
    },
    "gift/GiftRedeemer": {
      "title": "GiftRedeemer",
      "dataType": "constructor",
      "fields": [
        {
          "title": "password",
          "dataType": "bytes"
        }
      ]
    }
  }
}
```

## Cải tiến: Thêm Owner

Phiên bản nâng cao với owner có thể cancel gift:

```rust title="validators/gift_v2.ak"
//// Gift Contract V2 - Với owner có thể cancel

use aiken/crypto.{blake2b_256}
use cardano/transaction.{OutputReference, Transaction}
use aiken/collection/list

/// Datum với thêm owner
pub type GiftDatum {
  password_hash: ByteArray,
  owner: ByteArray,  // Public key hash của owner
}

/// Redeemer với 2 actions
pub type GiftRedeemer {
  /// Claim với password
  Claim { password: ByteArray }
  /// Owner cancel và lấy lại ADA
  Cancel
}

/// Helper: Kiểm tra signature
fn signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}

/// Gift Validator V2
validator gift_v2 {
  spend(
    datum: Option<GiftDatum>,
    redeemer: GiftRedeemer,
    _own_ref: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      // Claim: Ai có password đúng có thể claim
      Claim { password } -> {
        let provided_hash = blake2b_256(password)
        provided_hash == d.password_hash
      }

      // Cancel: Chỉ owner mới cancel được
      Cancel -> signed_by(tx, d.owner)
    }
  }
}
```

### Tests cho V2

```rust title="lib/gift_contract/gift_v2_test.ak"
use aiken/crypto.{blake2b_256}
use aiken/collection/list

type GiftDatum {
  password_hash: ByteArray,
  owner: ByteArray,
}

type GiftRedeemer {
  Claim { password: ByteArray }
  Cancel
}

fn validate_claim(datum: GiftDatum, password: ByteArray) -> Bool {
  blake2b_256(password) == datum.password_hash
}

fn validate_cancel(datum: GiftDatum, signers: List<ByteArray>) -> Bool {
  list.has(signers, datum.owner)
}

// Tests
test test_claim_with_correct_password() {
  let datum = GiftDatum {
    password_hash: blake2b_256("secret"),
    owner: #"alice",
  }
  validate_claim(datum, "secret") == True
}

test test_claim_with_wrong_password() {
  let datum = GiftDatum {
    password_hash: blake2b_256("secret"),
    owner: #"alice",
  }
  validate_claim(datum, "wrong") == False
}

test test_cancel_by_owner() {
  let datum = GiftDatum {
    password_hash: blake2b_256("secret"),
    owner: #"alice",
  }
  let signers = [#"alice", #"bob"]
  validate_cancel(datum, signers) == True
}

test test_cancel_by_non_owner() {
  let datum = GiftDatum {
    password_hash: blake2b_256("secret"),
    owner: #"alice",
  }
  let signers = [#"bob", #"charlie"]
  validate_cancel(datum, signers) == False
}
```

## Time-locked Gift

Thêm điều kiện thời gian:

```rust title="validators/gift_v3.ak"
//// Gift Contract V3 - Time-locked

use aiken/crypto.{blake2b_256}
use cardano/transaction.{OutputReference, Transaction}
use aiken/collection/list
use aiken/interval

/// Datum với deadline
pub type GiftDatum {
  password_hash: ByteArray,
  owner: ByteArray,
  deadline: Int,  // POSIX timestamp
}

/// Redeemer
pub type GiftRedeemer {
  Claim { password: ByteArray }
  Cancel
  Refund  // Owner lấy lại sau deadline nếu không ai claim
}

/// Helper: Kiểm tra signature
fn signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}

/// Helper: Kiểm tra thời gian
fn is_before_deadline(tx: Transaction, deadline: Int) -> Bool {
  when tx.validity_range.upper_bound.bound_type is {
    Finite(upper) -> upper < deadline
    _ -> False
  }
}

fn is_after_deadline(tx: Transaction, deadline: Int) -> Bool {
  when tx.validity_range.lower_bound.bound_type is {
    Finite(lower) -> lower > deadline
    _ -> False
  }
}

/// Gift Validator V3
validator gift_v3 {
  spend(
    datum: Option<GiftDatum>,
    redeemer: GiftRedeemer,
    _own_ref: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      // Claim: Trước deadline với password đúng
      Claim { password } -> {
        let correct_password = blake2b_256(password) == d.password_hash
        let before_deadline = is_before_deadline(tx, d.deadline)
        correct_password && before_deadline
      }

      // Cancel: Owner có thể cancel bất kỳ lúc nào
      Cancel -> signed_by(tx, d.owner)

      // Refund: Owner lấy lại sau deadline
      Refund -> {
        let is_owner = signed_by(tx, d.owner)
        let after_deadline = is_after_deadline(tx, d.deadline)
        is_owner && after_deadline
      }
    }
  }
}
```

## Workflow tương tác On-chain

```
┌─────────────────────────────────────────────────────────────┐
│              ON-CHAIN INTERACTION                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. BUILD VALIDATOR                                        │
│   ──────────────────                                        │
│   $ aiken build                                             │
│   → plutus.json (contains script hash)                      │
│                                                             │
│   2. COMPUTE SCRIPT ADDRESS                                 │
│   ─────────────────────────                                 │
│   script_hash → addr_test1...                               │
│   (Using cardano-cli or SDK)                                │
│                                                             │
│   3. LOCK ADA (Create gift)                                 │
│   ─────────────────────────                                 │
│   $ cardano-cli transaction build \                         │
│       --tx-out "script_addr+10000000" \                     │
│       --tx-out-datum-inline-file datum.json \               │
│       ...                                                   │
│                                                             │
│   4. UNLOCK ADA (Claim gift)                                │
│   ──────────────────────────                                │
│   $ cardano-cli transaction build \                         │
│       --tx-in "utxo_at_script" \                            │
│       --tx-in-script-file plutus.json \                     │
│       --tx-in-datum-inline \                                │
│       --tx-in-redeemer-file redeemer.json \                 │
│       --tx-out "my_addr+9800000" \                          │
│       ...                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Sử dụng với Off-chain SDK

### Lucid (TypeScript)

```typescript
import { Lucid, fromText } from "lucid-cardano";

// Initialize Lucid
const lucid = await Lucid.new(provider, "Preview");
lucid.selectWalletFromSeed(seed);

// Load validator from blueprint
const validator = {
  type: "PlutusV3",
  script: blueprint.validators[0].compiledCode,
};
const validatorAddress = lucid.utils.validatorToAddress(validator);

// Create datum
const password = "my_secret";
const passwordHash = lucid.utils.sha256(fromText(password));
const datum = Data.to({
  password_hash: passwordHash,
});

// Lock ADA
const lockTx = await lucid
  .newTx()
  .payToContract(validatorAddress, { inline: datum }, { lovelace: 10_000_000n })
  .complete();

const signedLockTx = await lockTx.sign().complete();
const lockTxHash = await signedLockTx.submit();

// Unlock ADA
const utxos = await lucid.utxosAt(validatorAddress);
const redeemer = Data.to({ password: fromText(password) });

const unlockTx = await lucid
  .newTx()
  .collectFrom(utxos, redeemer)
  .attachSpendingValidator(validator)
  .complete();

const signedUnlockTx = await unlockTx.sign().complete();
const unlockTxHash = await signedUnlockTx.submit();
```

## Code mẫu

Xem code mẫu đầy đủ trong thư mục `examples/`:

- **validators/gift.ak** - Gift Contract validator hoàn chỉnh
- **lib/gift_test.ak** - 7 test cases cho Gift Contract

```bash
# Chạy tests
cd examples
aiken check -m "gift_test"
```

## Hoàn thành Part 3

Chúc mừng! Bạn đã hoàn thành **Part 3: Your First Validator**. Bạn đã học:

- Cấu trúc của spending validator
- Viết Gift Contract với nhiều tính năng
- Build và test validator
- Các vấn đề bảo mật cần lưu ý

Tiếp theo, chúng ta sẽ chuyển sang **Part 4: Minting Tokens & NFTs** để học cách tạo minting policies.
