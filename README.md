# OracleCraft

> A modern, lightweight PL/SQL extension for Visual Studio Code — syntax highlighting, autocomplete, snippets, and Go-to-Definition for Oracle files.

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/2cpe.oraclecraft)](https://marketplace.visualstudio.com/items?itemName=2cpe.oraclecraft)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/2cpe.oraclecraft)](https://marketplace.visualstudio.com/items?itemName=2cpe.oraclecraft)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## What it does

Adds proper editing support for Oracle PL/SQL files in VS Code. The stock `sql` grammar doesn't understand `BEGIN…END` blocks, package specs, `%ROWTYPE`, or the `DBMS_*` family — OracleCraft fills that gap.

## Supported file types

| Extension | Use |
|---|---|
| `.sql` | SQL and PL/SQL scripts |
| `.pls` | PL/SQL source files |
| `.pks` | Package specifications |
| `.pkb` | Package bodies |

## Features

- **Syntax highlighting** — TextMate grammar covering PL/SQL keywords, control flow, program units, data types, SQL, built-in packages (`DBMS_OUTPUT`, `DBMS_SQL`, `UTL_FILE`, …), cursor attributes, and comments.
- **Autocomplete** — 210+ suggestions: PL/SQL keywords, 36 built-in packages, 180+ functions, 22 predefined exceptions, 57 data dictionary views. Package method completions trigger on `.`.
- **Snippets** — 85+ templates: `proc`, `func`, `pkgs`, `pkgb`, `trig`, `bulk`, `forall`, … Type the prefix and press **Tab**.
- **Hover documentation** — descriptions and examples for built-in packages and key constructs.
- **Go to Definition (F12)** — cross-file navigation including `.pks` ↔ `.pkb` package splits.
- **Outline view** and **Ctrl+T workspace symbol search**.

## Installation

Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=2cpe.oraclecraft). After installation, open any `.sql`, `.pls`, `.pks`, or `.pkb` file — features activate automatically.

## Limitations

OracleCraft focuses on the **editing experience**, not compilation. It does not:

- Connect to Oracle databases
- Provide schema-aware autocomplete
- Run diagnostics or error checking
- Implement the Language Server Protocol

## Development

```bash
npm install
npm run compile      # type-check and build to out/
npm run watch        # rebuild on file changes
```

Press **F5** in VS Code to launch an Extension Development Host with the extension loaded.

## License

[MIT](LICENSE)
