# OracleCraft

**A modern, lightweight PL/SQL extension for Visual Studio Code**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![VS Code](https://img.shields.io/badge/VS%20Code-1.74%2B-blueviolet)

---

## ✨ Features

### 🎨 Syntax Highlighting
Comprehensive TextMate grammar covering:
- PL/SQL keywords (`BEGIN`, `END`, `DECLARE`, `EXCEPTION`)
- Control flow (`IF`, `THEN`, `ELSE`, `LOOP`, `FOR`, `WHILE`)
- Program units (`PROCEDURE`, `FUNCTION`, `PACKAGE`, `TRIGGER`)
- Data types (`VARCHAR2`, `NUMBER`, `DATE`, `BOOLEAN`, `CLOB`)
- SQL statements (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `MERGE`)
- Built-in packages (`DBMS_OUTPUT`, `DBMS_SQL`, `UTL_FILE`, `UTL_HTTP`)

### 🧠 Intelligent Autocomplete
- 210+ PL/SQL keywords, functions, and operators
- 36 built-in Oracle packages (DBMS_*, UTL_*, HTF, HTP)
- 180+ built-in functions (string, numeric, date, conversion, analytic)
- Package method completions with snippets (triggered by `.`)
- 22 Oracle predefined exceptions with error codes
- 57 Data Dictionary views (USER_*, ALL_*, DBA_*, V$*)
- Priority-sorted suggestions with emoji indicators

### 📝 Code Snippets
85+ ready-to-use templates:
- `proc` → Procedure template
- `func` → Function template
- `pkgs` → Package specification
- `pkgb` → Package body
- `trig` → Trigger template
- `excblock` → Complete exception block
- `whennodata`, `whentoomany` → Exception handlers
- `safediv`, `safesel` → Safe coding patterns
- `loop`, `while`, `forn` → Loop constructs
- `if`, `ife`, `case` → Conditionals
- `bulk`, `forall` → Bulk operations
- `merge`, `with`, `cte` → Advanced SQL

### 📖 Hover Documentation
Hover over built-in packages and keywords to see:
- Description and usage
- Syntax reference
- Code examples

**Also shows documentation for your own code:**
- Procedures and functions (with parameters)
- Types, cursors, constants, and variables
- Extracts comments as documentation

### 🔍 Go to Definition (F12)
- Navigate to procedures and functions in the same file
- Cross-file navigation for packages (e.g., `MyPackage.pkb`)
- Supports cursors, types, constants, and variables

### 📋 Document Outline (Ctrl+Shift+O)
- View all symbols in current file
- Procedures, functions, packages, triggers
- Types, cursors, constants, variables
- Nested symbols within packages

### 🌐 Workspace Symbol Search (Ctrl+T)
- Search for symbols across all PL/SQL files
- Find procedures, functions, packages, triggers

---

## 📦 Supported File Types

| Extension | Description |
|-----------|-------------|
| `.sql` | SQL and PL/SQL scripts |
| `.pls` | PL/SQL source files |
| `.pks` | Package specifications |
| `.pkb` | Package bodies |

---

## 🚀 Getting Started

1. Install OracleCraft from the VS Code Marketplace
2. Open any `.sql`, `.pls`, `.pks`, or `.pkb` file
3. Start coding with syntax highlighting, autocomplete, and snippets!

### Quick Tips
- Type `proc` + Tab to create a procedure template
- Type `DBMS_OUTPUT.` to see available methods
- Hover over `PUT_LINE` to see documentation

---

## ⚠️ Current Limitations

OracleCraft v1.0 is focused on **editing experience**. The following features are **not included** in this version:

| Feature | Status |
|---------|--------|
| Real-time diagnostics/error checking | ❌ Not available |
| Oracle database connectivity | ❌ Not available |
| Semantic/context-aware analysis | ❌ Not available |
| Language Server Protocol (LSP) | ❌ Not available |

Autocomplete is **keyword and package-based**, not semantically aware of your schema.

Go to Definition works within files and across files with matching names.

---




## 🔧 Requirements

- Visual Studio Code 1.74.0 or higher
- No additional dependencies required

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

## 📣 Feedback

Found a bug? Have a feature request? Please open an issue on our GitHub repository.

---

**OracleCraft** — *The modern PL/SQL extension for VS Code*
