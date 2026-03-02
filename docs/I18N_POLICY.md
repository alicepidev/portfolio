# I18N POLICY

## 1. URL Strategy

Default locale has no prefix.

- English: /
- French: /fr
- Chinese: /zh (reserved, not linked in Phase 1)

All locale routes must be exportable.

---

## 2. Route-Based Localization

Examples:

/projects
/fr/projects

---

## 3. UI Text Rules

All UI strings must live in:

apps/site/messages/{locale}.json

Example keys:

nav.projects
home.heroTitle
cta.contact

No hardcoded text in shared UI components.

---

## 4. Migration Policy

Phase 1:
- No i18n library required

Phase 2:
- May adopt next-intl or equivalent
- URL structure must remain unchanged
- Message keys must remain stable
- Static export must remain functional
