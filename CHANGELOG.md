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

---

## [1.0.4] - 2026-09-18

### Fixed

#### Root cause: VS Code was rejecting grammar + icon registrations
VS Code's renderer log exposed 3 real errors that explained every previous failure:

```
[error] [2cpe.oraclecraft]: property `icon` can be omitted and must be of type `object` with properties `light` and `dark` of type `string`
[error] [2cpe.oraclecraft]: Unknown language in `contributes.grammars.language`. Provided value: plsql
[error] [2cpe.oraclecraft]: Unknown language in `contributes.grammars.language`. Provided value: oracle-sql
```

The language ID `oracle-sql` belongs to the **Oracle SQL Developer extension** — it is not a registered language ID for our extension. VS Code rejected the duplicate grammar/snippet entries because the language `oracle-sql` is not in our `contributes.languages[].id` list.

Fixes:
- **Icon**: Changed from a single string `"./images/plsql-icon.svg"` to an object `{ "light": "...", "dark": "..." }` per the manifest schema. The same SVG is used for both themes (as requested).
- **Aliases**: Removed `"oracle-sql"` from `aliases`. That language ID is owned by the Oracle SQL Developer extension and must not be claimed by OracleCraft.
- **Grammars**: Reduced to a single entry for `language: "plsql"`. The runtime hook in `extension.ts` (already added in v1.0.3) handles `oracle-sql` files by reassigning them to `oracle-sql` and registering all providers for both language IDs at runtime.
- **Snippets**: Reduced to a single entry for `language: "plsql"`.
- **Activation events**: Removed `onLanguage:oracle-sql` since OracleCraft does not own that language ID. The runtime reassignment listener catches those files.

This is the genuine root-cause fix. The previous v1.0.3 runtime hook was correct, but the broken static registrations in `package.json` were preventing the grammar from loading at all.

---

## [1.0.3] - 2026-09-18

### Fixed

#### Deep fix: "Plain Text" edge case (.pls/.sql showing as plaintext)
- Added `onLanguage:plaintext` activation event. Without it, the extension never activates when VS Code opens `.pls`/`.sql`/`.pks`/`.pkb` files as `plaintext` (no built-in mapping, restricted workspace, missing user setting), and the runtime reassignment has no chance to run.
- Replaced the one-shot `forceLanguageAssociation()` with a proper `vscode.workspace.onDidOpenTextDocument` listener. The listener fires for **every** new file open (not just at activation), so newly created or reopened files get reassigned too.
- Refactored into reusable `reassignIfNeeded()` and `isPlsqlFile()` helpers in `extension.ts`.

This is the canonical Microsoft-recommended pattern for extensions that need to claim extensions VS Code does not know about — see [microsoft/vscode#145659](https://github.com/microsoft/vscode/issues/145659#issuecomment-1075675165).

---

## [1.0.2] - 2026-09-18

### Fixed

#### Force language association at activation
- Extension now reassigns any currently-open `.pls`, `.sql`, `.pks`, `.pkb` file that VS Code has opened as `plaintext` (e.g. in restricted/untrusted workspaces or when the static `extensions` association is bypassed). The `forceLanguageAssociation()` runtime hook calls `vscode.languages.setTextDocumentLanguage(doc, 'oracle-sql')` for matching files at activation time.
- This is a defensive runtime fix layered on top of the static `contributes.languages[].extensions` registration. It guarantees the language ID gets applied even in the edge cases VS Code's default extension mapping misses.
- README documents the manual `files.associations` workaround for cases where runtime reassignment is not enough.

---

## [1.0.1] - 2026-09-18

### Fixed

#### Compatibility
- Extension now activates for files with language ID `oracle-sql` (Oracle SQL Developer extension compatibility), in addition to native `plsql`. Closes [#1](https://github.com/2cpe/OracleCraft/issues/1).
- Added `oracle-sql` language alias and second `onLanguage:oracle-sql` activation event.
- All providers (completion, hover, document symbols, definition, workspace symbols) now register for both `plsql` and `oracle-sql` language IDs simultaneously.
- Grammar and snippet contributions now include `oracle-sql` as a separate scope, ensuring syntax highlighting and snippets work for files opened with that language ID.
- Added custom database-cylinder SVG icon (`images/plsql-icon.svg`) for `.sql`, `.pls`, `.pks`, `.pkb` files. Uses a single shared icon for both light and dark themes.
