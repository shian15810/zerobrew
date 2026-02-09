---
title: info
description: Display information about an installed package
order: 5
---

## Usage

```bash
zb info <formula>
```

## Description

Shows local install metadata for a formula if installed:
- name
- version
- store key (short hash)
- install timestamp (humanized)

If not installed, prints a message and exits successfully.
