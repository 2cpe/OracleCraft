import * as vscode from 'vscode';
import { PLSQLCompletionProvider } from './completionProvider';
import { PLSQLHoverProvider } from './hoverProvider';
import { PLSQLDocumentSymbolProvider } from './documentSymbolProvider';
import { PLSQLDefinitionProvider, PLSQLWorkspaceSymbolProvider } from './definitionProvider';

// PL/SQL file extensions we want to claim, regardless of VS Code's default
// language detection. The 'oracle-sql' language ID covers the Oracle SQL
// Developer extension's language ID.
// See: https://github.com/2cpe/OracleCraft/issues/1
const PLSQL_EXTENSIONS = ['.pls', '.sql', '.pks', '.pkb'];
const TARGET_LANGUAGE = 'oracle-sql';

/**
 * Check whether the document's filename has one of our PL/SQL extensions.
 */
function isPlsqlFile(doc: vscode.TextDocument): boolean {
    const fileName = doc.fileName.toLowerCase();
    return PLSQL_EXTENSIONS.some(ext => fileName.endsWith(ext));
}

/**
 * If a document is a PL/SQL file but is being treated as 'plaintext',
 * reassign it to the OracleCraft language. This catches the case where:
 * - VS Code defaults `.pls` to plaintext (no built-in mapping)
 * - Workspace trust is off (file associations are disabled)
 * - User settings have an empty/missing files.associations entry
 *
 * See microsoft/vscode#145659 for the canonical pattern.
 */
function reassignIfNeeded(doc: vscode.TextDocument): void {
    if (doc.languageId === 'plaintext' && isPlsqlFile(doc)) {
        vscode.languages.setTextDocumentLanguage(doc, TARGET_LANGUAGE).then(
            () => console.log(`OracleCraft: Reassigned ${vscode.workspace.asRelativePath(doc.uri)} to ${TARGET_LANGUAGE}`),
            (err: Error) => console.warn(`OracleCraft: Could not reassign ${doc.fileName}: ${err.message}`)
        );
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('OracleCraft extension is now active!');

    // Activate on all relevant language IDs:
    // - onLanguage:plsql        → catches native PL/SQL files
    // - onLanguage:oracle-sql   → catches files via Oracle SQL Developer extension
    // - onLanguage:plaintext    → catches the broken edge case where .pls/.sql
    //                              opens as plaintext (no association). This is
    //                              the critical fix for microsoft/vscode#145659 —
    //                              without it, the extension never activates for
    //                              unhandled extensions, and we cannot reassign.
    // - *                       → safety net; activates on every file open so
    //                              onDidOpenTextDocument fires reliably.
    const selectors: vscode.DocumentSelector = [
        { language: 'plsql', scheme: 'file' },
        { language: 'oracle-sql', scheme: 'file' }
    ];

    // Register completion provider for PL/SQL
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        selectors,
        new PLSQLCompletionProvider(),
        '.', // Trigger on dot for package.method completions
        ' '  // Trigger on space for keyword completions
    );

    // Register hover provider for PL/SQL
    const hoverProvider = vscode.languages.registerHoverProvider(
        selectors,
        new PLSQLHoverProvider()
    );

    // Register document symbol provider for outline view
    const documentSymbolProvider = vscode.languages.registerDocumentSymbolProvider(
        selectors,
        new PLSQLDocumentSymbolProvider()
    );

    // Register definition provider for Go to Definition (F12)
    const definitionProvider = vscode.languages.registerDefinitionProvider(
        selectors,
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

    // Fix #1 (and the deeper "Plain Text" problem):
    // Listen for any text document being opened, and if it is a PL/SQL file
    // that VS Code has wrongly tagged as 'plaintext', reassign it.
    // This is the canonical Microsoft-recommended pattern for extensions that
    // need to claim extensions VS Code does not know about.
    // Ref: https://github.com/microsoft/vscode/issues/145659#issuecomment-1075675165
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(reassignIfNeeded)
    );

    // Also scan documents that were already open at activation time.
    for (const doc of vscode.workspace.textDocuments) {
        reassignIfNeeded(doc);
    }

    console.log('OracleCraft: All providers registered successfully');
}

export function deactivate() {
    console.log('OracleCraft extension is now deactivated.');
}
