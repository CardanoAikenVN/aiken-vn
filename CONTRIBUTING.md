# Huong Dan Dong Gop / Contributing Guidelines

> [Tieng Viet](#tieng-viet) | [English](#english)

---

## Tieng Viet

Chao mung ban den voi du an Vietnamese Aiken! Chung toi dang xay dung giao trinh ma nguon mo dau tien de lam chu viec phat trien smart contract Aiken tren Cardano, danh rieng cho cong dong lap trinh vien Viet Nam.

Cam on ban da quan tam den viec dong gop. Tai lieu nay se huong dan ban bat dau.

---

### Muc luc

- [Cac cach dong gop](#cac-cach-dong-gop)
- [Huong dan bat dau](#huong-dan-bat-dau)
- [Quy trinh phat trien](#quy-trinh-phat-trien)
- [Quy uoc dat ten branch](#quy-uoc-dat-ten-branch)
- [Quy uoc commit message](#quy-uoc-commit-message)
- [Quy trinh Pull Request](#quy-trinh-pull-request)
- [Mau bao cao van de](#mau-bao-cao-van-de)
- [Quy tac ung xu](#quy-tac-ung-xu)
- [Quy trinh review](#quy-trinh-review)
- [Ghi nhan dong gop](#ghi-nhan-dong-gop)

---

### Cac cach dong gop

#### Tai lieu

- **Bai hoc moi**: Viet noi dung giao duc moi cho cac phan giao trinh hien co hoac da len ke hoach
- **Cai tien**: Sua loi chinh ta, lam ro giai thich, them vi du
- **Dich thuat**: Ho tro dich thuat cac thuat ngu ky thuat hoac cai thien chat luong noi dung tieng Viet
- **Vi du code**: Them hoac cai tien cac vi du code Aiken hoat dong duoc

#### Code

- **Sua loi**: Sua cac van de trong trang Docusaurus hoac vi du Aiken
- **Tinh nang moi**: Cai thien chuc nang, kha nang tiep can, hoac trai nghiem nguoi dung
- **Testing**: Them test case cho cac smart contract Aiken
- **Hieu suat**: Toi uu hoa thoi gian build hoac hieu suat runtime

#### Cong dong

- **Bao cao loi**: Bao cao cac van de ban gap phai
- **De xuat tinh nang**: De xuat cai tien cho giao trinh hoac trang web
- **Thao luan**: Chia se y tuong trong GitHub Discussions hoac Discord

---

### Huong dan bat dau

#### Yeu cau he thong

| Yeu cau | Phien ban | Muc dich |
|---------|-----------|----------|
| Node.js | v20+ | Phat trien Docusaurus |
| npm | v10+ | Quan ly package |
| Aiken | Moi nhat | Vi du smart contract |
| Git | Moi nhat | Quan ly phien ban |

#### Cac buoc cai dat

1. **Fork repository**

   Nhan nut "Fork" tai [github.com/CardanoAikenVN/aiken-vn](https://github.com/CardanoAikenVN/aiken-vn)

2. **Clone fork cua ban**

   ```bash
   git clone https://github.com/YOUR_USERNAME/aiken-vn.git
   cd aiken-vn
   ```

3. **Cai dat dependencies**

   ```bash
   npm install
   ```

4. **Khoi dong development server**

   ```bash
   npm start
   ```

   Trang web se mo tai `http://localhost:3000`

5. **Kiem tra vi du Aiken (tuy chon)**

   ```bash
   cd examples
   aiken check
   ```

---

### Quy trinh phat trien

#### Tham khao nhanh

| Tac vu | Lenh |
|--------|------|
| Khoi dong dev server | `npm start` |
| Build cho production | `npm run build` |
| Chay production build | `npm run serve` |
| Xoa cache | `npm run clear` |
| Chay Aiken tests | `cd examples && aiken check` |
| Format code Aiken | `cd examples && aiken fmt` |

#### Thuc hien thay doi

1. Tao feature branch tu `main`
2. Thuc hien cac thay doi cua ban
3. Test o local voi `npm run build`
4. Commit voi message mo ta ro rang
5. Push len fork cua ban
6. Mo pull request

---

### Quy uoc dat ten branch

| Loai Branch | Mau | Vi du | Mo ta |
|-------------|-----|-------|-------|
| Noi dung | `part-N` | `part-1`, `part-2` | Cap nhat phan giao trinh |
| Tinh nang | `feature/mo-ta` | `feature/dark-mode` | Chuc nang moi |
| Sua loi | `fix/mo-ta` | `fix/broken-links` | Sua loi |
| Tai lieu | `docs/mo-ta` | `docs/readme-update` | Cap nhat tai lieu |

#### Vi du

```bash
# Lam viec tren Phan 1
git checkout -b part-1

# Them tinh nang moi
git checkout -b feature/search-functionality

# Sua loi
git checkout -b fix/mobile-navigation
```

---

### Quy uoc commit message

#### Dinh dang

```
<type>: <subject>

[body tuy chon]

[footer tuy chon]
```

#### Cac loai type

| Type | Mo ta | Vi du |
|------|-------|-------|
| `feat` | Tinh nang hoac noi dung moi | `feat: them Bai 5 ve custom types` |
| `fix` | Sua loi | `fix: sua lien ket hong trong Phan 1` |
| `docs` | Thay doi tai lieu | `docs: cap nhat buoc cai dat trong README` |
| `style` | Dinh dang, khong thay doi code | `style: format code blocks trong Bai 3` |
| `refactor` | Tai cau truc code | `refactor: to chuc lai thu muc component` |
| `test` | Them tests | `test: them tests cho escrow validator` |
| `chore` | Tac vu bao tri | `chore: cap nhat dependencies` |

#### Vi du

```bash
# Commit message tot
git commit -m "feat: them dau tieng Viet cho tat ca bai hoc Phan 1"
git commit -m "fix: xu ly loi hydration o trang chu"
git commit -m "docs: them phan xu ly su co vao Bai 1"

# Commit message kem (tranh dung)
git commit -m "update"
git commit -m "fix stuff"
git commit -m "WIP"
```

---

### Quy trinh Pull Request

#### Truoc khi gui

Hoan thanh checklist nay:

- [ ] Branch da cap nhat voi `main`
- [ ] Build thanh cong o local (`npm run build`)
- [ ] Khong co lien ket hong trong tai lieu
- [ ] Code tuan thu [quy chuan code](./docs-project/code-standards.md) cua du an
- [ ] Noi dung da duoc kiem tra do chinh xac
- [ ] Noi dung tieng Viet su dung dau dung
- [ ] Code Aiken bien dich thanh cong (`aiken build`) va tests pass (`aiken check`)

#### Mau Pull Request

Khi mo PR, su dung mau sau:

```markdown
## Tom tat

Mo ta ngan gon ve cac thay doi (1-2 cau).

## Cac thay doi

- Thay doi 1
- Thay doi 2
- Thay doi 3

## Loai thay doi

- [ ] Sua loi
- [ ] Tinh nang moi
- [ ] Cap nhat tai lieu
- [ ] Tai cau truc code

## Testing

Mo ta cach ban da test cac thay doi nay:

- [ ] `npm run build` pass
- [ ] Da test tren development server
- [ ] Aiken tests pass (neu ap dung)

## Anh chup man hinh (neu ap dung)

Them anh chup man hinh cho cac thay doi UI.

## Van de lien quan

Dong #issue_number (neu ap dung)
```

#### Checklist review

Nguoi review se xac nhan:

- [ ] Code tuan thu cac pattern da thiet lap
- [ ] Tai lieu ro rang va chinh xac
- [ ] Khong co thong tin nhay cam
- [ ] Build thanh cong
- [ ] Cac thay doi khop voi mo ta PR

---

### Mau bao cao van de

#### Bao cao loi

```markdown
**Mo ta loi**
Mo ta ro rang loi la gi.

**Cach tai tao**
Cac buoc de tai tao hanh vi:
1. Di den '...'
2. Nhan vao '...'
3. Thay loi

**Hanh vi mong doi**
Nhung gi ban mong doi se xay ra.

**Anh chup man hinh**
Neu ap dung, them anh chup man hinh.

**Moi truong**
- OS: [vd: macOS 14, Windows 11]
- Trinh duyet: [vd: Chrome 120, Firefox 121]
- Phien ban Node: [vd: 20.10.0]

**Thong tin bo sung**
Bat ky nguu canh nao khac ve van de.
```

#### De xuat tinh nang

```markdown
**De xuat tinh nang cua ban co lien quan den mot van de khong?**
Mo ta ro rang van de. Vi du: "Toi thay kho chiu khi..."

**Mo ta giai phap ban muon**
Nhung gi ban muon xay ra.

**Mo ta cac phuong an thay the ban da xem xet**
Cac giai phap khac ban da xem xet.

**Thong tin bo sung**
Bat ky nguu canh, mockup, hoac vi du nao khac.
```

#### Cai tien bai hoc

```markdown
**Bai hoc**
Bai hoc nao can cai tien (vd: Phan 1 - Bai 5: Bien va Hang so)

**Loai cai tien**
- [ ] Sua loi chinh ta hoac ngu phap
- [ ] Lam ro giai thich
- [ ] Them thong tin con thieu
- [ ] Cai tien vi du code
- [ ] Cap nhat noi dung loi thoi

**Noi dung hien tai**
Trich dan hoac mo ta noi dung hien tai.

**Thay doi de xuat**
Cai tien ban de xuat.

**Tai sao dieu nay quan trong**
Dieu nay cai thien trai nghiem hoc tap nhu the nao.
```

---

### Quy tac ung xu

Chung toi cam ket cung cap mot moi truong chao don va hoa nhap.

#### Tieu chuan cua chung toi

**Nen lam:**
- Su dung ngon ngu chao don va hoa nhap
- Ton trong cac quan diem khac nhau
- Chap nhan phe binh mang tinh xay dung
- Tap trung vao nhung gi tot nhat cho cong dong
- The hien su dong cam voi cac thanh vien cong dong khac

**Khong nen lam:**
- Su dung ngon ngu hoac hinh anh tinh duc
- Troll, binh luan xuc pham, hoac tan cong ca nhan
- Quay roi bat ky ai cong khai hoac rieng tu
- Cong bo thong tin ca nhan cua nguoi khac ma khong co su cho phep
- Tham gia vao cac hanh vi khac co the bi coi la khong phu hop

#### Thuc thi

Cac truong hop hanh vi khong the chap nhan duoc co the bao cao cho nguoi bao tri du an. Tat ca khieu nai se duoc xem xet va dieu tra, dua ra phan hoi duoc coi la can thiet va phu hop.

---

### Quy trinh review

#### Thoi gian

| Hanh dong | Thoi gian phan hoi du kien |
|----------|---------------------------|
| Review ban dau | Trong vong 3-5 ngay lam viec |
| Review tiep theo | Trong vong 2-3 ngay lam viec |
| Merge (sau khi duoc phe duyet) | Trong vong 1-2 ngay lam viec |

#### Cac giai doan review

1. **Kiem tra tu dong**: CI xac nhan build va contributor
2. **Review ban dau**: Nguoi bao tri review cac thay doi
3. **Phan hoi**: Nguoi review cung cap nhan xet (neu can)
4. **Sua doi**: Nguoi dong gop xu ly phan hoi
5. **Phe duyet**: Nguoi review phe duyet cac thay doi
6. **Merge**: Nguoi bao tri merge vao nhanh main

#### Nhan tro giup

Neu PR cua ban cho review lau hon du kien:

- Kiem tra xem cac kiem tra CI co pass khong
- Dam bao tat ca nhan xet review da duoc xu ly
- De lai binh luan lich su hoi ve tinh trang

---

### Ghi nhan dong gop

Chung toi tran trong tat ca cac dong gop, du lon hay nho.

#### Nguoi dong gop

Tat ca nguoi dong gop duoc ghi nhan trong:

- Do thi nguoi dong gop cua GitHub
- Ghi chu phat hanh (cho cac dong gop dang ke)
- Phan cam on dac biet (cho cac dong gop lon)

#### Cac loai ghi nhan

| Dong gop | Ghi nhan |
|----------|----------|
| Sua loi | De cap trong ghi chu phat hanh |
| Bai hoc moi | Ghi nhan o footer bai hoc |
| Tinh nang lon | Noi bat trong README |
| Nguoi dong gop thuong xuyen | Ghi nhan dac biet |

---

### Tai nguyen

- [Tai lieu du an](./docs-project/)
- [Quy chuan code](./docs-project/code-standards.md)
- [Tai lieu Aiken chinh thuc](https://aiken-lang.org)
- [Tai lieu Docusaurus](https://docusaurus.io/docs)
- [Cong dong Discord](https://discord.gg/ub6atE94v4)

---

### Cau hoi?

Neu ban co cau hoi ve viec dong gop:

1. Kiem tra [issues](https://github.com/CardanoAikenVN/aiken-vn/issues) hien co
2. Tim kiem [discussions](https://github.com/CardanoAikenVN/aiken-vn/discussions)
3. Tham gia [Discord](https://discord.gg/ub6atE94v4) cua chung toi
4. Mo mot discussion moi

---

Cam on ban da dong gop cho Vietnamese Aiken! Cung nhau, chung ta dang xay dung tuong lai cua giao duc phat trien Cardano tai Viet Nam.

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

#### Examples

```bash
# Working on Part 1 lessons
git checkout -b part-1

# Adding a new feature
git checkout -b feature/search-functionality

# Fixing a bug
git checkout -b fix/mobile-navigation
```

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

#### Examples

```bash
# Good commit messages
git commit -m "feat: add Vietnamese diacritics to all Part 1 lessons"
git commit -m "fix: resolve hydration error on homepage"
git commit -m "docs: add troubleshooting section to Lesson 1"

# Bad commit messages (avoid these)
git commit -m "update"
git commit -m "fix stuff"
git commit -m "WIP"
```

---

### Pull Request Process

#### Before Submitting

Complete this checklist:

- [ ] Branch is up to date with `main`
- [ ] Build passes locally (`npm run build`)
- [ ] No broken links in documentation
- [ ] Code follows project [code standards](./docs-project/code-standards.md)
- [ ] Content reviewed for accuracy
- [ ] Vietnamese content uses proper diacritics
- [ ] Aiken code compiles (`aiken build`) and tests pass (`aiken check`)

#### Pull Request Template

When opening a PR, use this template:

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

Describe how you tested these changes:

- [ ] `npm run build` passes
- [ ] Tested on development server
- [ ] Aiken tests pass (if applicable)

## Screenshots (if applicable)

Add screenshots for UI changes.

## Related Issues

Closes #issue_number (if applicable)
```

#### Review Checklist

Reviewers will verify:

- [ ] Code follows established patterns
- [ ] Documentation is clear and accurate
- [ ] No sensitive information included
- [ ] Build succeeds
- [ ] Changes match PR description

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

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14, Windows 11]
- Browser: [e.g., Chrome 120, Firefox 121]
- Node version: [e.g., 20.10.0]

**Additional context**
Any other context about the problem.
```

#### Feature Request

```markdown
**Is your feature request related to a problem?**
A clear description of the problem. Example: "I'm frustrated when..."

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Any other context, mockups, or examples.
```

#### Lesson Improvement

```markdown
**Lesson**
Which lesson needs improvement (e.g., Part 1 - Lesson 5: Variables and Constants)

**Type of Improvement**
- [ ] Fix typo or grammatical error
- [ ] Clarify explanation
- [ ] Add missing information
- [ ] Improve code example
- [ ] Update outdated content

**Current Content**
Quote or describe the current content.

**Suggested Change**
Your proposed improvement.

**Why This Matters**
How this improves the learning experience.
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
- Show empathy towards other community members

**Do Not:**
- Use sexualized language or imagery
- Engage in trolling, insulting comments, or personal attacks
- Harass anyone publicly or privately
- Publish others' private information without permission
- Engage in other conduct that could be considered inappropriate

#### Enforcement

Instances of unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated, resulting in a response deemed necessary and appropriate.

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

#### Getting Help

If your PR has been waiting for review longer than expected:

- Check if CI checks are passing
- Ensure all review comments have been addressed
- Leave a polite comment asking for status update

---

### Recognition

We value all contributions, big and small.

#### Contributors

All contributors are recognized in:

- GitHub's contributors graph
- Release notes (for significant contributions)
- Special thanks section (for major contributions)

#### Types of Recognition

| Contribution | Recognition |
|--------------|-------------|
| Bug fix | Mentioned in release notes |
| New lesson | Credited in lesson footer |
| Major feature | Highlighted in README |
| Consistent contributor | Special acknowledgment |

---

### Resources

- [Project Documentation](./docs-project/)
- [Code Standards](./docs-project/code-standards.md)
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
