-- ============================================================================
-- OracleCraft Test File
-- Use this file to test syntax highlighting, autocomplete, and snippets
-- ============================================================================

-- ======================
-- Package Specification
-- ======================
CREATE OR REPLACE PACKAGE employee_pkg
IS
    -- Public type declarations
    TYPE emp_rec IS RECORD (
        emp_id      NUMBER,
        emp_name    VARCHAR2(100),
        hire_date   DATE
    );
    
    TYPE emp_tab IS TABLE OF emp_rec INDEX BY PLS_INTEGER;
    
    -- Public constants
    c_max_salary CONSTANT NUMBER := 999999.99;
    
    -- Public function declarations
    FUNCTION get_employee_name(p_emp_id IN NUMBER) RETURN VARCHAR2;
    
    -- Public procedure declarations
    PROCEDURE update_salary(
        p_emp_id    IN NUMBER,
        p_new_salary IN NUMBER
    );
    
    PROCEDURE process_employees;
    
END employee_pkg;
/

-- ======================
-- Package Body
-- ======================
CREATE OR REPLACE PACKAGE BODY employee_pkg
IS
    -- Private variables
    g_processed_count PLS_INTEGER := 0;
    
    -- Private function
    FUNCTION validate_salary(p_salary IN NUMBER) RETURN BOOLEAN
    IS
    BEGIN
        IF p_salary < 0 OR p_salary > c_max_salary THEN
            RETURN FALSE;
        END IF;
        RETURN TRUE;
    END validate_salary;
    
    -- Public function implementation
    FUNCTION get_employee_name(p_emp_id IN NUMBER) RETURN VARCHAR2
    IS
        l_name VARCHAR2(100);
    BEGIN
        SELECT first_name || ' ' || last_name
        INTO l_name
        FROM employees
        WHERE employee_id = p_emp_id;
        
        RETURN l_name;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN NULL;
        WHEN TOO_MANY_ROWS THEN
            RAISE_APPLICATION_ERROR(-20001, 'Multiple employees found with ID: ' || p_emp_id);
    END get_employee_name;
    
    -- Public procedure implementation
    PROCEDURE update_salary(
        p_emp_id     IN NUMBER,
        p_new_salary IN NUMBER
    )
    IS
    BEGIN
        IF NOT validate_salary(p_new_salary) THEN
            RAISE_APPLICATION_ERROR(-20002, 'Invalid salary amount: ' || p_new_salary);
        END IF;
        
        UPDATE employees
        SET salary = p_new_salary
        WHERE employee_id = p_emp_id;
        
        IF SQL%ROWCOUNT = 0 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Employee not found: ' || p_emp_id);
        END IF;
        
        COMMIT;
        
        DBMS_OUTPUT.PUT_LINE('Salary updated for employee ' || p_emp_id);
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
            RAISE;
    END update_salary;
    
    -- Process all employees using bulk operations
    PROCEDURE process_employees
    IS
        TYPE emp_id_tab IS TABLE OF employees.employee_id%TYPE;
        TYPE salary_tab IS TABLE OF employees.salary%TYPE;
        
        l_emp_ids   emp_id_tab;
        l_salaries  salary_tab;
        
        CURSOR c_employees IS
            SELECT employee_id, salary
            FROM employees
            WHERE department_id = 10;
    BEGIN
        -- Bulk collect all employees
        OPEN c_employees;
        FETCH c_employees BULK COLLECT INTO l_emp_ids, l_salaries LIMIT 1000;
        CLOSE c_employees;
        
        -- Process each employee
        FOR i IN 1..l_emp_ids.COUNT
        LOOP
            IF l_salaries(i) < 50000 THEN
                l_salaries(i) := l_salaries(i) * 1.10;  -- 10% raise
            ELSIF l_salaries(i) < 100000 THEN
                l_salaries(i) := l_salaries(i) * 1.05;  -- 5% raise
            ELSE
                l_salaries(i) := l_salaries(i) * 1.02;  -- 2% raise
            END IF;
            
            g_processed_count := g_processed_count + 1;
        END LOOP;
        
        -- Bulk update
        FORALL i IN 1..l_emp_ids.COUNT
            UPDATE employees
            SET salary = l_salaries(i)
            WHERE employee_id = l_emp_ids(i);
        
        COMMIT;
        
        DBMS_OUTPUT.PUT_LINE('Processed ' || g_processed_count || ' employees');
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END process_employees;

END employee_pkg;
/

-- ======================
-- Standalone Procedure
-- ======================
CREATE OR REPLACE PROCEDURE log_message(
    p_message   IN VARCHAR2,
    p_severity  IN VARCHAR2 DEFAULT 'INFO'
)
IS
    PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
    INSERT INTO log_table (log_date, severity, message)
    VALUES (SYSTIMESTAMP, p_severity, p_message);
    
    COMMIT;
END log_message;
/

-- ======================
-- Standalone Function
-- ======================
CREATE OR REPLACE FUNCTION calculate_bonus(
    p_salary    IN NUMBER,
    p_years     IN NUMBER
) RETURN NUMBER
DETERMINISTIC
IS
    l_bonus NUMBER;
BEGIN
    CASE
        WHEN p_years >= 10 THEN
            l_bonus := p_salary * 0.20;
        WHEN p_years >= 5 THEN
            l_bonus := p_salary * 0.15;
        WHEN p_years >= 2 THEN
            l_bonus := p_salary * 0.10;
        ELSE
            l_bonus := p_salary * 0.05;
    END CASE;
    
    RETURN ROUND(l_bonus, 2);
END calculate_bonus;
/

-- ======================
-- Trigger
-- ======================
CREATE OR REPLACE TRIGGER employees_audit_trg
AFTER INSERT OR UPDATE OR DELETE ON employees
FOR EACH ROW
DECLARE
    l_action VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        l_action := 'INSERT';
    ELSIF UPDATING THEN
        l_action := 'UPDATE';
    ELSIF DELETING THEN
        l_action := 'DELETE';
    END IF;
    
    INSERT INTO audit_log (
        table_name,
        action,
        old_value,
        new_value,
        changed_by,
        changed_date
    ) VALUES (
        'EMPLOYEES',
        l_action,
        :OLD.employee_id,
        :NEW.employee_id,
        USER,
        SYSDATE
    );
END employees_audit_trg;
/

-- ======================
-- Anonymous Block Demo
-- ======================
DECLARE
    l_count     NUMBER;
    l_name      employees.first_name%TYPE;
    l_salary    employees.salary%TYPE;
    l_file      UTL_FILE.FILE_TYPE;
    l_response  VARCHAR2(32767);
BEGIN
    -- Enable DBMS_OUTPUT
    DBMS_OUTPUT.ENABLE(1000000);
    
    -- Simple query
    SELECT COUNT(*), MAX(salary)
    INTO l_count, l_salary
    FROM employees;
    
    DBMS_OUTPUT.PUT_LINE('Total employees: ' || l_count);
    DBMS_OUTPUT.PUT_LINE('Max salary: ' || TO_CHAR(l_salary, '$999,999.99'));
    
    -- Cursor FOR loop
    FOR emp_rec IN (
        SELECT employee_id, first_name, last_name, salary
        FROM employees
        WHERE department_id = 50
        ORDER BY salary DESC
        FETCH FIRST 5 ROWS ONLY
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            emp_rec.employee_id || ': ' ||
            emp_rec.first_name || ' ' ||
            emp_rec.last_name || ' - $' ||
            emp_rec.salary
        );
    END LOOP;
    
    -- Dynamic SQL example
    EXECUTE IMMEDIATE 'SELECT first_name FROM employees WHERE employee_id = :id'
        INTO l_name
        USING 100;
    
    DBMS_OUTPUT.PUT_LINE('Employee 100: ' || l_name);
    
    -- Random number
    DBMS_OUTPUT.PUT_LINE('Random: ' || DBMS_RANDOM.VALUE(1, 100));
    
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('No data found');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Too many rows');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error ' || SQLCODE || ': ' || SQLERRM);
        RAISE;
END;
/

