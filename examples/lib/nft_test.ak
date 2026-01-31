//// Tests cho NFT Policy

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
  let correct_quantity =
    when correct_asset is {
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
  let minted =
    [
      MockMintedAsset { name: "NFT1", quantity: 1 },
      MockMintedAsset { name: "NFT2", quantity: 1 },
    ]
  validate_nft_mint(minted, "NFT1", True) == False
}
