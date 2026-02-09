---
title: migrate
description: Migrate packages from Homebrew to zerobrew
order: 6
---

## Usage

```bash
zb migrate [OPTIONS]
```

## Options

- `-y` — skip confirmation prompts.
- `--force` — pass `--force` to `brew uninstall` during post-migration removal.

## Description

Migration inspects installed Homebrew packages and splits them into:
- core formulas (`homebrew/core`) — attempted in zerobrew
- non-core tap formulas — reported as unsupported
- casks — reported as unsupported

Only successfully migrated core formulas are considered for Homebrew uninstall.

## Notes

- Migration shells out to `brew info --json=v1 --installed` and `brew list --cask`.
- Formulas are migrated one-by-one.
- zerobrew currently supports core formulas with compatible bottles.
