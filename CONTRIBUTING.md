# Contributing to OracleCraft

Thank you for your interest in contributing! OracleCraft is a small, focused VS Code extension and contributions of all sizes are welcome.

## Getting Started

1. Fork the repository and clone your fork locally.
2. Install Node.js 18+ and npm.
3. Run `npm install` to fetch dependencies.
4. Open the folder in VS Code and press **F5** to launch an Extension Development Host with the extension loaded.

## Development Workflow

```bash
# Watch-mode compile
npm run watch

# Type-check only
npm run compile

# Lint (when ESLint is wired up)
npm run lint
```

Inside the Extension Development Host, open any `.sql`, `.pls`, `.pks`, or `.pkb` file and verify your changes work as expected.

## Project Structure

```
.
├── images/                  # Extension icons
├── snippets/                # VS Code snippet definitions
├── src/                     # TypeScript source
│   ├── data/                # Static data: keywords, packages, exceptions
│   ├── types/               # Shared type definitions
│   ├── completionProvider.ts
│   ├── definitionProvider.ts
│   ├── documentSymbolProvider.ts
│   ├── hoverProvider.ts
│   ├── symbolResolver.ts
│   └── extension.ts         # Entry point — activate() and deactivate()
├── syntaxes/                # TextMate grammar (plsql.tmLanguage.json)
├── test/                    # Sample PL/SQL file (no test runner yet — see #2)
├── language-configuration.json
├── package.json             # Extension manifest
└── tsconfig.json
```

## Adding New Completions

Completions are powered by static data tables in `src/data/`:

| File | What it holds |
|---|---|
| `keywords.ts` | PL/SQL keywords (`BEGIN`, `END`, `DECLARE`, …) |
| `builtinPackages.ts` | DBMS_*, UTL_*, HTF, HTP packages and methods |
| `builtinFunctions.ts` | String, numeric, date, conversion, analytic functions |
| `exceptions.ts` | Predefined Oracle exceptions with error codes |
| `dataDictionary.ts` | USER_*, ALL_*, DBA_*, V$* views |

Each entry exports a `CompletionItem`-shaped object with `label`, `insertText`, `detail`, `documentation`, and `kind`. To add a new entry, append to the relevant array and run `npm run compile`.

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new user-facing capability
- `fix:` — bug fix
- `docs:` — documentation only
- `refactor:` — internal change with no behavior difference
- `test:` — adding or correcting tests
- `chore:` — tooling, dependencies, meta

Example: `fix: reassign plaintext .pls files to plsql on open`

## Pull Requests

- Open a PR against `main`.
- Ensure `npm run compile` is clean (no TypeScript errors).
- Reference any related issue (`Closes #12`).
- Keep PRs focused — one logical change per PR.
- If your change is user-visible, update `CHANGELOG.md` under `[Unreleased]`.

## Reporting Bugs

Use the **Bug Report** issue template. Include:

- VS Code version (`Code > About`)
- OracleCraft version (from the Extensions panel)
- Steps to reproduce
- The contents of `View > Output > OracleCraft` if relevant
- A minimal `.pls`/`.sql`/`.pks`/`.pkb` sample that triggers the issue

## Feature Requests

Use the **Feature Request** issue template. Describe the use case, the proposed behavior, and any alternatives you considered.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
