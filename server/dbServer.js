export const db = {
  todos: [],
  getTodos(filter) {
    if (filter === "COMPLETED") {
      return this.todos.filter((todo) => todo.completed);
    } else if (filter === "UNCOMPLETED") {
      return this.todos.filter((todo) => !todo.completed);
    }
    return this.todos;
  },
  addTodo(title) {
    if (!title) {
      console.error("[dbServer.addTodo] title is required");
      throw new Error("Title is required");
    }
    const todo = {
      title,
      completed: false,
      id: String(Math.ceil(Math.random() * 10000)),
    };
    this.todos.push(todo);
    return todo;
  },
  deleteTodo(id) {
    const idxTodo = this.todos.findIndex((todo) => todo.id === id);

    if (idxTodo === -1) {
      console.error("[dbServer.deleteTodo] todo doesn't exist", id);
      throw new Error(`Todo with id ${id} doesn't exist`);
    }
    return this.todos.splice(idxTodo, 1)[0];
  },
  updateTodo(todoForUpdate) {
    const { id } = todoForUpdate;
    const idxTodo = this.todos.findIndex((todo) => todo.id === id);

    if (idxTodo === -1) {
      console.error("[dbServer.updateTodo] todo doesn't exist", id);
      throw new Error(`Todo with id ${id} doesn't exist`);
    }
    this.todos.splice(idxTodo, 1, todoForUpdate);
    return todoForUpdate;
  },
  deleteAllTodos() {
    this.todos = [];
    return this.todos;
  },
};
