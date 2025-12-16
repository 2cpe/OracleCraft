// Refactored Completion Provider using modular data
import * as vscode from 'vscode';
import {
    PLSQL_KEYWORDS,
    BUILTIN_FUNCTIONS,
    BUILTIN_PACKAGES,
    PACKAGE_METHODS,
    DATA_DICTIONARY_VIEWS,
    getExceptionCompletions
} from './data';

export class PLSQLCompletionProvider implements vscode.CompletionItemProvider {

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {

        const linePrefix = document.lineAt(position).text.substring(0, position.character);
        const completions: vscode.CompletionItem[] = [];

        // Check if after package name (e.g., "DBMS_OUTPUT.")
        const packageMatch = linePrefix.match(/(\w+)\.\s*$/i);
        if (packageMatch) {
            const packageName = packageMatch[1].toUpperCase();
            const packageFuncs = PACKAGE_METHODS[packageName];
            if (packageFuncs) {
                for (const func of packageFuncs) {
                    const item = new vscode.CompletionItem(func.label, func.kind);
                    item.detail = `⚡ ${func.detail}`;
                    item.documentation = new vscode.MarkdownString(func.documentation);
                    item.sortText = `0_${func.label}`;
                    item.preselect = true;
                    if (func.insertText) {
                        item.insertText = new vscode.SnippetString(func.insertText);
                    }
                    completions.push(item);
                }
                return completions;
            }
        }

        // Add PL/SQL keywords
        for (const keyword of PLSQL_KEYWORDS) {
            const item = new vscode.CompletionItem(keyword.label, keyword.kind);
            item.detail = `🔤 ${keyword.detail}`;
            item.sortText = `1_${keyword.label}`;
            completions.push(item);
        }

        // Add built-in functions
        for (const func of BUILTIN_FUNCTIONS) {
            const item = new vscode.CompletionItem(func.label, func.kind);
            item.detail = `📦 ${func.detail}`;
            item.sortText = `2_${func.label}`;
            completions.push(item);
        }

        // Add built-in packages
        for (const pkg of BUILTIN_PACKAGES) {
            const item = new vscode.CompletionItem(pkg.label, pkg.kind);
            item.detail = `📦 ${pkg.detail}`;
            item.documentation = new vscode.MarkdownString(`${pkg.documentation}\n\n*Type \`.\` after package name to see methods*`);
            item.sortText = `3_${pkg.label}`;
            completions.push(item);
        }

        // Add exceptions
        for (const exc of getExceptionCompletions()) {
            const item = new vscode.CompletionItem(exc.label, exc.kind);
            item.detail = `⚠️ ${exc.detail}`;
            item.documentation = new vscode.MarkdownString(exc.documentation);
            item.sortText = `4_${exc.label}`;
            completions.push(item);
        }

        // Add data dictionary views
        for (const view of DATA_DICTIONARY_VIEWS) {
            const item = new vscode.CompletionItem(view.label, view.kind);
            item.detail = `🗃️ ${view.detail}`;
            item.sortText = `5_${view.label}`;
            completions.push(item);
        }

        return completions;
    }
}
