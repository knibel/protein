# Deployment auf GitHub Pages

Die App ist rein statisch und braucht keinen Build.

## Einrichtung (einmalig)

1. Repository nach GitHub pushen.
2. Im Repository: **Settings → Pages**.
3. **Source:** „Deploy from a branch", Branch `main`, Ordner `/ (root)`.
4. Speichern. Nach kurzer Zeit ist die Seite erreichbar unter  
   `https://<benutzer>.github.io/<repository>/`

## Hinweise

- `.nojekyll` im Wurzelverzeichnis verhindert, dass GitHub die Dateien durch Jekyll verarbeitet.
- Alle Pfade in `index.html` sind relativ – das ist für die Unterpfad-URL nötig.
- Jeder Push auf `main` aktualisiert die Seite automatisch (dauert meist unter einer Minute).
