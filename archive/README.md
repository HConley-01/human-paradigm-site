# Archive Directory

This folder contains previous versions of interactive tools for reference and rollback.

## Versioning Convention

```
archive/
  YYYY-MM-DD/           # Date of archival
    component-vN.html   # Version number
```

## Archive Contents

### 2026-01-07
- `asymmetric-propagation-v1.html` - Original symbol/substance speed version (incorrect model)
- `asymmetric-propagation-v2-corrected.html` - Fixed N-C-E cascade with multi-lever logic
- `insanity-quotient-v1.html` - Original with hallucinated weighted formula
- `insanity-quotient-v2-corrected.html` - Fixed with correct IQm = (L×T)/(B×M) formula

## Workflow

When updating an interactive:

1. **Before editing**: Copy current live version to `archive/YYYY-MM-DD/component-vN.html`
2. **Make changes**: Edit the live file directly OR create `-corrected.html` for major rewrites
3. **Deploy**: Push to Cloudflare and GitHub
4. **Cleanup**: Move any `-corrected`, `-old`, `.backup` files to archive

## Live Files (dist/public/)

Keep only the current production versions at root:
- `asymmetric-propagation.html`
- `insanity-quotient.html`
- `triadic-space.html`
- `interactive-lab.html`
- etc.

## Rollback

To rollback: copy archived version back to root and redeploy.
