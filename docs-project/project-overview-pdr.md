# Project Overview and Product Development Requirements

## Project Description

**Vietnamese Aiken** is the first open-source curriculum for mastering Aiken smart contract development on the Cardano blockchain, specifically designed for Vietnamese developers. The project serves as a comprehensive educational resource that bridges the gap between Cardano blockchain technology and the Vietnamese developer community.

### Vision Statement

To empower Vietnamese developers with the knowledge and tools necessary to build secure, efficient smart contracts on Cardano using the Aiken programming language, contributing to the growth of the Vietnamese blockchain ecosystem.

### Mission

- Provide high-quality, Vietnamese-language documentation for Aiken smart contract development
- Create a structured learning path from beginner to advanced levels
- Build a supportive community for Vietnamese Cardano developers
- Lower the barrier to entry for blockchain development in Vietnam

---

## Product Development Requirements (PDR)

### Target Audience

| Audience Segment | Description | Skill Level |
|-----------------|-------------|-------------|
| Vietnamese Developers | Professional developers seeking blockchain skills | Beginner to Intermediate |
| Students | Computer science or engineering students | Beginner |
| Blockchain Enthusiasts | Self-learners interested in Cardano ecosystem | Beginner |
| Existing Solidity Developers | Developers transitioning from Ethereum | Intermediate |

### User Personas

**Persona 1: The Curious Developer (Nguyen)**
- Age: 25-35
- Background: Full-stack developer with 3+ years experience
- Goal: Learn blockchain development for career advancement
- Pain Points: Limited Vietnamese resources, complex technical concepts
- Needs: Step-by-step tutorials, practical examples, Vietnamese explanations

**Persona 2: The University Student (Linh)**
- Age: 20-24
- Background: CS student with basic programming knowledge
- Goal: Understand blockchain for academic projects
- Pain Points: No prior blockchain experience, time constraints
- Needs: Foundational content, clear progression, hands-on exercises

---

## Project Goals and Objectives

### Primary Goals

1. **Educational Excellence**
   - Complete 5-part curriculum covering Aiken fundamentals to advanced contracts
   - Practical, hands-on examples in every lesson
   - Progressive difficulty from basics to deployment

2. **Accessibility**
   - 100% Vietnamese language content
   - Responsive design for all devices
   - Accessibility-compliant interface (WCAG standards)

3. **Community Building**
   - Establish Vietnamese Cardano developer community
   - Enable knowledge sharing and collaboration
   - Provide support channels for learners

### Secondary Goals

- Integration with Cardano ecosystem tools
- Continuous content updates with Aiken language evolution
- Analytics for understanding user engagement and content effectiveness

---

## Success Metrics

### Content Metrics

| Metric | Target | Current Status |
|--------|--------|----------------|
| Part 1 Completion | 100% (13 lessons) | 53% (7/13 complete) |
| Part 2 Completion | 100% (3 topics) | 5% (stubs only) |
| Part 3 Completion | 100% (1 lesson) | 5% (stub only) |
| Part 4 Completion | 100% (2 lessons) | 5% (stubs only) |
| Part 5 Completion | 100% (1 lesson) | 5% (stub only) |

### Engagement Metrics

| Metric | Description | Tracking Method |
|--------|-------------|-----------------|
| Page Views | Total documentation page visits | Firebase Analytics |
| Time on Page | Average reading time per lesson | Firebase Analytics |
| Session Duration | Total time spent per visit | Firebase Analytics |
| Return Visitors | Users returning for multiple sessions | Session tracking |

### Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Build Success Rate | 100% | CI/CD pipeline |
| Broken Links | 0 | Docusaurus build warnings |
| Mobile Responsiveness | Full support | Manual testing |
| Accessibility Score | WCAG 2.1 AA | Automated audits |

---

## Stakeholders

### Primary Stakeholders

| Role | Responsibility | Contact |
|------|----------------|---------|
| Project Owner | Content strategy, overall direction | jasong-03 (GitHub) |
| Content Developer | Documentation writing, technical accuracy | jasong-03 |
| Technical Maintainer | Site maintenance, deployments | jasong-03 |

### Secondary Stakeholders

| Group | Interest |
|-------|----------|
| Vietnamese Developer Community | Learning resources, career development |
| Cardano Foundation | Ecosystem growth, developer adoption |
| UberHub Mentorias | Educational platform, community building |

---

## Timeline and Milestones

### Phase 1: Foundation (Current)

**Status:** In Progress

| Milestone | Description | Target Date | Status |
|-----------|-------------|-------------|--------|
| M1.1 | Complete Part 1 (Aiken Foundation) | Q1 2025 | 53% |
| M1.2 | Landing page and site infrastructure | Q4 2024 | Complete |
| M1.3 | Analytics and tracking integration | Q4 2024 | Complete |

### Phase 2: Core Content

**Status:** Planned

| Milestone | Description | Target Date | Status |
|-----------|-------------|-------------|--------|
| M2.1 | Complete Part 2 (Cardano Architecture) | Q2 2025 | Not Started |
| M2.2 | Complete Part 3 (First Validator) | Q2 2025 | Not Started |
| M2.3 | Complete Part 4 (Minting Tokens/NFTs) | Q3 2025 | Not Started |

### Phase 3: Advanced Content

**Status:** Planned

| Milestone | Description | Target Date | Status |
|-----------|-------------|-------------|--------|
| M3.1 | Complete Part 5 (Escrow Contract) | Q3 2025 | Not Started |
| M3.2 | Advanced tutorials and case studies | Q4 2025 | Not Started |
| M3.3 | Community contribution guidelines | Q4 2025 | Not Started |

---

## Content Development Status

### Part 1: The Aiken Foundation (53% Complete)

| Lesson | Title | Status | Description |
|--------|-------|--------|-------------|
| 01 | Installation | Complete | Environment setup and tools |
| 02 | Introduction | Complete | Aiken overview |
| 03 | Aiken CLI | Complete | Command-line interface mastery |
| 04 | Project Structure | Complete | Project organization |
| 05 | Variables & Constants | Complete | Variable definitions and usage |
| 06 | Primitive Types | Complete | Basic data types |
| 07 | Custom Types | Complete | Complex data structures |
| 08 | Control Flow | Stub | Conditional logic (needs content) |
| 09 | Functions | Stub | Reusable processing logic (needs content) |
| 10 | Modules | Stub | Code modularization (needs content) |
| 11 | Data | Stub | Data handling (needs content) |
| 12 | Unit Testing | Stub | Code testing (needs content) |
| 13 | Troubleshooting | Stub | Debugging techniques (needs content) |

### Parts 2-5: Advanced Topics (5% Complete)

| Part | Topic | Lessons | Status |
|------|-------|---------|--------|
| 2 | Cardano Architecture | 3 | Index + stubs only |
| 3 | Your First Validator | 1 | Index + stub only |
| 4 | Minting Tokens & NFTs | 2 | Index + stubs only |
| 5 | Escrow Contract | 1 | Index + stub only |

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Content accuracy with Aiken updates | High | Medium | Regular review cycles, version tracking |
| Single maintainer dependency | High | High | Documentation of processes, community engagement |
| Low user engagement | Medium | Medium | Analytics monitoring, content optimization |
| Technical debt accumulation | Medium | Low | Code reviews, CI/CD enforcement |

---

## Resource Requirements

### Technical Resources

- **Hosting:** GitHub Pages (current)
- **Analytics:** Firebase Firestore
- **CI/CD:** GitHub Actions
- **Domain:** uberhub-mentorias.github.io

### Content Resources

- Technical writing for 12 remaining lessons
- Code examples and validators
- Diagrams and visual aids
- Video tutorials (future enhancement)

---

## Appendix

### Related Documentation

- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
- [System Architecture](./system-architecture.md)

### External References

- [Aiken Official Documentation](https://aiken-lang.org)
- [Cardano Developer Portal](https://developers.cardano.org)
- [Docusaurus Documentation](https://docusaurus.io)
