import { createTodoElement } from "./todo.js";

export function createListTodoElement(todos) {
  const listTodoElement = document.createElement("ul");

  listTodoElement.append(
    ...todos.map((todo) => {
      return createTodoElement(todo);
    })
  );

  return listTodoElement;
}
