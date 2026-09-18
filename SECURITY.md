# Security Policy

## Supported Versions

OracleCraft is a single-maintainer project. The following versions receive security updates:

| Version | Supported |
|---|---|
| 1.0.x   | ✅        |
| < 1.0   | ❌        |

## Reporting a Vulnerability

OracleCraft is a **client-side VS Code extension** with no network calls, no telemetry, and no filesystem writes outside of standard extension behavior. The attack surface is small.

If you discover a vulnerability:

1. **Do not open a public GitHub issue.**
2. Open a **private security advisory** at
   https://github.com/2cpe/OracleCraft/security/advisories/new
3. Include:
   - A description of the issue and its impact
   - Steps to reproduce
   - Affected versions

You should expect an acknowledgement within 7 days. Critical issues are patched as soon as possible; lower-severity findings may be batched with the next release.

## Notes

- OracleCraft does **not** execute PL/SQL, connect to databases, or transmit any data.
- The extension only reads text documents and contributes language features (highlighting, completions, hover, symbols).
- All static data shipped with the extension (keywords, packages, exceptions) is public Oracle documentation.
