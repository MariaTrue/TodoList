export const db = {
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
