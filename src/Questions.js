const fetch = require("node-fetch");
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const cTable = require('console.table');



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
                console.table(data.data);
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
                console.table(data.data);
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
                console.table(data.data);
              })
        }})
        .catch((err) => {console.log(err);});
    }
//add
    addDepartment () {
        inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'Enter the department name: ',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        )
        .then(( name ) => {
            fetch(`http://localhost:${PORT}/api/department`, {
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
                    console.log("success");
                    console.table(data.data);
                  })
            }})
            .catch((err) => {console.log(err);});
        });
    }

    addRole() {
        var departmentData =[];
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
                for (var i =0; i<data.data.length; i++){
                    departmentData[i] = data.data[i].id+" "+data.data[i].name;
                }
              })
        
                inquirer
                .prompt([
                {
                    type: 'text',
                    name: 'title',
                    message: 'Enter the job title: ',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    type: 'checkbox',
                    name: 'department_id',
                    message: 'Select the department: ',
                    choices: departmentData ,
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
                        if (nameInput ) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
                ])
                .then(({ title, department_id, salary }) => { 
                    department_id=parseInt(department_id); 
                    fetch(`http://localhost:${PORT}/api/role`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({title, department_id, salary}),
                    })
                    .then(async function(response) {
                        // request was successful
                        if (response.ok) {
                            await response.json().then(async function(data) {
                                console.log("success");
                                console.table(data.data);
                        })
                    }})
                    .catch((err) => {console.log(err);});
                });
            }})
    .catch((err) => {console.log(err);});

    }

    addEmployee() {

        var rolesData =[];
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
                for (var i =0; i<data.data.length; i++){
                    rolesData[i] = data.data[i].id+" "+data.data[i].title+" "+data.data[i].department_name;
                }
              })
        
              var managersData =[];
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
                      for (var i =0; i<data.data.length; i++){
                          managersData[i] = data.data[i].id+" "+data.data[i].first_name+" "+data.data[i].last_name;
                      }
                    })

                                inquirer
                                .prompt([
                                {
                                    type: 'text',
                                    name: 'first_name',
                                    message: 'Enter the employee first name: ',
                                    validate: nameInput => {
                                        if (nameInput) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                },
                                {
                                    type: 'text',
                                    name: 'last_name',
                                    message: 'Enter the employee last name: ',
                                    validate: nameInput => {
                                        if (nameInput) {
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
                                    choices: rolesData,
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
                                    choices: managersData,
                                    validate: nameInput => {
                                        if (nameInput.length==1) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                }]
                                )
                                .then(({ first_name, last_name, role_id, manager_id }) => {
                                    role_id=parseInt(role_id[0]); 
                                    manager_id=parseInt(manager_id[0]); 
                                    fetch(`http://localhost:${PORT}/api/employee`, {
                                        method: 'POST',
                                        headers: {
                                        'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({first_name, last_name, role_id, manager_id}),
                                    })
                                    .then(async function(response) {
                                        // request was successful
                                        if (response.ok) {
                                            await response.json().then(async function(data) {
                                                console.log("success");
                                                console.table(data.data);
                                        })
                                    }})
                                    .catch((err) => {console.log(err);});
                                });
                            }})
                            .catch((err) => {console.log(err);});
                    }})
                    .catch((err) => {console.log(err);});
    }
//update employee

updateEmployeeRole() {

    var rolesData =[];
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
            for (var i =0; i<data.data.length; i++){
                rolesData[i] = data.data[i].id+" "+data.data[i].title+" "+data.data[i].department_name;
            }
          })
    
          var employeesData =[];
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
                  for (var i =0; i<data.data.length; i++){
                      employeesData[i] = data.data[i].id+" "+data.data[i].first_name+" "+data.data[i].last_name;
                  }
                })

                            inquirer
                            .prompt([
                            {
                                type: 'checkbox',
                                name: 'employee_id',
                                message: 'Select the employee to update: ',
                                choices: employeesData,
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
                                name: 'new_role_id',
                                message: 'Select the new role: ',
                                choices: rolesData,
                                validate: nameInput => {
                                    if (nameInput.length==1) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }]
                            )
                            .then(({ employee_id, new_role_id }) => {
                                employee_id=parseInt(employee_id[0]); 
                                new_role_id=parseInt(new_role_id[0]); 
                                fetch(`http://localhost:${PORT}/api/employee`, {
                                    method: 'PUT',
                                    headers: {
                                    'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({employee_id, new_role_id}),
                                })
                                .then(async function(response) {
                                    // request was successful
                                    if (response.ok) {
                                        await response.json().then(async function(data) {
                                            console.log("success");
                                            console.table(data.data);
                                    })
                                }})
                                .catch((err) => {console.log(err);});
                            });
                        }})
                        .catch((err) => {console.log(err);});
                }})
                .catch((err) => {console.log(err);});
}

//initialize
    
    initializeQuestions() {
        this.promptUserInitialQuestions();
    }
}

module.exports = Questions;
    