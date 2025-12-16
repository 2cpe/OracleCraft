import * as vscode from 'vscode';

interface HoverDocumentation {
    pattern: RegExp;
    title: string;
    description: string;
    syntax?: string;
    example?: string;
}

const HOVER_DOCS: HoverDocumentation[] = [
    // DBMS_OUTPUT
    {
        pattern: /\bDBMS_OUTPUT\.PUT_LINE\b/i,
        title: 'DBMS_OUTPUT.PUT_LINE',
        description: 'Writes a line to the output buffer for debugging purposes. The output can be viewed in SQL*Plus, SQL Developer, or other tools that support DBMS_OUTPUT.',
        syntax: 'DBMS_OUTPUT.PUT_LINE(item IN VARCHAR2)',
        example: `DBMS_OUTPUT.PUT_LINE('Hello, World!');`
    },
    {
        pattern: /\bDBMS_OUTPUT\.PUT\b/i,
        title: 'DBMS_OUTPUT.PUT',
        description: 'Writes a string to the output buffer without a trailing newline.',
        syntax: 'DBMS_OUTPUT.PUT(item IN VARCHAR2)',
        example: `DBMS_OUTPUT.PUT('Part 1');
DBMS_OUTPUT.PUT(' Part 2');
DBMS_OUTPUT.NEW_LINE;`
    },
    {
        pattern: /\bDBMS_OUTPUT\.ENABLE\b/i,
        title: 'DBMS_OUTPUT.ENABLE',
        description: 'Enables the output buffer with a specified size. Call this before using PUT or PUT_LINE.',
        syntax: 'DBMS_OUTPUT.ENABLE(buffer_size IN INTEGER DEFAULT 20000)',
        example: `DBMS_OUTPUT.ENABLE(1000000);`
    },
    {
        pattern: /\bDBMS_OUTPUT\b/i,
        title: 'DBMS_OUTPUT Package',
        description: 'Built-in Oracle package for outputting text messages from PL/SQL programs. Commonly used for debugging and logging.',
        syntax: 'DBMS_OUTPUT.procedure_name(arguments)',
        example: `BEGIN
  DBMS_OUTPUT.PUT_LINE('Processing started');
END;`
    },

    // DBMS_SQL
    {
        pattern: /\bDBMS_SQL\.OPEN_CURSOR\b/i,
        title: 'DBMS_SQL.OPEN_CURSOR',
        description: 'Opens a new cursor for dynamic SQL processing. Returns a cursor ID that can be used in subsequent DBMS_SQL calls.',
        syntax: 'DBMS_SQL.OPEN_CURSOR RETURN INTEGER',
        example: `DECLARE
  l_cursor INTEGER;
BEGIN
  l_cursor := DBMS_SQL.OPEN_CURSOR;
END;`
    },
    {
        pattern: /\bDBMS_SQL\.PARSE\b/i,
        title: 'DBMS_SQL.PARSE',
        description: 'Parses a SQL statement. The statement can be a query, DML, or DDL statement.',
        syntax: 'DBMS_SQL.PARSE(c IN INTEGER, statement IN VARCHAR2, language_flag IN INTEGER)',
        example: `DBMS_SQL.PARSE(l_cursor, 'SELECT * FROM employees', DBMS_SQL.NATIVE);`
    },
    {
        pattern: /\bDBMS_SQL\.EXECUTE\b/i,
        title: 'DBMS_SQL.EXECUTE',
        description: 'Executes a parsed SQL statement. Returns the number of rows affected for DML statements.',
        syntax: 'DBMS_SQL.EXECUTE(c IN INTEGER) RETURN INTEGER',
        example: `l_rows := DBMS_SQL.EXECUTE(l_cursor);`
    },
    {
        pattern: /\bDBMS_SQL\b/i,
        title: 'DBMS_SQL Package',
        description: 'Built-in Oracle package for executing dynamic SQL. Provides low-level control over SQL statement parsing and execution.',
        syntax: 'See individual procedures and functions',
        example: `DECLARE
  l_cursor INTEGER;
  l_rows   INTEGER;
BEGIN
  l_cursor := DBMS_SQL.OPEN_CURSOR;
  DBMS_SQL.PARSE(l_cursor, 'UPDATE emp SET sal = sal * 1.1', DBMS_SQL.NATIVE);
  l_rows := DBMS_SQL.EXECUTE(l_cursor);
  DBMS_SQL.CLOSE_CURSOR(l_cursor);
END;`
    },

    // UTL_FILE
    {
        pattern: /\bUTL_FILE\.FOPEN\b/i,
        title: 'UTL_FILE.FOPEN',
        description: 'Opens a file for reading, writing, or appending. Returns a file handle for subsequent operations.',
        syntax: 'UTL_FILE.FOPEN(location IN VARCHAR2, filename IN VARCHAR2, open_mode IN VARCHAR2, max_linesize IN BINARY_INTEGER DEFAULT 1024) RETURN FILE_TYPE',
        example: `l_file := UTL_FILE.FOPEN('MY_DIR', 'output.txt', 'W');`
    },
    {
        pattern: /\bUTL_FILE\.FCLOSE\b/i,
        title: 'UTL_FILE.FCLOSE',
        description: 'Closes an open file handle.',
        syntax: 'UTL_FILE.FCLOSE(file IN OUT FILE_TYPE)',
        example: `UTL_FILE.FCLOSE(l_file);`
    },
    {
        pattern: /\bUTL_FILE\.PUT_LINE\b/i,
        title: 'UTL_FILE.PUT_LINE',
        description: 'Writes a line of text to a file, followed by a newline character.',
        syntax: 'UTL_FILE.PUT_LINE(file IN FILE_TYPE, buffer IN VARCHAR2, autoflush IN BOOLEAN DEFAULT FALSE)',
        example: `UTL_FILE.PUT_LINE(l_file, 'This is a line of text');`
    },
    {
        pattern: /\bUTL_FILE\b/i,
        title: 'UTL_FILE Package',
        description: 'Built-in Oracle package for reading and writing operating system text files from PL/SQL.',
        syntax: 'See individual procedures and functions',
        example: `DECLARE
  l_file UTL_FILE.FILE_TYPE;
BEGIN
  l_file := UTL_FILE.FOPEN('MY_DIR', 'test.txt', 'W');
  UTL_FILE.PUT_LINE(l_file, 'Hello, File!');
  UTL_FILE.FCLOSE(l_file);
END;`
    },

    // UTL_HTTP
    {
        pattern: /\bUTL_HTTP\.REQUEST\b/i,
        title: 'UTL_HTTP.REQUEST',
        description: 'Makes a simple HTTP GET request and returns the response as a VARCHAR2 (up to 32767 bytes).',
        syntax: 'UTL_HTTP.REQUEST(url IN VARCHAR2, proxy IN VARCHAR2 DEFAULT NULL) RETURN VARCHAR2',
        example: `l_response := UTL_HTTP.REQUEST('http://example.com/api/data');`
    },
    {
        pattern: /\bUTL_HTTP\.BEGIN_REQUEST\b/i,
        title: 'UTL_HTTP.BEGIN_REQUEST',
        description: 'Begins an HTTP request. Returns a request handle for building complex HTTP requests.',
        syntax: 'UTL_HTTP.BEGIN_REQUEST(url IN VARCHAR2, method IN VARCHAR2 DEFAULT \'GET\', http_version IN VARCHAR2 DEFAULT NULL) RETURN REQ',
        example: `l_req := UTL_HTTP.BEGIN_REQUEST('http://example.com/api', 'POST');`
    },
    {
        pattern: /\bUTL_HTTP\b/i,
        title: 'UTL_HTTP Package',
        description: 'Built-in Oracle package for making HTTP requests from PL/SQL. Supports GET, POST, and other HTTP methods.',
        syntax: 'See individual procedures and functions',
        example: `DECLARE
  l_response VARCHAR2(32767);
BEGIN
  l_response := UTL_HTTP.REQUEST('http://example.com');
END;`
    },

    // DBMS_RANDOM
    {
        pattern: /\bDBMS_RANDOM\.VALUE\b/i,
        title: 'DBMS_RANDOM.VALUE',
        description: 'Returns a random number. Without parameters, returns a number between 0 and 1. With parameters, returns a number in the specified range.',
        syntax: 'DBMS_RANDOM.VALUE RETURN NUMBER\nDBMS_RANDOM.VALUE(low IN NUMBER, high IN NUMBER) RETURN NUMBER',
        example: `l_random := DBMS_RANDOM.VALUE; -- 0 to 1
l_random := DBMS_RANDOM.VALUE(1, 100); -- 1 to 100`
    },
    {
        pattern: /\bDBMS_RANDOM\.STRING\b/i,
        title: 'DBMS_RANDOM.STRING',
        description: 'Returns a random string of the specified type and length.\n\nOpt values:\n- U: uppercase alpha\n- L: lowercase alpha\n- A: mixed case alpha\n- X: uppercase alphanumeric\n- P: any printable character',
        syntax: 'DBMS_RANDOM.STRING(opt IN CHAR, len IN NUMBER) RETURN VARCHAR2',
        example: `l_str := DBMS_RANDOM.STRING('X', 10); -- Random 10-char alphanumeric`
    },
    {
        pattern: /\bDBMS_RANDOM\b/i,
        title: 'DBMS_RANDOM Package',
        description: 'Built-in Oracle package for generating random numbers and strings.',
        syntax: 'See individual procedures and functions',
        example: `SELECT DBMS_RANDOM.VALUE(1, 100) FROM dual;`
    },

    // DBMS_LOB
    {
        pattern: /\bDBMS_LOB\.GETLENGTH\b/i,
        title: 'DBMS_LOB.GETLENGTH',
        description: 'Returns the length of the specified LOB in bytes (for BLOBs) or characters (for CLOBs).',
        syntax: 'DBMS_LOB.GETLENGTH(lob_loc IN BLOB/CLOB) RETURN INTEGER',
        example: `l_length := DBMS_LOB.GETLENGTH(l_clob);`
    },
    {
        pattern: /\bDBMS_LOB\.SUBSTR\b/i,
        title: 'DBMS_LOB.SUBSTR',
        description: 'Returns a portion of the LOB value starting at the specified offset.',
        syntax: 'DBMS_LOB.SUBSTR(lob_loc IN CLOB, amount IN INTEGER, offset IN INTEGER DEFAULT 1) RETURN VARCHAR2',
        example: `l_text := DBMS_LOB.SUBSTR(l_clob, 100, 1);`
    },
    {
        pattern: /\bDBMS_LOB\b/i,
        title: 'DBMS_LOB Package',
        description: 'Built-in Oracle package for manipulating Large Objects (BLOBs, CLOBs, NCLOBs, and BFILEs).',
        syntax: 'See individual procedures and functions',
        example: `l_len := DBMS_LOB.GETLENGTH(my_clob);`
    },

    // Keywords
    {
        pattern: /\bEXECUTE\s+IMMEDIATE\b/i,
        title: 'EXECUTE IMMEDIATE',
        description: 'Executes a dynamic SQL statement or PL/SQL block. Simpler alternative to DBMS_SQL for many use cases.',
        syntax: 'EXECUTE IMMEDIATE dynamic_string [INTO variable_list] [USING bind_argument_list]',
        example: `EXECUTE IMMEDIATE 'UPDATE emp SET sal = sal * 1.1 WHERE deptno = :d'
  USING l_deptno;`
    },
    {
        pattern: /\bBULK\s+COLLECT\b/i,
        title: 'BULK COLLECT',
        description: 'Fetches multiple rows into a collection in a single operation, significantly improving performance.',
        syntax: 'SELECT column INTO collection FROM table;\nFETCH cursor BULK COLLECT INTO collection [LIMIT n];',
        example: `SELECT employee_id BULK COLLECT INTO l_emp_ids FROM employees;`
    },
    {
        pattern: /\bFORALL\b/i,
        title: 'FORALL',
        description: 'Executes a DML statement for each element in a collection in a single context switch, improving performance.',
        syntax: 'FORALL index IN lower_bound..upper_bound\n  dml_statement;',
        example: `FORALL i IN 1..l_emp_ids.COUNT
  UPDATE employees SET salary = salary * 1.1
  WHERE employee_id = l_emp_ids(i);`
    },
    {
        pattern: /\bRAISE_APPLICATION_ERROR\b/i,
        title: 'RAISE_APPLICATION_ERROR',
        description: 'Raises a user-defined exception with a custom error number (-20000 to -20999) and message.',
        syntax: 'RAISE_APPLICATION_ERROR(error_number IN NUMBER, message IN VARCHAR2, keep_errors IN BOOLEAN DEFAULT FALSE)',
        example: `RAISE_APPLICATION_ERROR(-20001, 'Invalid employee ID');`
    },
    {
        pattern: /\bSQLCODE\b/i,
        title: 'SQLCODE',
        description: 'Returns the error code of the most recent exception. Returns 0 if no exception, positive for user-defined exceptions, negative for Oracle errors.',
        syntax: 'SQLCODE RETURN NUMBER',
        example: `EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE);`
    },
    {
        pattern: /\bSQLERRM\b/i,
        title: 'SQLERRM',
        description: 'Returns the error message associated with an error code. Without parameters, returns the message for the most recent exception.',
        syntax: 'SQLERRM [(error_number)] RETURN VARCHAR2',
        example: `EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE(SQLERRM);`
    },
    {
        pattern: /\b%ROWTYPE\b/i,
        title: '%ROWTYPE Attribute',
        description: 'Declares a record variable with the same structure as a table row or cursor row.',
        syntax: 'variable_name table_name%ROWTYPE;\nvariable_name cursor_name%ROWTYPE;',
        example: `DECLARE
  l_emp employees%ROWTYPE;
BEGIN
  SELECT * INTO l_emp FROM employees WHERE employee_id = 100;
END;`
    },
    {
        pattern: /\b%TYPE\b/i,
        title: '%TYPE Attribute',
        description: 'Declares a variable with the same data type as a table column or another variable.',
        syntax: 'variable_name table.column%TYPE;\nvariable_name other_variable%TYPE;',
        example: `DECLARE
  l_salary employees.salary%TYPE;
BEGIN
  SELECT salary INTO l_salary FROM employees WHERE employee_id = 100;
END;`
    },
    {
        pattern: /\bNO_DATA_FOUND\b/i,
        title: 'NO_DATA_FOUND Exception',
        description: 'Predefined exception raised when a SELECT INTO returns no rows.',
        syntax: 'EXCEPTION WHEN NO_DATA_FOUND THEN ...',
        example: `BEGIN
  SELECT name INTO l_name FROM employees WHERE id = 999;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    l_name := 'Not Found';
END;`
    },
    {
        pattern: /\bTOO_MANY_ROWS\b/i,
        title: 'TOO_MANY_ROWS Exception',
        description: 'Predefined exception raised when a SELECT INTO returns more than one row.',
        syntax: 'EXCEPTION WHEN TOO_MANY_ROWS THEN ...',
        example: `BEGIN
  SELECT name INTO l_name FROM employees WHERE dept = 10;
EXCEPTION
  WHEN TOO_MANY_ROWS THEN
    l_name := 'Multiple matches';
END;`
    },
];

import { PLSQLSymbolResolver } from './symbolResolver';

export class PLSQLHoverProvider implements vscode.HoverProvider {

    private resolver = new PLSQLSymbolResolver();

    async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.Hover | null> {

        // Get the word at the current position
        const wordRange = document.getWordRangeAtPosition(position, /[\w%.]+/);
        if (!wordRange) {
            return null;
        }

        const word = document.getText(wordRange);

        // Get some context around the word for pattern matching
        const line = document.lineAt(position.line).text;
        const startChar = Math.max(0, wordRange.start.character - 20);
        const endChar = Math.min(line.length, wordRange.end.character + 20);
        const context = line.substring(startChar, endChar);

        // 1. Check built-in documentation first (highest priority for keywords/built-ins)
        for (const doc of HOVER_DOCS) {
            if (doc.pattern.test(context)) {
                return this.createBuiltinHover(doc);
            }
        }

        // 2. Check for symbols using the resolver (Local + Workspace)
        // Check if it's a package.method reference
        const packageMethodMatch = line.match(new RegExp(`(\\w+)\\.${word}\\b`, 'i'));
        const packageName = packageMethodMatch ? packageMethodMatch[1] : null;

        const symbolInfo = await this.resolver.findSymbol(document, word, packageName, token);

        if (symbolInfo) {
            return this.createSymbolHover(symbolInfo);
        }

        return null;
    }

    private createSymbolHover(info: any): vscode.Hover {
        const contents = new vscode.MarkdownString();

        // Header: Kind: Name
        contents.appendMarkdown(`### ${info.kind}: \`${info.name}\`\n\n`);

        // Scope/Package Info
        if (info.packageName) {
            contents.appendMarkdown(`**Package:** \`${info.packageName.toUpperCase()}\`\n\n`);
        }

        // Signature / Definition
        if (info.signature) {
            // Basic syntax highlighting for the signature
            contents.appendMarkdown(`**Definition:**\n\`\`\`plsql\n${info.signature}\n\`\`\`\n\n`);
        }

        // Return Type (for functions)
        if (info.returnType) {
            contents.appendMarkdown(`**Returns:** \`${info.returnType}\`\n\n`);
        }

        // Documentation/Comments
        if (info.documentation) {
            contents.appendMarkdown(`**Description:**\n\n${info.documentation}\n\n`);
        }

        // Location footer
        const filename = vscode.workspace.asRelativePath(info.location.uri);
        contents.appendMarkdown(`---\n*Defined in ${filename} at line ${info.location.range.start.line + 1}*`);

        contents.isTrusted = true;
        return new vscode.Hover(contents);
    }

    private createBuiltinHover(doc: HoverDocumentation): vscode.Hover {
        const contents = new vscode.MarkdownString();

        // Title
        contents.appendMarkdown(`### ${doc.title}\n\n`);

        // Description
        contents.appendMarkdown(`${doc.description}\n\n`);

        // Syntax
        if (doc.syntax) {
            contents.appendMarkdown(`**Syntax:**\n\`\`\`plsql\n${doc.syntax}\n\`\`\`\n\n`);
        }

        // Example
        if (doc.example) {
            contents.appendMarkdown(`**Example:**\n\`\`\`plsql\n${doc.example}\n\`\`\`\n`);
        }

        contents.isTrusted = true;
        return new vscode.Hover(contents);
    }
}

