# Hướng Dẫn Đóng Góp / Contributing Guidelines

> [Tiếng Việt](#tiếng-việt) | [English](#english)

---

## Tiếng Việt

Chào mừng bạn đến với dự án Vietnamese Aiken! Chúng tôi đang xây dựng giáo trình mã nguồn mở đầu tiên để làm chủ việc phát triển smart contract Aiken trên Cardano, dành riêng cho cộng đồng lập trình viên Việt Nam.

Cảm ơn bạn đã quan tâm đến việc đóng góp. Tài liệu này sẽ hướng dẫn bạn bắt đầu.

---

### Mục lục

- [Các cách đóng góp](#các-cách-đóng-góp)
- [Hướng dẫn bắt đầu](#hướng-dẫn-bắt-đầu)
- [Quy trình phát triển](#quy-trình-phát-triển)
- [Quy ước đặt tên branch](#quy-ước-đặt-tên-branch)
- [Quy ước commit message](#quy-ước-commit-message)
- [Quy trình Pull Request](#quy-trình-pull-request)
- [Mẫu báo cáo vấn đề](#mẫu-báo-cáo-vấn-đề)
- [Quy tắc ứng xử](#quy-tắc-ứng-xử)
- [Quy trình review](#quy-trình-review)
- [Ghi nhận đóng góp](#ghi-nhận-đóng-góp)

---

### Các cách đóng góp

#### Tài liệu

- **Bài học mới**: Viết nội dung giáo dục mới cho các phần giáo trình hiện có hoặc đã lên kế hoạch
- **Cải tiến**: Sửa lỗi chính tả, làm rõ giải thích, thêm ví dụ
- **Dịch thuật**: Hỗ trợ dịch thuật các thuật ngữ kỹ thuật hoặc cải thiện chất lượng nội dung tiếng Việt
- **Ví dụ code**: Thêm hoặc cải tiến các ví dụ code Aiken hoạt động được

#### Code

- **Sửa lỗi**: Sửa các vấn đề trong trang Docusaurus hoặc ví dụ Aiken
- **Tính năng mới**: Cải thiện chức năng, khả năng tiếp cận, hoặc trải nghiệm người dùng
- **Testing**: Thêm test case cho các smart contract Aiken
- **Hiệu suất**: Tối ưu hóa thời gian build hoặc hiệu suất runtime

#### Cộng đồng

- **Báo cáo lỗi**: Báo cáo các vấn đề bạn gặp phải
- **Đề xuất tính năng**: Đề xuất cải tiến cho giáo trình hoặc trang web
- **Thảo luận**: Chia sẻ ý tưởng trong GitHub Discussions hoặc Discord

---

### Hướng dẫn bắt đầu

#### Yêu cầu hệ thống

| Yêu cầu | Phiên bản | Mục đích |
|---------|-----------|----------|
| Node.js | v20+ | Phát triển Docusaurus |
| npm | v10+ | Quản lý package |
| Aiken | Mới nhất | Ví dụ smart contract |
| Git | Mới nhất | Quản lý phiên bản |

#### Các bước cài đặt

1. **Fork repository**

   Nhấn nút "Fork" tại [github.com/CardanoAikenVN/aiken-vn](https://github.com/CardanoAikenVN/aiken-vn)

2. **Clone fork của bạn**

   ```bash
   git clone https://github.com/YOUR_USERNAME/aiken-vn.git
   cd aiken-vn
   ```

3. **Cài đặt dependencies**

   ```bash
   npm install
   ```

4. **Khởi động development server**

   ```bash
   npm start
   ```

   Trang web sẽ mở tại `http://localhost:3000`

5. **Kiểm tra ví dụ Aiken (tùy chọn)**

   ```bash
   cd examples
   aiken check
   ```

---

### Quy trình phát triển

#### Tham khảo nhanh

| Tác vụ | Lệnh |
|--------|------|
| Khởi động dev server | `npm start` |
| Build cho production | `npm run build` |
| Chạy production build | `npm run serve` |
| Xóa cache | `npm run clear` |
| Chạy Aiken tests | `cd examples && aiken check` |
| Format code Aiken | `cd examples && aiken fmt` |

#### Thực hiện thay đổi

1. Tạo feature branch từ `main`
2. Thực hiện các thay đổi của bạn
3. Test ở local với `npm run build`
4. Commit với message mô tả rõ ràng
5. Push lên fork của bạn
6. Mở pull request

---

### Quy ước đặt tên branch

| Loại Branch | Mẫu | Ví dụ | Mô tả |
|-------------|-----|-------|-------|
| Nội dung | `part-N` | `part-1`, `part-2` | Cập nhật phần giáo trình |
| Tính năng | `feature/mô-tả` | `feature/dark-mode` | Chức năng mới |
| Sửa lỗi | `fix/mô-tả` | `fix/broken-links` | Sửa lỗi |
| Tài liệu | `docs/mô-tả` | `docs/readme-update` | Cập nhật tài liệu |

#### Ví dụ

```bash
# Làm việc trên Phần 1
git checkout -b part-1

# Thêm tính năng mới
git checkout -b feature/search-functionality

# Sửa lỗi
git checkout -b fix/mobile-navigation
```

---

### Quy ước commit message

#### Định dạng

```
<type>: <subject>

[body tùy chọn]

[footer tùy chọn]
```

#### Các loại type

| Type | Mô tả | Ví dụ |
|------|-------|-------|
| `feat` | Tính năng hoặc nội dung mới | `feat: thêm Bài 5 về custom types` |
| `fix` | Sửa lỗi | `fix: sửa liên kết hỏng trong Phần 1` |
| `docs` | Thay đổi tài liệu | `docs: cập nhật bước cài đặt trong README` |
| `style` | Định dạng, không thay đổi code | `style: format code blocks trong Bài 3` |
| `refactor` | Tái cấu trúc code | `refactor: tổ chức lại thư mục component` |
| `test` | Thêm tests | `test: thêm tests cho escrow validator` |
| `chore` | Tác vụ bảo trì | `chore: cập nhật dependencies` |

#### Ví dụ

```bash
# Commit message tốt
git commit -m "feat: thêm dấu tiếng Việt cho tất cả bài học Phần 1"
git commit -m "fix: xử lý lỗi hydration ở trang chủ"
git commit -m "docs: thêm phần xử lý sự cố vào Bài 1"

# Commit message kém (tránh dùng)
git commit -m "update"
git commit -m "fix stuff"
git commit -m "WIP"
```

---

### Quy trình Pull Request

#### Trước khi gửi

Hoàn thành checklist này:

- [ ] Branch đã cập nhật với `main`
- [ ] Build thành công ở local (`npm run build`)
- [ ] Không có liên kết hỏng trong tài liệu
- [ ] Code tuân thủ quy chuẩn code của dự án
- [ ] Nội dung đã được kiểm tra độ chính xác
- [ ] Nội dung tiếng Việt sử dụng dấu đúng
- [ ] Code Aiken biên dịch thành công (`aiken build`) và tests pass (`aiken check`)

#### Mẫu Pull Request

Khi mở PR, sử dụng mẫu sau:

```markdown
## Tóm tắt

Mô tả ngắn gọn về các thay đổi (1-2 câu).

## Các thay đổi

- Thay đổi 1
- Thay đổi 2
- Thay đổi 3

## Loại thay đổi

- [ ] Sửa lỗi
- [ ] Tính năng mới
- [ ] Cập nhật tài liệu
- [ ] Tái cấu trúc code

## Testing

Mô tả cách bạn đã test các thay đổi này:

- [ ] `npm run build` pass
- [ ] Đã test trên development server
- [ ] Aiken tests pass (nếu áp dụng)

## Ảnh chụp màn hình (nếu áp dụng)

Thêm ảnh chụp màn hình cho các thay đổi UI.

## Vấn đề liên quan

Đóng #issue_number (nếu áp dụng)
```

---

### Mẫu báo cáo vấn đề

#### Báo cáo lỗi

```markdown
**Mô tả lỗi**
Mô tả rõ ràng lỗi là gì.

**Cách tái tạo**
Các bước để tái tạo hành vi:
1. Đi đến '...'
2. Nhấn vào '...'
3. Thấy lỗi

**Hành vi mong đợi**
Những gì bạn mong đợi sẽ xảy ra.

**Ảnh chụp màn hình**
Nếu áp dụng, thêm ảnh chụp màn hình.

**Môi trường**
- OS: [vd: macOS 14, Windows 11]
- Trình duyệt: [vd: Chrome 120, Firefox 121]
- Phiên bản Node: [vd: 20.10.0]
```

#### Đề xuất tính năng

```markdown
**Đề xuất tính năng của bạn có liên quan đến một vấn đề không?**
Mô tả rõ ràng vấn đề. Ví dụ: "Tôi thấy khó chịu khi..."

**Mô tả giải pháp bạn muốn**
Những gì bạn muốn xảy ra.

**Mô tả các phương án thay thế bạn đã xem xét**
Các giải pháp khác bạn đã xem xét.
```

#### Cải tiến bài học

```markdown
**Bài học**
Bài học nào cần cải tiến (vd: Phần 1 - Bài 5: Biến và Hằng số)

**Loại cải tiến**
- [ ] Sửa lỗi chính tả hoặc ngữ pháp
- [ ] Làm rõ giải thích
- [ ] Thêm thông tin còn thiếu
- [ ] Cải tiến ví dụ code
- [ ] Cập nhật nội dung lỗi thời

**Nội dung hiện tại**
Trích dẫn hoặc mô tả nội dung hiện tại.

**Thay đổi đề xuất**
Cải tiến bạn đề xuất.
```

---

### Quy tắc ứng xử

Chúng tôi cam kết cung cấp một môi trường chào đón và hòa nhập.

#### Tiêu chuẩn của chúng tôi

**Nên làm:**
- Sử dụng ngôn ngữ chào đón và hòa nhập
- Tôn trọng các quan điểm khác nhau
- Chấp nhận phê bình mang tính xây dựng
- Tập trung vào những gì tốt nhất cho cộng đồng
- Thể hiện sự đồng cảm với các thành viên cộng đồng khác

**Không nên làm:**
- Sử dụng ngôn ngữ hoặc hình ảnh tình dục
- Troll, bình luận xúc phạm, hoặc tấn công cá nhân
- Quấy rối bất kỳ ai công khai hoặc riêng tư
- Công bố thông tin cá nhân của người khác mà không có sự cho phép

---

### Quy trình review

#### Thời gian

| Hành động | Thời gian phản hồi dự kiến |
|----------|---------------------------|
| Review ban đầu | Trong vòng 3-5 ngày làm việc |
| Review tiếp theo | Trong vòng 2-3 ngày làm việc |
| Merge (sau khi được phê duyệt) | Trong vòng 1-2 ngày làm việc |

#### Các giai đoạn review

1. **Kiểm tra tự động**: CI xác nhận build và contributor
2. **Review ban đầu**: Người bảo trì review các thay đổi
3. **Phản hồi**: Người review cung cấp nhận xét (nếu cần)
4. **Sửa đổi**: Người đóng góp xử lý phản hồi
5. **Phê duyệt**: Người review phê duyệt các thay đổi
6. **Merge**: Người bảo trì merge vào nhánh main

---

### Ghi nhận đóng góp

Chúng tôi trân trọng tất cả các đóng góp, dù lớn hay nhỏ.

#### Các loại ghi nhận

| Đóng góp | Ghi nhận |
|----------|----------|
| Sửa lỗi | Đề cập trong ghi chú phát hành |
| Bài học mới | Ghi nhận ở footer bài học |
| Tính năng lớn | Nổi bật trong README |
| Người đóng góp thường xuyên | Ghi nhận đặc biệt |

---

### Tài nguyên

- [Tài liệu Aiken chính thức](https://aiken-lang.org)
- [Tài liệu Docusaurus](https://docusaurus.io/docs)
- [Cộng đồng Discord](https://discord.gg/ub6atE94v4)

---

### Câu hỏi?

Nếu bạn có câu hỏi về việc đóng góp:

1. Kiểm tra [issues](https://github.com/CardanoAikenVN/aiken-vn/issues) hiện có
2. Tìm kiếm [discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)
3. Tham gia [Discord](https://discord.gg/ub6atE94v4) của chúng tôi
4. Mở một discussion mới

---

Cảm ơn bạn đã đóng góp cho Vietnamese Aiken! Cùng nhau, chúng ta đang xây dựng tương lai của giáo dục phát triển Cardano tại Việt Nam.

---
---

## English

Welcome to the Vietnamese Aiken project! We are building the first open-source curriculum for mastering Aiken smart contract development on Cardano, tailored for Vietnamese developers.

Thank you for your interest in contributing. This guide will help you get started.

---

### Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Templates](#issue-templates)
- [Code of Conduct](#code-of-conduct)
- [Review Process](#review-process)
- [Recognition](#recognition)

---

### Ways to Contribute

#### Documentation

- **New Lessons**: Write new educational content for existing or planned curriculum parts
- **Improvements**: Fix typos, clarify explanations, add examples
- **Translations**: Help translate technical terms or improve Vietnamese content quality
- **Code Examples**: Add or improve working Aiken code examples

#### Code

- **Bug Fixes**: Fix issues in the Docusaurus site or Aiken examples
- **Features**: Improve site functionality, accessibility, or user experience
- **Testing**: Add test cases for Aiken smart contracts
- **Performance**: Optimize build times or runtime performance

#### Community

- **Bug Reports**: Report issues you encounter
- **Feature Requests**: Suggest improvements to the curriculum or site
- **Discussion**: Share ideas in GitHub Discussions or Discord

---

### Getting Started

#### Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | v20+ | Docusaurus development |
| npm | v10+ | Package management |
| Aiken | Latest | Smart contract examples |
| Git | Latest | Version control |

#### Setup Steps

1. **Fork the repository**

   Click the "Fork" button at [github.com/CardanoAikenVN/aiken-vn](https://github.com/CardanoAikenVN/aiken-vn)

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/aiken-vn.git
   cd aiken-vn
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development server**

   ```bash
   npm start
   ```

   The site opens at `http://localhost:3000`

5. **Verify Aiken examples (optional)**

   ```bash
   cd examples
   aiken check
   ```

---

### Development Workflow

#### Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm start` |
| Build for production | `npm run build` |
| Serve production build | `npm run serve` |
| Clear cache | `npm run clear` |
| Run Aiken tests | `cd examples && aiken check` |
| Format Aiken code | `cd examples && aiken fmt` |

#### Making Changes

1. Create a feature branch from `main`
2. Make your changes
3. Test locally with `npm run build`
4. Commit with descriptive messages
5. Push to your fork
6. Open a pull request

---

### Branch Naming Conventions

| Branch Type | Pattern | Example | Description |
|-------------|---------|---------|-------------|
| Content | `part-N` | `part-1`, `part-2` | Curriculum part updates |
| Feature | `feature/description` | `feature/dark-mode` | New functionality |
| Fix | `fix/description` | `fix/broken-links` | Bug fixes |
| Docs | `docs/description` | `docs/readme-update` | Documentation updates |

---

### Commit Message Guidelines

#### Format

```
<type>: <subject>

[optional body]

[optional footer]
```

#### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature or content | `feat: add Lesson 5 on custom types` |
| `fix` | Bug fix | `fix: correct broken links in Part 1` |
| `docs` | Documentation changes | `docs: update README installation steps` |
| `style` | Formatting, no code change | `style: format code blocks in Lesson 3` |
| `refactor` | Code restructuring | `refactor: reorganize component folder` |
| `test` | Adding tests | `test: add escrow validator tests` |
| `chore` | Maintenance tasks | `chore: update dependencies` |

---

### Pull Request Process

#### Before Submitting

Complete this checklist:

- [ ] Branch is up to date with `main`
- [ ] Build passes locally (`npm run build`)
- [ ] No broken links in documentation
- [ ] Code follows project code standards
- [ ] Content reviewed for accuracy
- [ ] Vietnamese content uses proper diacritics
- [ ] Aiken code compiles (`aiken build`) and tests pass (`aiken check`)

#### Pull Request Template

```markdown
## Summary

Brief description of changes (1-2 sentences).

## Changes

- Change 1
- Change 2
- Change 3

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing

- [ ] `npm run build` passes
- [ ] Tested on development server
- [ ] Aiken tests pass (if applicable)
```

---

### Issue Templates

#### Bug Report

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Environment**
- OS: [e.g., macOS 14, Windows 11]
- Browser: [e.g., Chrome 120, Firefox 121]
- Node version: [e.g., 20.10.0]
```

#### Feature Request

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.
```

---

### Code of Conduct

We are committed to providing a welcoming and inclusive environment.

#### Our Standards

**Do:**
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

**Do Not:**
- Use sexualized language or imagery
- Engage in trolling, insulting comments, or personal attacks
- Harass anyone publicly or privately
- Publish others' private information without permission

---

### Review Process

#### Timeline

| Action | Expected Response Time |
|--------|------------------------|
| Initial review | Within 3-5 business days |
| Follow-up reviews | Within 2-3 business days |
| Merge (after approval) | Within 1-2 business days |

#### Review Stages

1. **Automated Checks**: CI validates build and contributor
2. **Initial Review**: Maintainer reviews changes
3. **Feedback**: Reviewer provides comments (if needed)
4. **Revision**: Contributor addresses feedback
5. **Approval**: Reviewer approves changes
6. **Merge**: Maintainer merges to main branch

---

### Recognition

We value all contributions, big and small.

| Contribution | Recognition |
|--------------|-------------|
| Bug fix | Mentioned in release notes |
| New lesson | Credited in lesson footer |
| Major feature | Highlighted in README |
| Consistent contributor | Special acknowledgment |

---

### Resources

- [Aiken Official Docs](https://aiken-lang.org)
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Discord Community](https://discord.gg/ub6atE94v4)

---

### Questions?

If you have questions about contributing:

1. Check existing [issues](https://github.com/CardanoAikenVN/aiken-vn/issues)
2. Search [discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)
3. Join our [Discord](https://discord.gg/ub6atE94v4)
4. Open a new discussion

---

Thank you for contributing to Vietnamese Aiken! Together, we are building the future of Cardano development education in Vietnam.
