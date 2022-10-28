
const db = require('./db');
const inquirer = require('inquirer');
const see = require('asciiart-logo');

require('console.table');

init();

//Show text from main prompts


function init() {
  const seeText = see({ name: "Employee Manager", borderColor: "bold-blue"}).render();

  console.log(seeText);

  seePromptUser();
}

function seePromptUser() {
  inquirer.prompt(
    [ 
      {
        type: 'list',
        name: 'choice',
        message: 'Select your choice',
        choices: [
          { name: 'View ALL Employees',
            value: 'VIEW_EMPLOYEES'
          },
          { name: 'View ALL Roles',
            value: 'VIEW_ROLES'
          },
          { name: 'View ALL Departments',
            value: 'VIEW_DEPARTMENTS'
          },
          // Bonus
          { name: 'View ALL Employees by Department',
            value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
          },
          { name: 'View Department Budget',
            value: 'VIEW_DEPARTMENT_BUDGET'
          }, //
          { name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          { name: "Add Role",
            value: "ADD_ROLE"
          },
          { name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          { name: 'Update Employee Role',
            value: 'UPDATE_EMPLOYEE_ROLE'
          },
          // Bonus
          { name: 'Update Employee Manager',
            value: 'UPDATE_EMPLOYEE_MANAGER'
          },
          { name: 'Remove Employee',
            value: 'REMOVE_EMPLOYEE'
          },
          { name: 'Remove Role',
            value: 'REMOVE_ROLE'
          },
          { name: 'Remove Department',
            value: 'REMOVE_DEPARTMENT'
          }, //
          { name: 'Quit',
            value: 'QUIT'
          }
        ]
      }
    ]).then(res => {
            let choice =res.choice; 
            // Call the appropriate function depending on what the user chose
            switch (choice) {
              case 'VIEW_EMPLOYEES': viewEmployees();
                break;
              case 'VIEW_ROLES': viewRoles();
                break;
              case 'VIEW_DEPARTMENTS': viewDepartments();
                break;
              case 'VIEW_EMPLOYEES_BY_DEPARTMENT': viewEmployeesByDepartment();
                break;
              case 'VIEW_DEPARTMENT_BUDGET': viewDepartmentBudget();
                break;
              case 'ADD_EMPLOYEE': addEmployee();
                break;
              case 'ADD_ROLE': addRole();
                break;
              case 'ADD_DEPARTMENT': addDepartment();
                break;
              case 'UPDATE_EMPLOYEE_ROLE': updateEmployeeRole();
                break;
              case 'UPDATE_EMPLOYEE_MANAGER': updateEmployeeManager();
                break;
              case 'REMOVE_EMPLOYEE': removeEmployee();
                break;
              case 'REMOVE_ROLE': removeRole();
                break;
              case 'REMOVE_DEPARTMENT': removeDepartment();
                break;
              default:
                quit();  
            }
          })
}

// View all employees, all roles, all departments
function viewEmployees() {
  db.seeAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    }).then(() => seePromptUser());
    }

function viewRoles() {
  db.seeAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log('\n');
      console.table(roles);
    }).then(() => promptUser());
}

function viewDepartments() {
  db.seeAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log('\n');
      console.table(departments);
    }).then(() => seePromptUser());
}

//See who works for each department
function viewEmployeesByDepartment() {
  db.seeAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department do you want people to work in?',
          choices: departmentChoices
        }
      ])
        .then(res => db.seeAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log('\n');
          console.table(employees);
        })
        .then(() => seePromptUser())
    });
}


//add an employee
function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      message: "Enter the first name of the employee."
    },
    {
      name: 'last_name',
      message: "Enter the last name of the employee."
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      db.allRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: "What is the role of the employee?",
            choices: roleChoices
          })
          .then(res => {
            let roleId = res.roleId;
              db.allEmployees()
          .then(([rows]) => {
            let employees = rows;
              const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
                }));
                managerChoices.unshift({ name: "None", value: null });

          inquirer.prompt({
            type: 'list',
            name: 'managerId',
            message: "Choose the manager of the employee:",
            choices: managerChoices
          })
            .then(res => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
              }
            db.addEmployee(employee);
            })
            .then(() => console.log(`Employee ${firstName} ${lastName} has been added!`))
            .then(() => seePromptUser())
            })
            })
        })
    })
}

//add a role
function addRole() {
  db.seeAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt([
        {
          name: 'title',
          message: 'Type the name of the new role'
        },
        {
          name: 'salary',
          message: 'Enter the salary for this role:'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Enter the department for this role:',
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Role ${role.title} has been added!`))
            .then(() => seePromptUser())
        })
    })
}

//add a department
function addDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      message: 'Enter new department name:'
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Department ${name.name} has been added!`))
        .then(() => seePromptUser())
    })
}



// remove employee, role, department
function removeEmployee() {
  db.seeAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Select employee to remove:",
          choices: employeeChoices
        }
      ])
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log("Employee has been removed!"))
        .then(() => seePromptUser())
    })
}

function removeRole() {
  db.seeAllRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'roleId',
          message:
            "Select role to remove",
          choices: roleChoices
        }
      ])
        .then(res => db.removeRole(res.roleId))
        .then(() => console.log("Role has been removed!"))
        .then(() => seePromptUser())
    })
}

// Delete a department
function removeDepartment() {
  db.seeAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      inquirer.prompt({
        type: 'list',
        name: 'departmentId',
        message:
          "Select department to remove",
        choices: departmentChoices
      })
        .then(res => db.removeDepartment(res.departmentId))
        .then(() => console.log("Removed department from the database"))
        .then(() => seePromptUser())
    })
}

// end session
function quit() {
  console.log("See You Later!!!");
  process.exit();
}

