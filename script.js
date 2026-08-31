// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
window.addEventListener('load', loadTasks);

// Add event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add to list
    addTaskToDOM(task);
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
}

// Add task to DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? 'checked' : ''}
        >
        <span class="task-text">${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Checkbox toggle
    li.querySelector('.task-checkbox').addEventListener('change', () => {
        li.classList.toggle('completed');
        task.completed = !task.completed;
        saveTasks();
    });

    // Delete button
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        deleteTask(task.id);
        saveTasks();
    });

    taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(taskList.querySelectorAll('.task-item')).map(li => ({
        id: Date.now(),
        text: li.querySelector('.task-text').textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Delete task
function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
