# AllStunts Inc. Rigging Inventory — GitHub Edition

A GitHub Pages-ready stunt-rigging inventory app with AllStunts branding, email/password login, account creation, email verification and password reset.

Start with **SETUP-GITHUB.md**.

The inventory uses the headings from the supplied master asset register, including asset ID, category, equipment, manufacturer, company marking, SWL/WLL, service date, inspection interval, inspector, next inspection and status.

## Included

- Firebase email/password authentication
- Account creation and email verification
- Password reset and logout
- Searchable inventory register
- Asset creation, editing and deletion
- Check-in/check-out history
- Inspection alerts
- Projects and kit allocation
- Google Sheets CSV sync
- CSV import/export
- Responsive mobile/tablet/desktop design
- `.nojekyll` file for GitHub Pages

## Important data note

Operational changes are still stored in each browser. Google Sheets sync currently reads from the sheet and does not write back. A shared two-way live database requires a backend/API and cannot be secured by GitHub Pages alone.
