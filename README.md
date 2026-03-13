# Dev Toolkit — Chrome Extension

[![GitHub stars](https://img.shields.io/github/stars/yurukusa/dev-toolkit-ext?style=social)](https://github.com/yurukusa/dev-toolkit-ext)

**440+ developer tools in your browser toolbar. Search, favorites, zero tracking.**

A Chrome/Firefox extension that gives you instant access to the entire [Dev Toolkit](https://yurukusa.github.io/dev-toolkit/) collection from your browser toolbar.

## Features

- **440+ tools** across 8 categories: Code, Design, Writing, Data, AI, Media, DevOps, Security
- **Instant search** — find any tool in milliseconds
- **Favorites** — star your most-used tools
- **Recent tools** — tracks what you've used
- **Category filters** — browse by type
- **Zero permissions** — only uses Chrome storage for preferences
- **No tracking, no ads, no data collection**

## Install

### Chrome Web Store
Coming soon — pending developer registration.

### Firefox Add-ons
Under review at [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/dev-toolkit-440-devtools/)

### Manual Install (Developer Mode)
1. Clone this repo
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" → select this folder

## Privacy

This extension:
- Stores only your favorites and recent tools locally
- Makes no network requests except to open tool pages
- Collects zero data
- Has zero permissions beyond `storage`

See [privacy.html](privacy.html) for full privacy policy.

## Source

Every tool is a standalone HTML file from [yurukusa/dev-toolkit](https://github.com/yurukusa/dev-toolkit). Open source, no build step, works offline.

## License

MIT
