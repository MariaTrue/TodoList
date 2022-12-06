import { db } from "../db.js";
import { start } from "../script.js";

function buttonDeletePressed(todoId) {
  db.deleteTodo(todoId);
  start();
}

function toggleTodo(todoId) {
  db.toggleTodo(todoId);
  start();
}

export function createTodoElement(todo) {
  const todoName = document.createElement("li");
  todoName.innerText = todo.name;

  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";
  completedCheckbox.name = "task-status";
  completedCheckbox.checked = todo.completed;
  completedCheckbox.onchange = () => toggleTodo(todo.id);

  const buttonDelete = document.createElement("input");
  buttonDelete.className = "btn-delete";
  buttonDelete.type = "button";
  buttonDelete.value = "Delete";
  buttonDelete.onclick = () => buttonDeletePressed(todo.id);

  const container = document.createElement("div");
  container.className = "row";

  container.append(todoName, completedCheckbox, buttonDelete);

  return container;
}
