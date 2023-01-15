import { todoService } from "./todoService.js";
import { createListTodoElement } from "./components/todoList.js";

export async function start() {
  const todos = await todoService.getTodos();
  // const filter = todoService.getFilter();
  let filteredTodos;

  // if (filter === "COMPLETED") {
  //   filteredTodos = todos.filter((todo) => todo.completed);
  // } else if (filter === "UNCOMPLETED") {
  //   filteredTodos = todos.filter((todo) => !todo.completed);
  // } else {
    filteredTodos = todos;
  // }

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
    todoService.addTodo(todoName);
    document.getElementById("todo-name").value = "";
    start();
  }
}

function filterChanged() {
  const selectedValue = document.getElementById("drop-down").value;
  todoService.setFilter(selectedValue);
  start();
}

document.getElementById("button-add").onclick = buttonAddPressed;
document.getElementById("drop-down").onclick = filterChanged;
start();