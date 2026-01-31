//// Escrow Validator
//// Hợp đồng ký quỹ đơn giản

use aiken/collection/list
use aiken/interval
use cardano/assets.{lovelace_of}
use cardano/transaction.{OutputReference, Transaction}

// ============================================
// TYPES
// ============================================

pub type EscrowDatum {
  seller: ByteArray,
  buyer: ByteArray,
  amount: Int,
  deadline: Int,
}

pub type EscrowRedeemer {
  Complete
  Cancel
  Refund
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/// Kiểm tra signature
fn signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}

/// Kiểm tra thời gian trước deadline sử dụng interval module
fn before_deadline(tx: Transaction, deadline: Int) -> Bool {
  interval.is_entirely_before(tx.validity_range, deadline)
}

/// Kiểm tra thời gian sau deadline sử dụng interval module
fn after_deadline(tx: Transaction, deadline: Int) -> Bool {
  interval.is_entirely_after(tx.validity_range, deadline)
}

/// Kiểm tra có output với đủ tiền
fn has_sufficient_output(tx: Transaction, min_amount: Int) -> Bool {
  list.any(tx.outputs, fn(output) { lovelace_of(output.value) >= min_amount })
}

// ============================================
// MAIN VALIDATOR
// ============================================

validator escrow {
  spend(
    datum: Option<EscrowDatum>,
    redeemer: EscrowRedeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      // Buyer confirms receipt -> seller gets paid
      Complete ->
        signed_by(tx, d.buyer) && has_sufficient_output(tx, d.amount)

      // Seller cancels before deadline
      Cancel ->
        signed_by(tx, d.seller) && before_deadline(tx, d.deadline)

      // Buyer claims refund after deadline
      Refund ->
        signed_by(tx, d.buyer) && after_deadline(tx, d.deadline) && has_sufficient_output(
          tx,
          d.amount,
        )
    }
  }

  else(_) {
    fail
  }
}
