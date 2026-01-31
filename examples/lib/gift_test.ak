//// Tests cho Gift Contract

use aiken/crypto.{blake2b_256}

/// Datum type
type GiftDatum {
  password_hash: ByteArray,
}

/// Redeemer type
type GiftRedeemer {
  password: ByteArray,
}

/// Core validation logic
fn validate_gift(datum: GiftDatum, redeemer: GiftRedeemer) -> Bool {
  let provided_hash = blake2b_256(redeemer.password)
  provided_hash == datum.password_hash
}

/// Helper: Tạo datum từ password
fn create_datum(password: ByteArray) -> GiftDatum {
  GiftDatum { password_hash: blake2b_256(password) }
}

// ============================================
// TESTS
// ============================================

test test_correct_password() {
  let secret = "my_secret_password"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: secret }

  validate_gift(datum, redeemer) == True
}

test test_wrong_password() {
  let secret = "my_secret_password"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "wrong_password" }

  validate_gift(datum, redeemer) == False
}

test test_empty_password() {
  let secret = ""
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "" }

  validate_gift(datum, redeemer) == True
}

test test_case_sensitive() {
  let secret = "Secret"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "secret" }

  // Password should be case-sensitive
  validate_gift(datum, redeemer) == False
}

test test_special_characters() {
  let secret = "p@ssw0rd!#$%"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: "p@ssw0rd!#$%" }

  validate_gift(datum, redeemer) == True
}

test test_long_password() {
  let secret =
    "this_is_a_very_long_password_that_should_still_work_correctly_12345"
  let datum = create_datum(secret)
  let redeemer = GiftRedeemer { password: secret }

  validate_gift(datum, redeemer) == True
}

test test_hash_uniqueness() {
  let password1 = "password1"
  let password2 = "password2"

  let hash1 = blake2b_256(password1)
  let hash2 = blake2b_256(password2)

  // Different passwords should produce different hashes
  hash1 != hash2
}
