---
title: Troubleshooting
description: Common issues and practical fixes
order: 3
---

## `zb` asks for init or fails in CI

By default, non-interactive sessions do not prompt for initialization.

Fix options:

```bash
zb init
# or
zb --auto-init list
# or
export ZEROBREW_AUTO_INIT=1
```

## Unsupported package errors

Current support focuses on core formulas with compatible bottles.

If a package is from a non-core tap or has no compatible bottle for your platform, use Homebrew for that package.

## Permission issues

If root/prefix directories are not writable, init/reset may require sudo.
Prefer fixing ownership of zerobrew paths rather than running all commands as root.

## Path issues

Ensure both binary dirs are reachable in your shell:
- `ZEROBREW_BIN` (where `zb` is installed)
- `ZEROBREW_PREFIX/bin` (linked package executables)
