---
title: "Smart Contract Security Guidelines"
sidebar_position: 99
description: "Security best practices for Aiken smart contracts on Cardano"
---

# Smart Contract Security Guidelines

Security is critical for smart contracts because they handle real value and are immutable once deployed. This guide covers Cardano/Aiken-specific security patterns.

## Cardano eUTXO Security Model

Cardano's eUTXO model provides inherent security advantages over account-based chains:

- **Deterministic execution**: Transaction outcomes are known before submission
- **No global state**: Validators only see inputs explicitly provided to the transaction
- **No reentrancy**: The eUTXO model eliminates reentrancy attacks by design

However, eUTXO introduces its own class of vulnerabilities that developers must understand.

## Validator Security Checklist

### 1. Always Validate Datum Presence

```aiken
// CORRECT: Handle missing datum explicitly
expect Some(d) = datum

// WRONG: Assume datum always exists
// This will fail silently or produce unexpected behavior
```

Every spending validator receives `Option<Datum>`. Always use `expect Some(d) = datum` to fail explicitly if the datum is missing.

### 2. Verify Signatures with extra_signatories

```aiken
fn signed_by(tx: Transaction, pkh: ByteArray) -> Bool {
  list.has(tx.extra_signatories, pkh)
}
```

- Use `extra_signatories` for authorization checks, not input addresses
- A transaction can spend from any address; only `extra_signatories` proves key ownership
- Always check signatures for actions that should be restricted (cancel, claim, admin operations)

### 3. Validate Time Ranges

```aiken
// Check transaction happens before a deadline
fn before_deadline(tx: Transaction, deadline: Int) -> Bool {
  interval.is_entirely_before(tx.validity_range, deadline)
}

// Check transaction happens after a deadline
fn after_deadline(tx: Transaction, deadline: Int) -> Bool {
  interval.is_entirely_after(tx.validity_range, deadline)
}
```

- Use `interval.is_entirely_before` / `is_entirely_after` for strict time checks
- Never use unbounded validity ranges for time-sensitive contracts
- Remember: slot-based time on Cardano has ~20 second precision

### 4. Verify Output Values

```aiken
fn has_sufficient_output(tx: Transaction, min_amount: Int) -> Bool {
  list.any(tx.outputs, fn(output) { lovelace_of(output.value) >= min_amount })
}
```

- Always verify outputs contain the expected value
- Check the recipient address, not just the amount
- For token transfers, verify both policy ID and asset name

### 5. One-Shot Minting Validation

```aiken
// Ensure a specific UTXO is consumed (guarantees uniqueness)
fn consumes_utxo(tx: Transaction, utxo_ref: OutputReference) -> Bool {
  list.any(tx.inputs, fn(input) { input.output_reference == utxo_ref })
}
```

- One-shot patterns require consuming a specific UTXO to guarantee minting happens exactly once
- Always verify the exact quantity minted (should be exactly 1 for NFTs)
- Include a `BurnNFT` redeemer path for token lifecycle management

### 6. Catch-All Rejection

```aiken
validator my_validator {
  spend(datum, redeemer, input, tx) {
    // ... validation logic
  }

  // Reject all other script purposes
  else(_) {
    fail
  }
}
```

Always include `else(_) { fail }` to reject unexpected script purposes (mint, withdraw, publish) unless explicitly handled.

## Common Vulnerability Patterns

### Double Satisfaction

**Risk**: A single transaction satisfies two validators with one output.

**Mitigation**: Verify that the specific input being validated has a corresponding output. Check the output pays to the correct address with the correct datum.

### Datum Hijacking

**Risk**: An attacker sends a UTXO to your script address with a crafted datum.

**Mitigation**: Validate datum fields rigorously. For escrow contracts, verify that buyer/seller public key hashes match expected participants.

### Insufficient Output Validation

**Risk**: Validator checks that "some output" has enough ADA, but doesn't verify the recipient.

**Mitigation**: Check both the value AND the address of outputs. Verify the output goes to the intended party.

```aiken
// WRONG: Only checks amount, not recipient
list.any(tx.outputs, fn(o) { lovelace_of(o.value) >= amount })

// CORRECT: Checks amount AND recipient
list.any(tx.outputs, fn(o) {
  lovelace_of(o.value) >= amount && o.address.payment_credential == expected_credential
})
```

### Unbounded Computation

**Risk**: Validators that iterate over all inputs/outputs can exceed execution budget on large transactions.

**Mitigation**: Use efficient search patterns. Consider limiting the number of inputs your contract processes. Test with realistic transaction sizes.

## Testing Requirements

### Minimum Test Coverage

Every validator should have tests for:

1. **Happy path**: Valid transactions succeed
2. **Authorization failure**: Unsigned or wrong-signer transactions fail
3. **Time boundary**: Before/after deadline behavior is correct
4. **Value validation**: Insufficient funds are rejected
5. **Edge cases**: Empty inputs, zero amounts, boundary conditions

### Running Tests

```bash
cd examples
aiken check        # Run all tests
aiken check -m gift  # Run tests for a specific module
```

### Test Naming Convention

```
test <function>_<scenario>_<expected_result>()
```

Example: `test complete_without_buyer_signature_fails()`

## Pre-Deployment Checklist

Before deploying any validator to mainnet:

- [ ] All test cases pass (`aiken check`)
- [ ] Code compiles without warnings (`aiken build`)
- [ ] Code is formatted (`aiken fmt --check`)
- [ ] Datum and redeemer types are well-documented
- [ ] All redeemer paths are tested (happy + failure)
- [ ] Output validation checks both value and recipient
- [ ] Time-sensitive logic uses proper interval checks
- [ ] `else(_) { fail }` catches unexpected script purposes
- [ ] Tested on Cardano Preview or Preprod testnet
- [ ] Peer review by at least one other developer

## Resources

- [Aiken Language Documentation](https://aiken-lang.org)
- [Cardano Developer Portal](https://developers.cardano.org)
- [CIP-0057: Plutus Smart Contract Blueprints](https://cips.cardano.org/cip/CIP-0057)
- [Cardano Plutus Security Audit Checklist](https://github.com/ArdanaLabs/audit-checklist)
