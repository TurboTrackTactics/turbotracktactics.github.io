# Turbo Track Tactics – Website

Website zum Brettspiel **Turbo Track Tactics**, einem taktischen Rennspiel für 4 bis 8 Spieler.

Live (Testphase): https://turbotracktactics.github.io

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `index.html` | Die Hauptseite (Onepager) |
| `impressum.html` | Impressum |
| `datenschutz.html` | Datenschutzerklärung |
| `assets/css/style.css` | Gestaltung |
| `assets/js/main.js` | Menü, Parallax, Scrollanzeige, E-Mail-Schutz, Streckenanimation |
| `assets/img/` | Bilder (WebP) und Logo-Dateien (SVG) |
| `assets/fonts/` | Schriften Saira und Saira Extra Condensed (SIL Open Font License) |

Die Seite kommt ohne Frameworks, Build-Schritt, Cookies und externe Dienste aus. Alle Dateien werden direkt von GitHub Pages ausgeliefert.

## Texte ändern

Alle Texte stehen in `index.html` und lassen sich direkt auf github.com bearbeiten (Datei öffnen, Stift-Symbol, Änderungen speichern). Nach ein bis zwei Minuten ist die Änderung live.

## Testphase: keine Suchmaschinen

Jede Seite enthält `<meta name="robots" content="noindex, nofollow">`. Damit tauchen die Seiten nicht in Google & Co. auf. Die `robots.txt` erlaubt das Crawlen bewusst, denn nur so sehen Suchmaschinen den `noindex`-Hinweis.

**Vor dem offiziellen Start** diese Zeile in `index.html`, `impressum.html` und `datenschutz.html` entfernen.

## Umzug zum eigenen Webhosting (später)

1. Kontaktformular ergänzen (PHP) und Datenschutzerklärung anpassen (Hosting-Anbieter, Formular).
2. `noindex` entfernen.
3. Automatischen FTP-Upload per GitHub Action einrichten.
4. Repository danach bei Bedarf auf privat stellen.

## Rechtliches

Texte, Grafiken, Kartendesigns und Spielregeln © 2026 Turbo Track Tactics. Alle Rechte vorbehalten.
