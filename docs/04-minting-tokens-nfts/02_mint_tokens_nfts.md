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
┌───────────────────────────────────────────────────────────┐
│                     MINTING POLICY                        │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Minting Policy = Script quyết định khi nào tokens       │
│  có thể được mint hoặc burn                              │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                                                     │ │
│  │  Policy Script ────▶ Hash ────▶ Policy ID          │ │
│  │                       │                             │ │
│  │                       ▼                             │ │
│  │             ┌─────────────────────┐                 │ │
│  │             │ Asset = Policy ID + │                 │ │
│  │             │       Asset Name    │                 │ │
│  │             └─────────────────────┘                 │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Mint: quantity > 0                                       │
│  Burn: quantity < 0                                       │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## Cấu trúc Validator với Mint

```rust
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

## Ví dụ: Simple FT (Admin Mint)

Policy cho phép admin mint unlimited tokens:

```rust title="validators/simple_ft.ak"
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

```rust title="lib/simple_ft_test.ak"
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

## One-Shot Pattern (Quan trọng!)

```
┌───────────────────────────────────────────────────────────┐
│                   ONE-SHOT PATTERN                        │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Vấn đề: Làm sao đảm bảo policy chỉ mint 1 lần?         │
│                                                           │
│  Giải pháp: Sử dụng UTxO reference                       │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                                                     │ │
│  │  1. Chọn một UTxO bất kỳ của user                  │ │
│  │     UTxO: (TxHash#Index)                           │ │
│  │                                                     │ │
│  │  2. Build policy với UTxO đó làm parameter         │ │
│  │     validator nft(utxo_ref) { ... }                │ │
│  │                                                     │ │
│  │  3. Policy kiểm tra UTxO được consume              │ │
│  │     list.any(tx.inputs, fn(i) {                    │ │
│  │       i.output_reference == utxo_ref               │ │
│  │     })                                             │ │
│  │                                                     │ │
│  │  4. UTxO chỉ tồn tại 1 lần → Policy chỉ pass 1 lần │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Kết quả: Policy ID unique cho mỗi UTxO                  │
│  → Mỗi NFT collection có policy riêng                    │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

## Workflow Mint NFT

```
┌───────────────────────────────────────────────────────────┐
│                 NFT MINTING WORKFLOW                      │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  1. PREPARE                                               │
│  ──────────                                               │
│  • Chọn UTxO để làm one-shot reference                   │
│  • Prepare metadata (CIP-25)                             │
│  • Upload media to IPFS                                  │
│                                                           │
│  2. BUILD POLICY                                          │
│  ──────────────                                           │
│  $ aiken build                                            │
│  → Inject UTxO ref vào policy                            │
│  → Get Policy ID từ blueprint                            │
│                                                           │
│  3. BUILD TRANSACTION                                     │
│  ────────────────────                                     │
│  Inputs:                                                  │
│  • UTxO ref (được consume)                               │
│  • Collateral                                            │
│                                                           │
│  Outputs:                                                 │
│  • NFT + ADA to receiver                                 │
│                                                           │
│  Mint:                                                    │
│  • +1 NFT với policy                                     │
│                                                           │
│  Metadata:                                                │
│  • CIP-25 metadata                                       │
│                                                           │
│  4. SIGN & SUBMIT                                         │
│  ────────────────                                         │
│  • Sign với required signatures                          │
│  • Submit to network                                      │
│                                                           │
│  5. VERIFY                                                │
│  ────────                                                 │
│  • Check on explorer                                      │
│  • Verify metadata displays correctly                     │
│                                                           │
└───────────────────────────────────────────────────────────┘
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

## Code mẫu

Xem code mẫu đầy đủ trong thư mục `examples/`:

- **validators/simple_ft.ak** - Fungible Token minting policy
- **validators/nft_policy.ak** - NFT minting policy (one-shot)
- **lib/simple_ft_test.ak** - Tests cho FT policy
- **lib/nft_test.ak** - 4 test cases cho NFT policy

```bash
# Chạy tests
cd examples
aiken check -m "simple_ft_test"
aiken check -m "nft_test"
```

## Hoàn thành Part 4

Chúc mừng! Bạn đã hoàn thành **Part 4: Minting Tokens & NFTs**. Bạn đã học:

- Cách viết minting policy cho FT và NFT
- One-shot pattern để ensure uniqueness

Tiếp theo, chúng ta sẽ chuyển sang **Part 5: Escrow Contract** để học cách sử dụng escrow contract trong Aiken.
