# AllStunts Rigging Inventory — GitHub Pages build

## Upload
Upload every file and folder in this package to the **root** of your GitHub repository. In **Settings → Pages**, deploy from the `main` branch and `/(root)`.

## Included
- White background, black text and artwork
- Grey hover/selection states
- 1,612 assets from the supplied PDF register
- Google Sheets CSV sync
- Black-and-white interactive world map
- Custom containers and journey history
- what3words location lookup

## what3words setup
Create a what3words API key, then open **Settings → what3words** in the app and save the key. The prototype stores the key in that browser's local storage. For a public production system, keep the API key in a secure backend instead.

## Refresh after upload
Use a hard refresh: **Command + Shift + R** on Mac or **Ctrl + F5** on Windows. Confirm the sidebar says `BUILD 2026.07.30.3`.


## Build 2026.07.30.4

- Grey table and card hover states
- Inspection Mode with one-click pass and failed-inspection actions
- Passed inspections set the next inspection date to six months from today
- Failed inspections mark the asset inactive
- Inspection Certificates tab with local PDF/JPG/PNG upload and download

Certificate files are stored in the browser used to upload them. They are not shared between devices until a hosted database is added.
