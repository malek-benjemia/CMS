const fetch = require("node-fetch");
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;

class Questions {
    constructor() {
    }

    //ask the user for the action the user wants to do
    promptUserInitialQuestions() {
     
        inquirer
        .prompt([
        {
            type: 'checkbox',
            name: 'action',
            message: `What action do you want to perform?`,
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                return false;
                }
            }
        }]
        )
        .then(({ action }) => {
            if (action == 'view all departments'){
                this.displayAllDepartments();
            }
            else if (action == 'view all roles'){
                this.displayAllRoles();
            }
            else if (action  == 'view all employees'){
                this.displayAllEmployees();
            }
            else if (action  == 'add a department'){
                this.addDepartment();
            }
            else if (action  == 'add a role'){
                this.addRole();
            }
            else if (action  == 'add an employee'){
                this.addEmployee();
            }
            else if (action  == 'update an employee role'){
                this.updateEmployeeRole();
            }

        })
        .catch((err) => {console.log(err);})
    }
//display
    displayAllDepartments () {
        fetch(`http://localhost:${PORT}/api/departments`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(async function(response) {
            // request was successful
            if (response.ok) {
                await response.json().then(async function(data) {
                console.log(data);
              })
        }})
        .catch((err) => {console.log(err);});
    }

    displayAllRoles () {
        fetch(`http://localhost:${PORT}/api/roles`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(async function(response) {
            // request was successful
            if (response.ok) {
                await response.json().then(async function(data) {
                console.log(data);
              })
        }})
        .catch((err) => {console.log(err);});
    }

    displayAllEmployees () {
        fetch(`http://localhost:${PORT}/api/employees`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(async function(response) {
            // request was successful
            if (response.ok) {
                await response.json().then(async function(data) {
                console.log(data);
              })
        }})
        .catch((err) => {console.log(err);});
    }
//add
    addDepartment () {
        this.promptUserDepartment ()
        .then(({ name }) => {
            fetch(`http://localhost:${PORT}/api/deprtment`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(name),
            })
            .then(async function(response) {
                // request was successful
                if (response.ok) {
                    await response.json().then(async function(data) {
                    console.log(data);
                  })
            }})
            .catch((err) => {console.log(err);});
        });
    }

    addRole () {
        this. promptUserRole ()
        .then(({ title, department_id, salary }) => {
            fetch(`http://localhost:${PORT}/api/role`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(title, department_id, salary),
            })
            .then(async function(response) {
                // request was successful
                if (response.ok) {
                    await response.json().then(async function(data) {
                    console.log(data);
                  })
            }})
            .catch((err) => {console.log(err);});
        });
    }

    addEmployee () {
        this.promptUserEmployee ()
        .then(({ first_name, last_name, role_id, manager_id }) => {
            fetch(`http://localhost:${PORT}/api/employee`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(first_name, last_name, role_id, manager_id),
            })
            .then(async function(response) {
                // request was successful
                if (response.ok) {
                    await response.json().then(async function(data) {
                    console.log(data);
                  })
            }})
            .catch((err) => {console.log(err);});
        });
    }

//prompt for details to add
    promptUserDepartment () {
        inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'Enter the department name: ',
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        )
        .then(({ name }) => {
            return name;
        });
    }
    
    promptUserRole () {
        inquirer
        .prompt({
            type: 'text',
            name: 'title',
            message: 'Enter the job title: ',
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'department',
            message: 'Select the department: ',
            choices: [1,2],
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'salary',
            message: 'Enter the salary: ',
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        )
        .then(({ title,department_id,salary }) => {
            return (title,department_id,salary);
        });
    }

    promptUserEmployee () {
        inquirer
        .prompt({
            type: 'text',
            name: 'first_name',
            message: 'Enter the employee first name: ',
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'tlast_name',
            message: 'Enter the employee last name: ',
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'role_id',
            message: 'Select the employee role: ',
            choices: [1,2],
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'manager_id',
            message: 'Select the employee s manager: ',
            choices: [1,2],
            validate: nameInput => {
                if (nameInput.length==1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        )
        .then(({ first_name, last_name, role_id, manager_id }) => {
            return (first_name, last_name, role_id, manager_id);
        });
    }

    initializeQuestions() {
        this.promptUserInitialQuestions();
    }
}

module.exports = Questions;
    