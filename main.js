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



addBtn.onclick = function () {
    if (addBtn.innerHTML == "Add Cource") {
        addEmployee();
    } else {
        update();
    }
    display();
    clear();
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

function deleteEmp(index){
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


function clear(){
    for (var i = 0; i < (inputs.length); i++) {
        inputs[i].value = "";
    }
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