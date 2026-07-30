# AllStunts Rigging Asset Manager

GitHub Pages-ready static web app.

## Included inventory

The package includes **1612 rows** extracted from the uploaded 2025 Master Asset Register PDF. The inventory loads automatically on first use.

## Upload to GitHub

1. Create or open a GitHub repository.
2. Upload the **contents of this folder**, keeping the folders intact.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, `main`, `/ (root)`.
5. Save and open the GitHub Pages address.

## Connect the live Google Sheet

1. In Google Sheets choose **File → Share → Publish to web**.
2. Select the inventory sheet/tab and choose **Comma-separated values (.csv)**.
3. Copy the published link.
4. In the app open **Settings**, paste the link under **Live Google Sheet**, and press **Sync from Sheet**.

The published CSV must use the same register headings, including Asset ID, Category, Equipment, Manufacturer, WLL/SWL, inspection dates and Current Status.

Note: a published CSV link is accessible to anyone who has the link. Secure private-sheet access and automatic background sync require a backend or Google authentication.
