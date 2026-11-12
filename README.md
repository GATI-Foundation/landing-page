# GATI Labour Market Intelligence Tools

Landing page that links every GATI Foundation labour market intelligence tool.
Plain static site: no build step, no dependencies.

## Files

```
index.html               page markup (header, hero, tools, about, contact, footer)
assets/js/tools.js       the tool list: titles, links, descriptions (edit this one)
assets/js/hub.js         splash loader, menu, rendering from tools.js
assets/css/hub.css       styles (GATI teal #006B76 / #00383E and gold #E5A812)
assets/img/              GATI logo (colour and white) and favicon
vercel.json              Vercel settings
```

## Add or change a tool

Edit `assets/js/tools.js`. Each entry becomes a row in the Tools section, a step
in the pathway strip under the hero, and a link in the footer.

## Deploy on Vercel (new link)

1. Create a new GitHub repository, for example `GATI-Foundation/lmi-tools-hub`,
   and push the contents of this folder to it (index.html at the repository root).
2. In Vercel, choose Add New, then Project, and import that repository.
3. Framework Preset: Other. Build command: leave empty. Output directory: leave empty.
4. Deploy. Vercel gives a link such as `lmi-tools-hub.vercel.app`.
   A custom domain (for example `tools.gatifoundation.org`) can be added under
   Project, Settings, Domains.
