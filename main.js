var employeeNameInput = document.getElementById('Name');
var employeeAgeInput = document.getElementById('inputAge');
var employeeEmailInput = document.getElementById('inputEmail');
var employeeSalaryInput = document.getElementById('inputSalary');
var employeeDepartmentInput = document.getElementById('inputDepartment');
var inputs = document.getElementsByClassName('inputs');
var deleteAllBtn = document.getElementById('deleteAll');
var addBtn = document.getElementById('add');
var data = document.getElementById('data');
var currentIndex = 0;
var employees = JSON.parse(localStorage.getItem("employeesList")) == null ? [] : JSON.parse(localStorage.getItem("employeesList"));
display();

var nameCheack = false;
var emailCheack = false;
var ageCheack = false;




addBtn.onclick = function () {
    if (addBtn.innerHTML == "Add Cource") {
        addEmployee();

    } else {
        update();
    }
    display();
    clear();
    nameCheack = false;
    emailCheack = false;
    ageCheack = false;
    disabledOrNot();
}

function addEmployee() {
    var employee = {
        name: employeeNameInput.value,
        email: employeeEmailInput.value,
        age: employeeAgeInput.value,
        salary: employeeSalaryInput.value,
        dep: employeeDepartmentInput.value,
    }
    employees.push(employee);
    localStorage.setItem("employeesList", JSON.stringify(employees));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
}

function display() {
    var result = "";
    for (var i = 0; i < employees.length; i++) {
        result += `<tr>
        <td>${i}</td>
        <td>${employees[i].name}</td>
        <td>${employees[i].age}</</td>
        <td>${employees[i].email}</</td>
        <td>${employees[i].salary}</</td>
        <td>${employees[i].dep}</</td>  
        <td><button class="update" onclick="getEmpData(${i})"> update </button></td>
        <td><button class="delete" onclick="deleteEmp(${i})" > delete </button></td>
        </tr>`;
    }
    data.innerHTML = result;
}

function deleteEmp(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            employees.splice(index, 1);
            localStorage.setItem("employeesList", JSON.stringify(employees));
            display();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}


function clear() {
    for (var i = 0; i < (inputs.length); i++) {
        inputs[i].value = "";
    }

    employeeAgeInput.classList.remove('is-valid');
    employeeNameInput.classList.remove('is-valid');
    employeeEmailInput.classList.remove('is-valid');
}


deleteAllBtn.onclick = function () {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("employeesList");
            employees = [];
            data.innerHTML = "";
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })



}

function search(v) {
    var result = "";
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].name.toLowerCase().includes(v.toLowerCase())) {
            result += `<tr>
            <td>${i}</td>
            <td>${employees[i].name}</td>
            <td>${employees[i].age}</</td>
            <td>${employees[i].email}</</td>
            <td>${employees[i].salary}</</td>
            <td>${employees[i].dep}</</td>  
            <td><button class="update" onclick="getEmpData(${i})"> update </button></td>
            <td><button class="delete" onclick="deleteEmp(${i})" > delete </button></td>
            </tr>`;
        }
    }
    data.innerHTML = result;
}

function getEmpData(i) {
    var update = employees[i];
    employeeNameInput.value = update.name;
    employeeEmailInput.value = update.email;
    employeeSalaryInput.value = update.salary;
    employeeDepartmentInput.value = update.dep;
    employeeAgeInput.value = update.age;
    addBtn.innerHTML = "update ";
    currentIndex = i;
}

function update() {
    var employee = {
        name: employeeNameInput.value,
        email: employeeEmailInput.value,
        age: employeeAgeInput.value,
        salary: employeeSalaryInput.value,
        dep: employeeDepartmentInput.value,
    }
    employees[currentIndex] = employee;
    localStorage.setItem("employeesList", JSON.stringify(employees));
    addBtn.innerHTML = "Add Cource";
    currentIndex = 0;

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
}

function disabledOrNot() {
    if (nameCheack && ageCheack && emailCheack) {
        addBtn.removeAttribute("disabled");

    } else {
        addBtn.setAttribute("disabled", "true");
    }
}

employeeNameInput.onkeyup = function () {
    var namePattern = /^[A-Z][a-z]{2,7}$/;
    if (namePattern.test(employeeNameInput.value)) {
        nameCheack = true;
        disabledOrNot();
        employeeNameInput.classList.add('is-valid');
        employeeNameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    } else {
        nameCheack = false;
        disabledOrNot();
        employeeNameInput.classList.add('is-invalid');
        employeeNameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');

    }
}


employeeEmailInput.onkeyup = function () {
    var namePattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (namePattern.test(employeeEmailInput.value)) {
        emailCheack = true;
        disabledOrNot();
        employeeEmailInput.classList.add('is-valid');
        employeeEmailInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    } else {
        emailCheack = false;
        disabledOrNot();
        employeeEmailInput.classList.add('is-invalid');
        employeeEmailInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');

    }
}


employeeAgeInput.onkeyup = function () {
    var namePattern = /^(1[89]|[2-9]\d)$/;
    if (namePattern.test(employeeAgeInput.value)) {
        ageCheack = true;
        disabledOrNot();
        employeeAgeInput.classList.add('is-valid');
        employeeAgeInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    } else {
        ageCheack = false;
        disabledOrNot();
        employeeAgeInput.classList.add('is-invalid');
        employeeAgeInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');

    }
}