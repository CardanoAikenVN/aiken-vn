# Test Evidence

## Aiken Smart Contract Tests

**Date**: 2026-03-07
**Aiken Version**: v1.1.21
**stdlib**: v2.2.0

### Test Summary

```
Total:  80
Passed: 80
Failed: 0
```

### Module Breakdown

| Module | Total | Passed | Failed |
|--------|-------|--------|--------|
| escrow_test | 14 | 14 | 0 |
| gift_test | 7 | 7 | 0 |
| nft_test | 4 | 4 | 0 |
| simple_ft_test | 2 | 2 | 0 |
| syntax_test | 53 | 53 | 0 |

### Validator Test Details

#### Escrow Validator (14 tests)
- test_complete_by_buyer (pass)
- test_complete_by_seller_fails (pass)
- test_complete_by_random_fails (pass)
- test_cancel_by_seller_before_deadline (pass)
- test_cancel_by_seller_after_deadline_fails (pass)
- test_cancel_by_buyer_fails (pass)
- test_refund_by_buyer_after_deadline (pass)
- test_refund_by_buyer_before_deadline_fails (pass)
- test_refund_by_seller_fails (pass)
- test_deadline_boundary_cancel (pass)
- test_deadline_boundary_refund (pass)
- test_scenario_successful_trade (pass)
- test_scenario_seller_cancels (pass)
- test_scenario_buyer_gets_refund (pass)

#### Gift Validator (7 tests)
- test_correct_password (pass)
- test_wrong_password (pass)
- test_empty_password (pass)
- test_case_sensitive (pass)
- test_special_characters (pass)
- test_long_password (pass)
- test_hash_uniqueness (pass)

#### NFT Minting Policy (4 tests)
- test_valid_nft_mint (pass)
- test_invalid_quantity (pass)
- test_no_utxo_consumed (pass)
- test_multiple_assets (pass)

#### Simple FT Minting Policy (2 tests)
- test_admin_can_mint (pass)
- test_non_admin_cannot_mint (pass)

### Command Used

```bash
cd examples && aiken check
```
