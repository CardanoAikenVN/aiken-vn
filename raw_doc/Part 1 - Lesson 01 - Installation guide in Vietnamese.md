# 🎯 Bài 01: Cài Đặt Môi Trường Lập Trình Aiken

> **Mục tiêu**: Thiết lập môi trường phát triển hoàn chỉnh để viết smart contract trên Cardano với Aiken

---

## 📖 Giới thiệu

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🏗️  AIKEN - Nền tảng Smart Contract hiện đại cho Cardano  │
│                                                             │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐               │
│   │  Code   │ -> │ Compile │ -> │  UPLC   │               │
│   │ (.ak)   │    │ (aiken) │    │(on-chain)│               │
│   └─────────┘    └─────────┘    └─────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Aiken là ngôn ngữ lập trình **functional** hiện đại được thiết kế riêng cho Cardano blockchain. Aiken compile xuống **UPLC (Untyped Plutus Core)** - ngôn ngữ thực thi smart contract trên Cardano.

---

## 🔧 Cài đặt Aiken

### Phương pháp 1: Sử dụng aikup (Khuyến nghị)

**aikup** là công cụ quản lý phiên bản Aiken, tương tự như `nvm` cho Node.js hay `rustup` cho Rust.

#### Trên macOS/Linux:

```bash
# Cài đặt aikup
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh

# Sau khi cài, chạy:
aikup
```

#### Trên macOS (Homebrew):

```bash
# Cài đặt qua Homebrew
brew install aiken-lang/tap/aikup

# Chạy aikup
aikup
```

#### Trên Windows:

```powershell
# Chạy trong PowerShell
powershell -c "irm https://windows.aiken-lang.org | iex"

# Sau đó:
aikup
```

### Phương pháp 2: Sử dụng npm (Node.js)

```bash
# Cài đặt global
npm install -g @aiken-lang/aikup

# Chạy aikup
aikup
```

---

## ✅ Kiểm tra cài đặt

Sau khi cài đặt, verify bằng các lệnh sau:

```bash
# Kiểm tra version
aiken --version

# Output mong đợi: aiken v1.x.x
```

```bash
# Xem help
aiken --help
```

**Output mong đợi:**

```
Usage: aiken <COMMAND>

Commands:
  new         Create a new Aiken project
  fmt         Format an Aiken project
  build       Build an Aiken project
  address     Compute a validator's address
  check       Type-check an Aiken project
  docs        Build the documentation
  add         Add dependencies
  packages    List available packages
  blueprint   Commands for working with Plutus blueprints
  uplc        Commands for working with UPLC
  tx          Commands for working with transactions
  completion  Generate shell completion scripts
  lsp         Start the Aiken language server
  help        Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

---

## 🛠️ Cài đặt Editor Support

Aiken có hỗ trợ **Language Server Protocol (LSP)** cho các editor phổ biến.

### Visual Studio Code (Khuyến nghị cho người mới)

1. Mở **VS Code**
2. Nhấn `Ctrl+Shift+X` (Windows/Linux) hoặc `Cmd+Shift+X` (macOS)
3. Tìm kiếm "**Aiken**"
4. Cài đặt extension **Aiken** (by Aiken)

```
┌──────────────────────────────────────┐
│  📦 VS Code Extension: Aiken         │
│  ┌──────────────────────────────────┐│
│  │ ✅ Syntax highlighting           ││
│  │ ✅ Auto-completion               ││
│  │ ✅ Error diagnostics             ││
│  │ ✅ Go to definition              ││
│  │ ✅ Hover documentation           ││
│  └──────────────────────────────────┘│
└──────────────────────────────────────┘
```

### NeoVim

```lua
-- Trong init.lua hoặc config của bạn
-- Yêu cầu: nvim-lspconfig
require('lspconfig').aiken.setup{}
```

### Emacs

```elisp
;; Cài đặt aiken-mode từ MELPA
(use-package aiken-mode)
```

---

## 🚀 Tạo Project Đầu Tiên

Hãy tạo project đầu tiên để test môi trường:

```bash
# Tạo project mới
aiken new myname/hello_aiken

# Di chuyển vào project
cd hello_aiken

# Kiểm tra cấu trúc
ls -la
```

**Cấu trúc project:**

```
hello_aiken/
├── README.md           # Tài liệu dự án
├── aiken.toml          # File cấu hình project
├── lib/                # Thư mục cho library code
│   └── hello_aiken/    
└── validators/         # Thư mục cho validator code
```

---

## 🧪 Build và Test

```bash
# Type-check và build project
aiken build

# Chỉ type-check (không build)
aiken check
```

**Output thành công:**

```
    Compiling myname/hello_aiken 0.0.0
    Generating blueprint (plutus.json)

Summary
    0 error, 0 warning(s)
```

---

## 🎨 Workflow Phát Triển

```
┌─────────────────────────────────────────────────────────────────┐
│                    Aiken Development Workflow                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ① Viết Code        ② Check/Build       ③ Test               │
│   ┌─────────┐        ┌─────────┐        ┌─────────┐           │
│   │  .ak    │   ->   │  aiken  │   ->   │  aiken  │           │
│   │  files  │        │  build  │        │  check  │           │
│   └─────────┘        └─────────┘        └─────────┘           │
│        │                  │                  │                 │
│        v                  v                  v                 │
│   ┌─────────┐        ┌─────────┐        ┌─────────┐           │
│   │ Editor  │        │ plutus  │        │  Test   │           │
│   │  LSP    │        │  .json  │        │ Results │           │
│   └─────────┘        └─────────┘        └─────────┘           │
│                                                                 │
│   ④ Deploy to Testnet/Mainnet                                  │
│   ┌─────────────────────────────────────────────────┐          │
│   │ Off-chain code (Mesh.js, Lucid, cardano-cli)    │          │
│   └─────────────────────────────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Tài nguyên hữu ích

| Tài nguyên | Link |
|------------|------|
| 📖 Tài liệu chính thức | https://aiken-lang.org |
| 📚 Standard Library | https://aiken-lang.github.io/stdlib/ |
| 🎮 Playground (thử code online) | https://play.aiken-lang.org |
| 💬 Discord Community | https://discord.gg/ub6atE94v4 |
| 🐙 GitHub | https://github.com/aiken-lang/aiken |

---

## ✨ Bài tập thực hành

### Bài tập 1: Xác nhận cài đặt
```bash
# Chạy các lệnh sau và ghi lại output
aiken --version
aiken --help
```

### Bài tập 2: Tạo project đầu tiên
```bash
# Thay "yourname" bằng tên của bạn
aiken new yourname/my_first_project
cd my_first_project
aiken build
```

### Bài tập 3: Khám phá playground
1. Truy cập https://play.aiken-lang.org
2. Thử chạy một ví dụ có sẵn
3. Quan sát output và compilation result

---

## 🎯 Checklist hoàn thành

- [ ] Cài đặt aikup thành công
- [ ] Chạy `aiken --version` hiển thị phiên bản
- [ ] Cài đặt extension Aiken trên editor
- [ ] Tạo và build thành công project đầu tiên
- [ ] Tham gia Discord community (tuỳ chọn)

---

## 📝 Ghi chú quan trọng

> ⚠️ **Lưu ý**: Aiken được thiết kế **chỉ cho on-chain code** (validator scripts). Để build full DApp, bạn cần kết hợp với off-chain tools như:
> - **Mesh.js** (JavaScript/TypeScript)
> - **Lucid Evolution** (TypeScript)
> - **PyCardano** (Python)
> - **cardano-cli** (Command line)

---

**🎉 Chúc mừng! Bạn đã sẵn sàng bắt đầu hành trình học Aiken!**

➡️ **Tiếp theo**: [Bài 02 - Giới thiệu về Aiken](../02-Introduction/lesson.md)