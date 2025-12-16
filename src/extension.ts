import * as vscode from 'vscode';
import { PLSQLCompletionProvider } from './completionProvider';
import { PLSQLHoverProvider } from './hoverProvider';
import { PLSQLDocumentSymbolProvider } from './documentSymbolProvider';
import { PLSQLDefinitionProvider, PLSQLWorkspaceSymbolProvider } from './definitionProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('OracleCraft extension is now active!');

    const selector: vscode.DocumentSelector = { language: 'plsql', scheme: 'file' };

    // Register completion provider for PL/SQL
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        selector,
        new PLSQLCompletionProvider(),
        '.', // Trigger on dot for package.method completions
        ' '  // Trigger on space for keyword completions
    );

    // Register hover provider for PL/SQL
    const hoverProvider = vscode.languages.registerHoverProvider(
        selector,
        new PLSQLHoverProvider()
    );

    // Register document symbol provider for outline view
    const documentSymbolProvider = vscode.languages.registerDocumentSymbolProvider(
        selector,
        new PLSQLDocumentSymbolProvider()
    );

    // Register definition provider for Go to Definition (F12)
    const definitionProvider = vscode.languages.registerDefinitionProvider(
        selector,
        new PLSQLDefinitionProvider()
    );

    // Register workspace symbol provider for Go to Symbol (Ctrl+T)
    const workspaceSymbolProvider = vscode.languages.registerWorkspaceSymbolProvider(
        new PLSQLWorkspaceSymbolProvider()
    );

    context.subscriptions.push(
        completionProvider,
        hoverProvider,
        documentSymbolProvider,
        definitionProvider,
        workspaceSymbolProvider
    );

    console.log('OracleCraft: All providers registered successfully');
}

export function deactivate() {
    console.log('OracleCraft extension is now deactivated.');
}
