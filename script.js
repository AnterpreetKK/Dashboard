// Store tasks in localStorage (this will simulate a local database)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Simple login system
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    // Simple validation (static password for demo)
    if (password === 'password123') {
        sessionStorage.setItem('userType', userType);
        if (userType === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'employee.html';
        }
    } else {
        document.getElementById('errorMessage').innerText = 'Invalid credentials.';
    }
});

// Logout functionality
document.getElementById('logoutBtn')?.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = 'index.html';
});

// Admin - Add task functionality
document.getElementById('taskForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const taskEmployee = document.getElementById('taskEmployee').value;

    // Add new task to the task list
    const task = { name: taskName, employee: taskEmployee, status: 'Pending' };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
});

// Admin - Render tasks in admin dashboard
function renderTasks() {
    const taskList = document.getElementById('taskList');
    if (taskList) {
        taskList.innerHTML = tasks.map(task => `<li>${task.name} - <strong>${task.employee}</strong> <span class="status pending">${task.status}</span></li>`).join('');
    }

    const employeeTaskList = document.getElementById('employeeTaskList');
    if (employeeTaskList) {
        // Filter tasks for the employee dashboard
        const userType = sessionStorage.getItem('userType');
        const employeeTasks = tasks.filter(task => task.employee.toLowerCase() === userType);
        employeeTaskList.innerHTML = employeeTasks.map(task => `<li>${task.name} - Status: <span class="status pending">${task.status}</span></li>`).join('');
    }
}

renderTasks();
