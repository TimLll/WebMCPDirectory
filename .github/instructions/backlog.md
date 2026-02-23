# Backlog

> Arbeitsregel: Bei jedem Durchgang priorisiere ich die Aufgaben in dieser Datei neu mit Blick auf den aktuellen Projektstand, Risiken und Abhängigkeiten.

## Priorität (Stand: 2026-02-23)

### P1
- CONTRIBUTING auf WebMCP-Submission-Flow aktualisieren
  - Datei: `CONTRIBUTING.md`
  - Ziel: Klar dokumentieren, dass Einreichungen über das GitHub-Issue-Form `submit-webmcp-site.yml` laufen.

### P1
- Footer-Links „Privacy“ und „Terms“ inhaltlich überarbeiten
  - Datei: `src/pages/privacy.astro`, `src/pages/terms.astro`, ggf. Footer-Kontext in `src/layouts/Layout.astro`
  - Ziel: Inhalte auf aktuellen WebMCP-Kontext, Datenverarbeitung und rechtliche Hinweise abstimmen.

### P1
- Submit-Button-Ende-zu-Ende-Funktionalität prüfen
  - Datei: `src/layouts/Layout.astro` (Link-Ziel), ggf. Issue-Template unter `.github/ISSUE_TEMPLATE/submit-webmcp-site.yml`
  - Ziel: Sicherstellen, dass der Button auf das korrekte Repository/Template zeigt und der Submission-Flow vollständig funktioniert.

### P1
- Fire-Icon-Verhalten verbessern (Hover + Tooltip)
  - Datei: `src/layouts/Layout.astro`
  - Ziel: Hover-Farbe des Icons auf `var(--blue5)` setzen und einen klaren Tooltip zur Funktion (Filter „neu eingereichte/neue Websites“) ergänzen.

### P1
- Search-Shortcut „⌘K“/`Ctrl+K` funktional prüfen
  - Datei: `src/components/SearchInput.tsx`
  - Ziel: Verifizieren, dass Shortcut zuverlässig den Fokus ins Suchfeld setzt und das sichtbare Shortcut-Hint zur Funktion passt.

### P1
- Default-Sortierung der Websites alphabetisch ergänzen
  - Datei: `src/components/CardsContainer.tsx`, ggf. Sortier-Utilities unter `src/utils/`
  - Ziel: Ohne aktive Filter/Sortieraktion sollen Website-Karten standardmäßig A→Z nach Name dargestellt werden.

### P1
- Neue Hintergrundfarbe für Header und Karten definieren
  - Datei: `src/layouts/Layout.astro`, `src/components/Card.css`
  - Ziel: Für Masthead-Container und Kartenhintergrund eine abgestimmte neue Theme-Farbe einführen (über Design-Token/Variablen, keine Hardcodes).

### P2
- Detailseite auf WebMCP-Datenmodell migrieren
  - Datei: `src/pages/tools/[slug].astro`
  - Ziel: Detailansicht nicht mehr aus altem Tool-Datensatz ableiten, sondern aus `src/data/webmcp-sites.json`.

### P3
- SEO/Schema für neue WebMCP-Entity prüfen und anpassen
  - Dateien: `src/components/schema/ItemListSchema.astro`, ggf. betroffene Seiten unter `src/pages/`
  - Ziel: Strukturierte Daten auf „WebMCP Websites“ statt „AI Tools/SoftwareApplication“ ausrichten.

### P4
- Altbestand offener „Tool Suggestion“-Issues triagieren
  - Ort: GitHub Issues (historischer Flow)
  - Ziel: Alte Meldungen in neues WebMCP-Schema überführen oder als legacy markieren.

## Was wurde geändert?
- Fünf neue Backlog-Punkte ergänzt:
  - Submit-Button-Funktionalität prüfen.
  - Fire-Icon-Hoverfarbe und Tooltip schärfen.
  - Search-Shortcut `⌘K`/`Ctrl+K` funktional prüfen.
  - Alphabetische Default-Sortierung der Websites ergänzen.
  - Neue Hintergrundfarbe für Header und Karten definieren.

## Warum?
- Offene UI-/UX- und Darstellungsanforderungen bleiben sichtbar priorisiert und gehen nicht im Chat-Verlauf verloren.

## Wie testen/prüfen?
- Prüfen, dass die fünf neuen Punkte unter `## Priorität` als eigene Aufgaben enthalten sind.
- Bei Umsetzung: zusätzlich visuell prüfen, dass Header/Karten neue Hintergrundfarbe nutzen, und funktional prüfen, dass die Standardliste alphabetisch sortiert ist.
