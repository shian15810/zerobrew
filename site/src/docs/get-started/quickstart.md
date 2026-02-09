---
title: Quickstart
order: 2
description: Get zerobrew installed in under a minute
---

## Install zerobrew

```bash
curl -sSL https://raw.githubusercontent.com/lucasgelfond/zerobrew/main/install.sh | bash
```

After install, run the export command printed by the installer (or restart your terminal).

> **Tip:** the installer can install Rust automatically if it's missing.

## Your first package

```bash
zb install jq
```

## Common commands

| Command | Description |
|---------|-------------|
| `zb install <package>` | Install a package |
| `zb uninstall <package>` | Remove a package |
| `zb list` | Show installed packages |
| `zb info <package>` | Display package details |

## Install multiple packages

```bash
zb install wget git ffmpeg sqlite
```

zerobrew resolves dependencies and installs in parallel where possible.

## Migrate from Homebrew

```bash
zb migrate
```

This will:
1. Detect installed Homebrew formulas.
2. Install them via zerobrew.
3. Optionally remove them from Homebrew.

See the migration guide for current behavior and limitations.
