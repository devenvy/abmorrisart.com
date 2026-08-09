# abmorrisart.com

Static site for Amber Morris — Educator & Visual Artist. Built with
[Hugo](https://gohugo.io) (Extended) and deployed to GitHub Pages.

## Requirements

- **Hugo Extended** `0.164.0` — a single binary. No npm, no `node_modules`,
  nothing for Dependabot to scan. Styles are plain CSS, so there is no Sass
  toolchain to install. (The Extended build is used so Hugo's built-in image
  processing stays available for future use.)

### Install

Windows (winget):

```powershell
winget install Hugo.Hugo.Extended
```

macOS/Linux: `brew install hugo`, or download the **extended** build from
<https://github.com/gohugoio/hugo/releases>.

## Local development

```bash
hugo server
```

Then open <http://localhost:1313/>. The site rebuilds on save.

## Production build

```bash
hugo --gc --minify
```

Output is written to `public/`.

## Project structure

```
content/            Page stubs (front matter only); each maps to a layout
  _index.md         -> layouts/index.html            (home)
  portfolio.md      -> layouts/_default/portfolio.html
  services.md       -> layouts/_default/services.html
  contact.md        -> layouts/_default/contact.html
data/photos.json    Portfolio photo metadata (title, tags, image paths)
layouts/            Templates
  _default/baseof.html   Page skeleton (head + header + main + modal + scripts)
  partials/              head, header, gallery, photo-card, modal, scripts
assets/
  css/main.css      Stylesheet (plain CSS; bundled + minified by Hugo Pipes)
  js/main.js        Mobile menu, photo lightbox (pointer-swipe), portfolio filter
  images/portfolio/ Source artwork — Hugo generates resized WebP variants at build
static/
  assets/images/    logo.png (served as-is)
  assets/icons/     SVG social/UI icons
  favicon.png
  CNAME             Custom domain (abmorrisart.com)
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Hugo
and publishes to GitHub Pages (custom domain `abmorrisart.com`, set via
`static/CNAME`). Pull requests run the build as a check but do not deploy.

> GitHub Pages source must be set to **GitHub Actions** in the repository settings
> (Settings -> Pages -> Build and deployment -> Source).
