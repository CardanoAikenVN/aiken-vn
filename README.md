# Vietnamese Aiken

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

<a name="english"></a>

## English

Welcome to **Vietnamese Aiken** - The first open-source curriculum for mastering Aiken and Smart Contracts on Cardano, tailored for Vietnamese developers.


### Features

*   **Language**: 100% Vietnamese content.
*   **Theme**: Default Dark Mode, optimized for reading.
*   **Accessibility**: WCAG-compliant interface.
*   **Examples**: Working Aiken smart contracts with tests.
*   **Curriculum**: A complete learning path from basics to advanced:

#### Part 1: The Aiken Foundation
| # | Lesson | Learning Goal | Stage |
|---|--------|---------------|-------|
| 01 | Installation | Set up programming environment and tools | Setup |
| 02 | Introduction | Overview of Aiken | Setup |
| 03 | Aiken CLI | Master command-line interface | Syntax |
| 04 | Project Structure | Understand project organization | Syntax |
| 05 | Variables & Constants | Define and use variables | Syntax |
| 06 | Primitive Types | Work with basic data types | Syntax |
| 07 | Custom Types | Define complex data structures | Syntax |
| 08 | Control Flow | Implement conditional logic | Syntax |
| 09 | Functions | Write reusable processing logic | Syntax |
| 10 | Modules | Manage and modularize source code | Syntax |
| 11 | Data | Understand data handling | Syntax |
| 12 | Unit Testing | Ensure code correctness | Testing |
| 13 | Troubleshooting | Debug and handle issues | Testing |

#### Part 2: Cardano Architecture
| Topic | Learning Goal | Stage |
|-------|---------------|-------|
| Introduction to Cardano | Understand blockchain fundamentals | Extra |
| UTXO Model | Master Cardano's transaction model | Extra |
| Datum & Redeemer | Learn smart contract data structures | Extra |

#### Part 3: Your First Validator
| Topic | Learning Goal | Stage |
|-------|---------------|-------|
| Building Spending Validator | Write validators to lock assets and set unlock conditions | Deployment |

#### Part 4: Minting Tokens & NFTs
| Topic | Learning Goal | Stage |
|-------|---------------|-------|
| FT & NFT Concepts | Understand token types | Deployment |
| Minting Policies | Create token minting logic | Deployment |

#### Part 5: The Escrow Contract
| Topic | Learning Goal | Stage |
|-------|---------------|-------|
| Escrow Contract | Build secure transaction environment between buyer and seller | Deployment |

#### Learning Path Summary
| Stage | Core Objective | Lessons | Target Audience |
|-------|----------------|---------|-----------------|
| SETUP | Environment installation | 01 - 02 | Beginner |
| SYNTAX | Language fundamentals | 03 - 11 | Beginner |
| TESTING | Ensure code correctness | 12 - 13 | Beginner/Intermediate |
| DEPLOYMENT | Deploy real Smart Contracts | Part 3, 4, 5 | Intermediate |
| EXTRA | Cardano mechanisms & storage | Part 2 | Beginner/Intermediate |

### Example Smart Contracts

The `/examples` directory contains working Aiken smart contracts:

| Validator | Description | Tests |
|-----------|-------------|-------|
| `gift.ak` | Password-protected gift claiming | 8 tests |
| `escrow.ak` | Buyer-seller escrow with timelock | 16 tests |
| `nft_policy.ak` | One-shot NFT minting policy | 4 tests |
| `simple_ft.ak` | Admin-controlled fungible token | 2 tests |

```bash
cd examples
aiken check    # Type check
aiken test     # Run all tests
aiken build    # Compile to Plutus
```

### Installation & Running

Prerequisites: [Node.js](https://nodejs.org/en/download/) (version 20 or higher).

```bash
npm install    # Install dependencies
npm start      # Start dev server at http://localhost:3000
```

### Build & Deploy

```bash
npm run build  # Build for production (output: /build)
npm run serve  # Preview production build
```

### Project Structure

```
├── docs/                  # Documentation content (Markdown/MDX)
│   ├── 01-the-aiken-foundation/   # Part 1: Aiken basics (13 lessons)
│   ├── 02-cardano-architecture/   # Part 2: Cardano concepts
│   ├── 03-your-first-validator/   # Part 3: First validator
│   ├── 04-minting-tokens-nfts/    # Part 4: Token minting
│   └── 05-escrow-contract/        # Part 5: Escrow pattern
├── examples/              # Aiken smart contract examples
│   ├── validators/        # Contract source files
│   └── lib/               # Tests and utilities
├── src/                   # React components & styling
│   ├── components/        # Landing page components
│   ├── css/               # Custom styles
│   └── pages/             # Custom pages
├── docusaurus.config.js   # Site configuration
└── sidebars.js            # Navigation structure
```

### Contributing

Contributions are welcome! Please read:
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Development setup & standards

### License

This documentation is released under the [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/) license.

---

<a name="tiếng-việt"></a>

## Tiếng Việt

Chào mừng đến với **Vietnamese Aiken** - Tài liệu hướng dẫn lập trình Aiken và Smart Contract trên Cardano bằng tiếng Việt.

Dự án này được xây dựng để giúp cộng đồng lập trình viên Việt Nam dễ dàng tiếp cận công nghệ blockchain Cardano.

### Tính năng

*   **Ngôn ngữ**: 100% Tiếng Việt.
*   **Giao diện**: Dark mode mặc định, tối ưu cho việc đọc tài liệu.
*   **Tiếp cận**: Tuân thủ chuẩn WCAG.
*   **Ví dụ**: Smart contract Aiken hoạt động kèm test.
*   **Nội dung**: Lộ trình học tập từ cơ bản đến nâng cao:

#### 🏗 Phần 1: Nền Tảng Aiken
| # | Bài học | Mục tiêu học tập | Giai đoạn |
|---|---------|------------------|-----------|
| 01 | Cài đặt | Thiết lập môi trường lập trình và công cụ | Setup |
| 02 | Giới thiệu | Tổng quan về Aiken | Setup |
| 03 | Aiken CLI | Làm chủ giao diện dòng lệnh | Syntax |
| 04 | Cấu trúc dự án | Hiểu cách tổ chức dự án | Syntax |
| 05 | Biến & Hằng số | Định nghĩa và sử dụng biến | Syntax |
| 06 | Kiểu nguyên thủy | Làm việc với các kiểu dữ liệu cơ bản | Syntax |
| 07 | Kiểu tùy chỉnh | Định nghĩa cấu trúc dữ liệu phức tạp | Syntax |
| 08 | Luồng điều khiển | Triển khai logic điều kiện | Syntax |
| 09 | Hàm | Viết logic xử lý có thể tái sử dụng | Syntax |
| 10 | Modules | Quản lý và chia nhỏ mã nguồn | Syntax |
| 11 | Dữ liệu | Hiểu cách xử lý dữ liệu | Syntax |
| 12 | Kiểm thử đơn vị | Đảm bảo code chạy đúng | Testing |
| 13 | Xử lý lỗi | Kỹ thuật debug và xử lý vấn đề | Testing |

#### 🏛 Phần 2: Kiến Trúc Cardano
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Giới thiệu Cardano | Hiểu nền tảng blockchain | Extra |
| Mô hình UTXO | Làm chủ mô hình giao dịch Cardano | Extra |
| Datum & Redeemer | Học cấu trúc dữ liệu smart contract | Extra |

#### 🛡 Phần 3: Validator Đầu Tiên
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Xây dựng Spending Validator | Viết validator để khóa tài sản và thiết lập điều kiện mở khóa | Deployment |

#### 💎 Phần 4: Phát Hành Token & NFT
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Khái niệm FT & NFT | Hiểu các loại token | Deployment |
| Minting Policies | Tạo logic phát hành token | Deployment |

#### ⚖ Phần 5: Hợp Đồng Escrow
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Hợp đồng Escrow | Xây dựng môi trường giao dịch an toàn giữa buyer và seller | Deployment |

#### 📊 Tổng kết Lộ trình
| Giai đoạn | Mục tiêu | Bài học | Đối tượng |
|-----------|----------|---------|-----------|
| SETUP | Cài đặt môi trường | 01 - 02 | Beginner |
| SYNTAX | Nền tảng ngôn ngữ | 03 - 11 | Beginner |
| TESTING | Đảm bảo code đúng | 12 - 13 | Beginner/Intermediate |
| DEPLOYMENT | Triển khai Smart Contract | Phần 3, 4, 5 | Intermediate |
| EXTRA | Cơ chế Cardano | Phần 2 | Beginner/Intermediate |

### Ví dụ Smart Contract

Thư mục `/examples` chứa các smart contract Aiken hoạt động:

| Validator | Mô tả | Tests |
|-----------|-------|-------|
| `gift.ak` | Nhận quà bằng mật khẩu | 8 tests |
| `escrow.ak` | Ký quỹ buyer-seller với timelock | 16 tests |
| `nft_policy.ak` | Policy mint NFT one-shot | 4 tests |
| `simple_ft.ak` | Token do admin kiểm soát | 2 tests |

```bash
cd examples
aiken check    # Kiểm tra type
aiken test     # Chạy tất cả tests
aiken build    # Compile sang Plutus
```

### Cài đặt và Chạy

Yêu cầu: [Node.js](https://nodejs.org/en/download/) (phiên bản 20 trở lên).

```bash
npm install    # Cài đặt dependencies
npm start      # Chạy server tại http://localhost:3000
```

### Build và Deploy

```bash
npm run build  # Build production (output: /build)
npm run serve  # Xem trước bản build
```

### Cấu trúc dự án

```
├── docs/                  # Nội dung tài liệu (Markdown/MDX)
│   ├── 01-the-aiken-foundation/   # Phần 1: Cơ bản Aiken (13 bài)
│   ├── 02-cardano-architecture/   # Phần 2: Kiến trúc Cardano
│   ├── 03-your-first-validator/   # Phần 3: Validator đầu tiên
│   ├── 04-minting-tokens-nfts/    # Phần 4: Mint token
│   └── 05-escrow-contract/        # Phần 5: Hợp đồng Escrow
├── examples/              # Ví dụ smart contract Aiken
│   ├── validators/        # File source contract
│   └── lib/               # Tests và utilities
├── src/                   # React components & styling
│   ├── components/        # Components trang chủ
│   ├── css/               # Custom styles
│   └── pages/             # Custom pages
├── docusaurus.config.js   # Cấu hình site
└── sidebars.js            # Cấu trúc navigation
```

### Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng đọc:
- [CONTRIBUTING.md](CONTRIBUTING.md) - Hướng dẫn đóng góp
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Cài đặt & quy chuẩn code

### Giấy phép

Tài liệu này được phát hành dưới giấy phép [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/).

---

Built for the Cardano Vietnam Community.
