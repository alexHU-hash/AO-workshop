# Arcane Odyssey Gear Workshop

A static, browser-based Arcane Odyssey gear planner. It requires no server, build step, or package installation.

## Run locally

Serve this folder over HTTP, for example:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>. The app also works from a local `index.html`, but an HTTP server more closely matches GitHub Pages.

## Publish with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder to its root.
2. Push the files to the `main` branch.
3. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
4. The included workflow deploys the site on each push to `main`. Follow the Pages link shown in the workflow run when it completes.

The site uses relative asset and script paths, so it works both at a project URL (`https://<user>.github.io/<repository>/`) and a user-site URL.

## Project files

- `index.html` — page structure and local script/style includes.
- `styles.css` — layout and styling.
- `app.js` — planner behavior, calculations, and build sharing.
- `item-catalog.js`, `magic-gear-catalog.js`, `fighting-gear-catalog.js` — gear data.
- `assets/` — app images.
- `.github/workflows/pages.yml` — GitHub Pages deployment.

Builds are saved in the current browser's local storage. Use **Copy build code** to share a build with someone else; data is not uploaded or synchronized.

## Data and attribution

Gear and game information is compiled from the [Arcane Odyssey Builder](https://arcaneodyssey.co/builder/) and the [Arcane Odyssey Wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Armor). The planner is an independent fan project and is not affiliated with Arcane Odyssey or its developers.
