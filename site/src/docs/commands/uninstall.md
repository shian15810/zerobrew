---
title: uninstall
description: Remove an installed package
order: 3
---

## Usage

```bash
zb uninstall [OPTIONS] [FORMULAS]...
```

## Options

- `--all` — uninstall every currently installed formula.

## Description

Removes installed formulas by name. Uninstall removes links, DB metadata, and Cellar entries.

Store blobs are kept and can be removed later with `zb gc`.

## Examples

```bash
zb uninstall jq
zb uninstall jq wget
zb uninstall --all
```
