---
title: Configuration
description: Customize zerobrew behavior with environment variables and flags
order: 2
---

## Environment Variables

CLI/global behavior currently reads:

- `ZEROBREW_ROOT` (or `--root`)
- `ZEROBREW_PREFIX` (or `--prefix`)
- `ZEROBREW_AUTO_INIT` (or `--auto-init`)

Installer scripts additionally use:
- `ZEROBREW_DIR`
- `ZEROBREW_BIN`

## Defaults

Root default logic (`zb`):
- `--root` if provided
- else `ZEROBREW_ROOT` if set
- else `/opt/zerobrew` if that path already exists
- else macOS: `/opt/zerobrew`
- else Linux: `${XDG_DATA_HOME:-$HOME/.local/share}/zerobrew`

Prefix default: `$ZEROBREW_ROOT/prefix` (unless overridden).

Concurrency default: `20`.

## CLI Overrides

```bash
zb --root /custom/root --prefix /custom/prefix install jq
zb --concurrency 8 install ffmpeg
zb --auto-init list
```

## Directory Layout

| Directory | Purpose |
|-----------|---------|
| `$ZEROBREW_ROOT/store/` | Content-addressable extracted blobs |
| `$ZEROBREW_ROOT/db/zb.sqlite3` | Install metadata |
| `$ZEROBREW_ROOT/cache/` | Download blob cache |
| `$ZEROBREW_ROOT/locks/` | Lock files |
| `$ZEROBREW_PREFIX/bin/` | Linked executables |
| `$ZEROBREW_PREFIX/Cellar/` | Materialized kegs |
