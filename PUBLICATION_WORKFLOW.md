# Publication Management System

**Elegant, automated sync and deployment for NiCE Framework publications.**

## Quick Start

```powershell
# 1. Update PDF in source folder (MAIN_PDF or WORKED_PDF)
# 2. Run sync:
cd M:\NiCE_Site_Repo\nice-framework
.\sync-publications.ps1 -Deploy

# Done! New version deployed automatically.
```

---

## System Overview

**Single Source of Truth:** `data/document-registry.json`
- All publication metadata
- JavaScript dynamically populates site
- Sync script auto-maintains

**Source Folders:**
- `M:\NiCE_Site_Repo\Additional_Documents\MAIN_PDF\` - Core publications
- `M:\NiCE_Site_Repo\Additional_Documents\WORKED_PDF\` - Applied examples

**Flow:**
```
Source folders → sync-publications.ps1 → documents/ + registry.json → Git → Cloudflare
```

---

## Workflows

### Update Existing Publication

1. Save new PDF version to source folder with version in filename:
   - Format: `Filename_v1.2.3.pdf` or `Filename.v.1.2.3.pdf`
   - Example: `KITCEY_Advanced_Analysis_FINAL.v.0.8.0.pdf`

2. Run sync and deploy:
   ```powershell
   cd M:\NiCE_Site_Repo\nice-framework
   .\sync-publications.ps1 -Deploy
   ```

Done! The script:
- Detects version change
- Copies new PDF
- Updates registry
- Commits changes
- Deploys to Cloudflare

### Add New Publication

1. Save PDF to source folder with version

2. Run sync (will copy file + warn about missing registry):
   ```powershell
   .\sync-publications.ps1
   ```

3. Add entry to [data/document-registry.json](data/document-registry.json):
   ```json
   "your-id": {
     "id": "your-id",
     "title": "Publication Title",
     "version": "1.0.0",
     "filename": "Your_File_v1.0.0.pdf",
     "category": "core",  // or "worked-example"
     "tag": "TAG NAME",
     "tagColor": "blue"
   }
   ```

4. Deploy:
   ```powershell
   .\sync-publications.ps1 -Deploy
   ```

### Clean Up Old Versions

```powershell
.\cleanup-documents.ps1 -DryRun  # Preview
.\cleanup-documents.ps1           # Remove orphaned PDFs
```

Removes any PDFs not in registry (old versions, drafts, etc.)

---

## Scripts

### sync-publications.ps1

Intelligent publication synchronization.

**What it does:**
- Scans MAIN_PDF and WORKED_PDF
- Extracts versions from filenames
- Compares to registry
- Copies new/updated files
- Updates registry
- Optionally commits and deploys

**Usage:**
```powershell
.\sync-publications.ps1                    # Preview changes
.\sync-publications.ps1 -DryRun            # Explicit preview
.\sync-publications.ps1 -Deploy            # Sync + commit + deploy
```

**Version Detection:**
Matches: `v1.2.3`, `v.1.2.3`, `.v1.2`, `v1.2`  
Example: `File.v.0.8.0.pdf` → version `0.8.0`

### cleanup-documents.ps1

Remove orphaned PDFs.

**Usage:**
```powershell
.\cleanup-documents.ps1 -DryRun  # Preview
.\cleanup-documents.ps1           # Execute removal
```

Keeps only files listed in registry.

---

## File Naming

✅ **Good:**
- `KITCEY_Advanced_Analysis_FINAL.v.0.8.0.pdf`
- `NiCE_Framework_Synthesis_v1.3.1.pdf`
- `Kitcey_2025-The_Human_Paradigm_v1.8.5.pdf`

❌ **Bad:**
- `Advanced_Analysis.pdf` (no version)
- `Analysis_0.8.0.pdf` (missing 'v')

---

## Deployment

### Automatic (via script)
```powershell
.\sync-publications.ps1 -Deploy
```

### Manual
```powershell
git add documents/* data/document-registry.json
git commit -m "update: publication sync"
git push origin main
npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main
```

**URLs:**
- Production: https://humanparadigm.org
- Preview: `https://[hash].human-paradigm-site.pages.dev`

---

## Troubleshooting

**"Everything up to date!" but I just added a file:**
- Check version in filename: `filename.v1.2.3.pdf`
- Ensure file in MAIN_PDF or WORKED_PDF
- If new publication, add registry entry first

**Version mismatch:**
- Registry uses: `"version": "1.2.3"`
- Filename can use: `v1.2.3`, `v.1.2.3`, `.v1.2.3`
- Script auto-normalizes

**Deploy failed:**
- Verify wrangler: `npx wrangler --version`
- Check auth: `npx wrangler whoami`
- Ensure git committed

---

## Quick Reference

```powershell
# Full workflow (most common)
.\sync-publications.ps1 -Deploy

# Individual steps
.\sync-publications.ps1 -DryRun   # Preview
.\sync-publications.ps1           # Sync only
.\cleanup-documents.ps1           # Remove old versions

# Manual deploy
npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main
```

---

## Current Status

Last sync: Auto-tracked in `data/document-registry.json` (`lastUpdated`)

Current publications: 14 (including 2 newly added - Insanity Quotient v0.6.2, Metaparadigm v0.7.4)

Cleanup: 10.31 MB freed from old versions
