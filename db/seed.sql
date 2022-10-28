
--fill in the appropriate values for department, role, and staff --
INSERT INTO departments (department_name)
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Tim', 'Green', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Soto', 3, NULL),
    ('Kevin', 'Love', 4, 3),
    ('Kim', 'Possible', 5, NULL),
    ('Fred', 'Brown', 6, 5),
    ('Sarah', 'Spice', 7, NULL),
    ('Tim', 'Allen', 8, 7);
