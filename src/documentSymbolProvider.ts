import * as vscode from 'vscode';

/**
 * Provides document symbols for PL/SQL files
 * Shows: Procedures, Functions, Packages, Triggers, Types, Cursors, Variables, Constants
 */
export class PLSQLDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.DocumentSymbol[]> {

        const symbols: vscode.DocumentSymbol[] = [];
        const text = document.getText();
        const lines = text.split('\n');

        // Track package context for nested symbols
        let currentPackage: vscode.DocumentSymbol | null = null;
        let currentPackageBody: vscode.DocumentSymbol | null = null;

        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];
            const trimmedLine = line.trim();

            // Skip comments
            if (trimmedLine.startsWith('--') || trimmedLine.startsWith('/*')) {
                continue;
            }

            // Package Specification
            const pkgSpecMatch = line.match(/CREATE\s+(?:OR\s+REPLACE\s+)?PACKAGE\s+(?:BODY\s+)?(\w+)/i);
            if (pkgSpecMatch && !/BODY/i.test(line)) {
                const name = pkgSpecMatch[1];
                const range = this.findBlockRange(lines, lineNum, 'PACKAGE');
                const symbol = new vscode.DocumentSymbol(
                    name,
                    'Package Specification',
                    vscode.SymbolKind.Module,
                    range,
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );
                symbols.push(symbol);
                currentPackage = symbol;
                continue;
            }

            // Package Body
            const pkgBodyMatch = line.match(/CREATE\s+(?:OR\s+REPLACE\s+)?PACKAGE\s+BODY\s+(\w+)/i);
            if (pkgBodyMatch) {
                const name = pkgBodyMatch[1];
                const range = this.findBlockRange(lines, lineNum, 'PACKAGE');
                const symbol = new vscode.DocumentSymbol(
                    name,
                    'Package Body',
                    vscode.SymbolKind.Module,
                    range,
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );
                symbols.push(symbol);
                currentPackageBody = symbol;
                continue;
            }

            // Standalone Procedure (CREATE OR REPLACE PROCEDURE)
            const standaloneProcMatch = line.match(/CREATE\s+(?:OR\s+REPLACE\s+)?PROCEDURE\s+(\w+)/i);
            if (standaloneProcMatch) {
                const name = standaloneProcMatch[1];
                const range = this.findBlockRange(lines, lineNum, 'PROCEDURE');
                const params = this.extractParameters(lines, lineNum);
                const symbol = new vscode.DocumentSymbol(
                    name,
                    params ? `(${params})` : 'Procedure',
                    vscode.SymbolKind.Function,
                    range,
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );
                symbols.push(symbol);
                continue;
            }

            // Standalone Function (CREATE OR REPLACE FUNCTION)
            const standaloneFuncMatch = line.match(/CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\s+(\w+)/i);
            if (standaloneFuncMatch) {
                const name = standaloneFuncMatch[1];
                const range = this.findBlockRange(lines, lineNum, 'FUNCTION');
                const returnType = this.extractReturnType(lines, lineNum);
                const symbol = new vscode.DocumentSymbol(
                    name,
                    returnType ? `→ ${returnType}` : 'Function',
                    vscode.SymbolKind.Function,
                    range,
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );
                symbols.push(symbol);
                continue;
            }

            // Trigger
            const triggerMatch = line.match(/CREATE\s+(?:OR\s+REPLACE\s+)?TRIGGER\s+(\w+)/i);
            if (triggerMatch) {
                const name = triggerMatch[1];
                const range = this.findBlockRange(lines, lineNum, 'TRIGGER');
                const symbol = new vscode.DocumentSymbol(
                    name,
                    'Trigger',
                    vscode.SymbolKind.Event,
                    range,
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );
                symbols.push(symbol);
                continue;
            }

            // Procedure declaration in package spec/body (not CREATE)
            const procDeclMatch = line.match(/^\s*PROCEDURE\s+(\w+)/i);
            if (procDeclMatch && !line.match(/CREATE/i)) {
                const name = procDeclMatch[1];
                const isDeclaration = !this.hasIS_AS(lines, lineNum);
                const range = isDeclaration
                    ? new vscode.Range(lineNum, 0, lineNum, line.length)
                    : this.findBlockRange(lines, lineNum, 'PROCEDURE');
                const params = this.extractParameters(lines, lineNum);
                const symbol = new vscode.DocumentSymbol(
                    name,
                    params ? `(${params})` : (isDeclaration ? 'Declaration' : 'Procedure'),
                    vscode.SymbolKind.Method,
                    range,
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );

                if (currentPackageBody) {
                    currentPackageBody.children.push(symbol);
                } else if (currentPackage) {
                    currentPackage.children.push(symbol);
                } else {
                    symbols.push(symbol);
                }
                continue;
            }

            // Function declaration in package spec/body (not CREATE)
            const funcDeclMatch = line.match(/^\s*FUNCTION\s+(\w+)/i);
            if (funcDeclMatch && !line.match(/CREATE/i)) {
                const name = funcDeclMatch[1];
                const isDeclaration = !this.hasIS_AS(lines, lineNum);
                const range = isDeclaration
                    ? new vscode.Range(lineNum, 0, lineNum, line.length)
                    : this.findBlockRange(lines, lineNum, 'FUNCTION');
                const returnType = this.extractReturnType(lines, lineNum);
                const symbol = new vscode.DocumentSymbol(
                    name,
                    returnType ? `→ ${returnType}` : (isDeclaration ? 'Declaration' : 'Function'),
                    vscode.SymbolKind.Method,
                    range,
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );

                if (currentPackageBody) {
                    currentPackageBody.children.push(symbol);
                } else if (currentPackage) {
                    currentPackage.children.push(symbol);
                } else {
                    symbols.push(symbol);
                }
                continue;
            }

            // Cursor declaration
            const cursorMatch = line.match(/^\s*CURSOR\s+(\w+)/i);
            if (cursorMatch) {
                const name = cursorMatch[1];
                const symbol = new vscode.DocumentSymbol(
                    name,
                    'Cursor',
                    vscode.SymbolKind.Interface,
                    new vscode.Range(lineNum, 0, lineNum, line.length),
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );

                if (currentPackageBody || currentPackage) {
                    (currentPackageBody || currentPackage)!.children.push(symbol);
                } else {
                    symbols.push(symbol);
                }
                continue;
            }

            // Type declaration
            const typeMatch = line.match(/^\s*TYPE\s+(\w+)\s+IS/i);
            if (typeMatch) {
                const name = typeMatch[1];
                const isRecord = /RECORD/i.test(line);
                const isTable = /TABLE/i.test(line);
                const isRef = /REF\s+CURSOR/i.test(line);
                let detail = 'Type';
                if (isRecord) detail = 'Record Type';
                if (isTable) detail = 'Table Type';
                if (isRef) detail = 'Ref Cursor Type';

                const symbol = new vscode.DocumentSymbol(
                    name,
                    detail,
                    vscode.SymbolKind.Struct,
                    new vscode.Range(lineNum, 0, lineNum, line.length),
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );

                if (currentPackageBody || currentPackage) {
                    (currentPackageBody || currentPackage)!.children.push(symbol);
                } else {
                    symbols.push(symbol);
                }
                continue;
            }

            // Constant declaration
            const constMatch = line.match(/^\s*(\w+)\s+CONSTANT\s+(\w+)/i);
            if (constMatch) {
                const name = constMatch[1];
                const dataType = constMatch[2];
                const symbol = new vscode.DocumentSymbol(
                    name,
                    `Constant: ${dataType}`,
                    vscode.SymbolKind.Constant,
                    new vscode.Range(lineNum, 0, lineNum, line.length),
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );

                if (currentPackageBody || currentPackage) {
                    (currentPackageBody || currentPackage)!.children.push(symbol);
                } else {
                    symbols.push(symbol);
                }
                continue;
            }

            // Variable declaration (common patterns)
            const varMatch = line.match(/^\s*([gl]_\w+)\s+(\w+)/i);
            if (varMatch && !/CONSTANT/i.test(line) && !/PROCEDURE|FUNCTION|BEGIN|END|IF|LOOP|FOR/i.test(line)) {
                const name = varMatch[1];
                const dataType = varMatch[2];
                const symbol = new vscode.DocumentSymbol(
                    name,
                    `Variable: ${dataType}`,
                    vscode.SymbolKind.Variable,
                    new vscode.Range(lineNum, 0, lineNum, line.length),
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );

                if (currentPackageBody || currentPackage) {
                    (currentPackageBody || currentPackage)!.children.push(symbol);
                } else {
                    symbols.push(symbol);
                }
                continue;
            }

            // Exception declaration
            const excMatch = line.match(/^\s*(\w+)\s+EXCEPTION\s*;/i);
            if (excMatch) {
                const name = excMatch[1];
                const symbol = new vscode.DocumentSymbol(
                    name,
                    'Exception',
                    vscode.SymbolKind.Event,
                    new vscode.Range(lineNum, 0, lineNum, line.length),
                    new vscode.Range(lineNum, 0, lineNum, line.length)
                );

                if (currentPackageBody || currentPackage) {
                    (currentPackageBody || currentPackage)!.children.push(symbol);
                } else {
                    symbols.push(symbol);
                }
                continue;
            }
        }

        return symbols;
    }

    /**
     * Find the range of a PL/SQL block (from declaration to END name;)
     */
    private findBlockRange(lines: string[], startLine: number, blockType: string): vscode.Range {
        let endLine = startLine;
        let depth = 0;
        let foundBegin = false;

        for (let i = startLine; i < lines.length; i++) {
            const line = lines[i].toUpperCase();

            // Count BEGIN/END pairs
            if (/\bBEGIN\b/.test(line)) {
                foundBegin = true;
                depth++;
            }

            // Check for END
            if (/\bEND\b/.test(line)) {
                if (foundBegin) {
                    depth--;
                    if (depth <= 0) {
                        endLine = i;
                        break;
                    }
                } else {
                    // END without BEGIN (e.g., package spec END)
                    endLine = i;
                    break;
                }
            }

            // Safety limit
            if (i - startLine > 5000) break;
        }

        return new vscode.Range(startLine, 0, endLine, lines[endLine]?.length || 0);
    }

    /**
     * Check if procedure/function has IS or AS (implementation vs declaration)
     */
    private hasIS_AS(lines: string[], startLine: number): boolean {
        for (let i = startLine; i < Math.min(startLine + 10, lines.length); i++) {
            const line = lines[i];
            if (/\b(IS|AS)\b/i.test(line) && !/DETERMINISTIC|PIPELINED/i.test(line)) {
                return true;
            }
            if (/;/.test(line) && !/\(/.test(line)) {
                return false; // Declaration ends with semicolon
            }
        }
        return false;
    }

    /**
     * Extract parameters from procedure/function signature
     */
    private extractParameters(lines: string[], startLine: number): string | null {
        let fullText = '';
        for (let i = startLine; i < Math.min(startLine + 20, lines.length); i++) {
            fullText += ' ' + lines[i];
            if (/\b(IS|AS|RETURN)\b/i.test(lines[i])) break;
        }

        const match = fullText.match(/\(([^)]+)\)/);
        if (match) {
            // Simplify parameter list
            const params = match[1]
                .split(',')
                .map(p => {
                    const parts = p.trim().split(/\s+/);
                    return parts[0]; // Just parameter name
                })
                .join(', ');
            return params.length > 50 ? params.substring(0, 47) + '...' : params;
        }
        return null;
    }

    /**
     * Extract return type from function signature
     */
    private extractReturnType(lines: string[], startLine: number): string | null {
        let fullText = '';
        for (let i = startLine; i < Math.min(startLine + 10, lines.length); i++) {
            fullText += ' ' + lines[i];
            if (/\b(IS|AS)\b/i.test(lines[i])) break;
        }

        const match = fullText.match(/RETURN\s+(\w+)/i);
        return match ? match[1] : null;
    }
}
