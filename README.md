# Vietnamese Aiken

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

<a name="english"></a>

## English

Welcome to **Vietnamese Aiken** - The first open-source curriculum for mastering Aiken and Smart Contracts on Cardano, tailored for Vietnamese developers.


### Features

*   **Language**: 100% Vietnamese content.
*   **Theme**: Default Dark Mode, optimized for reading.
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

### Installation & Running

Prerequisites: [Node.js](https://nodejs.org/en/download/) (version 18 or higher).

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Start development server**:

    ```bash
    npm start
    ```

    The website will open automatically at `http://localhost:3000`.

### Build & Deploy

To build the project for production (static files):

```bash
npm run build
```

The output will be in the `build` directory.

### Project Structure

*   `/docs`: Documentation content (Markdown) organized by chapters.
    *   `/docs/00-ui-components`: Landing page component documentation and design patterns.
*   `/src`: Source code for UI (React components, CSS).
    *   `/src/components/LandingPage`: Landing page components (QuestTimeline, QuestCard, etc.).
*   `docusaurus.config.js`: Main project configuration.
*   `sidebars.js`: Sidebar configuration.

### Documentation for Developers

**UI Component Documentation** (`/docs/00-ui-components/`)
- `index.md` - Overview of UI components
- `quest-timeline-design.md` - Detailed Speedrun design pattern implementation
- `component-api.md` - Complete API reference for all components
- `responsive-guidelines.md` - Responsive design patterns and breakpoints
- `CHANGELOG.md` - Version history and updates

### Contributing

Contributions are welcome! Please create a Pull Request or open an Issue if you find any bugs or want to add content.

### License

This documentation is released under the [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/) license.

---

<a name="tiếng-việt"></a>

## Tiếng Việt

Chào mừng đến với **Vietnamese Aiken** - Cổng thông tin tài liệu hướng dẫn lập trình Aiken và Smart Contract trên Cardano bằng tiếng Việt.

Dự án này được xây dựng để giúp cộng đồng lập trình viên Việt Nam dễ dàng tiếp cận công nghệ blockchain Cardano.

### Tính năng

*   **Ngôn ngữ**: 100% Tiếng Việt.
*   **Giao diện**: Dark mode mặc định, tối ưu cho việc đọc tài liệu.
*   **Nội dung**: Lộ trình học tập từ cơ bản đến nâng cao:

#### 🏗 Phần 1: Nền Tảng (The Aiken Foundation)
| # | Bài học | Mục tiêu học tập | Giai đoạn |
|---|---------|------------------|-----------|
| 01 | Cài đặt (Installation) | Thiết lập môi trường lập trình và công cụ | Setup |
| 02 | Giới thiệu (Introduction) | Tổng quan về Aiken | Setup |
| 03 | Aiken CLI | Làm chủ giao diện dòng lệnh | Syntax |
| 04 | Cấu trúc dự án (Project Structure) | Hiểu cách tổ chức dự án | Syntax |
| 05 | Biến & Hằng số (Variables & Constants) | Định nghĩa và sử dụng biến | Syntax |
| 06 | Kiểu dữ liệu nguyên thủy (Primitive Types) | Làm việc với các kiểu dữ liệu cơ bản | Syntax |
| 07 | Kiểu dữ liệu tùy chỉnh (Custom Types) | Định nghĩa cấu trúc dữ liệu phức tạp | Syntax |
| 08 | Luồng điều khiển (Control Flow) | Triển khai logic điều kiện | Syntax |
| 09 | Hàm (Functions) | Viết logic xử lý có khả năng tái sử dụng | Syntax |
| 10 | Modules | Quản lý và chia nhỏ mã nguồn | Syntax |
| 11 | Dữ liệu (Data) | Hiểu cách xử lý dữ liệu | Syntax |
| 12 | Kiểm thử đơn vị (Unit Test) | Đảm bảo code chạy đúng | Testing |
| 13 | Xử lý lỗi (Troubleshooting) | Kỹ thuật debug và xử lý vấn đề | Testing |

#### 🏛 Phần 2: Kiến Trúc Cardano (Cardano Architecture)
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Giới thiệu về Cardano | Hiểu nền tảng blockchain | Extra |
| Mô hình UTXO | Làm chủ mô hình giao dịch của Cardano | Extra |
| Datum & Redeemer | Học cấu trúc dữ liệu smart contract | Extra |

#### 🛡 Phần 3: Validator Đầu Tiên (Your First Validator)
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Xây dựng Spending Validator | Viết validator để khóa tài sản và thiết lập điều kiện mở khóa | Deployment |

#### 💎 Phần 4: Phát Hành Token & NFT (Minting Tokens & NFTs)
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Khái niệm FT & NFT | Hiểu các loại token | Deployment |
| Minting Policies | Tạo logic phát hành token | Deployment |

#### ⚖ Phần 5: Hợp Đồng Escrow (The Escrow Contract)
| Chủ đề | Mục tiêu học tập | Giai đoạn |
|--------|------------------|-----------|
| Hợp đồng ký quỹ (Escrow) | Xây dựng môi trường giao dịch an toàn giữa buyer và seller | Deployment |

#### 📊 Tổng kết Lộ trình Học tập
| Giai đoạn | Mục tiêu cốt lõi | Bài học | Đối tượng |
|-----------|------------------|---------|-----------|
| SETUP | Cài đặt môi trường | 01 - 02 | Beginner |
| SYNTAX | Nền tảng ngôn ngữ | 03 - 11 | Beginner |
| TESTING | Đảm bảo code chạy đúng | 12 - 13 | Beginner/Intermediate |
| DEPLOYMENT | Triển khai Smart Contract thực tế | Phần 3, 4, 5 | Intermediate |
| EXTRA | Cơ chế hoạt động và lưu trữ của Cardano | Phần 2 | Beginner/Intermediate |

### Cài đặt và Chạy dự án

Yêu cầu: [Node.js](https://nodejs.org/en/download/) (phiên bản 18 trở lên).

1.  **Cài đặt dependencies**:

    ```bash
    npm install
    ```

2.  **Chạy server phát triển**:

    ```bash
    npm start
    ```

    Trang web sẽ tự động mở tại `http://localhost:3000/docusaurus/`.

### Build và Deploy

Để build dự án ra file tĩnh (static files):

```bash
npm run build
```

Nội dung sẽ được tạo trong thư mục `build`.

### Cấu trúc dự án

*   `/docs`: Chứa nội dung tài liệu (Markdown) theo các chương.
    *   `/docs/00-ui-components`: Tài liệu thành phần giao diện và mẫu thiết kế.
*   `/src`: Chứa mã nguồn giao diện (React components, CSS).
    *   `/src/components/LandingPage`: Các component của trang chủ (QuestTimeline, QuestCard, v.v.).
*   `docusaurus.config.js`: Cấu hình chính của dự án.
*   `sidebars.js`: Cấu hình thanh bên (sidebar).

### Tài liệu cho các Nhà phát triển

**Tài liệu Thành phần UI** (`/docs/00-ui-components/`)
- `index.md` - Tổng quan về các thành phần UI
- `quest-timeline-design.md` - Chi tiết về mẫu thiết kế Speedrun
- `component-api.md` - Tài liệu API đầy đủ cho tất cả các thành phần
- `responsive-guidelines.md` - Mẫu thiết kế và điểm dừng phản hồi
- `CHANGELOG.md` - Lịch sử phiên bản và cập nhật

### Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc mở Issue nếu bạn tìm thấy lỗi hoặc muốn bổ sung nội dung.

### Giấy phép

Tài liệu này được phát hành dưới giấy phép [CC BY-4.0](https://creativecommons.org/licenses/by/4.0/).

---
Built for the Cardano Vietnam Community.
