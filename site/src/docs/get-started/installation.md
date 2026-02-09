---
title: Installation
order: 3
description: Detailed installation options for zerobrew
---

## Quick install

```bash
curl -sSL https://raw.githubusercontent.com/lucasgelfond/zerobrew/main/install.sh | bash
```

> Do not run installer with `sudo`.

## What install.sh does (current)

1. Ensures required tools exist.
2. Installs Rust via rustup if missing.
3. Clones/updates repo at `ZEROBREW_DIR` (default `~/.zerobrew`).
4. Builds `zb` and `zbx`.
5. Installs binaries to `ZEROBREW_BIN` (default `~/.local/bin`).
6. Runs `zb init` (respects `--no-modify-path` when passed to install script).

## Defaults

| Variable | Default |
|----------|---------|
| `ZEROBREW_ROOT` | `/opt/zerobrew` on macOS; Linux uses `/opt/zerobrew` if it exists, otherwise `${XDG_DATA_HOME:-$HOME/.local/share}/zerobrew` |
| `ZEROBREW_PREFIX` | `$ZEROBREW_ROOT/prefix` |
| `ZEROBREW_DIR` | `~/.zerobrew` |
| `ZEROBREW_BIN` | `~/.local/bin` |

## Completions

Generate manually:

```bash
zb completion zsh
zb completion bash
zb completion fish
```

or run:

```bash
./install-completions.sh
```
