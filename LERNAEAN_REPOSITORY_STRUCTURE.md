# Lernaean Research - Repository & Deployment Structure

**Last Updated:** February 2, 2026  
**Audit Status:** ✅ Comprehensive Analysis Complete

---

## 🎯 **Domain Structure**

### **Primary Domains**

1. **lernaean.net**
   - **Purpose:** Homepage for Lernaean Research (umbrella organization)
   - **Content:** Overview of all research initiatives, about R.D. Kitcey, contact form
   - **Links to:** humanparadigm.org and future research domains

2. **humanparadigm.org**
   - **Purpose:** NiCE Framework research hub
   - **Content:** Full NiCE Framework site, publications, interactive tools, admin dashboard
   - **Part of:** Lernaean Research portfolio

---

## 📂 **Local Repository Structure**

### **Location:** `M:\NiCE_Site_Repo`

This is a **COMBINED repository** containing multiple sites:

```
M:\NiCE_Site_Repo/
│
├── 📁 ROOT (humanparadigm.org - NiCE Framework Site)
│   ├── index.html                    # Main NiCE Framework homepage
│   ├── nice-framework.html          # NiCE synthesis page
│   ├── interactive-lab.html         # Interactive tools
│   ├── changelog.html               # Site changelog
│   ├── admin/                       # Admin dashboard
│   │   ├── index.html              # Dashboard home
│   │   └── contact-messages.html   # Message management
│   ├── functions/                   # Cloudflare Functions
│   │   ├── send-email.js           # Email + KV storage
│   │   └── api/
│   │       ├── messages.js         # Get messages
│   │       └── message-status.js   # Update status
│   ├── assets/                      # CSS/JS bundles
│   ├── images/                      # Site images
│   ├── data/                        # JSON data files
│   └── [many other HTML pages]      # Framework pages
│
├── 📁 lernaen-homepage/ (lernaean.net - Research Homepage)
│   ├── index.html                   # Lernaean Research homepage
│   ├── Lern_Logo.png               # Logo
│   ├── hero-triadic-system.png     # Hero image
│   ├── CONTACT_FORM_SETUP.md       # Setup docs
│   └── .git/                       # ⚠️ Embedded git repo
│
├── 📁 nice-framework/ (DUPLICATE - Should be removed?)
│   ├── [Same structure as ROOT]     # ⚠️ Appears to be duplicate
│   └── .git/                       # ⚠️ Embedded git repo
│
├── 📁 nice-interactive-centerpiece/
│   └── client/                      # Interactive 3D tools
│
└── 📁 Documentation
    ├── CONTACT_FORM_SETUP_GUIDE.md
    ├── CONTACT_FORM_QUICK_START.md
    ├── CLOUDFLARE_CONFIG.md
    └── CONTACT_FORM_ARCHITECTURE.txt

```

---

## 🔗 **GitHub Repositories**

### **Connected Remotes (from M:\NiCE_Site_Repo)**

```bash
origin     → https://github.com/HConley-01/human-paradigm-site.git
lernaean   → https://github.com/HConley-01/Lernean.org.git
```

### **Repository Purposes**

1. **human-paradigm-site** (origin)
   - **Contains:** NiCE Framework site + lernaen-homepage folder
   - **Deployment:** Should deploy to humanparadigm.org
   - **Status:** Currently receiving all commits

2. **Lernean.org** (lernaean)
   - **Contains:** Same content as human-paradigm-site (recently force-pushed)
   - **Deployment:** Connected to lernaean-research-homepage Cloudflare project
   - **Status:** Just synchronized with latest changes

---

## ☁️ **Cloudflare Pages Deployments**

### **Active Projects**

1. **lernaean-research-homepage**
   - **Connected to:** HConley-01/Lernean.org
   - **Branch:** main
   - **Domains:** 
     - lernaean-research-homepage.pages.dev
     - lernaean.net + 2 more domains
   - **Status:** ⚠️ Automatic deployments may be disabled ("repository cannot be accessed")
   - **Last Deploy:** 17 days ago (686f2f8)
   - **Serves:** Currently serves BOTH lernaean.net AND humanparadigm.org

### **Deleted Projects**
- ✅ human-paradigm-site (deleted to eliminate redundancy)
- ✅ lernaean (standalone, deleted)
- ⚠️ lernaean-research-site (still exists, failing builds)

---

## ⚠️ **Current Issues & Recommendations**

### **Issue 1: Embedded Git Repositories**
**Problem:** `lernaen-homepage/` and `nice-framework/` have `.git/` folders inside them
- Git treats them as submodules
- Cloudflare Pages deployment may fail
- Causes "repository cannot be accessed" errors

**Solution:**
```powershell
# Remove embedded git repos
Remove-Item -Recurse -Force lernaen-homepage\.git
Remove-Item -Recurse -Force nice-framework\.git

# Re-add as normal folders
git add lernaen-homepage/ nice-framework/
git commit -m "fix: convert embedded repos to regular folders"
git push lernaean main
git push origin main
```

### **Issue 2: Duplicate nice-framework Folder**
**Problem:** Root directory IS the NiCE Framework site, but there's also a `nice-framework/` folder with duplicate content

**Recommendation:** 
- **Option A:** Delete `nice-framework/` folder entirely (it's redundant)
- **Option B:** If it serves a purpose, document why it exists

### **Issue 3: Cloudflare Pages GitHub Connection**
**Problem:** "The repository cannot be accessed" warning in lernaean-research-homepage

**Solution:**
1. Click "Configure installation" in Cloudflare
2. Ensure HConley-01/Lernean.org has proper access
3. Re-enable automatic deployments

### **Issue 4: Single Deployment for Two Sites**
**Current:** lernaean-research-homepage deploys BOTH lernaean.net and humanparadigm.org from same repo

**This works IF:**
- lernaean.net content is in `lernaen-homepage/index.html`
- humanparadigm.org content is in root `index.html`
- Custom domain routing configured properly

**Recommendation:** 
- Create separate Cloudflare Pages projects:
  - **humanparadigm-site** → deploys ROOT (humanparadigm.org)
  - **lernaean-homepage** → deploys lernaen-homepage/ folder (lernaean.net)

---

## ✅ **Recommended Structure (Clean)**

### **Option 1: Separate Repositories (Recommended)**

```
Repository: HConley-01/Lernean.org
Purpose: Lernaean Research homepage (lernaean.net)
Contents: Just the homepage content
Cloudflare Project: lernaean-homepage

Repository: HConley-01/human-paradigm-site  
Purpose: NiCE Framework site (humanparadigm.org)
Contents: Full NiCE site with admin, functions, etc.
Cloudflare Project: humanparadigm-site
```

### **Option 2: Monorepo with Subdirectories (Current, needs fixing)**

```
Repository: HConley-01/Lernean.org (or human-paradigm-site)
├── lernaean-homepage/          # For lernaean.net
└── humanparadigm-site/         # For humanparadigm.org

Deploy with different root paths in Cloudflare
```

---

## 🔧 **Immediate Action Items**

### **Priority 1: Fix Deployment**
- [ ] Remove `.git/` from `lernaen-homepage/` and `nice-framework/`
- [ ] Commit and push to both remotes
- [ ] Fix Cloudflare GitHub connection
- [ ] Enable automatic deployments

### **Priority 2: Clean Up Structure**
- [ ] Decide: Keep monorepo or split into separate repos?
- [ ] Delete or document purpose of `nice-framework/` folder
- [ ] Delete `lernaean-research-site` Cloudflare project (failing builds)

### **Priority 3: Configure Cloudflare**
- [ ] Set up KV namespace: `CONTACT_MESSAGES`
- [ ] Bind KV to project
- [ ] Add environment variable: `RESEND_API_KEY`
- [ ] Configure Resend domain and get API key

### **Priority 4: Test Contact Form**
- [ ] Deploy latest code
- [ ] Submit test message
- [ ] Verify email delivery to rkitcey@lernaean.net
- [ ] Check admin dashboard

---

## 📊 **Current vs. Intended State**

| Aspect | Current State | Intended State |
|--------|--------------|----------------|
| **Local Repo** | Monorepo with embedded git folders | Clean monorepo OR separate repos |
| **GitHub** | 2 repos with duplicate content | Synced properly |
| **Cloudflare** | 1 project for both sites | 1-2 projects (clean deployment) |
| **Deployments** | Broken (17 days old) | Auto-deploy on every push |
| **Contact Form** | Code ready, not deployed | Live and functional |

---

## 📝 **File Manifest**

### **Root Directory (humanparadigm.org)**
- ✅ index.html - NiCE Framework homepage
- ✅ admin/ - Admin dashboard with contact form management
- ✅ functions/ - Cloudflare Functions for email/API
- ✅ All NiCE Framework pages and assets

### **lernaen-homepage/ (lernaean.net)**
- ✅ index.html - Lernaean Research homepage
- ✅ Contact form with email indicator
- ✅ Links to humanparadigm.org

### **Contact Form System**
- ✅ Code complete and committed
- ✅ Documentation created
- ⏳ Not yet deployed (pending Cloudflare config)
- ⏳ Email delivery not configured
- ⏳ KV storage not set up

---

## 🎯 **Next Steps**

1. **Decide on repository structure** (monorepo vs. separate)
2. **Fix embedded git repos** (remove .git folders)
3. **Fix Cloudflare GitHub connection**
4. **Configure Resend + Cloudflare KV**
5. **Deploy and test**

---

*This document provides a complete audit of the Lernaean Research repository and deployment infrastructure.*
