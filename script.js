// script.js
let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString(),
        };
        tasks.push(task);
        input.value = '';
        renderTasks();
    }
}

function renderTasks() {
    const pendingTasksUl = document.getElementById('pendingTasks');
    const completedTasksUl = document.getElementById('completedTasks');

    pendingTasksUl.innerHTML = '';
    completedTasksUl.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Create complete button
        const completeBtn = document.createElement('span');
        completeBtn.textContent = '✔️';
        completeBtn.className = 'complete';
        completeBtn.onclick = () => completeTask(task.id);
        li.appendChild(completeBtn);

        // Create edit button
        const editBtn = document.createElement('span');
        editBtn.textContent = '✏️';
        editBtn.className = 'edit';
        editBtn.onclick = () => editTask(task.id);
        li.appendChild(editBtn);

        // Create delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '🗑️';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => deleteTask(task.id);
        li.appendChild(deleteBtn);

        if (task.completed) {
            li.classList.add('completed');
            completedTasksUl.appendChild(li);
        } else {
            pendingTasksUl.appendChild(li);
        }
    });
}

function completeTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: true } : task
    );
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newText = prompt("Edit task:", task.text);

    if (newText !== null) {
        task.text = newText;
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}
