# Changelog

All notable changes to OracleCraft will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-12-16

### 🎉 Initial Release

OracleCraft v1.0.0 is the first public release, providing a modern PL/SQL editing experience for Visual Studio Code.

### Added

#### Syntax Highlighting
- Comprehensive TextMate grammar for PL/SQL
- Support for all major PL/SQL constructs (procedures, functions, packages, triggers)
- SQL keyword highlighting (SELECT, INSERT, UPDATE, DELETE, etc.)
- Built-in package recognition (DBMS_OUTPUT, DBMS_SQL, UTL_FILE, UTL_HTTP, etc.)
- String literals including Q-quoted strings
- Single-line (`--`) and multi-line (`/* */`) comments
- Numeric literals and operators

#### Autocomplete
- 100+ PL/SQL keyword completions
- Control flow constructs (IF, LOOP, FOR, WHILE, CASE)
- Program unit keywords (PROCEDURE, FUNCTION, PACKAGE, TRIGGER)
- Data type completions (VARCHAR2, NUMBER, DATE, BOOLEAN, etc.)
- Built-in package suggestions with descriptions
- Package method completions triggered by `.`
- Cursor attributes (%ROWTYPE, %TYPE, %FOUND, %NOTFOUND, %ROWCOUNT)
- Exception names (NO_DATA_FOUND, TOO_MANY_ROWS, etc.)

#### Code Snippets
- `proc` / `procp` - Procedure templates
- `func` / `funcp` - Function templates
- `pkgs` - Package specification
- `pkgb` - Package body
- `trig` - Trigger template
- `anon` / `sanon` - Anonymous blocks
- `exc` / `exco` - Exception handlers
- `cur` / `curf` / `curfe` - Cursor declarations and loops
- `loop` / `while` / `forn` / `forr` - Loop constructs
- `if` / `ife` / `ifee` - Conditional statements
- `case` / `casex` - Case statements
- `selinto` / `bulk` / `forall` - Data operations
- `exim` - Execute immediate
- `raise` - Raise application error
- `put` - DBMS_OUTPUT.PUT_LINE
- `rec` / `tabt` / `ntt` / `varr` - Type declarations
- `lv` / `const` - Variable declarations

#### Hover Documentation
- DBMS_OUTPUT package and methods
- DBMS_SQL package and methods
- UTL_FILE package and methods
- UTL_HTTP package and methods
- DBMS_RANDOM package and methods
- DBMS_LOB package and methods
- Key PL/SQL constructs (EXECUTE IMMEDIATE, BULK COLLECT, FORALL)
- Error handling (RAISE_APPLICATION_ERROR, SQLCODE, SQLERRM)
- Cursor attributes (%ROWTYPE, %TYPE)
- Common exceptions (NO_DATA_FOUND, TOO_MANY_ROWS)

#### Language Configuration
- Comment support (line and block)
- Bracket matching
- Auto-closing pairs
- Code folding for PL/SQL blocks

### Supported File Types
- `.sql` - SQL and PL/SQL scripts
- `.pls` - PL/SQL source files
- `.pks` - Package specifications
- `.pkb` - Package bodies

---

## [Unreleased]

### Planned for v1.1
- Document Symbols / Outline Provider
- Completion priority sorting
- Expanded hover documentation
- Basic syntax-level diagnostics
