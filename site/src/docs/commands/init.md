---
title: init
description: Initialize zerobrew directories
order: 9
---

## Usage

```bash
zb init [OPTIONS]
```

## Options

- `--no-modify-path` — create directories but skip shell config edits.

## Description

Creates required root/prefix directories and (unless disabled) appends a `# zerobrew` block to your shell config.

The shell block exports:
- `ZEROBREW_DIR`
- `ZEROBREW_BIN`
- `ZEROBREW_ROOT`
- `ZEROBREW_PREFIX`
- `PKG_CONFIG_PATH`

It also appends `ZEROBREW_BIN` and `ZEROBREW_PREFIX/bin` to PATH and sets SSL certificate env vars when matching files/dirs exist.
