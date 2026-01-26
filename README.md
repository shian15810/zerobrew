# zerobrew

A faster homebrew.

zerobrew takes [uv](https://github.com/astral-sh/uv)'s model to Mac packages. The key design choice here is to use a content addressable store, allowing `zb` to reuse packages across installs, along with parallelizing downloads and extraction and aggressively caching HTTP requests. It interoperates with Homebrew's CDN, so you can use traditional packages.

This leads to dramatic speedups, up to 5x cold and 20x warm. Full benchmarks [here](benchmark-results.txt).

| Package | Homebrew | ZB (cold) | ZB (warm) | Cold Speedup | Warm Speedup |
|---------|----------|-----------|-----------|--------------|--------------|
| **Overall (top 100)** | - | - | - | **2.0x** | **7.6x** |
| ffmpeg | 3034ms | 3481ms | 688ms | 0.9x | 4.4x |
| libsodium | 2353ms | 392ms | 130ms | 6.0x | 18.1x |
| sqlite | 2876ms | 625ms | 159ms | 4.6x | 18.1x |
| tesseract | 18950ms | 5536ms | 643ms | 3.4x | 29.5x | 

## Install

```bash
curl -sSL https://raw.githubusercontent.com/lucasgelfond/zerobrew/main/install.sh | bash
```

After install, run the export command it prints, or restart your terminal.

##  Using `zb`

```bash
zb install jq        # install jq
zb install wget git  # install multiple
zb uninstall jq      # uninstall
zb reset         # uninstall everything
zb gc                # garbage collect unused store entries
```

## why is it faster?

- **Content-addressable store**: packages are stored by sha256 hash (at `/opt/zerobrew/store/{sha256}/`). Reinstalls are instant if the store entry exists.
- **APFS clonefile**: materializing from store uses copy-on-write (zero disk overhead).
- **Parallel downloads**: deduplicates in-flight requests, races across CDN connections.
- **Streaming execution**: downloads, extractions, and linking happen concurrently.


## storage layout

```
/opt/zerobrew/
├── store/          # content-addressable (sha256 keys)
├── prefix/
│   ├── Cellar/     # materialized packages
│   ├── bin/        # symlinked executables
│   └── opt/        # symlinked package directories
├── cache/          # downloaded bottle blobs
├── db/             # sqlite database
└── locks/          # per-entry file locks
```

## Build from source 

```bash
cargo build --release
cargo install --path zb_cli
```

## Benchmarking

```bash
./benchmark.sh                                # 100-package benchmark
./benchmark.sh --format html -o results.html  # html report
./benchmark.sh --format json -o results.json  # json output
./benchmark.sh -c 20 --quick                  # quick test (22 packages)
./benchmark.sh -h                             # show help
```

## Status

Experimental. works for most core homebrew packages. Some formulas may need more work - please submit issues / PRs! 

