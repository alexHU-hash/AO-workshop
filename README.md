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
- `stat-build.js` — stat allocations, class eligibility, and the three-weapon skill planner with wiki-derived weapon levels.
- `item-catalog.js`, `magic-gear-catalog.js`, `fighting-gear-catalog.js` — gear data.
- `newer-armor-records.js` — newer armor, Dragon color, and Magic/Strength bonus records.
- `wiki-armor-records.js` — per-level armor and accessory stats from matching item pages on the Arcane Odyssey Wiki.
- `dragon-armor-records.js` — exact per-color Dragon gear stats and level overrides from the wiki equipment module.
- `assets/` — app images.
- `.github/workflows/pages.yml` — GitHub Pages deployment.

Builds are saved in the current browser's local storage. Use **Copy build code** to share a build with someone else; data is not uploaded or synchronized.

## Data and attribution

The stat-build planner estimates the current class from the percentages of points invested so far; unspent points are excluded.

Gear and game information is compiled from the [Arcane Odyssey Armor Builder](https://arcane-odyssey-armor-builder.hexas.online/), the [Arcane Odyssey Builder](https://arcaneodyssey.co/builder/), the [Armor wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Armor), the [Accessories wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Accessories), and the [Jewelcrafting wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Jewelcrafting). Stat classes and weapon skill requirements, compatibility, variants, levels, and quality slot counts follow the [Stat Builds](https://roblox-arcane-odyssey.fandom.com/wiki/Stat_Builds), [Weapons](https://roblox-arcane-odyssey.fandom.com/wiki/Weapons), and [Weapon Skills](https://roblox-arcane-odyssey.fandom.com/wiki/Weapons/Skills) wiki pages. Named special weapons are selectable alongside base weapon types; they use their wiki-listed type, variant, quality, and fixed level, and inherit that base type's skill compatibility. Unique weapons use normal-weapon skill scaling. The selector puts named weapons first and can filter options by name or type. Arcanium variants are available only for Conjurers, and Strength variants only for Warlords; weapon selections are cleared or adjusted when the estimated class changes. Poor quality weapons have 2 skill slots, Average have 3, and Good/Great have 4 plus an Ultimate Art slot; the planner offers only qualities listed for each weapon variant and uses that quality's lowest wiki-listed weapon level. Weapon Slot 5 Ultimate Arts add 80 Weapons points for normal weapons or 40 Weapons and 40 hybrid-stat points for Strength/Arcanium weapons; Soaring Eagle, Ardent Rise, and Strong Force remain normal moves in that slot. Other Ultimate Art thresholds follow the [Spells](https://roblox-arcane-odyssey.fandom.com/wiki/Spells) and [Techniques](https://roblox-arcane-odyssey.fandom.com/wiki/Techniques) wiki pages: 200 stat points beyond a move's unlock requirement. Modifier compatibility follows the [Modifiers wiki](https://roblox-arcane-odyssey.fandom.com/wiki/Modifiers): modifiers are for armor and accessories; items marked incompatible allow only Atlantean (subject to Virtuous compatibility), with the wiki's restrictions for Sunken/drop-exclusive gear and Gilded Lost sets. Gear-stat icons are served from the Arcane Odyssey Wiki's [Gear Stats](https://roblox-arcane-odyssey.fandom.com/wiki/Gear_Stats) files. Dexterity uses the wiki's legacy Attack Speed symbol, Pierce uses Armor Piercing, and Speed is omitted from gear stats per the wiki's current list. The planner is an independent fan project and is not affiliated with Arcane Odyssey or its developers.

Dragon color stats and level overrides follow the wiki's [equipment data module](https://roblox-arcane-odyssey.fandom.com/wiki/Module:Equipment/data).

Non-Dragon Arcanium armor and accessories other than Arcanium Bracelets can use regular modifiers; Dragon gear remains Atlantean-only.

Dragon gear uses the exact stat rows for its selected color. Regular Dragon gear defaults to Brown; Corrupted Dragon gear defaults to Dragon. Since the wiki lists only colored set items, a Dragon color cannot be cleared.
