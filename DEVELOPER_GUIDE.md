# Hướng Dẫn Phát Triển / Developer Guide

> [Tiếng Việt](#tiếng-việt) | [English](#english)

---

## Tiếng Việt

Tài liệu này cung cấp thông tin toàn diện cho các lập trình viên làm việc trên dự án Vietnamese Aiken. Nó bao gồm cài đặt môi trường, quy chuẩn code, quy ước đặt tên, và mẫu gửi bài học.

---

### Mục lục

- [Cài đặt môi trường phát triển](#cài-đặt-môi-trường-phát-triển)
- [Kiến trúc dự án](#kiến-trúc-dự-án)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Quy trình phát triển](#quy-trình-phát-triển)
- [Quy chuẩn code](#quy-chuẩn-code)
- [Quy ước đặt tên](#quy-ước-đặt-tên)
- [Mẫu gửi bài học](#mẫu-gửi-bài-học)
- [Hướng dẫn testing](#hướng-dẫn-testing)
- [Mẹo debug](#mẹo-debug)
- [Vấn đề thường gặp và giải pháp](#vấn-đề-thường-gặp-và-giải-pháp)

---

### Cài đặt môi trường phát triển

#### Yêu cầu hệ thống

| Công cụ | Phiên bản | Cài đặt | Kiểm tra |
|---------|-----------|---------|----------|
| Node.js | v20+ | [nodejs.org](https://nodejs.org/) | `node --version` |
| npm | v10+ | Đi kèm với Node.js | `npm --version` |
| Git | Mới nhất | [git-scm.com](https://git-scm.com/) | `git --version` |
| Aiken | Mới nhất | Xem bên dưới | `aiken --version` |

#### Cài đặt Aiken

**macOS (Homebrew)**
```bash
brew install aiken-lang/tap/aikup
aikup
```

**macOS/Linux (curl)**
```bash
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh
```

**Windows (PowerShell)**
```powershell
powershell -c "irm https://windows.aiken-lang.org | iex"
```

**npm (đa nền tảng)**
```bash
npm install -g @aiken-lang/aikup
aikup
```

#### Cài đặt dự án

```bash
# Clone repository
git clone https://github.com/CardanoAikenVN/aiken-vn.git
cd aiken-vn

# Cài đặt dependencies
npm install

# Khởi động development server
npm start
```

Development server khởi động tại `http://localhost:3000` với hot reload được bật.

#### Extension VS Code khuyên dùng

| Extension | Mục đích |
|-----------|----------|
| Aiken | Syntax highlighting và LSP cho Aiken |
| ESLint | Linting JavaScript/TypeScript |
| Prettier | Định dạng code |
| Tailwind CSS IntelliSense | Tự động hoàn thành class Tailwind |
| MDX | Hỗ trợ file MDX |

---

### Kiến trúc dự án

#### Ngăn xếp công nghệ

| Danh mục | Công nghệ | Phiên bản |
|----------|-----------|-----------|
| Framework | Docusaurus | 3.9.2 |
| Thư viện UI | React | 19 |
| Style | Tailwind CSS | 3.4 |
| Animation | Framer Motion | 12+ |
| Icon | Lucide React | Mới nhất |
| Analytics | Firebase Firestore | 12+ |
| Diagram | Mermaid | Tích hợp sẵn |
| Smart Contract | Aiken | Mới nhất (stdlib v2.2.0) |

#### Sơ đồ kiến trúc

```
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|   Static Site    |---->|   Docusaurus      |---->|   Build Output   |
|   (Markdown)     |     |   (SSG)           |     |   (HTML/JS/CSS)  |
|                  |     |                   |     |                  |
+------------------+     +-------------------+     +------------------+
        |                        |
        v                        v
+------------------+     +-------------------+
|                  |     |                   |
|   React          |     |   Tailwind CSS    |
|   Components     |     |   + Custom CSS    |
|                  |     |                   |
+------------------+     +-------------------+
```

---

### Cấu trúc thư mục

```
aiken-vn/
├── .github/                    # Cấu hình GitHub
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD
│
├── docs/                       # Tài liệu tiếng Việt (25+ file)
│   ├── 01-the-aiken-foundation/    # Phần 1: Cơ bản Aiken (13 bài)
│   │   ├── index.md                # Tổng quan phần
│   │   ├── 01_Installation.md      # Bài 1
│   │   └── ...
│   ├── 02-cardano-architecture/    # Phần 2: Khái niệm Cardano
│   ├── 03-your-first-validator/    # Phần 3: Smart contract đầu tiên
│   ├── 04-minting-tokens-nfts/     # Phần 4: Mint token
│   └── 05-escrow-contract/         # Phần 5: Mẫu escrow
│
├── examples/                   # Smart contract Aiken hoạt động
│   ├── validators/             # File nguồn validator
│   │   ├── escrow.ak           # Hợp đồng escrow
│   │   ├── gift.ak             # Spending validator đơn giản
│   │   ├── nft_policy.ak       # Policy mint NFT
│   │   └── simple_ft.ak        # Policy token thay thế
│   ├── lib/                    # File test (80+ tests)
│   ├── aiken.toml              # Cấu hình dự án Aiken
│   └── plutus.json             # Output Plutus đã biên dịch
│
├── src/                        # Mã nguồn React
│   ├── components/             # Component tái sử dụng
│   │   ├── HomepageFeatures/   # Thẻ tính năng
│   │   ├── LandingPage/        # Phần trang chủ
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── ...
│   │   └── YouTubeVideo.js     # Component nhúng video
│   ├── css/
│   │   └── custom.css          # Style toàn cục + Tailwind
│   ├── lib/                    # Module tiện ích
│   │   └── firebase.js         # Cấu hình Firebase
│   ├── pages/                  # Trang tùy chỉnh
│   │   └── index.js            # Trang chủ
│   └── theme/                  # Ghi đè theme Docusaurus
│
├── static/                     # Tài sản tĩnh
│   └── img/                    # Hình ảnh và icon
│
├── docusaurus.config.js        # Cấu hình trang
├── sidebars.js                 # Cấu trúc điều hướng
├── tailwind.config.js          # Cấu hình Tailwind
├── package.json                # Dependencies
└── README.md                   # Tổng quan dự án
```

#### File quan trọng

| File | Mục đích |
|------|----------|
| `docusaurus.config.js` | Tiêu đề trang, URL, i18n, theme, plugin |
| `sidebars.js` | Cấu trúc sidebar tài liệu |
| `tailwind.config.js` | Tùy chỉnh Tailwind |
| `src/css/custom.css` | CSS toàn cục, ghi đè Infima, animation |
| `examples/aiken.toml` | Dependencies dự án Aiken |

---

### Quy trình phát triển

#### Các lệnh khả dụng

| Lệnh | Mô tả |
|------|-------|
| `npm start` | Khởi động dev server với hot reload |
| `npm run build` | Build trang production vào `build/` |
| `npm run serve` | Phục vụ production build ở local |
| `npm run clear` | Xóa cache Docusaurus |
| `npm run swizzle` | Tùy chỉnh component Docusaurus |

#### Các lệnh Aiken (trong thư mục `examples/`)

| Lệnh | Mô tả |
|------|-------|
| `aiken build` | Biên dịch validator sang Plutus |
| `aiken check` | Chạy tất cả tests |
| `aiken fmt` | Định dạng code Aiken |
| `aiken docs` | Tạo tài liệu |

#### Các bước quy trình phát triển

1. **Tạo feature branch**
   ```bash
   git checkout -b feature/tính-năng-của-bạn
   ```

2. **Khởi động development server**
   ```bash
   npm start
   ```

3. **Thực hiện thay đổi** (docs, component, hoặc examples)

4. **Xác nhận build**
   ```bash
   npm run build
   ```

5. **Test thay đổi Aiken (nếu áp dụng)**
   ```bash
   cd examples && aiken check
   ```

6. **Commit và push**
   ```bash
   git add .
   git commit -m "feat: thông điệp mô tả của bạn"
   git push origin feature/tính-năng-của-bạn
   ```

7. **Mở pull request**

---

### Quy chuẩn code

#### Mẫu TypeScript/React Component

##### Cấu trúc Component

```typescript
// src/components/ComponentName/index.tsx

// 1. Import (bên ngoài, sau đó bên trong)
import React from 'react';
import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

// 2. Định nghĩa kiểu
interface ComponentProps {
  title: string;
  description?: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

// 3. Định nghĩa component (sử dụng React.FC<Props>)
const ComponentName: React.FC<ComponentProps> = ({
  title,
  description,
  isActive = false,
  onClick,
  children,
}) => {
  // 4. Hooks (useState, useEffect, v.v.)
  const [state, setState] = React.useState(false);

  // 5. Xử lý sự kiện
  const handleClick = () => {
    if (onClick) onClick();
    setState(true);
  };

  // 6. Render
  return (
    <div
      className="component-wrapper"
      role="region"
      aria-labelledby={`${title}-heading`}
    >
      <h2 id={`${title}-heading`}>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};

// 7. Export
export default ComponentName;
```

##### Các thực hành tốt nhất cho Component

| Thực hành | Mô tả |
|-----------|-------|
| TypeScript | Luôn sử dụng TypeScript cho component mới |
| Functional Component | Sử dụng mẫu `React.FC<Props>` |
| Props Interface | Định nghĩa kiểu prop rõ ràng |
| Default Props | Sử dụng giá trị mặc định khi destructure |
| Accessibility | Thêm thuộc tính ARIA |
| Semantic HTML | Sử dụng element HTML phù hợp |

#### Quy ước CSS/Tailwind

##### Thứ tự class tiện ích

Tuân theo thứ tự này để đồng nhất:

```html
<div class="
  /* 1. Layout */
  flex flex-col items-center justify-center
  /* 2. Kích thước */
  w-full max-w-lg h-auto min-h-screen
  /* 3. Khoảng cách */
  p-4 m-2 gap-4
  /* 4. Typography */
  text-lg font-bold text-white
  /* 5. Background/Border */
  bg-gray-900 border border-white rounded-lg
  /* 6. Hiệu ứng */
  shadow-lg opacity-90
  /* 7. Transition */
  transition-all duration-300
  /* 8. Trạng thái */
  hover:bg-gray-800 focus:outline-none
  /* 9. Responsive */
  md:flex-row md:text-xl lg:px-8
">
```

##### Biến CSS

Sử dụng biến CSS đã định nghĩa của dự án:

```css
/* Các biến khả dụng */
--bg-primary: #0F1B2A;
--bg-secondary: #112030;
--bg-card: #13253A;
--color-cyan: #5CE1E6;
--color-cyan-dark: #2BBAC0;
--text-heading: #FFFFFF;
--text-body: #DDE6ED;
```

#### Mẫu Smart Contract Aiken

##### Cấu trúc Validator

```aiken
//// Tên Validator
//// Mô tả ngắn gọn bằng tiếng Việt và/hoặc tiếng Anh

use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction}

// ============================================
// KIỂU DỮ LIỆU
// ============================================

/// Kiểu Datum với tài liệu
pub type MyDatum {
  owner: ByteArray,
  deadline: Int,
  amount: Int,
}

/// Kiểu Redeemer cho các hành động chi tiêu
pub type MyRedeemer {
  Action1
  Action2
  Action3
}

// ============================================
// HÀM HỖ TRỢ
// ============================================

/// Hàm hỗ trợ với tài liệu
fn helper_function(tx: Transaction, value: ByteArray) -> Bool {
  list.has(tx.extra_signatories, value)
}

// ============================================
// VALIDATOR CHÍNH
// ============================================

validator my_validator {
  spend(
    datum: Option<MyDatum>,
    redeemer: MyRedeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum

    when redeemer is {
      Action1 -> // logic xác thực
      Action2 -> // logic xác thực
      Action3 -> // logic xác thực
    }
  }

  else(_) {
    fail
  }
}
```

##### Mẫu file Test

```aiken
// lib/validator_test.ak

use validators/my_validator.{MyDatum, MyRedeemer, my_validator}

// Test thành công
test my_validator_action1_succeeds() {
  let datum = MyDatum { owner: #"abc123", deadline: 100, amount: 1000 }
  let redeemer = Action1
  my_validator.spend(Some(datum), redeemer, mock_ref(), mock_tx()) == True
}

// Test thất bại (mong đợi False hoặc lỗi)
test my_validator_action1_fails_wrong_signer() fail {
  let datum = MyDatum { owner: #"abc123", deadline: 100, amount: 1000 }
  let redeemer = Action1
  my_validator.spend(Some(datum), redeemer, mock_ref(), bad_tx())
}
```

---

### Quy ước đặt tên

#### File và thư mục

| Loại | Quy ước | Ví dụ |
|------|---------|-------|
| File tài liệu | `NN_Tên_Tiêu_Đề.md` | `01_Installation.md` |
| Thư mục tài liệu | `NN-kebab-case/` | `01-the-aiken-foundation/` |
| React component (TSX) | `PascalCase.tsx` | `Hero.tsx`, `QuestTimeline.tsx` |
| React component (JSX) | `PascalCase.js` | `YouTubeVideo.js` |
| Module TypeScript | `camelCase.ts` | `types.ts`, `constants.ts` |
| Tiện ích JavaScript | `camelCase.js` | `tracking.js`, `firebase.js` |
| File CSS | `kebab-case.css` | `custom.css` |
| File cấu hình | `kebab-case.ext` | `docusaurus.config.js` |
| Aiken validator | `snake_case.ak` | `escrow.ak`, `nft_policy.ak` |
| File test Aiken | `*_test.ak` | `escrow_test.ak` |

#### Component và biến

| Loại | Quy ước | Ví dụ |
|------|---------|-------|
| React component | PascalCase | `HeroSection`, `FeatureCard` |
| Props component | camelCase | `isActive`, `onClick`, `userName` |
| Xử lý sự kiện | `handle` + Sự kiện | `handleClick`, `handleSubmit` |
| Biến boolean | tiền tố `is`/`has`/`can` | `isLoading`, `hasError` |
| Hằng số | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_URL` |
| Class CSS | kebab-case | `hero-section`, `feature-card` |

---

### Mẫu gửi bài học

#### YAML Frontmatter (Bắt buộc)

```yaml
---
title: "Tiêu đề bài học bằng tiếng Việt"
sidebar_position: 1
slug: /đường-dẫn-tùy-chỉnh-tùy-chọn
description: "Mô tả ngắn gọn cho SEO (1-2 câu)"
---
```

| Trường | Bắt buộc | Mô tả |
|--------|----------|-------|
| `title` | Có | Tiêu đề hiển thị (tiếng Việt) |
| `sidebar_position` | Có | Thứ tự trong sidebar (bắt đầu từ 1) |
| `slug` | Không | Đường dẫn URL tùy chỉnh |
| `description` | Khuyên dùng | Mô tả meta SEO |

#### Mẫu bài học đầy đủ

Sao chép và tùy chỉnh mẫu này cho bài học mới:

```markdown
---
title: Tiêu đề bài học
sidebar_position: N
description: "Mô tả ngắn gọn cho SEO"
---

# Tiêu đề bài học

Đoạn mở đầu giới thiệu nội dung bài học (1-2 câu).

## Mục tiêu học tập

Sau bài học này, bạn sẽ:

- Mục tiêu 1
- Mục tiêu 2
- Mục tiêu 3

---

## Phần 1: Giới thiệu

Nội dung giới thiệu khái niệm...

### Khái niệm cơ bản

Giải thích khái niệm...

:::tip Mẹo
Mẹo hữu ích hoặc best practice.
:::

---

## Phần 2: Nội dung chính

Nội dung chi tiết...

### Ví dụ code

```aiken
// Mô tả code bằng tiếng Việt
fn example_function(a: Int, b: Int) -> Int {
  a + b
}
```

:::info Thông tin
Thông tin bổ sung hoặc giải thích thêm.
:::

---

## Tóm tắt

- Điểm chính 1
- Điểm chính 2
- Điểm chính 3

---

**Tiếp theo**: [Bài N+1 - Tiêu đề](./NN_Next_Lesson.md)
```

#### Các loại Admonition

```markdown
:::tip Tiêu đề
Mẹo hữu ích hoặc thực hành tốt.
:::

:::info Thông tin
Thông tin chung hoặc ngữ cảnh.
:::

:::warning Lưu ý
Cảnh báo hoặc lưu ý quan trọng.
:::

:::danger Nguy hiểm
Cảnh báo nghiêm trọng về các vấn đề tiềm ẩn.
:::

:::note Ghi chú
Ghi chú hoặc làm rõ thêm.
:::
```

---

### Hướng dẫn testing

#### Test build Docusaurus

```bash
# Build production đầy đủ (bắt buộc trước PR)
npm run build

# Phục vụ và test production build
npm run serve
```

#### Checklist xác nhận build

- [ ] Build hoàn thành không lỗi
- [ ] Không có cảnh báo liên kết hỏng (kiểm tra console)
- [ ] Tất cả trang render đúng
- [ ] Hình ảnh tải đúng
- [ ] Điều hướng hoạt động như mong đợi

#### Hướng dẫn test Aiken

```bash
cd examples

# Build contract
aiken build

# Chạy tất cả test
aiken check

# Định dạng code
aiken fmt
```

#### Quy ước đặt tên test

```aiken
// Mẫu: <hàm>_<kịch_bản>_<kết_quả_mong_đợi>

test escrow_complete_succeeds() { ... }
test escrow_complete_fails_wrong_signer() fail { ... }
test escrow_cancel_before_deadline_succeeds() { ... }
```

---

### Mẹo debug

#### Vấn đề Docusaurus

**Build thất bại với module not found**
```bash
# Xóa cache và cài đặt lại
npm run clear
rm -rf node_modules package-lock.json
npm install
```

**Hot reload không hoạt động**
```bash
# Khởi động lại dev server
npm run clear && npm start
```

**Lỗi liên kết hỏng**
- Kiểm tra đường dẫn tương đối trong file markdown
- Xác nhận tên file khớp chính xác (phân biệt hoa thường)
- Sử dụng tiền tố `./` cho liên kết cùng thư mục

#### Vấn đề Aiken

**Lỗi biên dịch**
```bash
# Kiểm tra cú pháp
aiken fmt

# Output build chi tiết
aiken build --verbose
```

**Test thất bại**
```bash
# Chạy test cụ thể
aiken check --match "test_name"

# Output test chi tiết
aiken check --verbose
```

---

### Vấn đề thường gặp và giải pháp

#### Vấn đề: "Command not found: aiken"

**Nguyên nhân**: Aiken không nằm trong PATH

**Giải pháp**:
```bash
# Thêm vào ~/.bashrc hoặc ~/.zshrc
export PATH="$HOME/.aiken/bin:$PATH"

# Tải lại shell
source ~/.bashrc  # hoặc ~/.zshrc
```

#### Vấn đề: Build thất bại với lỗi bộ nhớ

**Nguyên nhân**: Vượt quá giới hạn heap Node.js

**Giải pháp**:
```bash
# Tăng giới hạn bộ nhớ Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Vấn đề: Ký tự tiếng Việt hiển thị sai

**Nguyên nhân**: Vấn đề encoding file

**Giải pháp**:
- Đảm bảo file được lưu dạng UTF-8
- Kiểm tra cài đặt encoding của trình soạn thảo
- Xác nhận `lang="vi"` trong HTML

#### Vấn đề: Class Tailwind không áp dụng

**Nguyên nhân**: Class không nằm trong safelist hoặc bị purge

**Giải pháp**:
1. Kiểm tra đường dẫn content trong `tailwind.config.js`
2. Thêm class động vào safelist
3. Khởi động lại dev server

#### Vấn đề: Hình ảnh không tải

**Nguyên nhân**: Đường dẫn sai hoặc thiếu file

**Giải pháp**:
- Sử dụng `/img/filename.png` cho hình ảnh tĩnh
- Xác nhận file tồn tại trong `static/img/`
- Kiểm tra phân biệt hoa thường

#### Vấn đề: Sidebar không cập nhật

**Nguyên nhân**: Vấn đề cache hoặc cấu hình

**Giải pháp**:
```bash
npm run clear
# Kiểm tra lỗi trong sidebars.js
npm start
```

---

### Tài nguyên bổ sung

#### Tài liệu bên ngoài

- [Tài liệu Docusaurus](https://docusaurus.io/docs)
- [Hướng dẫn ngôn ngữ Aiken](https://aiken-lang.org/language-tour)
- [Tài liệu Tailwind CSS](https://tailwindcss.com/docs)
- [Tài liệu React](https://react.dev/)
- [Cổng developer Cardano](https://developers.cardano.org/)

#### Cộng đồng

- [Discord](https://discord.gg/ub6atE94v4)
- [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)

---

### Nhận trợ giúp

Nếu bạn gặp vấn đề không được đề cập ở đây:

1. Tìm kiếm [GitHub Issues](https://github.com/CardanoAikenVN/aiken-vn/issues) hiện có
2. Kiểm tra [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)
3. Hỏi trong [Discord](https://discord.gg/ub6atE94v4)
4. Mở issue mới với:
   - Mô tả rõ ràng vấn đề
   - Các bước tái tạo
   - Hành vi mong đợi vs thực tế
   - Chi tiết môi trường (OS, phiên bản Node, v.v.)

---
---

## English

This guide provides comprehensive information for developers working on the Vietnamese Aiken documentation project. It covers environment setup, coding standards, naming conventions, and lesson submission templates.

---

### Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Development Workflow](#development-workflow-1)
- [Coding Standards](#coding-standards)
- [Naming Conventions](#naming-conventions)
- [Lesson Submission Template](#lesson-submission-template)
- [Testing Guidelines](#testing-guidelines)
- [Debugging Tips](#debugging-tips)
- [Common Issues and Solutions](#common-issues-and-solutions)

---

### Development Environment Setup

#### Prerequisites

| Tool | Version | Installation | Verification |
|------|---------|--------------|--------------|
| Node.js | v20+ | [nodejs.org](https://nodejs.org/) | `node --version` |
| npm | v10+ | Bundled with Node.js | `npm --version` |
| Git | Latest | [git-scm.com](https://git-scm.com/) | `git --version` |
| Aiken | Latest | See below | `aiken --version` |

#### Installing Aiken

**macOS (Homebrew)**
```bash
brew install aiken-lang/tap/aikup
aikup
```

**macOS/Linux (curl)**
```bash
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh
```

**Windows (PowerShell)**
```powershell
powershell -c "irm https://windows.aiken-lang.org | iex"
```

**npm (cross-platform)**
```bash
npm install -g @aiken-lang/aikup
aikup
```

#### Project Setup

```bash
# Clone the repository
git clone https://github.com/CardanoAikenVN/aiken-vn.git
cd aiken-vn

# Install dependencies
npm install

# Start development server
npm start
```

The development server starts at `http://localhost:3000` with hot reload enabled.

#### Recommended VS Code Extensions

| Extension | Purpose |
|-----------|---------|
| Aiken | Syntax highlighting and LSP for Aiken |
| ESLint | JavaScript/TypeScript linting |
| Prettier | Code formatting |
| Tailwind CSS IntelliSense | Tailwind class autocomplete |
| MDX | MDX file support |

---

### Project Architecture

#### Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Docusaurus | 3.9.2 |
| UI Library | React | 19 |
| Styling | Tailwind CSS | 3.4 |
| Animations | Framer Motion | 12+ |
| Icons | Lucide React | Latest |
| Analytics | Firebase Firestore | 12+ |
| Diagrams | Mermaid | Built-in |
| Smart Contracts | Aiken | Latest (stdlib v2.2.0) |

---

### Directory Structure

```
aiken-vn/
├── docs/                       # Vietnamese documentation (25+ files)
│   ├── 01-the-aiken-foundation/    # Part 1: Aiken basics (13 lessons)
│   ├── 02-cardano-architecture/    # Part 2: Cardano concepts
│   ├── 03-your-first-validator/    # Part 3: First smart contract
│   ├── 04-minting-tokens-nfts/     # Part 4: Token minting
│   └── 05-escrow-contract/         # Part 5: Escrow pattern
│
├── examples/                   # Working Aiken smart contracts
│   ├── validators/             # Validator source files
│   ├── lib/                    # Test files (80+ tests)
│   ├── aiken.toml              # Aiken project config
│   └── plutus.json             # Compiled Plutus output
│
├── src/                        # React source code
│   ├── components/             # Reusable components
│   ├── css/                    # Global styles + Tailwind
│   ├── lib/                    # Utility modules
│   ├── pages/                  # Custom pages
│   └── theme/                  # Docusaurus theme overrides
│
├── static/                     # Static assets
├── docusaurus.config.js        # Site configuration
├── sidebars.js                 # Navigation structure
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

---

### Development Workflow

#### Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Build production site to `build/` |
| `npm run serve` | Serve production build locally |
| `npm run clear` | Clear Docusaurus cache |

#### Aiken Commands (in `examples/` directory)

| Command | Description |
|---------|-------------|
| `aiken build` | Compile validators to Plutus |
| `aiken check` | Run all tests |
| `aiken fmt` | Format Aiken code |
| `aiken docs` | Generate documentation |

---

### Coding Standards

#### TypeScript/React Component Patterns

```typescript
// src/components/ComponentName/index.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  title: string;
  description?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ComponentName: React.FC<ComponentProps> = ({
  title,
  description,
  isActive = false,
  onClick,
}) => {
  const [state, setState] = React.useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    setState(true);
  };

  return (
    <div className="component-wrapper" role="region">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default ComponentName;
```

#### Aiken Smart Contract Patterns

```aiken
//// Validator Name
//// Brief description

use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction}

pub type MyDatum {
  owner: ByteArray,
  deadline: Int,
  amount: Int,
}

pub type MyRedeemer {
  Action1
  Action2
}

validator my_validator {
  spend(
    datum: Option<MyDatum>,
    redeemer: MyRedeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(d) = datum
    when redeemer is {
      Action1 -> // validation logic
      Action2 -> // validation logic
    }
  }

  else(_) {
    fail
  }
}
```

---

### Naming Conventions

#### Files and Directories

| Type | Convention | Example |
|------|------------|---------|
| Documentation files | `NN_Title_Name.md` | `01_Installation.md` |
| Documentation directories | `NN-kebab-case/` | `01-the-aiken-foundation/` |
| React components (TSX) | `PascalCase.tsx` | `Hero.tsx` |
| TypeScript modules | `camelCase.ts` | `types.ts` |
| CSS files | `kebab-case.css` | `custom.css` |
| Aiken validators | `snake_case.ak` | `escrow.ak` |
| Aiken test files | `*_test.ak` | `escrow_test.ak` |

#### Components and Variables

| Type | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `HeroSection` |
| Component props | camelCase | `isActive`, `onClick` |
| Event handlers | `handle` + Event | `handleClick` |
| Boolean variables | `is`/`has`/`can` prefix | `isLoading` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_ITEMS` |

---

### Lesson Submission Template

#### YAML Frontmatter (Required)

```yaml
---
title: "Lesson Title in Vietnamese"
sidebar_position: 1
slug: /optional-custom-url
description: "Brief description for SEO (1-2 sentences)"
---
```

#### Complete Lesson Template

```markdown
---
title: Lesson Title
sidebar_position: N
description: "Brief description for SEO"
---

# Lesson Title

Opening paragraph introducing the lesson content (1-2 sentences).

## Learning Objectives

After this lesson, you will:

- Objective 1
- Objective 2
- Objective 3

---

## Section 1: Introduction

Introductory content...

:::tip Tip
Helpful tip or best practice.
:::

---

## Section 2: Main Content

Detailed content...

### Code Example

```aiken
fn example_function(a: Int, b: Int) -> Int {
  a + b
}
```

---

## Summary

- Key point 1
- Key point 2
- Key point 3

---

**Next**: [Lesson N+1 - Title](./NN_Next_Lesson.md)
```

---

### Testing Guidelines

#### Docusaurus Build Testing

```bash
npm run build    # Full production build (required before PR)
npm run serve    # Serve and test production build
```

#### Build Verification Checklist

- [ ] Build completes without errors
- [ ] No broken links warnings
- [ ] All pages render correctly
- [ ] Images load properly
- [ ] Navigation works as expected

#### Aiken Test Guidelines

```bash
cd examples
aiken build      # Build contracts
aiken check      # Run all tests
aiken fmt        # Format code
```

---

### Debugging Tips

#### Docusaurus Issues

**Build fails with module not found**
```bash
npm run clear
rm -rf node_modules package-lock.json
npm install
```

**Hot reload not working**
```bash
npm run clear && npm start
```

#### Aiken Issues

**Compilation errors**
```bash
aiken fmt
aiken build --verbose
```

**Test failures**
```bash
aiken check --match "test_name"
aiken check --verbose
```

---

### Common Issues and Solutions

#### Issue: "Command not found: aiken"

**Solution**:
```bash
export PATH="$HOME/.aiken/bin:$PATH"
source ~/.bashrc
```

#### Issue: Build fails with memory error

**Solution**:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### Issue: Vietnamese characters display incorrectly

**Solution**:
- Ensure files are saved as UTF-8
- Check editor encoding settings
- Verify `lang="vi"` in HTML

#### Issue: Tailwind classes not applying

**Solution**:
1. Check `tailwind.config.js` content paths
2. Add dynamic classes to safelist
3. Restart dev server

---

### Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Aiken Language Guide](https://aiken-lang.org/language-tour)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Cardano Developer Portal](https://developers.cardano.org/)

#### Community

- [Discord](https://discord.gg/ub6atE94v4)
- [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)

---

### Getting Help

If you encounter issues not covered here:

1. Search existing [GitHub Issues](https://github.com/CardanoAikenVN/aiken-vn/issues)
2. Check [GitHub Discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)
3. Ask in [Discord](https://discord.gg/ub6atE94v4)
4. Open a new issue with clear description and steps to reproduce
