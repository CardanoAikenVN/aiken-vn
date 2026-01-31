//// Tests cho Simple FT

use aiken/collection/list

const admin_pkh: ByteArray = #"aabbcc112233"

fn signed_by_admin(signers: List<ByteArray>) -> Bool {
  list.has(signers, admin_pkh)
}

test test_admin_can_mint() {
  let signers = [#"aabbcc112233", #"ddeeff445566"]
  signed_by_admin(signers) == True
}

test test_non_admin_cannot_mint() {
  let signers = [#"111111111111", #"222222222222"]
  signed_by_admin(signers) == False
}
