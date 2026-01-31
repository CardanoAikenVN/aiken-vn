//// Tests cho Aiken Syntax & Data Types
//// Test cases cho lib/syntax.ak

// ============================================
// TYPE DEFINITIONS
// ============================================

type Wallet {
  address: ByteArray,
  balance: Int,
}

type TokenAction {
  Mint
  Burn
  Transfer { to: ByteArray }
}

type TxStatus {
  Pending
  Confirmed { block: Int }
  Failed { reason: ByteArray }
}

// ============================================
// CONSTANTS
// ============================================

const max_amount: Int = 1_000_000_000

// ============================================
// BASIC FUNCTIONS
// ============================================

fn add(a: Int, b: Int) -> Int {
  a + b
}

fn subtract(a: Int, b: Int) -> Int {
  a - b
}

fn multiply(a: Int, b: Int) -> Int {
  a * b
}

fn max(a: Int, b: Int) -> Int {
  if a > b {
    a
  } else {
    b
  }
}

fn min(a: Int, b: Int) -> Int {
  if a < b {
    a
  } else {
    b
  }
}

// ============================================
// OPTION FUNCTIONS
// ============================================

fn unwrap_or(opt: Option<Int>, default: Int) -> Int {
  when opt is {
    Some(value) -> value
    None -> default
  }
}

fn map_option(opt: Option<Int>, f: fn(Int) -> Int) -> Option<Int> {
  when opt is {
    Some(value) -> Some(f(value))
    None -> None
  }
}

// ============================================
// WALLET FUNCTIONS
// ============================================

fn new_wallet(addr: ByteArray, bal: Int) -> Wallet {
  Wallet { address: addr, balance: bal }
}

fn is_empty_wallet(wallet: Wallet) -> Bool {
  wallet.balance == 0
}

fn deposit(wallet: Wallet, amount: Int) -> Wallet {
  Wallet { ..wallet, balance: wallet.balance + amount }
}

fn withdraw(wallet: Wallet, amount: Int) -> Option<Wallet> {
  if wallet.balance >= amount {
    Some(Wallet { ..wallet, balance: wallet.balance - amount })
  } else {
    None
  }
}

fn has_sufficient_balance(wallet: Wallet, required: Int) -> Bool {
  wallet.balance >= required
}

// ============================================
// PATTERN MATCHING FUNCTIONS
// ============================================

fn describe_action(action: TokenAction) -> ByteArray {
  when action is {
    Mint -> "Mint new tokens"
    Burn -> "Burn tokens"
    Transfer { to } -> to
  }
}

fn get_block_number(status: TxStatus) -> Option<Int> {
  when status is {
    Confirmed { block } -> Some(block)
    _ -> None
  }
}

fn is_pending(status: TxStatus) -> Bool {
  when status is {
    Pending -> True
    _ -> False
  }
}

// ============================================
// LIST FUNCTIONS
// ============================================

fn sum(numbers: List<Int>) -> Int {
  when numbers is {
    [] -> 0
    [head, ..tail] -> head + sum(tail)
  }
}

fn length(items: List<a>) -> Int {
  when items is {
    [] -> 0
    [_, ..tail] -> 1 + length(tail)
  }
}

fn is_empty_list(items: List<a>) -> Bool {
  when items is {
    [] -> True
    _ -> False
  }
}

fn head(items: List<a>) -> Option<a> {
  when items is {
    [] -> None
    [first, ..] -> Some(first)
  }
}

fn last(items: List<a>) -> Option<a> {
  when items is {
    [] -> None
    [only] -> Some(only)
    [_, ..tail] -> last(tail)
  }
}

// ============================================
// TESTS: Constants
// ============================================

test test_max_amount() {
  max_amount == 1_000_000_000
}

// ============================================
// TESTS: Basic Math Functions
// ============================================

test test_add_positive() {
  add(2, 3) == 5
}

test test_add_negative() {
  add(-5, 3) == -2
}

test test_add_zero() {
  add(0, 0) == 0
}

test test_subtract() {
  subtract(10, 3) == 7
}

test test_subtract_negative_result() {
  subtract(3, 10) == -7
}

test test_multiply() {
  multiply(4, 5) == 20
}

test test_multiply_by_zero() {
  multiply(100, 0) == 0
}

test test_max_first_larger() {
  max(10, 5) == 10
}

test test_max_second_larger() {
  max(3, 7) == 7
}

test test_max_equal() {
  max(5, 5) == 5
}

test test_min_first_smaller() {
  min(3, 7) == 3
}

test test_min_second_smaller() {
  min(10, 5) == 5
}

test test_min_equal() {
  min(5, 5) == 5
}

// ============================================
// TESTS: Option Handling
// ============================================

test test_unwrap_or_some() {
  unwrap_or(Some(42), 0) == 42
}

test test_unwrap_or_none() {
  unwrap_or(None, 0) == 0
}

test test_map_option_some() {
  let result = map_option(Some(5), fn(x) { x * 2 })
  result == Some(10)
}

test test_map_option_none() {
  let result = map_option(None, fn(x) { x * 2 })
  result == None
}

// ============================================
// TESTS: Wallet Functions
// ============================================

test test_new_wallet() {
  let wallet = new_wallet(#"aabb", 1000)
  wallet.address == #"aabb" && wallet.balance == 1000
}

test test_is_empty_wallet_true() {
  let wallet = Wallet { address: #"aabb", balance: 0 }
  is_empty_wallet(wallet) == True
}

test test_is_empty_wallet_false() {
  let wallet = Wallet { address: #"aabb", balance: 100 }
  is_empty_wallet(wallet) == False
}

test test_deposit() {
  let wallet = new_wallet(#"aabb", 100)
  let updated = deposit(wallet, 50)
  updated.balance == 150
}

test test_withdraw_success() {
  let wallet = new_wallet(#"aabb", 100)
  let result = withdraw(wallet, 50)
  when result is {
    Some(w) -> w.balance == 50
    None -> False
  }
}

test test_withdraw_insufficient() {
  let wallet = new_wallet(#"aabb", 100)
  let result = withdraw(wallet, 200)
  result == None
}

test test_has_sufficient_balance_true() {
  let wallet = new_wallet(#"aabb", 1000)
  has_sufficient_balance(wallet, 500) == True
}

test test_has_sufficient_balance_false() {
  let wallet = new_wallet(#"aabb", 100)
  has_sufficient_balance(wallet, 500) == False
}

test test_has_sufficient_balance_exact() {
  let wallet = new_wallet(#"aabb", 500)
  has_sufficient_balance(wallet, 500) == True
}

// ============================================
// TESTS: Pattern Matching - TokenAction
// ============================================

test test_describe_mint() {
  describe_action(Mint) == "Mint new tokens"
}

test test_describe_burn() {
  describe_action(Burn) == "Burn tokens"
}

test test_describe_transfer() {
  let to_addr = #"deadbeef"
  describe_action(Transfer { to: to_addr }) == to_addr
}

// ============================================
// TESTS: Pattern Matching - TxStatus
// ============================================

test test_get_block_number_confirmed() {
  let status = Confirmed { block: 12345 }
  get_block_number(status) == Some(12345)
}

test test_get_block_number_pending() {
  get_block_number(Pending) == None
}

test test_get_block_number_failed() {
  let status = Failed { reason: "error" }
  get_block_number(status) == None
}

test test_is_pending_true() {
  is_pending(Pending) == True
}

test test_is_pending_false_confirmed() {
  let status = Confirmed { block: 100 }
  is_pending(status) == False
}

test test_is_pending_false_failed() {
  let status = Failed { reason: "error" }
  is_pending(status) == False
}

// ============================================
// TESTS: List Operations
// ============================================

test test_sum_empty() {
  sum([]) == 0
}

test test_sum_single() {
  sum([42]) == 42
}

test test_sum_multiple() {
  sum([1, 2, 3, 4, 5]) == 15
}

test test_sum_negative() {
  sum([-1, -2, -3]) == -6
}

test test_length_empty() {
  length([]) == 0
}

test test_length_single() {
  length([1]) == 1
}

test test_length_multiple() {
  length([1, 2, 3, 4, 5]) == 5
}

test test_is_empty_list_true() {
  is_empty_list([]) == True
}

test test_is_empty_list_false() {
  is_empty_list([1, 2, 3]) == False
}

test test_head_empty() {
  head([]) == None
}

test test_head_single() {
  head([42]) == Some(42)
}

test test_head_multiple() {
  head([1, 2, 3]) == Some(1)
}

test test_last_empty() {
  last([]) == None
}

test test_last_single() {
  last([42]) == Some(42)
}

test test_last_multiple() {
  last([1, 2, 3]) == Some(3)
}

// ============================================
// TESTS: Complex Scenarios
// ============================================

test test_wallet_operations_chain() {
  let wallet = new_wallet(#"aabb", 100)
  let after_deposit = deposit(wallet, 50)
  let after_withdraw = withdraw(after_deposit, 30)
  when after_withdraw is {
    Some(w) -> w.balance == 120
    None -> False
  }
}

test test_nested_option_operations() {
  let opt = Some(5)
  let doubled = map_option(opt, fn(x) { x * 2 })
  unwrap_or(doubled, 0) == 10
}
