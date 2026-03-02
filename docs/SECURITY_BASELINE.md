# SECURITY BASELINE

## 1. Secrets Policy

apps/site must not contain:

- API keys
- Database credentials
- Private tokens

No secrets may be exposed in static output.

---

## 2. Environment Variables

If environment variables are used:

- Provide .env.example
- Do not commit real .env
- Use platform secrets for apps/app

---

## 3. Analytics & Privacy

If analytics is enabled:

- Must provide Privacy Policy
- Must comply with local privacy requirements
- Must not break static export

Phase 1 default:
Analytics disabled.
