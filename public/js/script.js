import { todoService } from "./services/todoService.js";
import { createListTodoElement } from "./components/todoList.js";
import { filterService } from "./services/filterService.js";

export async function start() {
  const filter = filterService.getFilter();
  const todos = await todoService.getTodos(filter);

  renderTodos(todos);
}

function renderTodos(todos) {
  const div = document.getElementById("todos");
  const listTodoElement = createListTodoElement(todos);

  if (div.children[2]) {
    div.replaceChild(listTodoElement, div.children[2]);
  } else {
    div.appendChild(listTodoElement);
  }
}

function buttonAddPressed() {
  const todoName = document.getElementById("todo-name").value;
  if (todoName) {
    todoService.addTodo(todoName);
    document.getElementById("todo-name").value = "";
    start();
  }
}

function filterChanged() {
  const selectedValue = document.getElementById("drop-down").value;
  filterService.setFilter(selectedValue);
  start();
}

document.getElementById("button-add").onclick = buttonAddPressed;
document.getElementById("drop-down").onclick = filterChanged;
start();
