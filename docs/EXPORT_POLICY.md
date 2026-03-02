# EXPORT POLICY

## 1. Static Export Requirement

apps/site must produce a fully static output.

The export must include:

- HTML files
- CSS
- JavaScript
- Images
- Fonts (self-hosted)
- sitemap.xml
- robots.txt
- 404.html

---

## 2. Self-Contained Output

Export output must:

- Run on any static host
- Not require server runtime
- Not depend on external CDN for critical assets

---

## 3. CI Enforcement

Every Pull Request must pass:

- lint
- typecheck
- build
- export

If export fails:
- PR must not merge

---

## 4. Backup Artifact

CI must generate:

- site-export.zip

This allows portability to:

- cPanel
- GCP
- Any static host
