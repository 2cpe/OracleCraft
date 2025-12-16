import * as vscode from 'vscode';
import * as path from 'path';

export interface SymbolInfo {
    name: string;
    kind: 'Procedure' | 'Function' | 'Package' | 'Trigger' | 'Type' | 'Cursor' | 'Constant' | 'Variable';
    location: vscode.Location;
    signature?: string;
    documentation?: string;
    packageName?: string;
    returnType?: string;
}

/**
 * Shared resolver for finding PL/SQL symbols and their documentation
 */
export class PLSQLSymbolResolver {

    /**
     * Find a symbol definition and details (local or workspace)
     */
    public async findSymbol(
        document: vscode.TextDocument,
        symbolName: string,
        packageName: string | null,
        token: vscode.CancellationToken
    ): Promise<SymbolInfo | undefined> {

        // 1. Try to find in current document first (if no package name or package matches current)
        if (!packageName || this.isCurrentPackage(document, packageName)) {
            const localSymbol = this.findInDocument(document, symbolName, packageName);
            if (localSymbol) {
                return localSymbol;
            }
        }

        // 2. Search in workspace
        return await this.findInWorkspace(symbolName, packageName, token);
    }

    private isCurrentPackage(document: vscode.TextDocument, packageName: string): boolean {
        // Simple check if filename matches package name
        const filename = path.basename(document.fileName).toUpperCase();
        return filename.includes(packageName.toUpperCase());
    }

    /**
     * Find definition in a specific document object
     */
    public findInDocument(
        document: vscode.TextDocument,
        symbolName: string,
        packageName: string | null
    ): SymbolInfo | undefined {
        const text = document.getText();
        const lines = text.split('\n');
        return this.parseLinesForSymbol(lines, symbolName, document.uri);
    }

    /**
     * Core parsing logic to find a symbol in lines of text
     */
    private parseLinesForSymbol(
        lines: string[],
        symbolName: string,
        uri: vscode.Uri
    ): SymbolInfo | undefined {
        const symbolUpper = symbolName.toUpperCase();

        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];
            const lineUpper = line.toUpperCase();

            // Optimization: Skip lines that don't contain the symbol name
            if (!lineUpper.includes(symbolUpper)) {
                continue;
            }

            // Procedure
            const procMatch = line.match(new RegExp(`\\bPROCEDURE\\s+(${symbolName})\\b`, 'i'));
            if (procMatch) {
                if (this.isDefinition(lines, lineNum)) {
                    return this.createSymbolInfo('Procedure', procMatch[1], lines, lineNum, uri);
                }
            }

            // Function
            const funcMatch = line.match(new RegExp(`\\bFUNCTION\\s+(${symbolName})\\b`, 'i'));
            if (funcMatch) {
                if (this.isDefinition(lines, lineNum)) {
                    return this.createSymbolInfo('Function', funcMatch[1], lines, lineNum, uri);
                }
            }

            // Package
            const pkgMatch = line.match(new RegExp(`\\bPACKAGE\\s+(?:BODY\\s+)?(${symbolName})\\b`, 'i'));
            if (pkgMatch) {
                return this.createSymbolInfo('Package', pkgMatch[1], lines, lineNum, uri);
            }

            // Type
            const typeMatch = line.match(new RegExp(`\\bTYPE\\s+(${symbolName})\\s+IS\\b`, 'i'));
            if (typeMatch) {
                return this.createSymbolInfo('Type', typeMatch[1], lines, lineNum, uri);
            }

            // Cursor
            const cursorMatch = line.match(new RegExp(`\\bCURSOR\\s+(${symbolName})\\b`, 'i'));
            if (cursorMatch) {
                return this.createSymbolInfo('Cursor', cursorMatch[1], lines, lineNum, uri);
            }

            // Constant
            const constMatch = line.match(new RegExp(`\\b(${symbolName})\\s+CONSTANT\\s+(\\w+)`, 'i'));
            if (constMatch) {
                return this.createSymbolInfo('Constant', constMatch[1], lines, lineNum, uri);
            }

            // Variable (l_ or g_ prefix convention or generally declared)
            // Tries to match "name type" pattern at start of line or after whitespace
            const varMatch = line.match(new RegExp(`^\\s*(${symbolName})\\s+(\\w+)`, 'i'));
            if (varMatch &&
                !lineUpper.includes('PROCEDURE') &&
                !lineUpper.includes('FUNCTION') &&
                !lineUpper.includes('TYPE') &&
                !lineUpper.includes('CONSTANT')
            ) {
                return this.createSymbolInfo('Variable', varMatch[1], lines, lineNum, uri);
            }
        }
        return undefined;
    }

    private createSymbolInfo(
        kind: SymbolInfo['kind'],
        name: string,
        lines: string[],
        lineNum: number,
        uri: vscode.Uri
    ): SymbolInfo {
        const signature = this.extractSignature(lines, lineNum);
        const documentation = this.extractDocumentation(lines, lineNum);
        const returnType = kind === 'Function' ? this.extractReturnType(lines, lineNum) : undefined;

        // Find column
        const col = lines[lineNum].toUpperCase().indexOf(name.toUpperCase());

        return {
            name,
            kind,
            location: new vscode.Location(uri, new vscode.Position(lineNum, col)),
            signature,
            documentation,
            returnType
        };
    }

    /**
     * Find definition in workspace files
     */
    private async findInWorkspace(
        symbolName: string,
        packageName: string | null,
        token: vscode.CancellationToken
    ): Promise<SymbolInfo | undefined> {

        const patterns: string[] = [];

        if (packageName) {
            // Prioritize package files
            patterns.push(`**/*${packageName}*.pkb`);
            patterns.push(`**/*${packageName}*.pks`);
            patterns.push(`**/*${packageName}*.pls`);
            patterns.push(`**/*${packageName}*.sql`);
        } else {
            // Broad search
            patterns.push(`**/*${symbolName}*.sql`);
            patterns.push(`**/*${symbolName}*.pls`);
            patterns.push(`**/*${symbolName}*.pkb`);
            patterns.push(`**/*${symbolName}*.pks`);
        }

        for (const pattern of patterns) {
            if (token.isCancellationRequested) return undefined;

            const files = await vscode.workspace.findFiles(pattern, '**/node_modules/**', 10);

            for (const file of files) {
                if (token.isCancellationRequested) return undefined;

                try {
                    const doc = await vscode.workspace.openTextDocument(file);
                    // Use parseLines directly to avoid re-reading text
                    const lines = doc.getText().split('\n');
                    const info = this.parseLinesForSymbol(lines, symbolName, file);

                    if (info) {
                        if (packageName) {
                            info.packageName = packageName;
                        } else {
                            // Try to guess package name from filename
                            const base = path.basename(file.fsPath);
                            info.packageName = base.split('.')[0].toUpperCase();
                        }
                        return info;
                    }
                } catch (e) {
                    console.error(`Error processing file ${file.fsPath}:`, e);
                }
            }
        }

        return undefined;
    }

    // --- Extraction Utilities ---

    private isDefinition(lines: string[], startLine: number): boolean {
        // Look ahead for IS or AS
        for (let i = startLine; i < Math.min(startLine + 20, lines.length); i++) {
            const line = lines[i].toUpperCase();
            if (/\b(IS|AS)\b/.test(line)) return true;
            if (/;/.test(line) && !/\(/.test(line)) return false; // Forward declaration
        }
        return false;
    }

    private extractSignature(lines: string[], startLine: number): string {
        let signature = '';
        let parenDepth = 0;

        for (let i = startLine; i < Math.min(startLine + 30, lines.length); i++) {
            const line = lines[i].trim();
            signature += (i > startLine ? ' ' : '') + line;

            for (const char of line) {
                if (char === '(') parenDepth++;
                else if (char === ')') parenDepth--;
            }

            // Stop at IS/AS/RETURN/semicolon if balanced
            if (parenDepth === 0) {
                if (/\b(IS|AS)\b/i.test(line) || /;$/.test(line)) {
                    break;
                }
            }
        }

        // Clean up
        signature = signature.replace(/\s+/g, ' ');
        signature = signature.replace(/\b(IS|AS)\b.*$/i, '');
        signature = signature.replace(/;$/, '');
        return signature.trim();
    }

    private extractReturnType(lines: string[], startLine: number): string | undefined {
        const fullSig = this.extractSignature(lines, startLine);
        const match = fullSig.match(/RETURN\s+(\w+(\(.*\))?)/i);
        return match ? match[1] : undefined;
    }

    private extractDocumentation(lines: string[], lineNum: number): string {
        const comments: string[] = [];
        // Scan backwards for comments
        for (let i = lineNum - 1; i >= Math.max(0, lineNum - 20); i--) {
            const line = lines[i].trim();
            if (line.startsWith('--')) {
                comments.unshift(line.substring(2).trim());
            } else if (line.endsWith('*/')) {
                // Handle block comments (simplified)
                let j = i;
                let blockContent = '';
                while (j >= 0) {
                    blockContent = lines[j].trim() + ' ' + blockContent;
                    if (lines[j].trim().startsWith('/*')) break;
                    j--;
                }
                // Clean up block comment syntax
                blockContent = blockContent.replace(/\/\*|\*\//g, '').replace(/\s+\*\s+/g, ' ').trim();
                comments.unshift(blockContent);
                i = j; // skip processed lines
            } else if (line === '') {
                // Allow one empty line gap? No, usually breaks doc block. 
                // But let's allow it if we haven't found comments yet? 
                // Strict check: immediate preceding.
                if (comments.length > 0) break;
            } else {
                break; // Code
            }
        }
        return comments.join('\n\n');
    }
}
