const connection = require ("../db/connection");


class DB {
   
// Keeping track of the class's  connection in case we need it later
constructor(connection) {
    this.connection = connection;
  }

// Create a new employee
createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }

// Create a new role
createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

// Create a new department
createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }

  // See all departments
  seeAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }

// Find all the employees except the one whose ID is given.
seeAllManagers(employeeId) {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

// Find all the employees and join them with their roles and departments to show their roles, salaries, departments, and managers.
seeAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

// Change the role of the given employee
updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

}

module.exports = new DB(connection);


