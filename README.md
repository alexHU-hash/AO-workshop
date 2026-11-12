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
- `stat-builds/index.html` — stat planner at the clean `/stat-builds/` route.
- `stat-build.html` — legacy stat planner entry point; `/stat-builds/` is the clean route.
- `styles.css` — layout and styling.
- `app.js` — planner behavior, calculations, and build sharing.
- `stat-build.js` — stat allocations, class eligibility, and the three-weapon skill planner.
- `item-catalog.js`, `magic-gear-catalog.js`, `fighting-gear-catalog.js` — gear data.
- `newer-armor-records.js` — newer armor, Dragon color, and Magic/Strength bonus records.
- `wiki-armor-records.js` — per-level armor and accessory stats from matching item pages on the Arcane Odyssey Wiki.
- `assets/` — app images.
- `.github/workflows/pages.yml` — GitHub Pages deployment.

Builds are saved in the current browser's local storage. Use **Copy build code** to share a build with someone else; data is not uploaded or synchronized.

## Data and attribution

Gear and game information is compiled from the [Arcane Odyssey Armor Builder](https://arcane-odyssey-armor-builder.hexas.online/), the [Arcane Odyssey Builder](https://arcaneodyssey.co/builder/), the [Armor wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Armor), the [Accessories wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Accessories), and the [Jewelcrafting wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Jewelcrafting). Stat classes and weapon skill requirements and compatibility follow the [Stat Builds](https://roblox-arcane-odyssey.fandom.com/wiki/Stat_Builds), [Weapons](https://roblox-arcane-odyssey.fandom.com/wiki/Weapons), and [Weapon Skills](https://roblox-arcane-odyssey.fandom.com/wiki/Weapons/Skills) wiki pages. Modifier compatibility follows the [Modifiers wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Modifiers): modifiers are for armor and accessories, with the wiki's restrictions for Sunken/drop-exclusive gear, Atlantean, Virtuous, and Gilded Lost sets. Gear-stat icons are served from the Arcane Odyssey Wiki's [Gear Stats](https://roblox-arcane-odyssey.fandom.com/wiki/Gear_Stats) files. Dexterity uses the wiki's legacy Attack Speed symbol, Pierce uses Armor Piercing, and Speed is omitted from gear stats per the wiki's current list. The planner is an independent fan project and is not affiliated with Arcane Odyssey or its developers.
