//// NFT Minting Policy
//// Đảm bảo chỉ mint 1 token với quantity = 1

use cardano/transaction.{Transaction, OutputReference}
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
