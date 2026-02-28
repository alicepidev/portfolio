# portfolio

Monorepo portfolio.

## Structure
- apps/site: static-exportable site (GitHub Pages in Phase 1)
- apps/app: reserved for future dynamic features
- packages/*: shared UI, types, utilities
- docs/*: architecture and governance policies

## Guarantees
- apps/site remains static-exportable (no server runtime dependencies)
- CI/CD will enforce export gates before deployment
