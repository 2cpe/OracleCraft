// Oracle Built-in Packages
import * as vscode from 'vscode';
import { BuiltinPackage, PackageMethod } from '../types';

export const BUILTIN_PACKAGES: BuiltinPackage[] = [
    { label: 'DBMS_OUTPUT', kind: vscode.CompletionItemKind.Module, detail: 'Output messages', documentation: 'Package for outputting messages' },
    { label: 'DBMS_SQL', kind: vscode.CompletionItemKind.Module, detail: 'Dynamic SQL', documentation: 'Dynamic SQL execution' },
    { label: 'DBMS_LOB', kind: vscode.CompletionItemKind.Module, detail: 'LOB operations', documentation: 'Large Object operations' },
    { label: 'DBMS_UTILITY', kind: vscode.CompletionItemKind.Module, detail: 'Utilities', documentation: 'Utility functions' },
    { label: 'DBMS_RANDOM', kind: vscode.CompletionItemKind.Module, detail: 'Random generation', documentation: 'Random numbers/strings' },
    { label: 'DBMS_LOCK', kind: vscode.CompletionItemKind.Module, detail: 'Lock management', documentation: 'Managing locks' },
    { label: 'DBMS_JOB', kind: vscode.CompletionItemKind.Module, detail: 'Job scheduling', documentation: 'Legacy job scheduling' },
    { label: 'DBMS_SCHEDULER', kind: vscode.CompletionItemKind.Module, detail: 'Job scheduling', documentation: 'Modern job scheduling' },
    { label: 'DBMS_METADATA', kind: vscode.CompletionItemKind.Module, detail: 'Metadata', documentation: 'Metadata extraction' },
    { label: 'DBMS_STATS', kind: vscode.CompletionItemKind.Module, detail: 'Statistics', documentation: 'Optimizer statistics' },
    { label: 'DBMS_APPLICATION_INFO', kind: vscode.CompletionItemKind.Module, detail: 'Session info', documentation: 'Session information' },
    { label: 'DBMS_SESSION', kind: vscode.CompletionItemKind.Module, detail: 'Session mgmt', documentation: 'Session management' },
    { label: 'DBMS_CRYPTO', kind: vscode.CompletionItemKind.Module, detail: 'Encryption', documentation: 'Cryptographic ops' },
    { label: 'DBMS_XMLGEN', kind: vscode.CompletionItemKind.Module, detail: 'XML generation', documentation: 'XML from SQL' },
    { label: 'DBMS_ALERT', kind: vscode.CompletionItemKind.Module, detail: 'Alerts', documentation: 'Database alerts' },
    { label: 'DBMS_PIPE', kind: vscode.CompletionItemKind.Module, detail: 'Pipes', documentation: 'Inter-session comms' },
    { label: 'DBMS_AQ', kind: vscode.CompletionItemKind.Module, detail: 'Queuing', documentation: 'Advanced Queuing' },
    { label: 'DBMS_FLASHBACK', kind: vscode.CompletionItemKind.Module, detail: 'Flashback', documentation: 'Flashback queries' },
    { label: 'DBMS_PROFILER', kind: vscode.CompletionItemKind.Module, detail: 'Profiling', documentation: 'PL/SQL profiling' },
    { label: 'DBMS_ERRLOG', kind: vscode.CompletionItemKind.Module, detail: 'Error logging', documentation: 'DML error logging' },
    { label: 'DBMS_ROWID', kind: vscode.CompletionItemKind.Module, detail: 'ROWID ops', documentation: 'ROWID operations' },
    { label: 'DBMS_DDL', kind: vscode.CompletionItemKind.Module, detail: 'DDL ops', documentation: 'DDL operations' },
    { label: 'UTL_FILE', kind: vscode.CompletionItemKind.Module, detail: 'File I/O', documentation: 'File operations' },
    { label: 'UTL_HTTP', kind: vscode.CompletionItemKind.Module, detail: 'HTTP requests', documentation: 'HTTP requests' },
    { label: 'UTL_SMTP', kind: vscode.CompletionItemKind.Module, detail: 'SMTP email', documentation: 'Email via SMTP' },
    { label: 'UTL_RAW', kind: vscode.CompletionItemKind.Module, detail: 'RAW data', documentation: 'RAW manipulation' },
    { label: 'UTL_ENCODE', kind: vscode.CompletionItemKind.Module, detail: 'Encoding', documentation: 'Base64 encoding' },
    { label: 'UTL_URL', kind: vscode.CompletionItemKind.Module, detail: 'URL encoding', documentation: 'URL encode/decode' },
    { label: 'UTL_MAIL', kind: vscode.CompletionItemKind.Module, detail: 'Email', documentation: 'Email sending' },
    { label: 'UTL_TCP', kind: vscode.CompletionItemKind.Module, detail: 'TCP/IP', documentation: 'TCP sockets' },
    { label: 'UTL_INADDR', kind: vscode.CompletionItemKind.Module, detail: 'IP utilities', documentation: 'IP resolution' },
    { label: 'UTL_COMPRESS', kind: vscode.CompletionItemKind.Module, detail: 'Compression', documentation: 'Data compression' },
    { label: 'UTL_MATCH', kind: vscode.CompletionItemKind.Module, detail: 'Matching', documentation: 'Fuzzy matching' },
    { label: 'HTF', kind: vscode.CompletionItemKind.Module, detail: 'HTML funcs', documentation: 'HTML functions' },
    { label: 'HTP', kind: vscode.CompletionItemKind.Module, detail: 'HTML procs', documentation: 'HTML procedures' },
    { label: 'OWA_UTIL', kind: vscode.CompletionItemKind.Module, detail: 'Web utils', documentation: 'Oracle Web utils' },
];

export const PACKAGE_METHODS: { [key: string]: PackageMethod[] } = {
    'DBMS_OUTPUT': [
        { label: 'PUT_LINE', kind: vscode.CompletionItemKind.Method, detail: 'PUT_LINE(msg)', documentation: 'Write line to buffer', insertText: 'PUT_LINE(${1:message})' },
        { label: 'PUT', kind: vscode.CompletionItemKind.Method, detail: 'PUT(msg)', documentation: 'Write without newline', insertText: 'PUT(${1:message})' },
        { label: 'NEW_LINE', kind: vscode.CompletionItemKind.Method, detail: 'NEW_LINE', documentation: 'Write newline', insertText: 'NEW_LINE' },
        { label: 'ENABLE', kind: vscode.CompletionItemKind.Method, detail: 'ENABLE(size)', documentation: 'Enable buffer', insertText: 'ENABLE(${1:buffer_size})' },
        { label: 'DISABLE', kind: vscode.CompletionItemKind.Method, detail: 'DISABLE', documentation: 'Disable buffer', insertText: 'DISABLE' },
    ],
    'UTL_FILE': [
        { label: 'FOPEN', kind: vscode.CompletionItemKind.Method, detail: 'FOPEN(...)', documentation: 'Open file', insertText: "FOPEN(${1:dir}, ${2:file}, ${3:'R'})" },
        { label: 'FCLOSE', kind: vscode.CompletionItemKind.Method, detail: 'FCLOSE(file)', documentation: 'Close file', insertText: 'FCLOSE(${1:file_handle})' },
        { label: 'PUT_LINE', kind: vscode.CompletionItemKind.Method, detail: 'PUT_LINE(file, text)', documentation: 'Write line', insertText: 'PUT_LINE(${1:file}, ${2:text})' },
        { label: 'GET_LINE', kind: vscode.CompletionItemKind.Method, detail: 'GET_LINE(file, buf)', documentation: 'Read line', insertText: 'GET_LINE(${1:file}, ${2:buffer})' },
        { label: 'IS_OPEN', kind: vscode.CompletionItemKind.Method, detail: 'IS_OPEN(file)', documentation: 'Check if open', insertText: 'IS_OPEN(${1:file})' },
    ],
    'DBMS_RANDOM': [
        { label: 'VALUE', kind: vscode.CompletionItemKind.Method, detail: 'VALUE', documentation: 'Random 0-1', insertText: 'VALUE' },
        { label: 'STRING', kind: vscode.CompletionItemKind.Method, detail: 'STRING(opt, len)', documentation: 'Random string', insertText: "STRING(${1:'X'}, ${2:10})" },
        { label: 'SEED', kind: vscode.CompletionItemKind.Method, detail: 'SEED(val)', documentation: 'Seed generator', insertText: 'SEED(${1:seed})' },
    ],
    'DBMS_LOB': [
        { label: 'GETLENGTH', kind: vscode.CompletionItemKind.Method, detail: 'GETLENGTH(lob)', documentation: 'LOB length', insertText: 'GETLENGTH(${1:lob})' },
        { label: 'SUBSTR', kind: vscode.CompletionItemKind.Method, detail: 'SUBSTR(lob, amt, off)', documentation: 'LOB portion', insertText: 'SUBSTR(${1:lob}, ${2:amt}, ${3:1})' },
        { label: 'APPEND', kind: vscode.CompletionItemKind.Method, detail: 'APPEND(dest, src)', documentation: 'Append LOBs', insertText: 'APPEND(${1:dest}, ${2:src})' },
    ],
};

