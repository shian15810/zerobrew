---
title: install
description: Install one or more packages
order: 2
---

## Usage

```bash
zb install [OPTIONS] <FORMULAS>...
```

## Options

- `--no-link` — install into Cellar/database without creating prefix symlinks.

## Description

Installs one or more formulas and their dependencies.

Current behavior:
- Formula names are normalized; `homebrew/core/<name>` is accepted.
- Non-core tap formulas are rejected.
- Install planning resolves dependencies first.
- Downloads are parallelized (`--concurrency`, default `20`).
- Linking is enabled by default unless `--no-link` is set.

## Examples

```bash
zb install jq
zb install wget git ffmpeg
zb install openssl@3 --no-link
```

> Currently, zerobrew targets Homebrew core formulas with bottles available for the current platform.
