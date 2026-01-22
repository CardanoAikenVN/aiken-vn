---
title: FT và NFT là gì?
sidebar_position: 1
---

# Fungible Token và Non-Fungible Token

Bài học này giải thích sự khác biệt giữa Fungible Token (FT) và Non-Fungible Token (NFT) trên Cardano.

## Mục tiêu học tập

- Hiểu khái niệm fungibility
- Phân biệt FT và NFT
- Nắm cấu trúc native assets trên Cardano
- Biết khi nào sử dụng FT vs NFT

## Fungibility là gì?

```
┌─────────────────────────────────────────────────────────────┐
│                    FUNGIBILITY                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   FUNGIBLE (Có thể thay thế)                               │
│   ──────────────────────────                               │
│                                                             │
│   ┌─────┐  =  ┌─────┐  =  ┌─────┐                         │
│   │ $1  │     │ $1  │     │ $1  │                         │
│   └─────┘     └─────┘     └─────┘                         │
│                                                             │
│   Mỗi đơn vị có giá trị như nhau                           │
│   Có thể thay thế lẫn nhau                                 │
│   Ví dụ: Tiền, vàng, Bitcoin, ADA                          │
│                                                             │
│   NON-FUNGIBLE (Không thể thay thế)                        │
│   ─────────────────────────────────                        │
│                                                             │
│   ┌─────┐  ≠  ┌─────┐  ≠  ┌─────┐                         │
│   │ 🎨  │     │ 🎵  │     │ 📜  │                         │
│   │#001 │     │#002 │     │#003 │                         │
│   └─────┘     └─────┘     └─────┘                         │
│                                                             │
│   Mỗi đơn vị là duy nhất                                   │
│   Không thể thay thế lẫn nhau                              │
│   Ví dụ: Nghệ thuật, vé concert, giấy tờ                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Native Assets trên Cardano

Cardano có native asset support - tokens được xử lý ngang hàng với ADA:

```
┌─────────────────────────────────────────────────────────────┐
│                 NATIVE ASSETS                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Asset Identifier = Policy ID + Asset Name                │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │             Policy ID (28 bytes)             │   │  │
│   │   │       Hash của minting policy script        │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                         +                            │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │          Asset Name (0-32 bytes)            │   │  │
│   │   │      Tên token (có thể trùng nếu cùng      │   │  │
│   │   │              policy khác)                   │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   ADA = Policy ID "" + Asset Name "" (special case)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### So sánh với Ethereum

| Aspect | Cardano | Ethereum |
|--------|---------|----------|
| **Token Type** | Native Asset | Smart Contract (ERC20/721) |
| **Transfer** | Như ADA (no contract call) | Contract execution |
| **Gas for Transfer** | Thấp | Cao |
| **Creation** | Minting Policy | Deploy Contract |
| **Multiple Tokens** | Cùng 1 policy | Mỗi token = 1 contract |

## Fungible Token (FT)

### Đặc điểm

```
┌─────────────────────────────────────────────────────────────┐
│                 FUNGIBLE TOKEN                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Đặc điểm:                                                 │
│   • Quantity > 1 (thường là số lượng lớn)                  │
│   • Mỗi đơn vị có giá trị bằng nhau                        │
│   • Có thể chia nhỏ                                        │
│   • Dùng làm tiền tệ, reward, utility token                │
│                                                             │
│   Ví dụ trên Cardano:                                       │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ Policy ID: abc123...                                 │  │
│   │ Asset Name: "HOSKY"                                  │  │
│   │ Quantity: 1,000,000,000,000 (1 trillion)            │  │
│   │                                                      │  │
│   │ 100 HOSKY của Alice = 100 HOSKY của Bob             │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Use cases:                                                │
│   • Governance tokens (voting)                             │
│   • Utility tokens (access)                                │
│   • Stablecoins (payment)                                  │
│   • Reward tokens (loyalty)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### FT trong Aiken

```aiken title="lib/ft_example.ak"
use cardano/assets.{PolicyId, AssetName, Value, quantity_of}

/// Kiểm tra user có đủ số lượng token
pub fn has_minimum_tokens(
  value: Value,
  policy_id: PolicyId,
  asset_name: AssetName,
  minimum: Int,
) -> Bool {
  quantity_of(value, policy_id, asset_name) >= minimum
}

/// Tính tổng token trong nhiều outputs
pub fn total_token_amount(
  values: List<Value>,
  policy_id: PolicyId,
  asset_name: AssetName,
) -> Int {
  values
    |> list.map(fn(v) { quantity_of(v, policy_id, asset_name) })
    |> list.foldr(0, fn(a, b) { a + b })
}
```

## Non-Fungible Token (NFT)

### Đặc điểm

```
┌─────────────────────────────────────────────────────────────┐
│               NON-FUNGIBLE TOKEN                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Đặc điểm:                                                 │
│   • Quantity = 1 (duy nhất)                                │
│   • Mỗi token là unique                                    │
│   • Không thể chia nhỏ                                     │
│   • Có metadata mô tả token                                │
│                                                             │
│   Ví dụ trên Cardano:                                       │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ Policy ID: xyz789...                                 │  │
│   │ Asset Name: "SpaceBud#1234"                         │  │
│   │ Quantity: 1                                          │  │
│   │                                                      │  │
│   │ Metadata:                                            │  │
│   │ {                                                    │  │
│   │   "name": "SpaceBud #1234",                         │  │
│   │   "image": "ipfs://...",                            │  │
│   │   "traits": { "color": "blue", "type": "rare" }     │  │
│   │ }                                                    │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Use cases:                                                │
│   • Digital Art                                            │
│   • Gaming items                                           │
│   • Membership cards                                       │
│   • Certificates / Credentials                             │
│   • Domain names                                           │
│   • Event tickets                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### NFT trong Aiken

```aiken title="lib/nft_example.ak"
use cardano/assets.{PolicyId, AssetName, Value, quantity_of}
use aiken/collection/list

/// Kiểm tra đây có phải NFT không (quantity = 1)
pub fn is_nft(
  value: Value,
  policy_id: PolicyId,
  asset_name: AssetName,
) -> Bool {
  quantity_of(value, policy_id, asset_name) == 1
}

/// Kiểm tra sở hữu NFT
pub fn owns_nft(
  value: Value,
  policy_id: PolicyId,
  asset_name: AssetName,
) -> Bool {
  quantity_of(value, policy_id, asset_name) == 1
}

/// Đếm số NFTs từ một policy
pub fn count_nfts(value: Value, policy_id: PolicyId) -> Int {
  // Count assets where quantity = 1
  value
    |> assets.tokens(policy_id)
    |> dict.values()
    |> list.filter(fn(qty) { qty == 1 })
    |> list.length()
}
```

## CIP-25 NFT Metadata Standard

```
┌─────────────────────────────────────────────────────────────┐
│                CIP-25 METADATA                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   On-chain Metadata (Transaction Metadata):                │
│                                                             │
│   {                                                         │
│     "721": {                                               │
│       "<policy_id>": {                                     │
│         "<asset_name>": {                                  │
│           "name": "SpaceBud #1234",                        │
│           "image": "ipfs://QmXyz...",                      │
│           "mediaType": "image/png",                        │
│           "description": "A cute SpaceBud",                │
│           "attributes": [                                  │
│             { "trait_type": "Color", "value": "Blue" },   │
│             { "trait_type": "Type", "value": "Rare" }     │
│           ],                                               │
│           "files": [                                       │
│             {                                              │
│               "name": "SpaceBud1234",                      │
│               "mediaType": "video/mp4",                    │
│               "src": "ipfs://QmAbc..."                     │
│             }                                              │
│           ]                                                │
│         }                                                  │
│       }                                                    │
│     }                                                       │
│   }                                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## So sánh FT vs NFT

```
┌─────────────────────────────────────────────────────────────┐
│                  FT vs NFT                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Feature          │    FT           │    NFT              │
│   ─────────────────┼─────────────────┼─────────────────────│
│   Quantity         │    > 1          │    = 1              │
│   Uniqueness       │    Identical    │    Unique           │
│   Divisible        │    Yes          │    No               │
│   Value source     │    Supply/demand│    Rarity/utility   │
│   Metadata         │    Optional     │    Usually required │
│   Transfer cost    │    Same         │    Same             │
│   Primary use      │    Currency     │    Collectibles     │
│                                                             │
│   Technical (Cardano):                                      │
│   ─────────────────┼─────────────────┼─────────────────────│
│   Policy           │    Same policy  │    Same/diff policy │
│   Asset Name       │    Same name    │    Different name   │
│   Minting          │    Batch mint   │    Individual mint  │
│   Burning          │    Partial      │    All or nothing   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Semi-Fungible Tokens (SFT)

Một số tokens nằm giữa FT và NFT:

```
┌─────────────────────────────────────────────────────────────┐
│               SEMI-FUNGIBLE TOKEN                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Đặc điểm:                                                 │
│   • Quantity > 1 nhưng limited                             │
│   • Các đơn vị trong cùng "edition" giống nhau             │
│   • Khác editions khác nhau                                │
│                                                             │
│   Ví dụ:                                                    │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ Gaming item: "Legendary Sword"                       │  │
│   │ Edition #1: 100 copies (fungible within edition)    │  │
│   │ Edition #2: 50 copies (different from #1)           │  │
│   │                                                      │  │
│   │ Event tickets: "VIP Pass - Row A"                   │  │
│   │ Quantity: 20 (all same row, fungible)               │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Implementation:                                           │
│   • Same Policy ID                                         │
│   • Different Asset Names per edition                      │
│   • Quantity per edition based on use case                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Khi nào dùng FT vs NFT?

```
┌─────────────────────────────────────────────────────────────┐
│              DECISION GUIDE                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Dùng FT khi:                                             │
│   ✅ Cần số lượng lớn tokens                               │
│   ✅ Các tokens có giá trị như nhau                        │
│   ✅ Dùng làm currency/rewards                             │
│   ✅ Cần chia nhỏ được                                     │
│   ✅ Governance voting                                     │
│                                                             │
│   Dùng NFT khi:                                            │
│   ✅ Mỗi item cần unique                                   │
│   ✅ Ownership matters (chứng minh sở hữu)                 │
│   ✅ Digital collectibles                                  │
│   ✅ Certificates/credentials                              │
│   ✅ Real-world asset tokenization                         │
│                                                             │
│   Dùng SFT khi:                                            │
│   ✅ Limited editions (giới hạn số lượng)                  │
│   ✅ Gaming items với rarity tiers                         │
│   ✅ Event tickets với seating zones                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Ví dụ: Token Registry

```aiken title="lib/token_registry.ak"
use cardano/assets.{PolicyId, AssetName, Value}

/// Token type
pub type TokenType {
  FungibleToken
  NonFungibleToken
  SemiFungibleToken { max_supply: Int }
}

/// Token info
pub type TokenInfo {
  policy_id: PolicyId,
  asset_name: AssetName,
  token_type: TokenType,
}

/// Kiểm tra token type dựa trên quantity
pub fn detect_token_type(quantity: Int) -> TokenType {
  if quantity == 1 {
    NonFungibleToken
  } else if quantity <= 100 {
    SemiFungibleToken { max_supply: quantity }
  } else {
    FungibleToken
  }
}

/// Validate token theo type
pub fn validate_token_quantity(token_type: TokenType, quantity: Int) -> Bool {
  when token_type is {
    FungibleToken -> quantity > 0
    NonFungibleToken -> quantity == 1
    SemiFungibleToken { max_supply } -> quantity > 0 && quantity <= max_supply
  }
}
```

### Tests

```aiken title="lib/token_registry_test.ak"
use token_registry.{TokenType, detect_token_type, validate_token_quantity}

test test_detect_nft() {
  detect_token_type(1) == NonFungibleToken
}

test test_detect_sft() {
  when detect_token_type(50) is {
    SemiFungibleToken { max_supply } -> max_supply == 50
    _ -> False
  }
}

test test_detect_ft() {
  detect_token_type(1_000_000) == FungibleToken
}

test test_validate_nft() {
  validate_token_quantity(NonFungibleToken, 1) == True
}

test test_validate_nft_invalid() {
  validate_token_quantity(NonFungibleToken, 2) == False
}

test test_validate_sft() {
  let sft = SemiFungibleToken { max_supply: 100 }
  and {
    validate_token_quantity(sft, 50) == True,
    validate_token_quantity(sft, 100) == True,
    validate_token_quantity(sft, 101) == False,
  }
}
```

## Tóm tắt

```
┌─────────────────────────────────────────────────────────────┐
│                    KEY TAKEAWAYS                            │
├─────────────────────────────────────────────────────────────┤
│  1. FT = Fungible, quantity > 1, exchangeable              │
│  2. NFT = Non-Fungible, quantity = 1, unique               │
│  3. Native Assets = Policy ID + Asset Name                 │
│  4. Cardano tokens = No smart contract needed for transfer │
│  5. CIP-25 = NFT metadata standard                         │
│  6. Choose based on use case, not trend                    │
└─────────────────────────────────────────────────────────────┘
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học cách viết **Minting Policy** để tạo FT và NFT trên Cardano với Aiken.
