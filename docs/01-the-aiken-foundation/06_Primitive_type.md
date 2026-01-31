---
title: Kiểu dữ liệu nguyên thủy
sidebar_position: 6
---

# Kiểu dữ liệu nguyên thủy trong Aiken

Bài học này giới thiệu 6 kiểu dữ liệu nguyên thủy cốt lõi trong Aiken.

## Mục tiêu học tập

- Nắm vững 6 kiểu nguyên thủy: Bool, Int, ByteArray, String, List, Tuple
- Hiểu cách sử dụng từng kiểu
- Biết các phép toán và methods liên quan

## Tổng quan các kiểu

```text
┌─────────────────────────────────────────────────────────────┐
│                  PRIMITIVE TYPES IN AIKEN                   │
├─────────────────────────────────────────────────────────────┤
│  Bool       │  True / False                                 │
│  Int        │  Số nguyên không giới hạn                     │
│  ByteArray  │  Mảng bytes                                   │
│  String     │  Chuỗi UTF-8 (chỉ dùng cho trace)             │
│  List       │  Danh sách đồng nhất                          │
│  Tuple      │  Nhóm giá trị cố định                         │
└─────────────────────────────────────────────────────────────┘
```

## Bool - Kiểu logic

Chỉ có 2 giá trị: `True` và `False`

```rust title="lib/bool_demo.ak"
fn bool_examples() {
  // Giá trị boolean
  let is_valid = True
  let is_expired = False

  // Toán tử logic
  let and_result = True && False   // False
  let or_result = True || False    // True
  let not_result = !True           // False

  // So sánh trả về Bool
  let equal = 5 == 5               // True
  let not_equal = 5 != 3           // True
  let greater = 10 > 5             // True
  let less_equal = 5 <= 10         // True

  is_valid
}
```

### Cú pháp and/or block

Khi có nhiều điều kiện, dùng block cho rõ ràng:

```rust
fn complex_condition() -> Bool {
  and {
    is_signed_by_owner(),
    is_after_deadline(),
    or {
      has_correct_amount(),
      is_admin_override(),
    },
  }
}
```

## Int - Số nguyên

Số nguyên **không giới hạn** - không lo overflow:

```rust title="lib/int_demo.ak"
fn int_examples() {
  // Số thập phân
  let normal = 42
  let with_separator = 1_000_000    // Dễ đọc hơn
  let negative = -100

  // Số nhị phân (0b)
  let binary = 0b1010               // = 10

  // Số bát phân (0o)
  let octal = 0o17                  // = 15

  // Số thập lục phân (0x)
  let hex = 0xff                    // = 255

  // Phép toán
  let sum = 10 + 5                  // 15
  let diff = 10 - 3                 // 7
  let product = 4 * 5               // 20
  let quotient = 10 / 3             // 3 (chia nguyên)
  let remainder = 10 % 3            // 1

  sum
}
```

## ByteArray - Mảng bytes

Kiểu quan trọng nhất cho blockchain - lưu hash, public keys, signatures:

```rust title="lib/bytearray_demo.ak"
fn bytearray_examples() {
  // Cú pháp array literal
  let bytes = #[10, 255, 0, 128]

  // Cú pháp hex string
  let hash = #"abc123def456"

  // Cú pháp UTF-8 string
  let text = "Hello"               // = #[72, 101, 108, 108, 111]

  // Nối ByteArray
  let combined = #[1, 2] ++ #[3, 4]  // = #[1, 2, 3, 4]

  bytes
}
```

## String - Chuỗi văn bản

**Lưu ý quan trọng**: String chỉ dùng cho `trace` debugging, **không dùng** trong validator logic:

```rust title="lib/string_demo.ak"
fn string_examples() {
  // Khai báo String (prefix @)
  let message = @"Hello, Aiken!"
  let unicode = @"Xin chào 🇻🇳"

  // Dùng trong trace
  trace @"Starting validation..."

  // ❌ KHÔNG nên dùng trong logic
  // if message == @"Hello" { ... }

  message
}
```

## List - Danh sách

Danh sách **đồng nhất** - tất cả phần tử cùng kiểu:

```rust title="lib/list_demo.ak"
use aiken/collection/list

fn list_examples() {
  // Tạo list
  let numbers = [1, 2, 3, 4, 5]
  let empty: List<Int> = []

  // Prepend (thêm đầu) - O(1)
  let with_zero = [0, ..numbers]   // [0, 1, 2, 3, 4, 5]

  // Concat (nối) - O(n)
  let combined = [1, 2] ++ [3, 4]  // [1, 2, 3, 4]

  // Spread syntax
  let spread = [1, ..[2, 3], ..[4, 5]]  // [1, 2, 3, 4, 5]

  numbers
}

fn list_operations() {
  let numbers = [1, 2, 3, 4, 5]

  // Độ dài
  let len = list.length(numbers)        // 5

  // Lấy phần tử đầu
  let first = list.head(numbers)        // Some(1)

  // Lấy phần còn lại
  let rest = list.tail(numbers)         // Some([2, 3, 4, 5])

  // Kiểm tra rỗng
  let is_empty = list.is_empty(numbers) // False

  // Map - biến đổi từng phần tử
  let doubled = list.map(numbers, fn(n) { n * 2 })
  // [2, 4, 6, 8, 10]

  // Filter - lọc phần tử
  let evens = list.filter(numbers, fn(n) { n % 2 == 0 })
  // [2, 4]

  // Fold - gộp thành một giá trị
  let sum = list.foldr(numbers, 0, fn(n, acc) { n + acc })
  // 15

  len
}
```

### Pattern matching với List

```rust
fn process_list(items: List<Int>) -> Int {
  when items is {
    [] -> 0                           // List rỗng
    [single] -> single                // Đúng 1 phần tử
    [first, second] -> first + second // Đúng 2 phần tử
    [head, ..tail] -> head + process_list(tail)  // Đệ quy
  }
}
```

## Tuple - Bộ giá trị

Nhóm giá trị cố định với các kiểu khác nhau:

```rust title="lib/tuple_demo.ak"
fn tuple_examples() {
  // Pair (2 phần tử)
  let point = (10, 20)

  // Triple (3 phần tử)
  let rgb = (255, 128, 0)

  // Mixed types
  let user = ("Alice", 25, True)

  // Truy cập bằng ordinal
  let x = point.1st      // 10
  let y = point.2nd      // 20

  // Destructuring
  let (name, age, active) = user

  point
}

fn swap(pair: (Int, Int)) -> (Int, Int) {
  let (a, b) = pair
  (b, a)
}
```

## Các kiểu bổ sung

### Option - Giá trị tùy chọn

```rust
fn option_examples() {
  let some_value: Option<Int> = Some(42)
  let no_value: Option<Int> = None

  // Xử lý Option
  let result = when some_value is {
    Some(n) -> n * 2
    None -> 0
  }

  result
}
```

### Void - Không có giá trị

```rust
fn void_example() {
  let nothing: Void = Void

  // Thường dùng làm Redeemer khi không cần dữ liệu
  nothing
}
```

### Data - Kiểu tổng quát

```rust
fn data_example() {
  // Bất kỳ giá trị nào cũng có thể upcast sang Data
  let as_data: Data = 42
  let list_data: Data = [1, 2, 3]

  as_data
}
```

## Bảng tổng hợp

| Kiểu | Ví dụ | Mục đích |
|------|-------|----------|
| `Bool` | `True`, `False` | Logic điều kiện |
| `Int` | `42`, `0xff` | Số lượng, thời gian |
| `ByteArray` | `#"abc"`, `"text"` | Hash, keys, data |
| `String` | `@"debug"` | Trace/debug only |
| `List<a>` | `[1, 2, 3]` | Collections |
| `(a, b)` | `(10, 20)` | Grouped values |

## Code mẫu

Xem code mẫu đầy đủ trong thư mục `examples/`:

- **lib/syntax.ak** - Demo tất cả kiểu dữ liệu: Bool, Int, ByteArray, List, Tuple, Option, Custom types
- **lib/syntax_test.ak** - 53 test cases cho các kiểu dữ liệu

```bash
# Chạy tests
cd examples
aiken check
```

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ học cách tạo kiểu dữ liệu tùy chỉnh để mô hình hóa domain phức tạp.
