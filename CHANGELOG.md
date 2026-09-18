# Changelog

All notable changes to OracleCraft will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.4] - 2026-09-18

### Fixed
- **File associations**: `.pls`, `.pks`, and `.pkb` files no longer open as "Plain Text" in VS Code. VS Code's renderer log showed the extension's grammar registration was being silently rejected due to a malformed manifest entry. The fix follows the canonical pattern from [microsoft/vscode#145659](https://github.com/microsoft/vscode/issues/145659#issuecomment-1075675165): a runtime `vscode.workspace.onDidOpenTextDocument` listener reassigns any matching file that VS Code has tagged as `plaintext`.
- **Manifest schema**: `contributes.languages[].icon` is now a proper `{ light, dark }` object (required by the manifest schema). The same database-cylinder SVG is used for both themes.
- **Activation events**: Dropped `onLanguage:oracle-sql` (the `oracle-sql` language ID belongs to the Oracle SQL Developer extension). The runtime listener handles compatibility with that extension.

### Added
- Database-cylinder SVG icon (`images/plsql-icon.svg`) for `.sql`, `.pls`, `.pks`, `.pkb` files.

## [1.0.0] - 2025-12-16

### Added
- Initial public release.
- Comprehensive PL/SQL syntax highlighting (TextMate grammar).
- 210+ autocomplete suggestions: PL/SQL keywords, built-in packages, built-in functions, predefined exceptions, data dictionary views.
- 85+ code snippets (`proc`, `func`, `pkgs`, `pkgb`, `trig`, `loop`, `bulk`, …).
- Hover documentation for built-in packages and key constructs.
- Document symbols (Outline view) and Workspace symbol search (Ctrl+T).
- Go to Definition within and across files.

[1.0.0]: https://github.com/2cpe/OracleCraft/releases/tag/v1.0.0
