// Shared type definitions for OracleCraft
import * as vscode from 'vscode';

/**
 * Represents a completion item with extended properties
 */
export interface CompletionItem {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
    documentation?: string;
    insertText?: string;
}

/**
 * Represents a built-in package
 */
export interface BuiltinPackage {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
    documentation: string;
}

/**
 * Represents a package method
 */
export interface PackageMethod {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
    documentation: string;
    insertText?: string;
}

/**
 * Represents an Oracle exception
 */
export interface OracleException {
    name: string;
    errorCode: string;
    description: string;
}

/**
 * Represents a data dictionary view
 */
export interface DataDictionaryView {
    label: string;
    kind: vscode.CompletionItemKind;
    detail: string;
}

/**
 * Symbol information returned by the resolver
 */
export interface SymbolInfo {
    name: string;
    kind: 'Procedure' | 'Function' | 'Package' | 'Trigger' | 'Type' | 'Cursor' | 'Constant' | 'Variable' | 'Exception' | 'Subtype';
    location: vscode.Location;
    signature?: string;
    documentation?: string;
    packageName?: string;
    returnType?: string;
}

/**
 * Hover documentation structure
 */
export interface HoverDocumentation {
    pattern: RegExp;
    title: string;
    description: string;
    syntax?: string;
    example?: string;
}
