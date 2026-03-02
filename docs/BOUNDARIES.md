# BOUNDARIES

## 1. Core Principle

apps/site must remain static-exportable at all times.

---

## 2. Forbidden in apps/site

- Per-request SSR
- Server Actions for critical flows
- Runtime API routes for content
- Database clients
- Auth SDK requiring secrets
- Payment SDK server logic
- Background jobs
- Webhooks
- Any feature requiring Node runtime

---

## 3. Allowed in apps/site

- Build-time content reading (MDX/JSON)
- Client-side interactivity
- Theme switching (client-side only)
- Static SEO metadata
- Route-based locale switching

---

## 4. Shared Package Rules

packages/ui:
- No hardcoded text
- No server-only dependency

packages/types:
- Shared schema definitions only

packages/lib:
- Must not require server runtime
- Must not import Node-only modules

---

## 5. Violation Rule

If a feature violates boundaries:

1. Move it to apps/app
2. Or redesign it for build-time execution
3. Export must remain intact
