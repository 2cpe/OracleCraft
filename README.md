# OracleCraft

> A modern, lightweight PL/SQL extension for Visual Studio Code — syntax highlighting, autocomplete, snippets, and Go-to-Definition for Oracle files.

[![Version](https://img.shields.io/visual-studio-marketplace/v/2cpe.oraclecraft?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=2cpe.oraclecraft)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/2cpe.oraclecraft)](https://marketplace.visualstudio.com/items?itemName=2cpe.oraclecraft)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/2cpe.oraclecraft)](https://marketplace.visualstudio.com/items?itemName=2cpe.oraclecraft)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build](https://github.com/2cpe/OracleCraft/actions/workflows/ci.yml/badge.svg)](https://github.com/2cpe/OracleCraft/actions/workflows/ci.yml)

---

## Why OracleCraft?

If you write Oracle PL/SQL inside VS Code, you already know the stock `sql` grammar doesn't understand `BEGIN…END` blocks, package specs, `%ROWTYPE`, or the `DBMS_*` family. OracleCraft fixes that with a purpose-built TextMate grammar and a focused feature set.

## ✨ Features

### 🎨 Syntax Highlighting

Comprehensive TextMate grammar covering:

- **PL/SQL structure** — `DECLARE`, `BEGIN`, `END`, `EXCEPTION`, `IS`, `AS`
- **Control flow** — `IF`, `THEN`, `ELSE`, `ELSIF`, `LOOP`, `FOR`, `WHILE`, `EXIT`
- **Program units** — `PROCEDURE`, `FUNCTION`, `PACKAGE`, `TRIGGER`, `TYPE`, `BODY`
- **Data types** — `VARCHAR2`, `NUMBER`, `DATE`, `BOOLEAN`, `CLOB`, `BLOB`, `PLS_INTEGER`
- **SQL** — `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `MERGE`
- **Built-in packages** — `DBMS_OUTPUT`, `DBMS_SQL`, `UTL_FILE`, `UTL_HTTP`, `DBMS_RANDOM`, …
- **Cursor attributes** — `%ROWTYPE`, `%TYPE`, `%FOUND`, `%NOTFOUND`, `%ROWCOUNT`
- **Comments** — single-line `--` and multi-line `/* */`, plus Q-quoted strings

### 🧠 Intelligent Autocomplete

210+ PL/SQL completions, priority-sorted:

| Category | Count | Examples |
|---|---|---|
| Keywords | 100+ | `BEGIN`, `END`, `DECLARE`, `EXCEPTION` |
| Built-in packages | 36 | `DBMS_OUTPUT`, `UTL_FILE`, `HTF`, `HTP` |
| Built-in functions | 180+ | String, numeric, date, conversion, analytic |
| Predefined exceptions | 22 | `NO_DATA_FOUND`, `TOO_MANY_ROWS`, `DUP_VAL_ON_INDEX` |
| Data dictionary views | 57 | `USER_TABLES`, `ALL_TAB_COLUMNS`, `DBA_OBJECTS`, `V$SQL` |

Trigger package methods with `.`:
```sql
DBMS_OUTPUT.   -- shows PUT_LINE, PUT, NEW_LINE, …
DBMS_SQL.      -- shows OPEN_CURSOR, PARSE, EXECUTE, …
```

### 📝 Code Snippets

85+ ready-to-use templates — type the prefix, hit **Tab**:

| Prefix | Inserts |
|---|---|
| `proc` / `procp` | Procedure template |
| `func` / `funcp` | Function template |
| `pkgs` / `pkgb` | Package spec / body |
| `trig` | Trigger template |
| `excblock` | Complete exception handler block |
| `whennodata` / `whentoomany` | Specific exception handlers |
| `safediv` / `safesel` | Safe-coding patterns |
| `loop` / `while` / `forn` | Loop constructs |
| `if` / `ife` / `case` | Conditionals |
| `bulk` / `forall` | Bulk operations |
| `merge` / `with` / `cte` | Advanced SQL |

Full list: [`snippets/plsql.snippets.json`](snippets/plsql.snippets.json).

### 📖 Hover Documentation

Hover over any built-in package or key construct to see:

- Description and intended usage
- Syntax reference
- Inline code example

### 🔎 Go to Definition (F12)

Resolves symbols **across files** — jump from a `pkg.proc_name` call to its definition, even across `.pks` ↔ `.pkb` splits.

### 🌳 Document Outline & Workspace Symbols

- **Outline view** — see all procedures, functions, packages, triggers in the current file.
- **Ctrl+T** — workspace-wide symbol search across `.sql`, `.pls`, `.pks`, `.pkb`.

---

## 📦 Supported File Types

| Extension | Description |
|---|---|
| `.sql` | SQL and PL/SQL scripts |
| `.pls` | PL/SQL source files |
| `.pks` | Package specifications |
| `.pkb` | Package bodies |

---

## 🚀 Getting Started

1. Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=2cpe.oraclecraft)
2. Open any `.sql`, `.pls`, `.pks`, or `.pkb` file
3. Start coding — syntax highlighting, autocomplete, and snippets are all on by default

**Quick tips:**

- Type `proc` + **Tab** to scaffold a procedure
- Type `DBMS_OUTPUT.` to see method completions
- Hover over `PUT_LINE` to see documentation

---

## ⚠️ Current Limitations

OracleCraft focuses on the **editing experience**, not compilation. The following are out of scope for v1.x:

| Feature | Status |
|---|---|
| Real-time diagnostics / error checking | ❌ |
| Oracle database connectivity | ❌ |
| Semantic analysis of your schema | ❌ |
| Language Server Protocol (LSP) | ❌ |

Autocomplete is **keyword and built-in package based**, not schema-aware.

---

## 🤝 Contributing

Contributions are very welcome — bug reports, feature requests, and pull requests. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow.

Found a bug? [Open an issue](../../issues) with the **Bug Report** template.

---

## 🔒 Security

OracleCraft does not connect to a database, transmit any data, or execute user code. The full security disclosure process is in [SECURITY.md](SECURITY.md).

---

## 📄 License

[MIT](LICENSE) © 2026 2cpe

---

## 📣 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes.
