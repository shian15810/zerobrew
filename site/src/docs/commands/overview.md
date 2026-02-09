---
title: Commands Overview
description: Complete reference for all zerobrew commands
order: 1
---

## Command Structure

```bash
zb [OPTIONS] <COMMAND>
```

### Global Options

| Option | Description |
|--------|-------------|
| `--root <PATH>` | Override root data directory (env: `ZEROBREW_ROOT`) |
| `--prefix <PATH>` | Override install prefix (env: `ZEROBREW_PREFIX`) |
| `--concurrency <N>` | Download concurrency (default: `20`, must be `>= 1`) |
| `--auto-init` | Auto-run initialization when required (env: `ZEROBREW_AUTO_INIT`) |
| `--version` | Print version information |
| `--help` | Print help |

## Commands

- **install** — install one or more formulas.
- **bundle** — install formulas from a manifest file (default: `./Brewfile`).
- **uninstall** — remove one or more installed formulas.
- **migrate** — migrate Homebrew-installed formulas.
- **list** — show installed formulas.
- **info** — show metadata for an installed formula.
- **gc** — remove unreferenced store entries.
- **reset** — clear zerobrew data and re-initialize directories.
- **init** — initialize directories and shell config.
- **completion** — generate shell completions.
- **run** — run a formula executable, installing it first if needed.

## Quick Reference

```bash
zb install jq
zb bundle -f Brewfile
zb uninstall jq
zb list
zb info jq
zb migrate -y
zb gc
zb reset -y
zb init --no-modify-path
zb completion zsh
zb run jq -- --version
```
