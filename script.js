let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span contenteditable="false">${task}</span>
      <div class="actions">
        <button onclick="editTask(${index})">Editar</button>
        <button onclick="deleteTask(${index})">Excluir</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const input = document.getElementById("task-input");
  const value = input.value.trim();
  if (value) {
    tasks.push(value);
    saveTasks();
    renderTasks();
    input.value = "";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const span = document.querySelectorAll("li span")[index];
  const button = document.querySelectorAll(".actions button")[index * 2]; // botão "Editar"
  if (span.isContentEditable) {
    tasks[index] = span.textContent.trim();
    saveTasks();
    button.textContent = "Editar";
    span.contentEditable = "false";
  } else {
    span.contentEditable = "true";
    span.focus();
    button.textContent = "Salvar";
  }
}

document.getElementById("task-form").addEventListener("submit", addTask);
renderTasks();
