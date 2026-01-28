---
title: "01. Khai Niem FT & NFT"
sidebar_position: 1
description: "Hieu ve Fungible Tokens (FT) va Non-Fungible Tokens (NFT) tren Cardano, cach chung hoat dong voi Native Assets va Minting Policies."
---

# Bai 01: Khai Niem FT & NFT

:::info Muc tieu
Hieu ve Fungible Tokens (FT) va Non-Fungible Tokens (NFT) tren Cardano, cach chung hoat dong voi Native Assets va Minting Policies.
:::

---

## Muc Luc

1. [Tong quan Native Assets](#1-tong-quan-native-assets)
2. [Fungible Tokens (FT)](#2-fungible-tokens-ft)
3. [Non-Fungible Tokens (NFT)](#3-non-fungible-tokens-nft)
4. [Policy ID va Asset Name](#4-policy-id-va-asset-name)
5. [Minting vs Burning](#5-minting-vs-burning)
6. [Token Metadata](#6-token-metadata)
7. [Use Cases](#7-use-cases)

---

## 1. Tong Quan Native Assets

### Native Assets la gi?

Cardano Native Assets la cac tokens duoc xu ly native boi ledger, khong can smart contract de transfer.

| Tinh nang | Ethereum | Cardano |
|-----------|----------|---------|
| Token Standard | ERC-20 Contract | Native Asset |
| Implementation | Smart contract | Ledger native |
| Gas/Fees | Gas intensive | Minimal fees |
| Complexity | Complex to create | Simple minting |
| Security | Reentrancy risks | No such risks |
| NFT Standard | ERC-721 | Native NFT |
| Metadata | On-chain (costly) | Flexible |

**Key Benefits:**
- Khong can smart contract cho transfers
- Bao mat nhu ADA
- Phi thap hon
- De lam viec hon
- Multi-asset UTXOs

### Multi-Asset UTXO

Mot UTXO co the chua NHIEU loai assets:

```
UTXO
├── Address: addr1qxy...
└── Value:
    ├── ADA: 10,000,000 lovelace (10 ADA)
    ├── Policy_ABC:
    │   ├── "TokenA": 1000
    │   └── "TokenB": 500
    └── Policy_XYZ:
        └── "MyNFT": 1
```

:::warning Luu y
Moi UTXO can minimum ADA de ton tai (tuy thuoc vao so luong assets va datum size).
:::

### Asset Identification

Moi asset duoc identify boi:

| Thanh phan | Mo ta | Vi du |
|------------|-------|-------|
| Policy ID | Hash cua minting policy script (28 bytes) | "abc123def456..." |
| Asset Name | User-defined name (0-32 bytes) | "MyToken" hoac "" |
| Asset ID | PolicyID + AssetName | "abc123def456.MyToken" |

**Truong hop dac biet - ADA:**
- Policy ID: "" (empty)
- Asset Name: "" (empty)
- La asset duy nhat co empty policy

---

## 2. Fungible Tokens (FT)

### FT la gi?

Fungible = Co the thay the lan nhau.

**Vi du thuc te:**
- 1 dong $100 = 1 dong $100 khac
- 1 gram vang = 1 gram vang khac
- 1 Bitcoin = 1 Bitcoin khac

**Dac diem:**

| Thuoc tinh | Mo ta |
|------------|-------|
| Divisible | Chia nho duoc |
| Interchangeable | Thay the duoc |
| Same value per unit | Moi don vi co gia tri nhu nhau |
| Multiple units exist | Ton tai nhieu don vi |

**Use Cases tren Cardano:**
- Stablecoins (DJED, iUSD)
- Utility tokens (project tokens)
- Governance tokens (voting)
- Wrapped assets

### FT Minting Policy

```aiken
/// Simple FT minting policy
/// Anyone with the right key can mint/burn

type FTRedeemer {
  Mint
  Burn
}

validator ft_policy {
  mint(redeemer: FTRedeemer, policy_id: PolicyId, tx: Transaction) {
    // Get minting info
    let minted = assets.tokens(tx.mint, policy_id)

    when redeemer is {
      Mint -> {
        // Check authorized minter signed
        let authorized = list.has(tx.extra_signatories, minter_pkh)
        // Check positive amount
        let positive_mint = all_positive(minted)

        authorized && positive_mint
      }

      Burn -> {
        // Anyone holding tokens can burn
        let negative_mint = all_negative(minted)
        negative_mint
      }
    }
  }
}

fn all_positive(tokens: Dict<AssetName, Int>) -> Bool {
  dict.foldl(tokens, True, fn(_, amount, acc) {
    acc && amount > 0
  })
}

fn all_negative(tokens: Dict<AssetName, Int>) -> Bool {
  dict.foldl(tokens, True, fn(_, amount, acc) {
    acc && amount < 0
  })
}
```

---

## 3. Non-Fungible Tokens (NFT)

### NFT la gi?

Non-Fungible = Khong the thay the.

**Vi du thuc te:**
- Buc tranh Mona Lisa (chi co 1)
- Can nha (moi can unique)
- Ve may bay (specific seat, flight)

**Dac diem:**

| Thuoc tinh | Mo ta |
|------------|-------|
| Unique | Doc nhat |
| Indivisible | Khong chia nho duoc |
| Quantity = 1 | Chi co 1 unit |
| Verifiable ownership | Xac minh quyen so huu |

**Use Cases tren Cardano:**
- Digital art
- Gaming items
- Identity/credentials
- Real estate tokens
- Event tickets
- Domain names

### NFT Uniqueness

Lam sao dam bao NFT chi co 1?

**Method 1: One-Shot Minting Policy**

Policy yeu cau consuming mot SPECIFIC UTXO:

```
UTXO X#0 (unique) --consume--> Can mint NFT
```

Sau khi UTXO X#0 duoc spent:
- Khong the mint lai
- Policy "expired"
- NFT mai mai unique

**Method 2: Time-Limited Policy**

Policy chi valid cho den deadline. (It an toan hon - co the mint nhieu truoc deadline)

**Method 3: Counter/Registry**

Smart contract tracks minted IDs:
```
Registry UTXO: { minted: [1, 2, 3, 4, 5] }
Mint #6: Check 6 not in list, add to list
```

### One-Shot NFT Policy

```aiken
use aiken/collection/list
use cardano/transaction.{Transaction, OutputReference, Input}
use cardano/assets.{PolicyId}

/// One-shot NFT minting policy
/// Can only mint once by consuming specific UTXO

validator nft_policy(utxo_ref: OutputReference) {
  mint(_redeemer: Data, policy_id: PolicyId, tx: Transaction) {
    // Check that the specific UTXO is being consumed
    let utxo_consumed = list.any(
      tx.inputs,
      fn(input) { input.output_reference == utxo_ref }
    )

    // Check that exactly 1 NFT is minted
    let minted = assets.tokens(tx.mint, policy_id)
    let mint_count = dict.foldl(minted, 0, fn(_, qty, acc) { acc + qty })
    let only_one = mint_count == 1

    // Both conditions must be true
    utxo_consumed && only_one
  }
}
```

---

## 4. Policy ID va Asset Name

### Policy ID Deep Dive

Policy ID = Hash cua Minting Policy Script.

```mermaid
flowchart TD
    A[Minting Policy Script] --> B[Hash Blake2b-224]
    B --> C[Policy ID 28 bytes hex]
```

**Properties:**
- Deterministic: same script -> same policy ID
- Immutable: khong the thay doi sau khi tao
- Unique: different scripts -> different policy IDs

**Parameterized Policies:**

```aiken
validator my_policy(param1, param2) { ... }

// Different params -> Different Policy ID
// my_policy(A, B) -> PolicyID_1
// my_policy(A, C) -> PolicyID_2
// my_policy(X, Y) -> PolicyID_3
```

### Asset Name Conventions

Asset Name = User-defined identifier (0-32 bytes).

| Loai Token | Convention | Vi du |
|------------|------------|-------|
| FT | Single name per policy, human-readable | "DJED", "iUSD", "MILK" |
| FT | Empty name | "" (policy itself is the token) |
| NFT | Multiple unique names | "SpaceBudz0001", "ClayNation1234" |
| NFT | Hex reference | "000643b0..." (CIP-68 reference) |

**CIP-67/68 Standard (NFT naming):**

| Prefix | Loai |
|--------|------|
| (100) | Reference NFT |
| (222) | NFT |
| (333) | FT |
| (444) | Rich FT |

Vi du: `(222)SpaceBud0001`

---

## 5. Minting vs Burning

### Minting Process

Minting = Tao moi tokens (positive mint value).

```mermaid
flowchart LR
    subgraph INPUTS
        A[10 ADA fees]
    end
    subgraph OUTPUTS
        B[5 ADA + 1000 MyToken NEW]
    end
    A --> B
    C[MINT FIELD: +1000 MyToken] --> B
```

**Value Equation:**
```
inputs + mint = outputs + fee
10 ADA + 1000 Token = (5 ADA + 1000 Token) + ~0.2 ADA
```

### Burning Process

Burning = Huy tokens (negative mint value).

```mermaid
flowchart LR
    subgraph INPUTS
        A[10 ADA + 1000 MyToken]
    end
    subgraph OUTPUTS
        B[9.8 ADA no token]
    end
    A --> B
    C[MINT FIELD: -1000 MyToken] --> B
```

**Value Equation:**
```
inputs + mint = outputs + fee
(10 ADA + 1000 Token) + (-1000 Token) = 9.8 ADA + 0.2 fee
```

:::warning Luu y
Tokens bi DESTROYED, khong the recover!
:::

### Mint Field in Aiken

```aiken
use cardano/assets.{PolicyId, AssetName, Value}
use cardano/transaction.{Transaction}

/// Check what's being minted in a transaction
fn check_minting(tx: Transaction, policy_id: PolicyId) {
  // Get all minted tokens under this policy
  let minted_tokens = assets.tokens(tx.mint, policy_id)

  // Check specific token
  let my_token_amount = when dict.get(minted_tokens, "MyToken") is {
    Some(amount) -> amount
    None -> 0
  }

  // Positive = minting, Negative = burning
  if my_token_amount > 0 {
    trace @"Minting tokens"
  } else if my_token_amount < 0 {
    trace @"Burning tokens"
  } else {
    trace @"No mint/burn for this token"
  }
}

/// Ensure only specific amount is minted
fn validate_mint_amount(
  tx: Transaction,
  policy_id: PolicyId,
  asset_name: AssetName,
  expected: Int,
) -> Bool {
  let actual = assets.quantity_of(tx.mint, policy_id, asset_name)
  actual == expected
}
```

---

## 6. Token Metadata

### Metadata Standards

**CIP-25: NFT Metadata Standard (v1)**

Transaction Metadata (label 721):

```json
{
  "721": {
    "<policy_id>": {
      "<asset_name>": {
        "name": "SpaceBud #1234",
        "image": "ipfs://Qm...",
        "description": "A SpaceBud",
        "attributes": [
          { "trait": "Background", "value": "Red" }
        ]
      }
    }
  }
}
```

**CIP-68: NFT Metadata Standard (v2 - on-chain)**

Reference NFT stores metadata on-chain:

```mermaid
flowchart LR
    A[User NFT 222 Token] --> B[Reference NFT 100 Token]
    B --> C["Datum: {metadata: {...}, version: 1}"]
```

:::tip Loi ich
CIP-68 cho phep updateable metadata!
:::

### FT Token Registry

GitHub: `cardano-foundation/cardano-token-registry`

JSON Entry:
```json
{
  "subject": "<policy_id><asset_name>",
  "name": {
    "value": "MyToken",
    "signatures": [...]
  },
  "description": {
    "value": "My awesome token",
    "signatures": [...]
  },
  "ticker": {
    "value": "MYT",
    "signatures": [...]
  },
  "decimals": {
    "value": 6,
    "signatures": [...]
  },
  "logo": {
    "value": "<base64_png>",
    "signatures": [...]
  }
}
```

---

## 7. Use Cases

### Common Applications

**FUNGIBLE TOKENS (FT):**

| Loai | Vi du |
|------|-------|
| Stablecoins | DJED (algorithmic), iUSD (over-collateralized), USDM (fiat-backed) |
| Utility tokens | In-game currencies, Platform credits, Access tokens |
| Governance tokens | DAO voting power, Protocol governance |
| Wrapped assets | Wrapped BTC, Wrapped ETH |

**NON-FUNGIBLE TOKENS (NFT):**

| Loai | Vi du |
|------|-------|
| Digital art | Profile pictures (PFPs), Generative art, 1/1 pieces |
| Gaming | In-game items, Characters/avatars, Land/property |
| Tickets & Access | Event tickets, Membership cards, VIP access |
| Credentials | Certificates, Diplomas, Licenses |
| Real World Assets (RWA) | Real estate fractions, Commodities, Securities |

---

## Bai Tap Thuc Hanh

### Bai 1: Token Design

Design mot FT cho project cua ban:
- Ten token, ticker, decimals
- Total supply (fixed or unlimited?)
- Minting rules (who can mint?)

### Bai 2: NFT Collection

Design mot NFT collection:
- Theme/concept
- Total supply
- Metadata structure
- Rarity tiers

### Bai 3: Policy Analysis

Phan tich mot minting policy thuc te:
- Tim policy ID cua DJED hoac mot NFT collection
- Xem metadata tren explorer
- Hieu cach policy hoat dong

---

## Checklist Hoan Thanh

- [ ] Hieu Native Assets tren Cardano
- [ ] Phan biet FT va NFT
- [ ] Hieu Policy ID va Asset Name
- [ ] Biet cach mint va burn tokens
- [ ] Nam cac metadata standards (CIP-25, CIP-68)
- [ ] Biet cac use cases pho bien

---

## Tai Lieu Tham Khao

- [CIP-25: NFT Metadata Standard](https://cips.cardano.org/cip/CIP-25)
- [CIP-68: Datum Metadata Standard](https://cips.cardano.org/cip/CIP-68)
- [Cardano Token Registry](https://github.com/cardano-foundation/cardano-token-registry)
- [Native Tokens Documentation](https://docs.cardano.org/native-tokens/learn)

---

**Bai tiep theo:** [02. Minting Policies](/docs/04-minting-tokens-nfts/02_mint_tokens_nfts)
