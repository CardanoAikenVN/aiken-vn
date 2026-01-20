# System Architecture

This document describes the technical architecture of the Vietnamese Aiken documentation site, including system diagrams, data flows, and deployment architecture.

---

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        Mobile[Mobile Browser]
    end

    subgraph "Static Hosting"
        GHP[GitHub Pages]
    end

    subgraph "Build System"
        GHA[GitHub Actions CI/CD]
        Docusaurus[Docusaurus Build]
    end

    subgraph "Source Code"
        Repo[GitHub Repository]
        Docs[Markdown Docs]
        Components[React Components]
        Assets[Static Assets]
    end

    subgraph "External Services"
        Firebase[Firebase Firestore]
        IPify[ipify.org API]
    end

    Browser --> GHP
    Mobile --> GHP
    GHP --> Firebase
    GHP --> IPify

    Repo --> GHA
    GHA --> Docusaurus
    Docusaurus --> GHP

    Docs --> Docusaurus
    Components --> Docusaurus
    Assets --> Docusaurus
```

---

## Technology Stack Overview

### Frontend Stack

```mermaid
graph LR
    subgraph "UI Framework"
        React[React 19]
        Docusaurus[Docusaurus 3.9.2]
    end

    subgraph "Styling"
        Tailwind[Tailwind CSS 3.4]
        Infima[Infima CSS]
        CustomCSS[Custom CSS]
    end

    subgraph "Enhancements"
        Framer[Framer Motion]
        Lucide[Lucide Icons]
        Mermaid[Mermaid Diagrams]
    end

    React --> Docusaurus
    Tailwind --> Docusaurus
    Infima --> Docusaurus
    CustomCSS --> Docusaurus
    Framer --> React
    Lucide --> React
    Mermaid --> Docusaurus
```

### Build Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Build Tool | Docusaurus CLI | Static site generation |
| CSS Processing | PostCSS + Tailwind | Utility class compilation |
| JS Bundling | Webpack (internal) | Module bundling |
| Transpilation | Babel | JavaScript/TypeScript compilation |
| Optimization | Terser + CSS Nano | Production minification |

---

## Component Architecture

```mermaid
graph TB
    subgraph "Pages"
        Index[index.js]
    end

    subgraph "Landing Page Components"
        LP[LandingPage/index.tsx]
        Hero[Hero.tsx]
        Navbar[Navbar.tsx]
        QT[QuestTimeline.tsx]
        QC[QuestCard.tsx]
        Features[Features.tsx]
        Curriculum[Curriculum.tsx]
        Projects[Projects.tsx]
        Community[Community.tsx]
        Footer[Footer.tsx]
        Starfield[Starfield.tsx]
        Train[OnboardingTrain.tsx]
        Pixel[PixelComponents.tsx]
    end

    subgraph "Support Files"
        Types[types.ts]
        Trans[translations.ts]
        Const[constants.ts]
    end

    subgraph "Shared Components"
        YT[YouTubeVideo.js]
        HF[HomepageFeatures]
    end

    subgraph "Utilities"
        FB[firebase.js]
        Track[tracking.js]
    end

    subgraph "Theme"
        Root[Root.js]
        Toggle[sidebarToggle.js]
    end

    Index --> LP
    LP --> Hero
    LP --> Navbar
    LP --> QT
    LP --> Features
    LP --> Curriculum
    LP --> Projects
    LP --> Community
    LP --> Footer
    LP --> Starfield
    LP --> Train

    QT --> QC
    QC --> Pixel

    LP --> Types
    LP --> Trans
    LP --> Const

    Root --> Track
    Track --> FB
```

---

## Data Flow Architecture

### Analytics Data Flow

```mermaid
sequenceDiagram
    participant User as User Browser
    participant App as React App
    participant Track as tracking.js
    participant IPify as ipify.org
    participant Firebase as Firebase Firestore

    User->>App: Navigate to page
    App->>Track: trackPageView()
    Track->>Track: getSessionId()
    Track->>Track: getBrowserInfo()
    Track->>Track: getPageInfo()
    Track->>IPify: GET /api (async)
    IPify-->>Track: IP Address
    Track->>Firebase: addDoc(access_logs)
    Firebase-->>Track: Success

    Note over Track: Event types: page_view, page_exit, page_hidden, page_visible
```

### Analytics Data Structure

```typescript
interface AccessLog {
  sessionId: string;           // Unique session identifier
  eventType: string;           // 'page_view' | 'page_exit' | 'page_hidden' | 'page_visible'
  timestamp: Timestamp;        // Firebase server timestamp
  clientTimestamp: string;     // ISO date string
  page: {
    url: string;               // Full URL
    pathname: string;          // Path only
    search: string;            // Query parameters
    hash: string;              // URL hash
    title: string;             // Page title
    referrer: string | null;   // Referring page
  };
  browser: {
    userAgent: string;         // Browser user agent
    language: string;          // Browser language
    platform: string;          // OS platform
    screenWidth: number;       // Screen dimensions
    screenHeight: number;
    viewportWidth: number;     // Viewport dimensions
    viewportHeight: number;
  };
  ipAddress?: string;          // User IP (if available)
  timeOnPage?: number;         // Seconds (for exit events)
}
```

---

## Deployment Architecture

### GitHub Pages Deployment

```mermaid
graph LR
    subgraph "Development"
        Dev[Local Development]
        Branch[Feature Branch]
    end

    subgraph "CI/CD Pipeline"
        Push[Git Push]
        Validate[Validate Job]
        Build[Build Job]
        Artifact[Build Artifact]
    end

    subgraph "Hosting"
        GHP[GitHub Pages]
        CDN[GitHub CDN]
    end

    subgraph "Users"
        Users[End Users]
    end

    Dev --> Branch
    Branch --> Push
    Push --> Validate
    Validate --> Build
    Build --> Artifact
    Artifact --> GHP
    GHP --> CDN
    CDN --> Users
```

### CI/CD Pipeline Details

```mermaid
flowchart TD
    subgraph "Trigger"
        T1[Push to main]
        T2[Push to part-*]
        T3[PR to main]
    end

    subgraph "Validate Job"
        V1[Checkout Code]
        V2[Read CLAUDE.md]
        V3[Validate Contributor]
    end

    subgraph "Build Job"
        B1[Checkout Code]
        B2[Setup Node.js 20]
        B3[npm ci]
        B4[npm run build]
        B5[Upload Artifact]
    end

    T1 --> V1
    T2 --> V1
    T3 --> V1
    V1 --> V2
    V2 --> V3
    V3 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B4 --> B5
```

### Deployment Configuration

| Setting | Value |
|---------|-------|
| Organization | uberhub-mentorias |
| Repository | docusaurus |
| Branch | main |
| Build Output | `build/` |
| Base URL | `/` |
| URL | https://uberhub-mentorias.github.io |

---

## Content Architecture

### Documentation Hierarchy

```mermaid
graph TB
    subgraph "Documentation Structure"
        Root[docs/]
        P1[01-the-aiken-foundation/]
        P2[02-cardano-architecture/]
        P3[03-your-first-validator/]
        P4[04-minting-tokens-nfts/]
        P5[05-escrow-contract/]
    end

    subgraph "Part 1 Contents"
        P1I[index.md]
        P1L1[01_Installation.md]
        P1L2[02_Introduction.md]
        P1L3[03_Aiken_CLI.md]
        P1L4[04_Project_structure.md]
        P1L5[05_Variable_Constant.md]
        P1L6[06_Primitive_type.md]
        P1L7[07_Custom_type.md]
        P1L8[08_Control_flow.md]
        P1L9[09_Function.md]
        P1L10[10_Modules.md]
        P1L11[11_Data.md]
        P1L12[12_Unit_test.md]
        P1L13[13_Troubleshooting.md]
    end

    Root --> P1
    Root --> P2
    Root --> P3
    Root --> P4
    Root --> P5

    P1 --> P1I
    P1 --> P1L1
    P1 --> P1L2
    P1 --> P1L3
    P1 --> P1L4
    P1 --> P1L5
    P1 --> P1L6
    P1 --> P1L7
    P1 --> P1L8
    P1 --> P1L9
    P1 --> P1L10
    P1 --> P1L11
    P1 --> P1L12
    P1 --> P1L13
```

### Sidebar Generation

```mermaid
flowchart LR
    subgraph "Source"
        Dirs[Directory Structure]
        FM[Frontmatter]
    end

    subgraph "Docusaurus"
        SB[sidebars.js]
        Auto[autogenerated]
    end

    subgraph "Output"
        Nav[Sidebar Navigation]
    end

    Dirs --> SB
    FM --> SB
    SB --> Auto
    Auto --> Nav
```

The sidebar is auto-generated based on:
1. Directory structure (numeric prefix for ordering)
2. `sidebar_position` frontmatter field
3. `title` frontmatter field for display

---

## Integration Points

### External Service Integrations

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| Firebase Firestore | Analytics storage | JavaScript SDK |
| ipify.org | IP geolocation | REST API |
| GitHub Pages | Static hosting | Automatic deployment |
| GitHub Actions | CI/CD | YAML workflow |

### Firebase Configuration

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "mentorias-uberhub.firebaseapp.com",
  projectId: "mentorias-uberhub",
  storageBucket: "mentorias-uberhub.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};
```

**Firestore Collections:**

| Collection | Purpose | Write | Read |
|------------|---------|-------|------|
| `access_logs` | Page view analytics | Client | Admin only |

---

## Security Considerations

### Client-Side Security

| Concern | Mitigation |
|---------|------------|
| Firebase API key exposure | Restricted to specific domains in Firebase console |
| XSS attacks | React's built-in escaping, no `dangerouslySetInnerHTML` |
| Data validation | Firebase security rules restrict writes |

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Access logs - write only, no read
    match /access_logs/{logId} {
      allow write: if true;
      allow read: if false;
    }
  }
}
```

### Build Security

| Measure | Implementation |
|---------|----------------|
| Contributor validation | CI pipeline checks GitHub actor |
| Dependency security | npm ci (locked versions) |
| Build isolation | GitHub Actions runners |

---

## Performance Considerations

### Static Site Optimization

| Optimization | Implementation |
|--------------|----------------|
| Static Generation | Pre-built HTML at build time |
| Code Splitting | Automatic via Webpack |
| Asset Optimization | Compressed images, minified CSS/JS |
| CDN Delivery | GitHub Pages global CDN |

### Runtime Performance

| Optimization | Implementation |
|--------------|----------------|
| Lazy Loading | React.lazy for components |
| Animation Performance | Framer Motion with GPU acceleration |
| Reduced Motion | CSS media query support |
| Image Loading | Lazy loading with loading="lazy" |

### Bundle Size Management

| Package | Size Impact | Justification |
|---------|-------------|---------------|
| React | ~40KB | Core framework |
| Framer Motion | ~30KB | Essential animations |
| Firebase | ~50KB | Analytics requirement |
| Tailwind (purged) | ~10KB | Utility CSS |

---

## Monitoring and Observability

### Analytics Dashboard

Data available in Firebase Console:
- Page view counts
- Session duration
- Geographic distribution
- Device/browser breakdown
- Popular content

### Build Monitoring

GitHub Actions provides:
- Build success/failure status
- Build duration metrics
- Artifact storage
- Workflow run history

---

## Scalability Considerations

### Current Scale

| Metric | Current Capacity |
|--------|------------------|
| Content | 25 documentation pages |
| Static Files | ~10MB build output |
| Monthly Bandwidth | GitHub Pages free tier |
| Analytics Writes | Firebase free tier (50K/day) |

### Growth Path

| Scale Milestone | Recommended Actions |
|-----------------|---------------------|
| 100+ pages | Add search functionality |
| 10K+ monthly users | Consider Firebase paid tier |
| Multi-language | Enable i18n (already configured) |
| Video content | Consider external video hosting |

---

## Related Documentation

- [Project Overview and PDR](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [Code Standards](./code-standards.md)
