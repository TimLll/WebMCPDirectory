⚠️ PROTOTYPE NOTICE
This project is currently a prototype and is under active development.
Content, data model, UX, and APIs may change at short notice.

WebMCP Directory

WebMCP Directory is a curated directory of websites with WebMCP adoption,
including categorization, discovery, and verification signals.

Site: https://webmcpdirectory.com/

Current Project Status (February 2026)

- Frontend built with Astro 5 + React 19.
- Search and filter UI (including categories, "new" filter, and saved favorites).
- Dynamic pages for categories and tool detail pages.
- JSON-LD/schema components for SEO (including WebSite, Organization, ItemList).
- Data-driven architecture via `src/data/*.json`, including split tool metadata.
- Data pipeline via Bun scripts (slugs, splitting, metadata generation, validation).
- Baseline tests with Vitest (including utilities in `src/utils`).

Development

- Install: `bun install`
- Dev-Server: `bun run dev`
- Build: `bun run build`
- Preview: `bun run preview`
- Tests: `bun run test:run`
- Validate data: `bun run check-data`

Note

The current focus is on stable data processing, curated content quality,
and iterative improvements to search, UX, and verification indicators.