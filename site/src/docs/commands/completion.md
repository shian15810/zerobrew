---
title: completion
description: Generate shell completion scripts
order: 10
---

## Usage

```bash
zb completion <SHELL>
```

Supported shells currently: `bash`, `elvish`, `fish`, `powershell`, `zsh`.

## Examples

```bash
zb completion zsh > ~/.zsh/completions/_zb
zb completion bash > ~/.local/share/bash-completion/completions/zb
zb completion fish > ~/.config/fish/completions/zb.fish
```

You can also use the helper script from the repository root:

```bash
./install-completions.sh
```
