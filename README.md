# Risk Sentinel AI

A static web app for monitoring UK business risks, generating AI-style risk summaries, maintaining a live risk register, viewing dashboard exposure, and saving alert preferences.

## Run Locally

```sh
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Deploy To Vercel

This is a static site. In Vercel, import the GitHub repository and use these settings:

- Framework preset: Other
- Build command: leave empty
- Output directory: `.`
- Install command: leave empty

The included `vercel.json` adds clean URLs and a basic security header.

## Deploy To GitHub Pages

Push this folder to a GitHub repository, then enable Pages:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/root`

## Files

- `index.html`: app structure
- `styles.css`: responsive visual design
- `app.js`: search, register, dashboard, alerts and local storage
