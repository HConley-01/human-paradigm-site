# Human Paradigm Site | NiCE Framework

**The official research presentation site for the NiCE (Nature–Consciousness–Environment) Framework**

[![Live Site](https://img.shields.io/badge/Live-humanparadigm.org-blue)](https://humanparadigm.org)
[![Cloudflare Pages](https://img.shields.io/badge/Hosted-Cloudflare%20Pages-orange)](https://pages.cloudflare.com/)
[![Status](https://img.shields.io/badge/Status-Beta-yellow)](https://humanparadigm.org/changelog.html)

---

## 🎯 Overview

This repository contains the static site for presenting the NiCE Framework research—an integrated triadic model examining the inseparable interdependence of **Nature**, **Consciousness**, and **Environment** in human systems.

**Live URL:** [https://humanparadigm.org](https://humanparadigm.org)

---

## 📋 Site Administration

| Role | Contact |
|------|---------|
| **Site Administrator** | R.D. Kitcey |
| **Email** | [rkitcey@humanparadigm.org](mailto:rkitcey@humanparadigm.org) |
| **Organization** | [Lernaean Research](https://lernaean.net) |
| **ORCID** | [0009-0004-8679-9155](https://orcid.org/0009-0004-8679-9155) |

---

## 🏗️ Site Architecture

```
dist/public/
├── index.html                    # Homepage
├── nice-framework.html           # Main NiCE Synthesis document
├── interactive-lab.html          # Interactive tools hub
├── changelog.html                # Version history (auto-populated)
├── known-issues.html             # Issue tracker (auto-populated)
├── sitemap-visual.html           # Visual site navigation
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search engine directives
│
├── data/
│   ├── document-registry.json    # 📌 SINGLE SOURCE OF TRUTH for publications
│   └── known-issues.json         # Issue tracking data
│
├── js/
│   └── document-registry.js      # Auto-applies document versions to DOM
│
├── documents/                    # PDF publications
├── images/                       # Site imagery and logos
├── assets/                       # Compiled JS bundles
└── site-version.json             # Site versioning & changelog data
```

---

## 🔄 Site Management Workflow

### Deployment Pipeline

```
Local Development → Git Commit → Cloudflare Pages Deploy
```

**Deploy Command:**
```powershell
cd dist/public
npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main
```

**Git Workflow:**
```powershell
git add .
git commit -m "description of changes"
git push
```

---

## 📚 Document Version Management

### The Document Registry System

All publication versions are managed through a **single source of truth**: `/data/document-registry.json`

This enables automatic version synchronization across the entire site via data attributes.

### How It Works

1. **Registry File** (`/data/document-registry.json`):
```json
{
  "documents": {
    "human-paradigm": {
      "id": "human-paradigm",
      "title": "The Human Paradigm",
      "version": "1.8.5",
      "filename": "Kitcey_2025-The_Human_Paradigm_v1.8.5.pdf",
      "category": "core",
      "tag": "FOUNDATIONAL",
      "tagColor": "green"
    }
  }
}
```

2. **HTML Integration** (data attributes auto-populate):
```html
<a data-doc="human-paradigm" data-doc-link>Download PDF</a>
<span data-doc="human-paradigm" data-doc-version></span>  <!-- Shows: v1.8.5 -->
```

3. **JavaScript API** (for programmatic access):
```javascript
DocRegistry.get('human-paradigm').version    // "1.8.5"
DocRegistry.getPath('human-paradigm')        // "/documents/Kitcey_2025-The_Human_Paradigm_v1.8.5.pdf"
```

### Updating a Publication Version

**Step-by-step workflow:**

```powershell
# 1. Copy new PDF to documents folder
Copy-Item "path/to/New_Document_v2.0.pdf" "dist/public/documents/"

# 2. Update document-registry.json
# Edit: version, filename fields for the document

# 3. Deploy
cd dist/public
npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main

# 4. Commit to git
git add .
git commit -m "Update [document] to v2.0"
git push
```

**All links and version badges site-wide update automatically!**

### Current Publications

| Document ID | Title | Version | Category |
|-------------|-------|---------|----------|
| `synthesis` | NiCE Framework Synthesis | 1.3.1 | Core |
| `human-paradigm` | The Human Paradigm | 1.8.5 | Core |
| `advanced-analysis` | Advanced Analysis | 0.73 | Core |
| `human-essence` | The Human Essence | 0.9 | Core |
| `sign-flip` | Ecological Value-Debt Sign Flip | 0.2.9 | Worked Example |
| `pathogenesis` | Upstream Systemic Pathogenesis | 8.0 | Worked Example |
| `stigma` | Omnidirectional Stigma Mechanics | 2.0 | Worked Example |
| `us-diagnostic` | US Diagnostic Analysis | 0.2.4 | Worked Example |
| `china-diagnostic` | China Diagnostic Analysis | 0.6.4 | Worked Example |
| `imf-worldbank` | IMF & World Bank Analysis | 0.3.2 | Worked Example |
| `academia-reform` | US Academia Reform Analysis | 0.4.0 | Worked Example |
| `pa-diagnostic` | Pennsylvania Diagnostic | 0.4.1 | Worked Example |

---

## 🏷️ Site Versioning

### Version File Location

`/site-version.json` — Contains site version, changelog history, and release metadata.

### Versioning Convention

Follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH[-STATUS]`

| Component | Meaning |
|-----------|---------|
| **MAJOR** | Breaking changes or complete redesigns |
| **MINOR** | New features, pages, or significant content additions |
| **PATCH** | Bug fixes, minor content updates, styling tweaks |
| **STATUS** | `-alpha`, `-beta`, or omitted for stable release |

### Current Version

**`0.9.1-beta`** — "Triadic Foundation"

### Updating Site Version

1. Edit `/site-version.json`:
   - Update `site.version`
   - Update `site.releaseDate`
   - Add entry to `changelog` array

2. The homepage banner auto-fetches and displays current version.

3. `/changelog.html` auto-renders the full version history.

---

## 🐛 Issue Tracking

### Issue Management System

Issues are tracked in `/data/known-issues.json` and auto-rendered on `/known-issues.html`.

### Issue Schema

```json
{
  "id": "audit-001",
  "type": "bug",           // bug | content | ux | performance | accessibility
  "severity": "high",      // critical | high | medium | low
  "title": "Brief description",
  "description": "Detailed explanation",
  "location": "/affected-page.html",
  "rationale": "Why this matters",
  "status": "open",        // open | in-progress | closed
  "notes": "Resolution notes when closed",
  "timestamp": "2026-01-17T00:00:00.000Z"
}
```

### Adding a New Issue

1. Edit `/data/known-issues.json`
2. Add issue object to the `issues` array
3. Deploy and commit

### Closing an Issue

1. Set `"status": "closed"`
2. Add resolution details to `"notes"` field
3. Deploy and commit

---

## 🗺️ Sitemap Management

### XML Sitemap

`/sitemap.xml` — Standard SEO sitemap for search engine crawlers.

**When to update:**
- Adding new HTML pages
- Removing pages
- Changing URL structures

### Visual Sitemap

`/sitemap-visual.html` — Human-readable site map for navigation.

**When to update:**
- Adding new pages or sections
- Reorganizing site structure

---

## 📝 Changelog Management

### Automated Display

The changelog is stored in `/site-version.json` under the `changelog` array and auto-rendered on `/changelog.html`.

### Changelog Entry Format

```json
{
  "version": "0.9.1-beta",
  "date": "2026-01-17",
  "status": "current",
  "summary": "Brief description of this release",
  "changes": [
    { "type": "added", "description": "New feature X" },
    { "type": "changed", "description": "Modified Y" },
    { "type": "fixed", "description": "Bug fix Z" },
    { "type": "removed", "description": "Deprecated W" }
  ]
}
```

### Change Types

| Type | Meaning |
|------|---------|
| `added` | New features or content |
| `changed` | Modifications to existing functionality |
| `fixed` | Bug fixes |
| `removed` | Removed features or content |
| `deprecated` | Soon-to-be-removed features |
| `security` | Security-related changes |

---

## 🚀 Quick Reference Commands

### Full Deployment Workflow

```powershell
# Navigate to deployment directory
cd M:\NiCE_Site_Repo\nice-framework\dist\public

# Deploy to Cloudflare
npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main

# Commit and push to GitHub
git add .
git commit -m "Your commit message"
git push
```

### Verify Deployment

```powershell
# Check if files are accessible
Invoke-WebRequest -Uri "https://humanparadigm.org/data/document-registry.json" -Method Head
```

### Document Version Quick Update

```powershell
# 1. Copy new PDF
Copy-Item "NewDoc_v2.0.pdf" "dist/public/documents/"

# 2. Edit document-registry.json (update version & filename)

# 3. Deploy
npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main
```

---

## 📄 Licensing

### Research Content
All research publications and theoretical content are licensed under:

**[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/)**

You are free to share (copy and redistribute) the material with attribution, but may not use it commercially or create derivative works.

### Website Code
All website code, styling, and interactive implementations are **All Rights Reserved**.

---

## 📬 Contact

**R.D. Kitcey**  
Director, [Lernaean Research](https://lernaean.net)  
Email: [rkitcey@humanparadigm.org](mailto:rkitcey@humanparadigm.org)  
ORCID: [0009-0004-8679-9155](https://orcid.org/0009-0004-8679-9155)

---

## 🔗 Related Resources

- **Live Site:** [humanparadigm.org](https://humanparadigm.org)
- **Lernaean Research:** [lernaean.net](https://lernaean.net)
- **Changelog:** [humanparadigm.org/changelog.html](https://humanparadigm.org/changelog.html)
- **Known Issues:** [humanparadigm.org/known-issues.html](https://humanparadigm.org/known-issues.html)
- **Site Map:** [humanparadigm.org/sitemap-visual.html](https://humanparadigm.org/sitemap-visual.html)

---

*Last updated: January 18, 2026*
