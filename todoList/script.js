const db = {
  getTodos() {
    return JSON.parse(localStorage.getItem("todos"));
  },
  setFilter(selectedValue) {
    localStorage.setItem("filter", selectedValue);
  },
  getFilter() {
    return localStorage.getItem("filter");
  },
  addTodo(name) {
    const todo = {
      name,
      completed: false,
      id: Math.ceil(Math.random() * 10000),
    };
    let todos = this.getTodos();

    if (!todos) {
      todos = [];
    }

    todos.push(todo);
    this.saveTodosToStorage(todos);
  },
  deleteTodo(id) {
    const arrByDelete = this.getTodos().filter((todo) => todo.id !== id);
    this.saveTodosToStorage(arrByDelete);
  },
  toggleTodo(id) {
    const todos = this.getTodos().map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.saveTodosToStorage(todos);
  },
  saveTodosToStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
};

function renderTodos(todos) {
  const div = document.getElementById("todos");
  const listTodoElement = createListTodoElement(todos);

  if (div.children[2]) {
    div.replaceChild(listTodoElement, div.children[2]);
  } else {
    div.appendChild(listTodoElement);
  }
}

function start() {
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

function createTodoElement(todo) {
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

function createListTodoElement(todos) {
  const listTodoElement = document.createElement("ul");

  listTodoElement.append(
    ...todos.map((todo) => {
      return createTodoElement(todo);
    })
  );

  return listTodoElement;
}

function buttonAddPressed() {
  const todoName = document.getElementById("todo-name").value;
  if (todoName) {
    db.addTodo(todoName);
    document.getElementById("todo-name").value = "";
    start();
  }
}

function buttonDeletePressed(todoId) {
  db.deleteTodo(todoId);
  start();
}

function toggleTodo(todoId) {
  db.toggleTodo(todoId);
  start();
}

function filterChanged() {
  const selectedValue = document.getElementById("drop-down").value;
  db.setFilter(selectedValue);
  start();
}
