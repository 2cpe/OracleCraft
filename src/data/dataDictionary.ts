// Oracle Data Dictionary Views
import * as vscode from 'vscode';
import { DataDictionaryView } from '../types';

export const DATA_DICTIONARY_VIEWS: DataDictionaryView[] = [
    // User views
    { label: 'USER_TABLES', kind: vscode.CompletionItemKind.Struct, detail: 'Tables owned by user' },
    { label: 'USER_TAB_COLUMNS', kind: vscode.CompletionItemKind.Struct, detail: 'Columns of user tables' },
    { label: 'USER_CONSTRAINTS', kind: vscode.CompletionItemKind.Struct, detail: 'Constraints on user tables' },
    { label: 'USER_INDEXES', kind: vscode.CompletionItemKind.Struct, detail: 'Indexes owned by user' },
    { label: 'USER_OBJECTS', kind: vscode.CompletionItemKind.Struct, detail: 'Objects owned by user' },
    { label: 'USER_SOURCE', kind: vscode.CompletionItemKind.Struct, detail: 'Source code of objects' },
    { label: 'USER_PROCEDURES', kind: vscode.CompletionItemKind.Struct, detail: 'Procedures owned by user' },
    { label: 'USER_TRIGGERS', kind: vscode.CompletionItemKind.Struct, detail: 'Triggers owned by user' },
    { label: 'USER_SEQUENCES', kind: vscode.CompletionItemKind.Struct, detail: 'Sequences owned by user' },
    { label: 'USER_VIEWS', kind: vscode.CompletionItemKind.Struct, detail: 'Views owned by user' },
    { label: 'USER_SYNONYMS', kind: vscode.CompletionItemKind.Struct, detail: 'Synonyms owned by user' },
    { label: 'USER_JOBS', kind: vscode.CompletionItemKind.Struct, detail: 'Jobs owned by user' },
    { label: 'USER_ERRORS', kind: vscode.CompletionItemKind.Struct, detail: 'Compilation errors' },
    { label: 'USER_DEPENDENCIES', kind: vscode.CompletionItemKind.Struct, detail: 'Object dependencies' },
    { label: 'USER_TYPES', kind: vscode.CompletionItemKind.Struct, detail: 'Types owned by user' },
    { label: 'USER_TAB_PARTITIONS', kind: vscode.CompletionItemKind.Struct, detail: 'Table partitions' },
    { label: 'USER_IND_PARTITIONS', kind: vscode.CompletionItemKind.Struct, detail: 'Index partitions' },

    // All views
    { label: 'ALL_TABLES', kind: vscode.CompletionItemKind.Struct, detail: 'Accessible tables' },
    { label: 'ALL_TAB_COLUMNS', kind: vscode.CompletionItemKind.Struct, detail: 'Accessible columns' },
    { label: 'ALL_OBJECTS', kind: vscode.CompletionItemKind.Struct, detail: 'Accessible objects' },
    { label: 'ALL_SOURCE', kind: vscode.CompletionItemKind.Struct, detail: 'Accessible source' },
    { label: 'ALL_PROCEDURES', kind: vscode.CompletionItemKind.Struct, detail: 'Accessible procedures' },
    { label: 'ALL_ARGUMENTS', kind: vscode.CompletionItemKind.Struct, detail: 'Procedure arguments' },
    { label: 'ALL_TRIGGERS', kind: vscode.CompletionItemKind.Struct, detail: 'Accessible triggers' },
    { label: 'ALL_VIEWS', kind: vscode.CompletionItemKind.Struct, detail: 'Accessible views' },

    // DBA views
    { label: 'DBA_TABLES', kind: vscode.CompletionItemKind.Struct, detail: 'All tables in DB' },
    { label: 'DBA_TAB_COLUMNS', kind: vscode.CompletionItemKind.Struct, detail: 'All columns in DB' },
    { label: 'DBA_OBJECTS', kind: vscode.CompletionItemKind.Struct, detail: 'All objects in DB' },
    { label: 'DBA_USERS', kind: vscode.CompletionItemKind.Struct, detail: 'All database users' },
    { label: 'DBA_ROLES', kind: vscode.CompletionItemKind.Struct, detail: 'All roles in DB' },
    { label: 'DBA_TABLESPACES', kind: vscode.CompletionItemKind.Struct, detail: 'All tablespaces' },
    { label: 'DBA_DATA_FILES', kind: vscode.CompletionItemKind.Struct, detail: 'Database data files' },
    { label: 'DBA_FREE_SPACE', kind: vscode.CompletionItemKind.Struct, detail: 'Free space' },
    { label: 'DBA_SEGMENTS', kind: vscode.CompletionItemKind.Struct, detail: 'Storage segments' },
    { label: 'DBA_SOURCE', kind: vscode.CompletionItemKind.Struct, detail: 'All source code' },
    { label: 'DBA_PROCEDURES', kind: vscode.CompletionItemKind.Struct, detail: 'All procedures' },

    // V$ views
    { label: 'V$SESSION', kind: vscode.CompletionItemKind.Struct, detail: 'Current sessions' },
    { label: 'V$PROCESS', kind: vscode.CompletionItemKind.Struct, detail: 'Oracle processes' },
    { label: 'V$SQL', kind: vscode.CompletionItemKind.Struct, detail: 'SQL in cache' },
    { label: 'V$SQLAREA', kind: vscode.CompletionItemKind.Struct, detail: 'SQL area stats' },
    { label: 'V$LOCK', kind: vscode.CompletionItemKind.Struct, detail: 'Current locks' },
    { label: 'V$LOCKED_OBJECT', kind: vscode.CompletionItemKind.Struct, detail: 'Locked objects' },
    { label: 'V$INSTANCE', kind: vscode.CompletionItemKind.Struct, detail: 'Instance info' },
    { label: 'V$DATABASE', kind: vscode.CompletionItemKind.Struct, detail: 'Database info' },
    { label: 'V$PARAMETER', kind: vscode.CompletionItemKind.Struct, detail: 'Init parameters' },
    { label: 'V$SYSSTAT', kind: vscode.CompletionItemKind.Struct, detail: 'System statistics' },
    { label: 'V$SESSION_LONGOPS', kind: vscode.CompletionItemKind.Struct, detail: 'Long operations' },
    { label: 'V$TRANSACTION', kind: vscode.CompletionItemKind.Struct, detail: 'Transactions' },
    { label: 'V$SGA', kind: vscode.CompletionItemKind.Struct, detail: 'SGA info' },
    { label: 'V$PGA_TARGET_ADVICE', kind: vscode.CompletionItemKind.Struct, detail: 'PGA advice' },

    // Other
    { label: 'DUAL', kind: vscode.CompletionItemKind.Struct, detail: 'Dummy table' },
    { label: 'DICTIONARY', kind: vscode.CompletionItemKind.Struct, detail: 'Dictionary views' },
    { label: 'DICT_COLUMNS', kind: vscode.CompletionItemKind.Struct, detail: 'Dictionary columns' },
];
