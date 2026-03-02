# CI/CD POLICY

## 1. Workflow Structure

Two workflows:

1. site-pr.yml (PR validation)
2. site-pages.yml (main deployment)

---

## 2. PR Validation

On Pull Request:

- lint
- typecheck
- build
- export

Target: apps/site only

---

## 3. Main Deployment

On push to main:

- Run full validation
- Deploy to GitHub Pages
- Upload site-export.zip artifact

---

## 4. Branch Policy

- No direct commits to main
- Feature branches only
- PR required for merge
- main must always remain deployable
