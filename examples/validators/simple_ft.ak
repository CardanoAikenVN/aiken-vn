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

/// Admin public key hash (parameterized)
pub type FTConfig {
  admin_pkh: ByteArray,
}

/// Kiểm tra signature
fn signed_by_admin(tx: Transaction, admin_pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, admin_pkh)
}

/// Minting Policy
validator simple_ft(config: FTConfig) {
  mint(redeemer: FTRedeemer, _policy_id: PolicyId, tx: Transaction) {
    when redeemer is {
      Mint -> signed_by_admin(tx, config.admin_pkh)
      Burn -> signed_by_admin(tx, config.admin_pkh)
    }
  }
}
