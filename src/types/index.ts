// Shared type definitions for OracleCraft
import * as vscode from 'vscode';

export interface CompletionItem {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
    documentation?: string;
    insertText?: string;
}

export interface BuiltinPackage {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
    documentation: string;
}

export interface PackageMethod {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
    documentation: string;
    insertText?: string;
}

export interface OracleException {
    name: string;
    errorCode: string;
    description: string;
}

export interface DataDictionaryView {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
}
