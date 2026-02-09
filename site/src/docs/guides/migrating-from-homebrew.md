---
title: Migrating from Homebrew
description: Move supported Homebrew packages to zerobrew
order: 1
---

## Quick migration

```bash
zb migrate
```

Migration currently categorizes installed Homebrew packages into:
- `homebrew/core` formulas (migratable)
- non-core formulas (reported, skipped)
- casks (reported, skipped)

## Non-interactive

```bash
zb migrate -y
```

Use `--force` to pass `--force` when uninstalling migrated formulas from Homebrew.

## Notes

- zerobrew and Homebrew can coexist.
- Keep PATH ordering intentional if both provide the same executable names.
- If a formula fails in zerobrew, keep using Homebrew for that formula.
