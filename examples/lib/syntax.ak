//// Aiken Syntax & Data Types Demo
//// Code mẫu cho docs/01-the-aiken-foundation

// ============================================
// 1. CONSTANTS - Hằng số
// ============================================

/// Hằng số số nguyên
pub const max_amount: Int = 1_000_000_000

/// Hằng số ByteArray (hex)
pub const admin_hash: ByteArray = #"aabbccdd11223344"

/// Hằng số Boolean
pub const is_mainnet: Bool = True

// ============================================
// 2. CUSTOM TYPES - Kiểu tùy chỉnh
// ============================================

/// Record type: Thông tin ví
pub type Wallet {
  address: ByteArray,
  balance: Int,
}

/// Enum type: Các hành động token
pub type TokenAction {
  Mint
  Burn
  Transfer { to: ByteArray }
}

/// Enum với data: Trạng thái giao dịch
pub type TxStatus {
  Pending
  Confirmed { block: Int }
  Failed { reason: ByteArray }
}

/// Type alias
pub type Lovelace =
  Int

pub type Hash =
  ByteArray

// ============================================
// 3. FUNCTIONS - Hàm cơ bản
// ============================================

/// Cộng hai số
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Trừ hai số
pub fn subtract(a: Int, b: Int) -> Int {
  a - b
}

/// Nhân hai số
pub fn multiply(a: Int, b: Int) -> Int {
  a * b
}

/// Tìm giá trị lớn nhất
pub fn max(a: Int, b: Int) -> Int {
  if a > b {
    a
  } else {
    b
  }
}

/// Tìm giá trị nhỏ nhất
pub fn min(a: Int, b: Int) -> Int {
  if a < b {
    a
  } else {
    b
  }
}

// ============================================
// 4. OPTION HANDLING - Xử lý Option
// ============================================

/// Lấy giá trị hoặc default
pub fn unwrap_or(opt: Option<Int>, default: Int) -> Int {
  when opt is {
    Some(value) -> value
    None -> default
  }
}

/// Map function qua Option
pub fn map_option(opt: Option<Int>, f: fn(Int) -> Int) -> Option<Int> {
  when opt is {
    Some(value) -> Some(f(value))
    None -> None
  }
}

// ============================================
// 5. WALLET FUNCTIONS - Hàm xử lý Wallet
// ============================================

/// Tạo wallet mới
pub fn new_wallet(addr: ByteArray, bal: Int) -> Wallet {
  Wallet { address: addr, balance: bal }
}

/// Kiểm tra ví rỗng
pub fn is_empty_wallet(wallet: Wallet) -> Bool {
  wallet.balance == 0
}

/// Deposit vào wallet (trả về wallet mới)
pub fn deposit(wallet: Wallet, amount: Int) -> Wallet {
  Wallet { ..wallet, balance: wallet.balance + amount }
}

/// Withdraw từ wallet
pub fn withdraw(wallet: Wallet, amount: Int) -> Option<Wallet> {
  if wallet.balance >= amount {
    Some(Wallet { ..wallet, balance: wallet.balance - amount })
  } else {
    None
  }
}

/// Kiểm tra có đủ balance không
pub fn has_sufficient_balance(wallet: Wallet, required: Int) -> Bool {
  wallet.balance >= required
}

// ============================================
// 6. PATTERN MATCHING - Đối sánh mẫu
// ============================================

/// Mô tả action
pub fn describe_action(action: TokenAction) -> ByteArray {
  when action is {
    Mint -> "Mint new tokens"
    Burn -> "Burn tokens"
    Transfer { to } -> to
  }
}

/// Lấy block number từ status
pub fn get_block_number(status: TxStatus) -> Option<Int> {
  when status is {
    Confirmed { block } -> Some(block)
    _ -> None
  }
}

/// Kiểm tra status có phải Pending không
pub fn is_pending(status: TxStatus) -> Bool {
  when status is {
    Pending -> True
    _ -> False
  }
}

// ============================================
// 7. LIST OPERATIONS - Thao tác List
// ============================================

/// Tính tổng list
pub fn sum(numbers: List<Int>) -> Int {
  when numbers is {
    [] -> 0
    [head, ..tail] -> head + sum(tail)
  }
}

/// Đếm số phần tử
pub fn length(items: List<a>) -> Int {
  when items is {
    [] -> 0
    [_, ..tail] -> 1 + length(tail)
  }
}

/// Kiểm tra list rỗng
pub fn is_empty_list(items: List<a>) -> Bool {
  when items is {
    [] -> True
    _ -> False
  }
}

/// Lấy phần tử đầu tiên
pub fn head(items: List<a>) -> Option<a> {
  when items is {
    [] -> None
    [first, ..] -> Some(first)
  }
}

/// Lấy phần tử cuối cùng
pub fn last(items: List<a>) -> Option<a> {
  when items is {
    [] -> None
    [only] -> Some(only)
    [_, ..tail] -> last(tail)
  }
}
