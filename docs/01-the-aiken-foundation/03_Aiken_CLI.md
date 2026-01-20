---
title: "03. Aiken CLI"
sidebar_position: 3
description: "Thành thạo tất cả các lệnh CLI của Aiken để quản lý dự án smart contract hiệu quả"
---

# Bài 03: Aiken CLI - Công Cụ Dòng Lệnh

> **Mục tiêu:** Thành thạo tất cả các lệnh CLI của Aiken để quản lý dự án smart contract hiệu quả.

---

## Tổng Quan Aiken CLI

**Aiken CLI** là công cụ command-line để quản lý toàn bộ lifecycle của smart contract.

| Lệnh | Mô tả |
|------|-------|
| `aiken new` | Tạo dự án mới |
| `aiken build` | Compile smart contracts |
| `aiken check` | Type-check và chạy tests |
| `aiken fmt` | Format code |
| `aiken docs` | Tạo documentation |
| `aiken add` | Thêm dependencies |
| `aiken address` | Tính địa chỉ validator |
| `aiken blueprint` | Quản lý blueprint |

```bash
# Xem tất cả lệnh
aiken --help
```

---

## Các Lệnh Cơ Bản

### `aiken new` - Tạo Dự Án Mới

```bash
# Tạo dự án cơ bản
aiken new hello_cardano

# Tạo với tên tổ chức (kiểu GitHub)
aiken new vbi-academy/escrow_contract
```

**Cấu trúc được tạo:**

| File/Folder | Mô tả |
|-------------|-------|
| `aiken.toml` | Cấu hình dự án |
| `lib/` | Thư viện & helper functions |
| `validators/` | Smart contracts |
| `README.md` | Tài liệu dự án |

---

### `aiken check` - Kiểm Tra Type

```bash
cd hello_cardano
aiken check
```

**Quy trình check:**

| Bước | Mô tả |
|------|-------|
| 1. Parser | Kiểm tra cú pháp |
| 2. Type Checker | Kiểm tra types khớp nhau |
| 3. Test Runner | Chạy tất cả tests |

**Output thành công:**
```
    Compiling vbi-academy/hello_cardano 0.0.0
      Checking ...
    Completed in 0.05s
```

---

### `aiken fmt` - Format Code

```bash
# Format toàn bộ dự án
aiken fmt

# Chỉ kiểm tra (không thay đổi file)
aiken fmt --check

# Format một file cụ thể
aiken fmt validators/hello_cardano.ak
```

---

### `aiken build` - Biên Dịch

```bash
# Build cơ bản
aiken build

# Build với trace messages (debug)
aiken build --trace-level verbose

# Build chỉ kiểm tra, không tạo artifacts
aiken build --check
```

**Trace levels:**

| Level | Mô tả |
|-------|-------|
| `silent` | Không có trace |
| `compact` | Trace ngắn gọn (mặc định) |
| `verbose` | Trace chi tiết (debug) |

**Output:**
```
    Compiling vbi-academy/hello_cardano 0.0.0
    Generating blueprint (/path/to/hello_cardano/plutus.json)

    Validator   Size (bytes)   Mem (units)   CPU (units)
    ───────────────────────────────────────────────────────
    hello       1,234          45,678        12,345,678

Summary
    1 validator
    Completed in 0.25s
```

---

## Quản Lý Dependencies

### `aiken add` - Thêm Package

```bash
# Thêm stdlib (đã có sẵn trong dự án mới)
aiken add aiken-lang/stdlib

# Thêm với version cụ thể
aiken add aiken-lang/stdlib@v2

# Thêm từ GitHub với tag
aiken add aiken-lang/fuzz --version main
```

**Kết quả trong aiken.toml:**
```toml
[dependencies]
aiken-lang/stdlib = { version = "v2", source = "github" }
aiken-lang/fuzz = { version = "main", source = "github" }
```

**Popular packages:**

| Package | Mô tả |
|---------|-------|
| `aiken-lang/stdlib` | Standard library |
| `aiken-lang/fuzz` | Fuzzing/property testing |
| `sundaeswap/multisig` | Multi-signature |

### `aiken packages` - Liệt Kê Packages

```bash
# Xem tất cả packages có sẵn
aiken packages

# Tìm kiếm package
aiken packages --search multisig
```

---

## Testing với Aiken

### Chạy Tests

```bash
# Chạy tất cả tests
aiken check

# Chạy test cụ thể (match tên)
aiken check -m "add"

# Chạy với exact match
aiken check -e "test_add_positive"

# Hiển thị chi tiết trace
aiken check --trace-level verbose
```

### Test Output

```
Running tests...

✅ add_positive         PASS   [mem: 1234]
✅ add_negative         PASS   [mem: 1234]
❌ add_overflow         FAIL

2 passed, 1 failed
```

---

## Documentation Generation

### `aiken docs` - Tạo Tài Liệu

```bash
# Generate docs
aiken docs

# Mở trong browser
open docs/index.html
```

### Cách viết Doc Comments

```aiken
/// Cộng hai số nguyên
///
/// ## Arguments
///
/// * `a` - Số thứ nhất
/// * `b` - Số thứ hai
///
/// ## Returns
///
/// Tổng của a và b
///
/// ## Example
///
/// ```aiken
/// add(2, 3) == 5
/// ```
pub fn add(a: Int, b: Int) -> Int {
  a + b
}
```

---

## Blueprint và Deployment

### `aiken address` - Tính Address

```bash
# Mainnet address
aiken address --mainnet

# Testnet address (Preview)
aiken address --testnet

# Với validator cụ thể
aiken address --validator hello_cardano --testnet
```

### `aiken blueprint` - Quản Lý Blueprint

```bash
# Xem thông tin blueprint
aiken blueprint policy

# Convert plutus.json format
aiken blueprint convert

# Apply parameters to validator
aiken blueprint apply -v my_validator '{"field": "value"}'
```

### Tích hợp với Off-chain

```javascript
// Sử dụng blueprint với Mesh.js
import blueprint from './plutus.json';

const validator = {
  type: "PlutusV3",
  script: blueprint.validators[0].compiledCode,
};

const scriptAddress = resolvePlutusScriptAddress(validator, 0);
```

---

## Tips và Best Practices

### Development Workflow

| Bước | Lệnh | Mô tả |
|------|------|-------|
| 1 | Viết code | Editor |
| 2 | `aiken fmt` | Format code |
| 3 | `aiken check` | Type check + tests |
| 4 | `aiken build` | Compile |
| 5 | Test trên testnet | Off-chain |
| 6 | Deploy mainnet | Production |

### Shell Aliases (khuyến nghị)

```bash
# Thêm vào ~/.bashrc hoặc ~/.zshrc
alias ab="aiken build"
alias ac="aiken check"
alias af="aiken fmt"
alias an="aiken new"
alias at="aiken check -m"
```

### So sánh các lệnh

| Lệnh | Mục đích | Khi nào dùng |
|------|----------|--------------|
| `check` | Type check + tests | Sau mỗi thay đổi |
| `build` | Compile đầy đủ | Trước deploy |
| `fmt` | Format code | Trước commit |
| `docs` | Generate docs | Trước release |

### Common Errors và Solutions

| Error | Solution |
|-------|----------|
| "Module not found" | Kiểm tra import path, chạy `aiken build` |
| "Type mismatch" | Đọc error message, kiểm tra function signature |
| "Validator too large" | Tối ưu code, sử dụng built-in functions |

---

## Bài Tập Thực Hành

### Bài 1: Khám phá CLI

```bash
# 1. Tạo dự án mới
aiken new my_first_project

# 2. Di chuyển vào thư mục
cd my_first_project

# 3. Build và xem output
aiken build

# 4. Chạy tests
aiken check
```

### Bài 2: Package Management

```bash
# 1. Xem packages có sẵn
aiken packages

# 2. Thêm một package
aiken add aiken-lang/fuzz

# 3. Kiểm tra aiken.toml
cat aiken.toml
```

---

## Checklist Hoàn Thành

- [ ] Hiểu tất cả lệnh CLI cơ bản
- [ ] Biết cách tạo và quản lý dự án
- [ ] Có thể thêm và quản lý dependencies
- [ ] Hiểu quy trình build và compile
- [ ] Biết cách chạy và debug tests
- [ ] Có thể generate documentation

---

## Tài Liệu Tham Khảo

- [Aiken CLI Documentation](https://aiken-lang.org/installation-instructions)
- [Aiken Package Registry](https://packages.aiken-lang.org)
- [Blueprint Specification (CIP-57)](https://cips.cardano.org/cips/cip57)

---

➡️ **Tiếp theo**: [Bài 04 - Cấu trúc dự án](./04_Project_structure.md)
