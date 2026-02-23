# Backlog

> Arbeitsregel: Bei jedem Durchgang priorisiere ich die Aufgaben in dieser Datei neu mit Blick auf den aktuellen Projektstand, Risiken und Abhängigkeiten.

## Priorität (Stand: 2026-02-23)

### P1
- CONTRIBUTING auf WebMCP-Submission-Flow aktualisieren
  - Datei: `CONTRIBUTING.md`
  - Ziel: Klar dokumentieren, dass Einreichungen über das GitHub-Issue-Form `submit-webmcp-site.yml` laufen.

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
- Neue Datei `instructions/backlog.md` angelegt.
- Alle empfohlenen, bisher nicht sofort ausgeführten Schritte als priorisierter Backlog erfasst.

## Warum?
- Offene Empfehlungen gehen nicht verloren und bleiben in einer zentralen, priorisierten Liste nachvollziehbar.

## Wie testen/prüfen?
- Prüfen, dass die Datei unter `instructions/backlog.md` existiert.
- Prüfen, dass neue Empfehlungen künftig nur dort ergänzt und priorisiert werden.
