import { todoService } from "../services/todoService.js";
import { start } from "../script.js";

async function buttonDeletePressed(todoId) {
  await todoService.deleteTodo(todoId);
  start();
}

async function toggleTodo(todo) {
  todo.completed = !todo.completed;
  await todoService.updateTodo(todo);
  start();
}

export function createTodoElement(todo) {
  const todoName = document.createElement("li");
  todoName.innerText = todo.title;

  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";
  completedCheckbox.name = "task-status";
  completedCheckbox.checked = todo.completed;
  completedCheckbox.onchange = () => toggleTodo(todo);

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
