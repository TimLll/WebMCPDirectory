# Backlog

> Arbeitsregel: Bei jedem Durchgang priorisiere ich die Aufgaben in dieser Datei neu mit Blick auf den aktuellen Projektstand, Risiken und Abhängigkeiten.

## Priorität (Stand: 2026-02-28)

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
- Fire-Icon neben Submit-Button auf Theme-Blau umstellen
	- Datei: `src/layouts/Layout.astro`
	- Ziel: Das Flamme-Symbol nutzt die dominante blaue Theme-Farbe (statt „Feuer“-Farbe) und bleibt visuell konsistent mit primären UI-Elementen.

### P1
- Search-Bar: Shortcut + Search-Button-Bug beheben
	- Datei: `src/components/SearchInput.tsx`
	- Ziel: Shortcut (`⌘K`/`Ctrl+K`) und Klick auf den Search-Button müssen die Suche zuverlässig auslösen; aktuell reagieren beide nicht wie erwartet.

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
- Backlog auf aktuellen Remote-Stand gebracht und konsolidiert.
- Zwei gewünschte P1-Punkte präzise integriert:
	- Search-Bar: Shortcut + Search-Button-Bug als konkreter Fix-Task.
	- Fire-Icon: Farbvorgabe auf dominantes Theme-Blau.

## Warum?
- Der lokale Stand war unvollständig gegenüber dem Remote-Backlog.
- Die beiden UX-Themen sind prioritäre, direkt sichtbare Probleme und sollten klar umsetzbar dokumentiert sein.

## Wie testen/prüfen?
- Verifizieren, dass alle Remote-Backlog-Einträge wieder vorhanden sind.
- Bei Umsetzung der neuen Punkte:
	- Search: Shortcut und Button-Klick jeweils mit identischem Suchbegriff testen.
	- Icon-Farbe: visuell gegen primäre blaue Theme-Elemente prüfen (inkl. Light/Dark, falls vorhanden).

