let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks(filter = 'all') {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  const filtered = tasks.filter(task =>
    filter === 'all' ? true :
    filter === 'done' ? task.done :
    !task.done
  );

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    li.innerHTML = `
      <span>
        <strong>${task.text}</strong> 
        <small>(${task.category})</small>
        <span class="priority-${task.priority}">[${task.priority}]</span>
      </span>
      <span>
        <button onclick="toggleDone(${index})"><i class="fas fa-check"></i></button>
        <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
      </span>
    `;
    list.appendChild(li);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function filterTasks(status) {
  displayTasks(status);
}

document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const text = document.getElementById('task-input').value.trim();
  const category = document.getElementById('category').value;
  const priority = document.getElementById('priority').value;

  if (text) {
    tasks.push({ text, category, priority, done: false });
    saveTasks();
    displayTasks();
    this.reset();
  }
});

document.addEventListener('DOMContentLoaded', displayTasks);
