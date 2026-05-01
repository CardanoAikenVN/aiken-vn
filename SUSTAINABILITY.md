# Sustainability Plan

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

This document describes how the **Vietnamese Aiken** (`aiken-vn`) curriculum will continue to grow, stay up-to-date, and remain a free, open-source learning resource for the Vietnamese Cardano developer community after the close of Project Catalyst Fund 14.

The project is released under [CC BY-4.0](./LICENSE) and will remain free forever. This plan describes the people, processes, and funding sources that keep it alive.

---

### 1. Mission & Long-Term Commitment

The Vietnamese Aiken project exists to **lower the language barrier** for Vietnamese developers entering the Cardano smart contract ecosystem. Our long-term commitment is:

- Keep the curriculum aligned with the latest stable Aiken release (currently tracking Aiken `v1.x`).
- Add at least **2 new lessons or updates per quarter** for the next 12 months.
- Respond to community-submitted GitHub issues within **7 days**.
- Keep the live site (https://aiken-vn.vercel.app/) available with a 99% monthly uptime target.

---

### 2. Maintainer Structure & Governance

The full maintainer roster, roles, and contact information is documented in [MAINTAINERS.md](./MAINTAINERS.md).

**Governance model:**

| Role | Responsibility |
| --- | --- |
| **Lead Maintainer** | Final decision on roadmap, merges, releases. Reviews all PRs touching curriculum content. |
| **Content Maintainers** | Review lesson PRs, validate Aiken code examples, maintain Vietnamese translation quality. |
| **Community Maintainers** | Triage GitHub issues, moderate the Facebook community group, run workshops. |
| **Contributors** | Anyone who opens a PR or issue. Contributors who land 3+ merged PRs may be invited to become a Content Maintainer. |

**Decision making:** Routine PRs (typo fixes, small clarifications) merge with **1 maintainer approval**. Curriculum changes (new lessons, restructured chapters, dependency upgrades) require **2 maintainer approvals** plus a 72-hour public review window via GitHub.

**Succession:** If the Lead Maintainer becomes inactive for 90+ days, Content Maintainers nominate and vote on a successor. This keeps the project resilient to any single contributor leaving.

---

### 3. Funding & Donations

As a **Cardano-native project**, we accept donations directly in ADA on-chain. This keeps funding fully aligned with the ecosystem we serve, transparent to anyone with a blockchain explorer, and free of intermediary fees.

#### 3.1 Cardano (ADA) Donation Address

Send ADA directly to the project treasury:

```
addr1qyauleyl4r03gtsfll8rjpu0vfjxs0vzyag0e9az2dfwlaf89ynvu7aferpvuylhg5mfdzydppq3xejx4sdk55cst56qx4925y
```

**Transparency:** Every incoming and outgoing transaction is publicly verifiable on-chain. Anyone can audit the treasury at any time using a Cardano explorer such as [CExplorer](https://cexplorer.io/) or [Cardanoscan](https://cardanoscan.io/) by pasting the address above.

**Treasury controls:** The donation address is a multi-sig-style wallet controlled by the maintainer team. Outflows for project expenses are documented in a public ledger linked from this section once the first donation is received.

**Fund usage priority:**
1. Hosting & domain costs (currently $0 on Vercel free tier, but reserved for future scale).
2. Translator and editor honoraria for new lessons.
3. Workshop and meetup costs (online infrastructure, in-person venue when applicable).
4. Bounties for high-impact community contributions (e.g., new advanced lessons, security audits of example contracts).

#### 3.2 Future Project Catalyst Rounds

We intend to apply for follow-on funding under Project Catalyst (Fund 15+) for major curriculum expansions, such as:

- Advanced topics: Plutus interop, off-chain integration with Mesh/Lucid, formal verification.
- Translated video courses with professional voiceover.
- Annual in-person Aiken workshop in Vietnam.

Funded proposals will be linked here as they are accepted.

---

### 4. How Community Contributors Can Add New Lessons & Updates

The contribution workflow is fully documented in [CONTRIBUTING.md](./CONTRIBUTING.md) and [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md). The summary:

1. **Pick or propose a topic.** Open a GitHub issue using the `lesson_proposal` template, or claim an item from the roadmap (Section 5).
2. **Fork & branch.** Use the branch naming convention `lesson/<topic-slug>` or `fix/<short-description>`.
3. **Write the lesson** following the structure in `docs-dev/code-standards.md`:
   - Vietnamese-first, with code comments also in Vietnamese where helpful.
   - Each lesson must include: learning objectives, prerequisites, walk-through, runnable code in `examples/`, and at least 2 unit tests.
4. **Open a Pull Request.** The CI pipeline will:
   - Run `aiken check` on all example contracts (must pass 100%).
   - Build the Docusaurus site (must succeed).
   - Run a markdown linter.
5. **Review.** A Content Maintainer reviews within 7 days. Curriculum-level changes go through a 72-hour public review window.
6. **Merge & publish.** Merged content auto-deploys to https://aiken-vn.vercel.app/ via Vercel.

**Recognition:** Every contributor is added to the auto-generated contributors list in the repo. Contributors who land **3+ merged PRs** are invited to join MAINTAINERS.md as Content Maintainers.

---

### 5. Content Roadmap

The next 12 months of planned content (subject to community proposals):

**Q2 2026 — Tooling & Off-chain**
- Lesson: Integrating Aiken with Lucid Evolution (off-chain transactions in TypeScript).
- Lesson: Using Mesh SDK to build a frontend for an Aiken validator.
- Update: Migrate all existing examples to the latest stable Aiken version.

**Q3 2026 — Advanced Patterns**
- Lesson: Multi-validator dApps and cross-script interactions.
- Lesson: Advanced datum patterns (state machines on Cardano).
- Lesson: Optimization tricks (mem/cpu units, common pitfalls).

**Q4 2026 — Security & Auditing**
- Lesson: Common Aiken/Plutus vulnerabilities (double satisfaction, unbounded recursion).
- Lesson: Property-based testing with `aiken/fuzz`.
- Lesson: Preparing a contract for an external audit.

**Q1 2027 — Capstone**
- A full end-to-end dApp tutorial integrating: Aiken validator + Lucid off-chain + a Vietnamese-language frontend.

This roadmap lives in [`docs/project-roadmap.md`](./docs/project-roadmap.md) and is updated quarterly based on community feedback from the Facebook group and GitHub issues.

---

### 6. Quality Assurance

To prevent rot as the curriculum grows:

- **CI on every PR**: `aiken check` on all `examples/`, Docusaurus build, link checker.
- **Quarterly audit**: Lead Maintainer runs a full pass over all lessons against the latest Aiken release.
- **Community review**: An "outdated content" issue label lets learners flag lessons that no longer compile or that reference removed APIs.
- **Versioning**: Each lesson includes the Aiken version it was last verified against, so readers know what to expect.

---

### 7. Community Engagement

- **Facebook group** (primary discussion venue, replacing the originally planned Discord channel because Vietnamese learners are more active on Facebook): https://www.facebook.com/groups/1449466993319085
- **GitHub Issues** with templates: `lesson_feedback`, `bug_report`, `lesson_proposal`. See [issue templates](./.github/ISSUE_TEMPLATE/).
- **Workshops**: At least one online workshop per year, with the recording uploaded publicly.
- **Telegram (Cardano Vietnam)**: https://t.me/CardanoVietnamOfficial — for broader Cardano Vietnam community discussion.

---

### 8. What Happens If Funding Ends

The project is designed to survive even if 100% of external funding stops:

1. The site runs on free hosting tiers (Vercel + GitHub Pages as a fallback).
2. The license (CC BY-4.0) means anyone can fork and continue the work.
3. The maintainer team is distributed across multiple individuals (see MAINTAINERS.md), so no single point of failure.
4. All content is stored in plain Markdown in this Git repository — there is no proprietary platform to lose.

This is a **community asset first, funded project second**. Funding accelerates growth; it does not gate survival.

---

## Tiếng Việt

Tài liệu này mô tả cách dự án **Vietnamese Aiken** (`aiken-vn`) sẽ tiếp tục phát triển, được cập nhật, và duy trì như một tài nguyên học tập mã nguồn mở miễn phí cho cộng đồng developer Cardano Việt Nam, sau khi Project Catalyst Fund 14 kết thúc.

Dự án được phát hành theo giấy phép [CC BY-4.0](./LICENSE) và sẽ luôn miễn phí. Tài liệu này mô tả con người, quy trình, và nguồn tài chính giữ cho dự án sống.

---

### 1. Sứ mệnh & Cam kết dài hạn

Vietnamese Aiken tồn tại để **giảm rào cản ngôn ngữ** cho lập trình viên Việt Nam khi tiếp cận hệ sinh thái smart contract Cardano. Cam kết dài hạn:

- Giữ chương trình học cập nhật theo bản Aiken stable mới nhất (hiện tại là Aiken `v1.x`).
- Thêm ít nhất **2 bài học hoặc cập nhật mỗi quý** trong 12 tháng tới.
- Phản hồi GitHub issues từ cộng đồng trong vòng **7 ngày**.
- Duy trì trang web https://aiken-vn.vercel.app/ với mục tiêu uptime 99%/tháng.

---

### 2. Cấu trúc Maintainer & Quản trị

Danh sách đầy đủ maintainer, vai trò, và thông tin liên hệ có trong [MAINTAINERS.md](./MAINTAINERS.md).

**Mô hình quản trị:**

| Vai trò | Trách nhiệm |
| --- | --- |
| **Lead Maintainer** | Quyết định cuối cùng về roadmap, merge, release. Review mọi PR liên quan tới nội dung. |
| **Content Maintainer** | Review PR bài học, validate code Aiken, đảm bảo chất lượng dịch tiếng Việt. |
| **Community Maintainer** | Phân loại GitHub issues, điều phối Facebook group, tổ chức workshop. |
| **Contributor** | Bất kỳ ai mở PR hoặc issue. Sau 3+ PR được merge có thể được mời làm Content Maintainer. |

**Cách ra quyết định:** PR thường (sửa lỗi chính tả, làm rõ nhỏ) cần **1 maintainer approve**. Thay đổi nội dung lớn (bài học mới, restructure chương, nâng cấp dependency) cần **2 maintainer approve** + cửa sổ public review 72 giờ trên GitHub.

**Kế nhiệm:** Nếu Lead Maintainer không hoạt động 90 ngày, Content Maintainers sẽ nominate và vote người kế nhiệm. Cơ chế này giúp dự án không phụ thuộc vào một cá nhân.

---

### 3. Tài chính & Quyên góp

Là một **dự án Cardano-native**, chúng tôi nhận donation trực tiếp bằng ADA on-chain. Cách này giữ funding align hoàn toàn với hệ sinh thái mà dự án phục vụ, minh bạch với bất kỳ ai dùng blockchain explorer, và không qua bên trung gian nào.

#### 3.1 Địa chỉ ví ADA nhận donation

Gửi ADA trực tiếp tới ví treasury của dự án:

```
addr1qyauleyl4r03gtsfll8rjpu0vfjxs0vzyag0e9az2dfwlaf89ynvu7aferpvuylhg5mfdzydppq3xejx4sdk55cst56qx4925y
```

**Minh bạch:** Mọi giao dịch vào và ra đều public on-chain. Bất kỳ ai cũng có thể audit treasury bất cứ lúc nào bằng Cardano explorer như [CExplorer](https://cexplorer.io/) hoặc [Cardanoscan](https://cardanoscan.io/) — chỉ cần paste địa chỉ ở trên.

**Quản lý treasury:** Địa chỉ donation được quản lý bởi đội maintainer (theo mô hình multi-sig). Mọi khoản chi cho dự án được public document trong một ledger link từ section này, ngay khi nhận donation đầu tiên.

**Thứ tự ưu tiên sử dụng quỹ:**
1. Chi phí hosting & domain (hiện tại $0 trên Vercel free tier, dự phòng cho khi scale).
2. Thù lao cho người dịch và biên tập bài học mới.
3. Chi phí workshop và meetup (hạ tầng online, địa điểm offline khi cần).
4. Bounty cho các đóng góp có impact cao (bài học nâng cao mới, audit bảo mật cho các example contract).

#### 3.2 Project Catalyst các vòng tới

Dự án sẽ apply tiếp ở Project Catalyst (Fund 15+) cho các phần mở rộng lớn như:

- Chủ đề nâng cao: Plutus interop, off-chain với Mesh/Lucid, formal verification.
- Khoá video có giọng đọc chuyên nghiệp.
- Workshop offline thường niên tại Việt Nam.

Các proposal được fund sẽ được link ở đây khi được duyệt.

---

### 4. Cách community contribute bài học & cập nhật

Quy trình đầy đủ trong [CONTRIBUTING.md](./CONTRIBUTING.md) và [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md). Tóm tắt:

1. **Chọn hoặc đề xuất chủ đề.** Mở GitHub issue dùng template `lesson_proposal`, hoặc claim một mục từ roadmap (Mục 5).
2. **Fork & branch.** Quy ước branch: `lesson/<topic-slug>` hoặc `fix/<short-description>`.
3. **Viết bài** theo cấu trúc trong `docs-dev/code-standards.md`:
   - Tiếng Việt là chính, comment code bằng tiếng Việt khi cần.
   - Mỗi bài phải có: mục tiêu học, kiến thức nền cần có, hướng dẫn, code chạy được trong `examples/`, và ít nhất 2 unit test.
4. **Mở Pull Request.** CI pipeline sẽ:
   - Chạy `aiken check` trên mọi contract example (phải pass 100%).
   - Build Docusaurus site (phải success).
   - Chạy markdown linter.
5. **Review.** Content Maintainer review trong 7 ngày. Thay đổi cấp curriculum có cửa sổ public review 72 giờ.
6. **Merge & publish.** Sau merge, Vercel tự động deploy lên https://aiken-vn.vercel.app/.

**Ghi nhận:** Mọi contributor được thêm vào danh sách auto-generate của repo. Contributor có **3+ PR merged** sẽ được mời vào MAINTAINERS.md với vai trò Content Maintainer.

---

### 5. Roadmap nội dung

12 tháng tiếp theo (có thể điều chỉnh theo đề xuất từ cộng đồng):

**Q2 2026 — Tooling & Off-chain**
- Bài: Tích hợp Aiken với Lucid Evolution (off-chain bằng TypeScript).
- Bài: Dùng Mesh SDK xây frontend cho validator Aiken.
- Cập nhật: Migrate toàn bộ example sang Aiken stable mới nhất.

**Q3 2026 — Pattern nâng cao**
- Bài: dApp đa-validator và tương tác giữa các script.
- Bài: Datum pattern nâng cao (state machine trên Cardano).
- Bài: Tối ưu hoá (mem/cpu units, các bẫy thường gặp).

**Q4 2026 — Bảo mật & Audit**
- Bài: Lỗi Aiken/Plutus phổ biến (double satisfaction, unbounded recursion).
- Bài: Property-based testing với `aiken/fuzz`.
- Bài: Chuẩn bị contract cho audit ngoài.

**Q1 2027 — Capstone**
- Tutorial dApp end-to-end: Aiken validator + Lucid off-chain + frontend tiếng Việt.

Roadmap chính thức ở [`docs/project-roadmap.md`](./docs/project-roadmap.md), cập nhật mỗi quý dựa trên feedback từ Facebook group và GitHub issues.

---

### 6. Đảm bảo chất lượng

Để chống "rot" khi nội dung tăng:

- **CI mỗi PR**: `aiken check` trên `examples/`, build Docusaurus, link checker.
- **Audit hàng quý**: Lead Maintainer rà toàn bộ bài học theo bản Aiken mới nhất.
- **Community review**: Label issue `outdated-content` cho phép learner báo bài đã lỗi thời.
- **Versioning**: Mỗi bài ghi rõ phiên bản Aiken đã verify, để người đọc biết môi trường tham chiếu.

---

### 7. Community Engagement

- **Facebook group** (kênh chính, thay cho Discord ban đầu vì học viên Việt active trên Facebook hơn): https://www.facebook.com/groups/1449466993319085
- **GitHub Issues** với template: `lesson_feedback`, `bug_report`, `lesson_proposal`. Xem [issue templates](./.github/ISSUE_TEMPLATE/).
- **Workshop**: Tối thiểu một workshop online mỗi năm, recording public.
- **Telegram (Cardano Vietnam)**: https://t.me/CardanoVietnamOfficial — cho cộng đồng Cardano Việt Nam rộng hơn.

---

### 8. Nếu mọi nguồn tài trợ dừng

Dự án được thiết kế để sống sót kể cả khi 100% nguồn tài trợ ngoài bị cắt:

1. Site chạy free tier (Vercel + GitHub Pages dự phòng).
2. License CC BY-4.0 cho phép bất kỳ ai fork và tiếp tục.
3. Đội maintainer phân tán nhiều người (xem MAINTAINERS.md), không phụ thuộc một cá nhân.
4. Toàn bộ nội dung là Markdown trong Git repo — không phụ thuộc nền tảng độc quyền nào.

Đây là **tài sản cộng đồng trước, dự án có ngân sách sau**. Tài trợ giúp tăng tốc; không phải điều kiện sống còn.

---
