---
title: reset
description: Clear zerobrew data and re-initialize
order: 8
---

## Usage

```bash
zb reset [OPTIONS]
```

## Options

- `-y` — skip confirmation prompt.

## Description

Clears contents of `ZEROBREW_ROOT` and `ZEROBREW_PREFIX`, then runs initialization again.

Notes:
- `zb reset` skips the normal init pre-check and can run even if zerobrew is not initialized.
- In non-interactive mode, permission failures do not prompt for sudo.
- Reset re-initializes shell config behavior like `zb init`.
