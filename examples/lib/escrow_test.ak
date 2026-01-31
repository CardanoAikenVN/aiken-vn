//// Tests cho Escrow Contract

// ============================================
// MOCK TYPES
// ============================================

type MockDatum {
  seller: ByteArray,
  buyer: ByteArray,
  amount: Int,
  deadline: Int,
}

type MockRedeemer {
  Complete
  Cancel
  Refund
}

// Hex constants for testing
const seller_pkh: ByteArray = #"aabbccdd11223344"
const buyer_pkh: ByteArray = #"eeff00112233445566"
const random_pkh: ByteArray = #"99887766554433221100"

// ============================================
// VALIDATION LOGIC
// ============================================

fn validate_complete(datum: MockDatum, signer: ByteArray) -> Bool {
  datum.buyer == signer
}

fn validate_cancel(
  datum: MockDatum,
  signer: ByteArray,
  current_time: Int,
) -> Bool {
  datum.seller == signer && current_time < datum.deadline
}

fn validate_refund(
  datum: MockDatum,
  signer: ByteArray,
  current_time: Int,
) -> Bool {
  datum.buyer == signer && current_time > datum.deadline
}

fn validate_escrow(
  datum: MockDatum,
  redeemer: MockRedeemer,
  signer: ByteArray,
  current_time: Int,
) -> Bool {
  when redeemer is {
    Complete -> validate_complete(datum, signer)
    Cancel -> validate_cancel(datum, signer, current_time)
    Refund -> validate_refund(datum, signer, current_time)
  }
}

// ============================================
// TESTS: COMPLETE
// ============================================

test test_complete_by_buyer() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  validate_escrow(datum, Complete, buyer_pkh, 500) == True
}

test test_complete_by_seller_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Seller không thể complete
  validate_escrow(datum, Complete, seller_pkh, 500) == False
}

test test_complete_by_random_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Random person không thể complete
  validate_escrow(datum, Complete, random_pkh, 500) == False
}

// ============================================
// TESTS: CANCEL
// ============================================

test test_cancel_by_seller_before_deadline() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  validate_escrow(datum, Cancel, seller_pkh, 500) == True
}

test test_cancel_by_seller_after_deadline_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Không thể cancel sau deadline
  validate_escrow(datum, Cancel, seller_pkh, 1500) == False
}

test test_cancel_by_buyer_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Buyer không thể cancel
  validate_escrow(datum, Cancel, buyer_pkh, 500) == False
}

// ============================================
// TESTS: REFUND
// ============================================

test test_refund_by_buyer_after_deadline() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  validate_escrow(datum, Refund, buyer_pkh, 1500) == True
}

test test_refund_by_buyer_before_deadline_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Không thể refund trước deadline
  validate_escrow(datum, Refund, buyer_pkh, 500) == False
}

test test_refund_by_seller_fails() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Seller không thể claim refund
  validate_escrow(datum, Refund, seller_pkh, 1500) == False
}

// ============================================
// TESTS: EDGE CASES
// ============================================

test test_deadline_boundary_cancel() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Exactly at deadline - cancel should fail
  validate_escrow(datum, Cancel, seller_pkh, 1000) == False
}

test test_deadline_boundary_refund() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Exactly at deadline - refund should fail
  validate_escrow(datum, Refund, buyer_pkh, 1000) == False
}

// ============================================
// TESTS: COMPLEX SCENARIOS
// ============================================

test test_scenario_successful_trade() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // 1. Seller creates escrow (implicit - datum exists)
  // 2. Buyer receives goods and confirms
  let step1 = validate_escrow(datum, Complete, buyer_pkh, 500)

  step1 == True
}

test test_scenario_seller_cancels() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Seller realizes can't fulfill, cancels
  let step1 = validate_escrow(datum, Cancel, seller_pkh, 200)

  step1 == True
}

test test_scenario_buyer_gets_refund() {
  let datum =
    MockDatum {
      seller: seller_pkh,
      buyer: buyer_pkh,
      amount: 10_000_000,
      deadline: 1000,
    }

  // Seller doesn't deliver, buyer waits and claims refund
  let step1 = validate_escrow(datum, Refund, buyer_pkh, 1500)

  step1 == True
}
