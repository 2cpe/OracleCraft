// Oracle Predefined Exceptions with Full Documentation
import * as vscode from 'vscode';
import { OracleException, CompletionItem } from '../types';

/**
 * All Oracle predefined exceptions with error codes and documentation
 */
export const ORACLE_EXCEPTIONS: OracleException[] = [
    {
        name: 'ACCESS_INTO_NULL',
        errorCode: 'ORA-06530',
        description: 'Program attempted to assign values to attributes of an uninitialized object. Initialize the object with constructor first.'
    },
    {
        name: 'CASE_NOT_FOUND',
        errorCode: 'ORA-06592',
        description: 'None of the WHEN clauses in a CASE statement were matched and there is no ELSE clause. Add ELSE clause or ensure all cases are covered.'
    },
    {
        name: 'COLLECTION_IS_NULL',
        errorCode: 'ORA-06531',
        description: 'Program attempted to apply collection methods (other than EXISTS) to an uninitialized nested table or varray. Initialize with constructor first.'
    },
    {
        name: 'CURSOR_ALREADY_OPEN',
        errorCode: 'ORA-06511',
        description: 'Program attempted to open a cursor that is already open. Check %ISOPEN before opening or close first.'
    },
    {
        name: 'DUP_VAL_ON_INDEX',
        errorCode: 'ORA-00001',
        description: 'Program attempted to insert a duplicate value into a column constrained by unique index. Check for duplicates or use MERGE.'
    },
    {
        name: 'INVALID_CURSOR',
        errorCode: 'ORA-01001',
        description: 'Program attempted a cursor operation that is not allowed, such as closing an unopened cursor. Check %ISOPEN.'
    },
    {
        name: 'INVALID_NUMBER',
        errorCode: 'ORA-01722',
        description: 'Conversion of a character string to a number failed because the string is not a valid number. Use TO_NUMBER with exception handling.'
    },
    {
        name: 'LOGIN_DENIED',
        errorCode: 'ORA-01017',
        description: 'Program attempted to connect to Oracle with an invalid username and/or password.'
    },
    {
        name: 'NO_DATA_FOUND',
        errorCode: 'ORA-01403',
        description: 'SELECT INTO returned no rows, or program referenced a deleted element in a nested table, or an uninitialized element in an index-by table.'
    },
    {
        name: 'NO_DATA_NEEDED',
        errorCode: 'ORA-06548',
        description: 'The caller of a pipelined function no longer needs the function results. Use to end pipelined function cleanly.'
    },
    {
        name: 'NOT_LOGGED_ON',
        errorCode: 'ORA-01012',
        description: 'Program issued a database call without being connected to Oracle.'
    },
    {
        name: 'PROGRAM_ERROR',
        errorCode: 'ORA-06501',
        description: 'PL/SQL encountered an internal error. Contact Oracle Support.'
    },
    {
        name: 'ROWTYPE_MISMATCH',
        errorCode: 'ORA-06504',
        description: 'Row type of cursor variable is incompatible with actual cursor row type in assignment or fetch.'
    },
    {
        name: 'SELF_IS_NULL',
        errorCode: 'ORA-30625',
        description: 'Program attempted to call a MEMBER method on a null instance. Initialize the object first.'
    },
    {
        name: 'STORAGE_ERROR',
        errorCode: 'ORA-06500',
        description: 'PL/SQL ran out of memory or memory was corrupted. Increase PGA_AGGREGATE_TARGET.'
    },
    {
        name: 'SUBSCRIPT_BEYOND_COUNT',
        errorCode: 'ORA-06533',
        description: 'Program referenced a nested table or varray element with an index number larger than the number of elements. Check COUNT first.'
    },
    {
        name: 'SUBSCRIPT_OUTSIDE_LIMIT',
        errorCode: 'ORA-06532',
        description: 'Program referenced a nested table or varray element with an index number outside legal range (e.g., -1). Check bounds.'
    },
    {
        name: 'SYS_INVALID_ROWID',
        errorCode: 'ORA-01410',
        description: 'Conversion of a character string to a ROWID failed because the string is not a valid ROWID.'
    },
    {
        name: 'TIMEOUT_ON_RESOURCE',
        errorCode: 'ORA-00051',
        description: 'Timeout occurred while Oracle was waiting for a resource.'
    },
    {
        name: 'TOO_MANY_ROWS',
        errorCode: 'ORA-01422',
        description: 'SELECT INTO returned more than one row. Use FETCH loop or add WHERE clause to ensure single row.'
    },
    {
        name: 'VALUE_ERROR',
        errorCode: 'ORA-06502',
        description: 'Arithmetic, conversion, truncation, or size-constraint error occurred. Check variable sizes and data types.'
    },
    {
        name: 'ZERO_DIVIDE',
        errorCode: 'ORA-01476',
        description: 'Program attempted to divide a number by zero. Check divisor with NULLIF or CASE.'
    },
];

/**
 * Exception code examples for hover documentation
 */
export const EXCEPTION_EXAMPLES: { [key: string]: string } = {
    'NO_DATA_FOUND': `DECLARE
  l_name employees.last_name%TYPE;
BEGIN
  SELECT last_name INTO l_name
  FROM employees WHERE employee_id = 999;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Employee not found');
END;`,

    'TOO_MANY_ROWS': `DECLARE
  l_name employees.last_name%TYPE;
BEGIN
  SELECT last_name INTO l_name
  FROM employees WHERE department_id = 50;
EXCEPTION
  WHEN TOO_MANY_ROWS THEN
    DBMS_OUTPUT.PUT_LINE('Multiple employees found');
END;`,

    'ZERO_DIVIDE': `DECLARE
  l_price NUMBER := 9.73;
  l_qty   NUMBER := 0;
  l_avg   NUMBER;
BEGIN
  l_avg := l_price / l_qty;
EXCEPTION
  WHEN ZERO_DIVIDE THEN
    l_avg := NULL;
    DBMS_OUTPUT.PUT_LINE('Division by zero');
END;`,

    'DUP_VAL_ON_INDEX': `BEGIN
  INSERT INTO employees (employee_id, last_name, email)
  VALUES (100, 'Smith', 'JSMITH');
EXCEPTION
  WHEN DUP_VAL_ON_INDEX THEN
    DBMS_OUTPUT.PUT_LINE('Duplicate key value');
END;`,

    'VALUE_ERROR': `DECLARE
  l_num NUMBER(2);
BEGIN
  l_num := 123;  -- Too large for NUMBER(2)
EXCEPTION
  WHEN VALUE_ERROR THEN
    DBMS_OUTPUT.PUT_LINE('Numeric overflow');
END;`,

    'INVALID_CURSOR': `DECLARE
  CURSOR c IS SELECT * FROM employees;
BEGIN
  CLOSE c;  -- Closing unopened cursor
EXCEPTION
  WHEN INVALID_CURSOR THEN
    DBMS_OUTPUT.PUT_LINE('Cursor not open');
END;`,

    'CURSOR_ALREADY_OPEN': `DECLARE
  CURSOR c IS SELECT * FROM employees;
BEGIN
  OPEN c;
  OPEN c;  -- Already open
EXCEPTION
  WHEN CURSOR_ALREADY_OPEN THEN
    DBMS_OUTPUT.PUT_LINE('Cursor was already open');
END;`,

    'ROWTYPE_MISMATCH': `DECLARE
  TYPE t_rc IS REF CURSOR;
  l_rc    t_rc;
  l_dept  departments%ROWTYPE;
BEGIN
  OPEN l_rc FOR SELECT * FROM employees;
  FETCH l_rc INTO l_dept;  -- Wrong rowtype
EXCEPTION
  WHEN ROWTYPE_MISMATCH THEN
    DBMS_OUTPUT.PUT_LINE('Cursor rowtype mismatch');
END;`,

    'CASE_NOT_FOUND': `DECLARE
  l_grade CHAR(1) := 'X';
  l_desc  VARCHAR2(20);
BEGIN
  l_desc := CASE l_grade
    WHEN 'A' THEN 'Excellent'
    WHEN 'B' THEN 'Good'
  END;  -- No ELSE for 'X'
EXCEPTION
  WHEN CASE_NOT_FOUND THEN
    l_desc := 'Unknown';
END;`,
};

/**
 * Get exception completions for autocomplete
 */
export function getExceptionCompletions(): CompletionItem[] {
    return ORACLE_EXCEPTIONS.map(exc => ({
        label: exc.name,
        kind: vscode.CompletionItemKind.Event,
        detail: `Exception (${exc.errorCode})`,
        documentation: exc.description,
    }));
}

/**
 * Get exception documentation for hover
 */
export function getExceptionDocumentation(name: string): OracleException | undefined {
    return ORACLE_EXCEPTIONS.find(e => e.name.toUpperCase() === name.toUpperCase());
}

/**
 * Get example code for an exception
 */
export function getExceptionExample(name: string): string | undefined {
    return EXCEPTION_EXAMPLES[name.toUpperCase()];
}
