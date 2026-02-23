# Contributing to WebMCP Directory

### Getting Started

This project uses [Bun](https://bun.sh/) for development and dependency management.

```bash
# Clone the repository
git clone https://github.com/TimLll/WebMCPDirectory.git
cd WebMCPDirectory

# Install dependencies
bun install

# Start the development server
bun run dev

# Create a new branch for your update
git checkout -b chore/your-change
```

### Adding a Website

The primary source of truth for the homepage/category experience is `src/data/webmcp-sites.json`.

> [!NOTE]
> `src/data/tools/*.json` and `src/data/tool-metadata/*.json` are generated/legacy outputs. Avoid hand-editing generated files.

Add your website entry to the appropriate category in `src/data/webmcp-sites.json`.

**Website Format:**
```json
{
  "name": "Your Website Name",
  "url": "https://example.com",
  "categories": ["productivity"],
  "tags": ["declarative", "inspector-verified"],
  "webmcp": {
    "type": "declarative",
    "status": "confirmed",
    "evidence": ["https://example.com/evidence/report"]
  }
}
```

*Submitters can also use the GitHub issue template (“Submit”) from the site header.*

### Verification & Data Health

Before submitting a Pull Request, you should run the validation script to ensure data integrity and proper formatting.

```bash
bun run check-data
```

This script checks for:
- Missing or malformed URLs
- Missing `http://` or `https://` protocols
- Duplicate URLs or slugs
- Invalid JSON structure

### Creating a Pull Request

```bash
# Add and commit your changes
git add src/data/webmcp-sites.json
git commit -m "feat(data): add [Website Name] to [Category]"

# Push to your branch
git push -u origin chore/your-change
```

### Guidelines
- **Categorization**: Use existing WebMCP categories. If unsure, use `other` and suggest a refinement in your PR description.
- **Verification First**: Prefer entries with explicit evidence links and clear status (`confirmed` or `suspected`).
- **Protocol**: All URLs should include a valid protocol `https://…` and remain accessible.
- **Validation**: Verify your JSON syntax and data validity by running `bun run check-data`.

## Änderungsnotiz

- **Was wurde geändert?** Beitragspfad von Legacy-Tool-Workflow auf WebMCP-Website-Workflow umgestellt (Datenquelle, Beispielobjekt, Branch/Commit-Konventionen, Validierungs-Hinweise).
- **Warum?** Die alte Anleitung bezog sich auf Rise-of-Machine-spezifische Inhalte und Referral-Regeln, die nicht mehr zum aktuellen Projekt passen.
- **Wie testen/prüfen?** `bun run check-data` und anschließend `bun run build` ausführen; zusätzlich einen Probe-Eintrag in `src/data/webmcp-sites.json` lokal validieren.