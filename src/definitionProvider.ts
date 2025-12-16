import * as vscode from 'vscode';
import * as path from 'path';

interface SymbolInfo {
    name: string;
    kind: 'procedure' | 'function' | 'package' | 'trigger' | 'type' | 'cursor' | 'constant' | 'variable';
    location: vscode.Location;
    parameters?: string;
    returnType?: string;
}

import { PLSQLSymbolResolver } from './symbolResolver';

/**
 * Provides Go to Definition for PL/SQL
 * Supports:
 * - Same file navigation
 * - Cross-file navigation (searching for files matching pattern)
 */
export class PLSQLDefinitionProvider implements vscode.DefinitionProvider {

    private resolver = new PLSQLSymbolResolver();

    async provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Definition | undefined> {

        const wordRange = document.getWordRangeAtPosition(position, /[\w$#]+/);
        if (!wordRange) {
            return undefined;
        }

        const word = document.getText(wordRange);
        const line = document.lineAt(position.line).text;

        // Check if it's a package.method reference
        const packageMethodMatch = line.match(new RegExp(`(\\w+)\\.${word}\\b`, 'i'));
        const packageName = packageMethodMatch ? packageMethodMatch[1] : null;

        const info = await this.resolver.findSymbol(document, word, packageName, token);
        return info ? info.location : undefined;
    }
}

/**
 * Provides workspace symbol search for PL/SQL
 */
export class PLSQLWorkspaceSymbolProvider implements vscode.WorkspaceSymbolProvider {

    async provideWorkspaceSymbols(
        query: string,
        token: vscode.CancellationToken
    ): Promise<vscode.SymbolInformation[]> {

        if (query.length < 2) {
            return [];
        }

        const symbols: vscode.SymbolInformation[] = [];
        const queryUpper = query.toUpperCase();

        // Search in PL/SQL files
        const files = await vscode.workspace.findFiles(
            '**/*.{sql,pls,pks,pkb}',
            '**/node_modules/**',
            100
        );

        for (const file of files) {
            if (token.isCancellationRequested) {
                break;
            }

            try {
                const doc = await vscode.workspace.openTextDocument(file);
                const text = doc.getText();
                const lines = text.split('\n');

                for (let lineNum = 0; lineNum < lines.length; lineNum++) {
                    const line = lines[lineNum];
                    const lineUpper = line.toUpperCase();

                    if (!lineUpper.includes(queryUpper)) {
                        continue;
                    }

                    // Procedures
                    const procMatch = line.match(/\bPROCEDURE\s+(\w+)/i);
                    if (procMatch && procMatch[1].toUpperCase().includes(queryUpper)) {
                        symbols.push(new vscode.SymbolInformation(
                            procMatch[1],
                            vscode.SymbolKind.Function,
                            path.basename(file.fsPath),
                            new vscode.Location(file, new vscode.Position(lineNum, 0))
                        ));
                    }

                    // Functions
                    const funcMatch = line.match(/\bFUNCTION\s+(\w+)/i);
                    if (funcMatch && funcMatch[1].toUpperCase().includes(queryUpper)) {
                        symbols.push(new vscode.SymbolInformation(
                            funcMatch[1],
                            vscode.SymbolKind.Function,
                            path.basename(file.fsPath),
                            new vscode.Location(file, new vscode.Position(lineNum, 0))
                        ));
                    }

                    // Packages
                    const pkgMatch = line.match(/\bPACKAGE\s+(?:BODY\s+)?(\w+)/i);
                    if (pkgMatch && pkgMatch[1].toUpperCase().includes(queryUpper)) {
                        symbols.push(new vscode.SymbolInformation(
                            pkgMatch[1],
                            vscode.SymbolKind.Module,
                            path.basename(file.fsPath),
                            new vscode.Location(file, new vscode.Position(lineNum, 0))
                        ));
                    }

                    // Triggers
                    const trigMatch = line.match(/\bTRIGGER\s+(\w+)/i);
                    if (trigMatch && trigMatch[1].toUpperCase().includes(queryUpper)) {
                        symbols.push(new vscode.SymbolInformation(
                            trigMatch[1],
                            vscode.SymbolKind.Event,
                            path.basename(file.fsPath),
                            new vscode.Location(file, new vscode.Position(lineNum, 0))
                        ));
                    }

                    // Types
                    const typeMatch = line.match(/\bTYPE\s+(\w+)\s+IS/i);
                    if (typeMatch && typeMatch[1].toUpperCase().includes(queryUpper)) {
                        symbols.push(new vscode.SymbolInformation(
                            typeMatch[1],
                            vscode.SymbolKind.Struct,
                            path.basename(file.fsPath),
                            new vscode.Location(file, new vscode.Position(lineNum, 0))
                        ));
                    }
                }
            } catch (e) {
                // Skip files that can't be opened
            }
        }

        return symbols;
    }
}
