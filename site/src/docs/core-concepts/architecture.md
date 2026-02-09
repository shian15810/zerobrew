---
title: Architecture
description: How zerobrew installs packages
order: 1
---

## Overview

zerobrew installs Homebrew formula bottles into a local store + Cellar/prefix layout.

Current high-level flow:
1. Fetch formula metadata from Homebrew API.
2. Resolve dependency closure.
3. Select platform bottle per formula.
4. Download bottles (parallel, configurable concurrency).
5. Verify/store by SHA-256 key.
6. Materialize into `PREFIX/Cellar/<name>/<version>`.
7. Link files into prefix (`bin`, `lib`, `include`, `share`, `opt`) unless `--no-link`.
8. Record install metadata in SQLite.

## Storage Model

- Store entries are keyed by bottle SHA-256.
- Uninstall removes links + Cellar entry + install metadata.
- Store entries remain until `zb gc` removes unreferenced keys.

## Platform details

- macOS: tries `clonefile()` first for materialization.
- Other cases: falls back to hardlink/copy strategies.
- Path placeholder patching is applied per platform during materialization.

## Compatibility scope (current)

- Core formulas are supported when compatible bottles exist.
- Non-core taps and casks are not supported by zerobrew migration/install flow.
