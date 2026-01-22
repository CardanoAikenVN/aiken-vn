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

  else(_) {
    fail
  }
}
