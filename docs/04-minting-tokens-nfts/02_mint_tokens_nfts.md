---
title: Mint token và NFT trên Cardano
sidebar_position: 2
---

# Minting Policy - Tạo Token và NFT

Bài học này hướng dẫn viết minting policy để tạo (mint) và hủy (burn) tokens trên Cardano.

## Mục tiêu học tập

- Hiểu minting policy và cách hoạt động
- Viết policy cho Fungible Token
- Viết policy cho NFT (one-time mint)
- Thực hiện burn tokens
- Best practices cho minting

## Minting Policy là gì?

```
┌─────────────────────────────────────────────────────────────┐
│                 MINTING POLICY                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Minting Policy = Script quyết định khi nào tokens        │
│   có thể được mint hoặc burn                               │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   Policy Script ────▶ Hash ────▶ Policy ID          │  │
│   │                        │                             │  │
│   │                        │                             │  │
│   │                        ▼                             │  │
│   │              ┌─────────────────────┐                │  │
│   │              │ Asset = Policy ID + │                │  │
│   │              │        Asset Name   │                │  │
│   │              └─────────────────────┘                │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Mint: quantity > 0                                        │
│   Burn: quantity < 0                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Cấu trúc Validator với Mint

```aiken
validator my_policy {
  mint(redeemer: MyRedeemer, policy_id: PolicyId, tx: Transaction) {
    // Logic kiểm tra mint/burn
    // Return True = Cho phép mint/burn
    // Return False = Từ chối
    True
  }
}
```

### Parameters

- `redeemer`: Dữ liệu từ user khi mint/burn
- `policy_id`: Policy ID của script này
- `tx`: Transaction context

## Ví dụ 1: Simple FT (Admin Mint)

Policy cho phép admin mint unlimited tokens:

```aiken title="validators/simple_ft.ak"
//// Simple Fungible Token
//// Chỉ admin mới mint được

use cardano/transaction.{Transaction}
use cardano/assets.{PolicyId}
use aiken/collection/list

/// Redeemer
pub type FTRedeemer {
  Mint
  Burn
}

/// Admin public key hash (hardcoded hoặc parameterized)
const admin_pkh: ByteArray = #"abc123..."

/// Kiểm tra signature
fn signed_by_admin(tx: Transaction) -> Bool {
  list.has(tx.extra_signatories, admin_pkh)
}

/// Minting Policy
validator simple_ft {
  mint(redeemer: FTRedeemer, _policy_id: PolicyId, tx: Transaction) {
    when redeemer is {
      Mint -> signed_by_admin(tx)
      Burn -> signed_by_admin(tx)
    }
  }
}
```

### Test

```aiken title="lib/simple_ft_test.ak"
use aiken/collection/list

const admin_pkh: ByteArray = #"abc123"

fn signed_by_admin(signers: List<ByteArray>) -> Bool {
  list.has(signers, admin_pkh)
}

test test_admin_can_mint() {
  let signers = [#"abc123", #"other"]
  signed_by_admin(signers) == True
}

test test_non_admin_cannot_mint() {
  let signers = [#"bob", #"charlie"]
  signed_by_admin(signers) == False
}
```

## Ví dụ 2: Capped Supply FT

Token với tổng supply cố định:

```aiken title="validators/capped_ft.ak"
//// Capped Supply Fungible Token
//// Chỉ mint một lần với số lượng cố định

use cardano/transaction.{Transaction, OutputReference}
use cardano/assets.{PolicyId, quantity_of}
use aiken/collection/list

/// Redeemer
pub type CappedRedeemer {
  InitialMint
  Burn
}

/// Maximum supply
const max_supply: Int = 1_000_000_000_000  // 1 trillion

/// UTxO phải được consume để mint (one-shot pattern)
/// Đây là parameter được inject khi build
pub type Config {
  utxo_ref: OutputReference,
  admin_pkh: ByteArray,
}

validator capped_ft(config: Config) {
  mint(redeemer: CappedRedeemer, policy_id: PolicyId, tx: Transaction) {
    when redeemer is {
      InitialMint -> {
        // Kiểm tra UTxO được consume (đảm bảo chỉ mint 1 lần)
        let consumes_utxo = list.any(
          tx.inputs,
          fn(input) { input.output_reference == config.utxo_ref }
        )

        // Kiểm tra số lượng mint đúng
        let minted_amount = quantity_of(tx.mint, policy_id, "")
        let correct_amount = minted_amount == max_supply

        // Kiểm tra admin ký
        let is_admin = list.has(tx.extra_signatories, config.admin_pkh)

        consumes_utxo && correct_amount && is_admin
      }

      Burn -> {
        // Cho phép burn bất kỳ lúc nào
        let burned_amount = quantity_of(tx.mint, policy_id, "")
        burned_amount < 0
      }
    }
  }
}
```

## Ví dụ 3: NFT Minting Policy

NFT yêu cầu quantity = 1 và chỉ mint một lần:

```aiken title="validators/nft_policy.ak"
//// NFT Minting Policy
//// Đảm bảo chỉ mint 1 token với quantity = 1

use cardano/transaction.{Transaction, OutputReference, Input}
use cardano/assets.{PolicyId, AssetName, quantity_of, tokens}
use aiken/collection/list
use aiken/collection/dict

/// Redeemer cho NFT
pub type NFTRedeemer {
  MintNFT { asset_name: AssetName }
  BurnNFT { asset_name: AssetName }
}

/// Config với UTxO reference (one-shot pattern)
pub type NFTConfig {
  utxo_ref: OutputReference,
}

/// Kiểm tra UTxO được consume
fn consumes_utxo(tx: Transaction, utxo_ref: OutputReference) -> Bool {
  list.any(tx.inputs, fn(input) { input.output_reference == utxo_ref })
}

/// Đếm số assets được mint với policy này
fn count_minted_assets(tx: Transaction, policy_id: PolicyId) -> Int {
  tx.mint
    |> tokens(policy_id)
    |> dict.to_pairs()
    |> list.length()
}

/// NFT Policy
validator nft_policy(config: NFTConfig) {
  mint(redeemer: NFTRedeemer, policy_id: PolicyId, tx: Transaction) {
    when redeemer is {
      MintNFT { asset_name } -> {
        // 1. Phải consume UTxO cụ thể (one-shot)
        let valid_utxo = consumes_utxo(tx, config.utxo_ref)

        // 2. Chỉ mint đúng 1 asset
        let single_asset = count_minted_assets(tx, policy_id) == 1

        // 3. Quantity phải = 1
        let correct_quantity = quantity_of(tx.mint, policy_id, asset_name) == 1

        valid_utxo && single_asset && correct_quantity
      }

      BurnNFT { asset_name } -> {
        // Burn: quantity = -1
        quantity_of(tx.mint, policy_id, asset_name) == -1
      }
    }
  }
}
```

### Test NFT Policy

```aiken title="lib/nft_policy_test.ak"
use aiken/collection/list

type MockMintedAsset {
  name: ByteArray,
  quantity: Int,
}

fn validate_nft_mint(
  minted_assets: List<MockMintedAsset>,
  target_name: ByteArray,
  utxo_consumed: Bool,
) -> Bool {
  // Chỉ 1 asset
  let single_asset = list.length(minted_assets) == 1

  // Tìm asset với name đúng
  let correct_asset = list.find(minted_assets, fn(a) { a.name == target_name })

  // Quantity = 1
  let correct_quantity = when correct_asset is {
    Some(asset) -> asset.quantity == 1
    None -> False
  }

  utxo_consumed && single_asset && correct_quantity
}

test test_valid_nft_mint() {
  let minted = [MockMintedAsset { name: "MyNFT", quantity: 1 }]
  validate_nft_mint(minted, "MyNFT", True) == True
}

test test_invalid_quantity() {
  let minted = [MockMintedAsset { name: "MyNFT", quantity: 2 }]
  validate_nft_mint(minted, "MyNFT", True) == False
}

test test_no_utxo_consumed() {
  let minted = [MockMintedAsset { name: "MyNFT", quantity: 1 }]
  validate_nft_mint(minted, "MyNFT", False) == False
}

test test_multiple_assets() {
  let minted = [
    MockMintedAsset { name: "NFT1", quantity: 1 },
    MockMintedAsset { name: "NFT2", quantity: 1 },
  ]
  validate_nft_mint(minted, "NFT1", True) == False
}
```

## Ví dụ 4: Time-locked Minting

Chỉ mint trong khoảng thời gian nhất định:

```aiken title="validators/timelocked_mint.ak"
//// Time-locked Minting Policy
//// Chỉ mint trong window thời gian

use cardano/transaction.{Transaction}
use cardano/assets.{PolicyId}
use aiken/collection/list
use aiken/interval

/// Config
pub type TimeConfig {
  admin_pkh: ByteArray,
  mint_start: Int,   // POSIX timestamp
  mint_end: Int,     // POSIX timestamp
}

/// Redeemer
pub type TimeRedeemer {
  Mint
  Burn
}

/// Kiểm tra thời gian hợp lệ
fn within_time_window(tx: Transaction, start: Int, end: Int) -> Bool {
  // Kiểm tra lower bound >= start
  let after_start = when tx.validity_range.lower_bound.bound_type is {
    Finite(lower) -> lower >= start
    _ -> False
  }

  // Kiểm tra upper bound <= end
  let before_end = when tx.validity_range.upper_bound.bound_type is {
    Finite(upper) -> upper <= end
    _ -> False
  }

  after_start && before_end
}

validator timelocked_mint(config: TimeConfig) {
  mint(redeemer: TimeRedeemer, _policy_id: PolicyId, tx: Transaction) {
    let is_admin = list.has(tx.extra_signatories, config.admin_pkh)

    when redeemer is {
      Mint -> {
        let valid_time = within_time_window(tx, config.mint_start, config.mint_end)
        is_admin && valid_time
      }

      Burn -> is_admin  // Burn anytime
    }
  }
}
```

## Ví dụ 5: NFT Collection

Mint nhiều NFTs trong collection:

```aiken title="validators/nft_collection.ak"
//// NFT Collection Policy
//// Mint NFTs với kiểm tra collection rules

use cardano/transaction.{Transaction, OutputReference}
use cardano/assets.{PolicyId, AssetName, quantity_of, tokens, flatten}
use aiken/collection/list
use aiken/collection/dict

/// Collection config
pub type CollectionConfig {
  creator: ByteArray,
  max_supply: Int,
  prefix: ByteArray,  // NFT name prefix
}

/// Redeemer
pub type CollectionRedeemer {
  MintBatch { names: List<AssetName> }
  Burn { name: AssetName }
}

/// Kiểm tra tất cả names có prefix đúng
fn all_names_valid(names: List<AssetName>, prefix: ByteArray) -> Bool {
  list.all(names, fn(name) { starts_with(name, prefix) })
}

/// Helper: Check if bytes start with prefix
fn starts_with(bytes: ByteArray, prefix: ByteArray) -> Bool {
  // Simplified check - in real code use builtin
  True  // Placeholder
}

/// Đếm tokens đang được mint
fn count_minting(tx: Transaction, policy_id: PolicyId) -> Int {
  tx.mint
    |> tokens(policy_id)
    |> dict.values()
    |> list.filter(fn(qty) { qty > 0 })
    |> list.length()
}

/// Kiểm tra tất cả quantities = 1
fn all_quantities_one(tx: Transaction, policy_id: PolicyId, names: List<AssetName>) -> Bool {
  list.all(names, fn(name) {
    quantity_of(tx.mint, policy_id, name) == 1
  })
}

validator nft_collection(config: CollectionConfig) {
  mint(redeemer: CollectionRedeemer, policy_id: PolicyId, tx: Transaction) {
    let is_creator = list.has(tx.extra_signatories, config.creator)

    when redeemer is {
      MintBatch { names } -> {
        // 1. Creator phải ký
        // 2. Tất cả names có prefix đúng
        // 3. Tất cả quantities = 1
        // 4. Không vượt quá max_supply (cần track off-chain)
        and {
          is_creator,
          all_names_valid(names, config.prefix),
          all_quantities_one(tx, policy_id, names),
          list.length(names) <= config.max_supply,
        }
      }

      Burn { name } -> {
        // Chỉ creator burn được
        is_creator && quantity_of(tx.mint, policy_id, name) == -1
      }
    }
  }
}
```

## One-Shot Pattern (Quan trọng!)

```
┌─────────────────────────────────────────────────────────────┐
│               ONE-SHOT PATTERN                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Vấn đề: Làm sao đảm bảo policy chỉ mint 1 lần?          │
│                                                             │
│   Giải pháp: Sử dụng UTxO reference                        │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   1. Chọn một UTxO bất kỳ của user                  │  │
│   │      UTxO: (TxHash#Index)                           │  │
│   │                                                      │  │
│   │   2. Build policy với UTxO đó làm parameter         │  │
│   │      validator nft(utxo_ref) { ... }                │  │
│   │                                                      │  │
│   │   3. Policy kiểm tra UTxO được consume              │  │
│   │      list.any(tx.inputs, fn(i) {                   │  │
│   │        i.output_reference == utxo_ref              │  │
│   │      })                                             │  │
│   │                                                      │  │
│   │   4. UTxO chỉ tồn tại 1 lần → Policy chỉ pass 1 lần│  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Kết quả: Policy ID unique cho mỗi UTxO                   │
│   → Mỗi NFT collection có policy riêng                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Workflow Mint NFT

```
┌─────────────────────────────────────────────────────────────┐
│              NFT MINTING WORKFLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. PREPARE                                                │
│   ──────────                                                │
│   • Chọn UTxO để làm one-shot reference                    │
│   • Prepare metadata (CIP-25)                              │
│   • Upload media to IPFS                                   │
│                                                             │
│   2. BUILD POLICY                                           │
│   ──────────────                                            │
│   $ aiken build                                             │
│   → Inject UTxO ref vào policy                             │
│   → Get Policy ID từ blueprint                             │
│                                                             │
│   3. BUILD TRANSACTION                                      │
│   ────────────────────                                      │
│   Inputs:                                                   │
│   • UTxO ref (được consume)                                │
│   • Collateral                                             │
│                                                             │
│   Outputs:                                                  │
│   • NFT + ADA to receiver                                  │
│                                                             │
│   Mint:                                                     │
│   • +1 NFT với policy                                      │
│                                                             │
│   Metadata:                                                 │
│   • CIP-25 metadata                                        │
│                                                             │
│   4. SIGN & SUBMIT                                          │
│   ────────────────                                          │
│   • Sign với required signatures                           │
│   • Submit to network                                       │
│                                                             │
│   5. VERIFY                                                 │
│   ────────                                                  │
│   • Check on explorer                                       │
│   • Verify metadata displays correctly                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Off-chain Integration (Lucid)

```typescript
import { Lucid, fromText, Data } from "lucid-cardano";

// Mint NFT
async function mintNFT(
  lucid: Lucid,
  blueprint: any,
  metadata: object
) {
  // Get UTxO for one-shot
  const utxos = await lucid.wallet.getUtxos();
  const utxo = utxos[0];

  // Apply parameter to policy
  const policy = {
    type: "PlutusV3",
    script: applyParamsToScript(
      blueprint.validators[0].compiledCode,
      [utxo.txHash, utxo.outputIndex]
    ),
  };

  const policyId = lucid.utils.mintingPolicyToId(policy);
  const assetName = fromText("MyNFT#001");

  // Build transaction
  const tx = await lucid
    .newTx()
    .collectFrom([utxo])
    .mintAssets(
      { [policyId + assetName]: 1n },
      Data.to("MintNFT")
    )
    .attachMintingPolicy(policy)
    .attachMetadata(721, {
      [policyId]: {
        [assetName]: metadata,
      },
    })
    .complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  return { txHash, policyId, assetName };
}
```

## Security Best Practices

```
┌─────────────────────────────────────────────────────────────┐
│              SECURITY BEST PRACTICES                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ✅ DO:                                                    │
│   • Sử dụng one-shot pattern cho NFT                       │
│   • Validate tất cả mint quantities                        │
│   • Kiểm tra signatures khi cần                            │
│   • Set time bounds cho minting                            │
│   • Test thoroughly trước mainnet                          │
│                                                             │
│   ❌ DON'T:                                                 │
│   • Cho phép mint unlimited mà không có control            │
│   • Quên validate asset names                              │
│   • Trust redeemer data mà không verify                    │
│   • Skip testing edge cases                                │
│                                                             │
│   ⚠️  CONSIDER:                                            │
│   • Ai có quyền mint/burn?                                 │
│   • Có giới hạn supply không?                              │
│   • Time constraints?                                       │
│   • Burn policy?                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. Minting Policy = Script kiểm soát mint/burn            │
│  2. validator { mint(...) } = Syntax cho minting policy    │
│  3. Policy ID = Hash của minting policy script             │
│  4. Mint = quantity > 0, Burn = quantity < 0               │
│  5. One-shot pattern = Sử dụng UTxO ref để ensure 1 lần   │
│  6. NFT = quantity = 1 với unique asset name               │
│  7. CIP-25 = Standard cho NFT metadata                     │
└─────────────────────────────────────────────────────────────┘
```

## Hoàn thành Part 4

Chúc mừng! Bạn đã hoàn thành **Part 4: Minting Tokens & NFTs**. Bạn đã học:

- Cách viết minting policy cho FT và NFT
- One-shot pattern để ensure uniqueness
- Time-locked và supply-capped tokens
- NFT collections với batch minting

Tiếp theo, chúng ta sẽ chuyển sang **Part 5: Escrow Contract** để xây dựng một dApp hoàn chỉnh.
