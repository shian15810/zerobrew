---
title: Introduction
order: 1
description: A faster, modern package manager
---

![zerobrew demo](/assets/images/demo.gif)

## What is zerobrew?

zerobrew applies [uv](https://github.com/astral-sh/uv)'s model to macOS/Linux packages. Packages live in a content-addressable store (sha256), so reinstalls are instant. Downloads, extraction, and linking run in parallel with aggressive HTTP caching.

It pulls from Homebrew's CDN, so you can usually swap `brew` for `zb`.

## Read next

- [Quickstart](/docs/get-started/quickstart/) — get running in under a minute.
- [Commands overview](/docs/commands/overview/)
- [Architecture](/docs/core-concepts/architecture/)
- [Migrating from Homebrew](/docs/guides/migrating-from-homebrew/)

## Performance snapshot

zerobrew can deliver large speedups, especially on warm installs.

| Package | Homebrew | ZB (cold) | ZB (warm) | Cold Speedup | Warm Speedup |
|---------|----------|-----------|-----------|--------------|--------------|
| **Overall** | 452s | 226s | 59s | **2.0x** | **7.6x** |
| ffmpeg | 3.03s | 3.48s | 0.69s | 0.9x | 4.4x |
| libsodium | 2.35s | 0.39s | 0.13s | 6.0x | 18.1x |
| sqlite | 2.88s | 0.63s | 0.16s | 4.6x | 18.1x |
| tesseract | 18.95s | 5.54s | 0.64s | 3.4x | 29.5x |

> **Note:** “Cold” means the package is not in the store yet. “Warm” means it is already cached.

## Why it’s faster

- **Content-addressable store:** packages stored by sha256, deduplicated by design.
- **Efficient materialization paths:** clonefile/hardlink/copy strategies reduce repeated work.
- **Parallel pipeline:** download, extract, and link overlap.
- **Streaming execution:** less idle time between stages.

## Quick example

```bash
# Install a package
zb install jq

# Install multiple packages
zb install wget git ffmpeg

# List installed packages
zb list

# Uninstall a package
zb uninstall jq
```

> **Warning:** zerobrew is still experimental. Most core formulas work, but edge cases exist.
