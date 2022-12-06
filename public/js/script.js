import { db } from "./db.js";
import { createListTodoElement } from "./components/todoList.js";

export function start() {
  const todos = db.getTodos();
  const filter = db.getFilter();
  let filteredTodos;

  if (filter === "COMPLETED") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (filter === "UNCOMPLETED") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else {
    filteredTodos = todos;
  }

  renderTodos(filteredTodos);
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
    db.addTodo(todoName);
    document.getElementById("todo-name").value = "";
    start();
  }
}

function filterChanged() {
  const selectedValue = document.getElementById("drop-down").value;
  db.setFilter(selectedValue);
  start();
}

document.getElementById("button-add").onclick = buttonAddPressed;
document.getElementById("drop-down").onclick = filterChanged;
