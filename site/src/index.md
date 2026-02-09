---
title: Zerobrew
layout: layouts/base.njk
---

{% include "components/home/hero.njk" %}
{% include "components/home/install-benchmark.njk" %}

## Why zerobrew

zerobrew is a CLI-first package manager designed as a practical replacement for common Homebrew workflows. It keeps the formulas and package names you already use, while changing the execution model underneath: store-first installs, better reuse of downloaded artifacts, and a simpler, more predictable filesystem layout. The result is less repeated work, especially when reinstalling or managing larger sets of packages.

{% set cards = home.whyCards %}
{% set cols = 3 %}
{% include "components/home/card-grid.njk" %}

## What you can do today

Today, zerobrew is best suited for users who want faster installs for core formula workflows without learning a new command model. You can start small with a few packages or migrate an existing setup incrementally.

- Install core Homebrew formulas with `zb install`.
- Migrate an existing Homebrew setup with `zb migrate`.
- Clean up store space with `zb gc`.

## Get started

If you're evaluating zerobrew, the quickest path is: install, run a few real package installs, and then compare behavior with your current setup. The docs are organized so you can begin with practical setup and only go deeper into architecture or command details when needed.

{% set cards = home.startCards %}
{% set cols = 2 %}
{% include "components/home/card-grid.njk" %}

<script src="/js/home.js" defer></script>
