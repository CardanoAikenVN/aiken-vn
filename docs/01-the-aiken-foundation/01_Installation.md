---
title: Cài đặt
sidebar_position: 1
---

# Cài đặt Aiken

Bài học này hướng dẫn bạn thiết lập môi trường phát triển Aiken từ đầu.

## Mục tiêu học tập

- Cài đặt Aiken CLI trên các hệ điều hành khác nhau
- Xác minh cài đặt thành công
- Thiết lập editor hỗ trợ Aiken

## Aikup - Công cụ quản lý phiên bản

**Aikup** là công cụ được khuyến nghị để cài đặt và quản lý các phiên bản Aiken.

### Cài đặt trên macOS

```bash
# Sử dụng Homebrew
brew install aiken-lang/tap/aikup

# Hoặc sử dụng curl
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh
```

### Cài đặt trên Linux

```bash
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh
```

### Cài đặt trên Windows

```powershell
powershell -c "irm https://windows.aiken-lang.org | iex"
```

Hoặc tải MSI installer từ [GitHub releases](https://github.com/aiken-lang/aikup/releases/latest).

### Cài đặt qua npm

```bash
npm install -g @aiken-lang/aikup
```

## Cài đặt Aiken

Sau khi có aikup, chạy lệnh:

```bash
aikup
```

Lệnh này sẽ tự động tải và cài đặt phiên bản Aiken mới nhất.

## Xác minh cài đặt

```bash
aiken --version
```

Output mẫu:
```
aiken v1.1.0
```

## Các lệnh CLI cơ bản

Kiểm tra danh sách lệnh có sẵn:

```bash
aiken --help
```

```
Usage: aiken <COMMAND>

Commands:
  new        Tạo dự án Aiken mới
  build      Biên dịch dự án
  check      Chạy kiểm thử
  docs       Tạo tài liệu
  fmt        Format mã nguồn
  lsp        Khởi động Language Server
  completion Tạo shell completions
```

## Thiết lập Editor

### Visual Studio Code

1. Cài đặt extension **Aiken** từ marketplace
2. Extension tự động sử dụng Aiken LSP

### Vim/Neovim

Thêm vào config:

```lua
-- Neovim với nvim-lspconfig
require('lspconfig').aiken.setup{}
```

### Shell Completions

```bash
# Bash
aiken completion bash --install

# Zsh
aiken completion zsh --install

# Fish
aiken completion fish --install
```

## Kiểm tra môi trường

Tạo dự án thử nghiệm để xác nhận mọi thứ hoạt động:

```bash
aiken new my-org/hello-aiken
cd hello-aiken
aiken check
```

Output thành công:
```
    Compiling my-org/hello-aiken 0.0.0
    Finished compilation in 0.12s
Summary
    0 errors, 0 warnings
```

## Cấu trúc thư mục sau cài đặt

```
~/.aiken/
├── bin/
│   └── aiken          # Aiken binary
└── versions/
    └── 1.1.0/         # Phiên bản đã cài
```

## Xử lý lỗi thường gặp

### Lỗi "command not found"

Thêm đường dẫn vào PATH:

```bash
# Thêm vào ~/.bashrc hoặc ~/.zshrc
export PATH="$HOME/.aiken/bin:$PATH"
```

### Lỗi quyền truy cập trên Linux/macOS

```bash
chmod +x ~/.aiken/bin/aiken
```

## Tóm tắt

| Bước | Lệnh |
|------|------|
| Cài aikup | `brew install aiken-lang/tap/aikup` |
| Cài Aiken | `aikup` |
| Xác minh | `aiken --version` |
| Kiểm tra | `aiken new test && cd test && aiken check` |

## Bước tiếp theo

Trong bài tiếp theo, chúng ta sẽ tìm hiểu tổng quan về ngôn ngữ Aiken và lý do nó phù hợp cho phát triển smart contract trên Cardano.
