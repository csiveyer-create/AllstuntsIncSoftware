# Simple GitHub setup

## 1. Create the login system

1. Go to **Firebase Console** and create a project.
2. Open **Authentication → Sign-in method**.
3. Enable **Email/Password**.
4. Open **Project settings → Your apps → Add web app**.
5. Copy the Firebase configuration values into `firebase-config.js`.
6. In **Authentication → Settings → Authorised domains**, add your GitHub Pages domain, for example `yourname.github.io`.

## 2. Upload to GitHub

1. Create a new GitHub repository, for example `allstunts-inventory`.
2. Upload **all files inside this folder**. Do not upload the outer ZIP folder as an extra level.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then press **Save**.
6. GitHub will show the web address after deployment.

## 3. Create accounts

Open the GitHub Pages site and press **Create a new crew account**. The person must verify their email before they can sign in.

## 4. Connect the Google Sheet

Sign in, open **Google Sheets sync**, and paste the published CSV address for the inventory tab.

## Security note

The login protects access to the website. A Google Sheet published as CSV is still accessible to anyone who obtains its CSV address. For genuinely private sheet data, do not publish the sheet; use an authenticated backend or Google Apps Script service. The current package is designed as the simplest secure-login front end, not as a complete private database backend.
