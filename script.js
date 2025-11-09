// Get elements
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add Task
function addTask() {
  const taskText = taskInput.value.trim();
  if(taskText === '') {
    alert('Please enter a task');
    return;
  }

  // Create list item
  const li = document.createElement('li');

  // Create span for text
  const span = document.createElement('span');
  span.textContent = taskText;
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear input
  taskInput.value = '';
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const taskObj = {
      text: li.querySelector('span').textContent,
      completed: li.querySelector('span').classList.contains('completed')
    };
    tasks.push(taskObj);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    if(task.completed) span.classList.add('completed');
    span.addEventListener('click', () => {
      span.classList.toggle('completed');
      saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
window.addEventListener('load', loadTasks);
