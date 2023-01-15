const headers = { "Content-Type": "application/json" };

const handleResponse = async (res) => {
  if (res.status !== 200) {
    const data = await res.text();
    throw new Error(JSON.stringify({ status: res.status, data }));
  }
  return res.json();
};

export const todoService = {
  getTodos() {
    try {
      return fetch("/todo", { method: "GET" }).then(handleResponse);
    } catch (err) {
      console.error("[db.getTodos] failed to fetch todos", err);
    }
  },
  setFilter(selectedValue) {
    localStorage.setItem("filter", selectedValue);
  },
  getFilter() {
    return localStorage.getItem("filter");
  },
  async addTodo(title) {
    try {
      await fetch("/todo", {
        method: "POST",
        headers,
        body: JSON.stringify({ title }),
      }).then(handleResponse);
    } catch (err) {
      console.error("[db.addTodo] failed to fetch todo");
    }
  },
  async deleteTodo(id) {
    try {
      await fetch(`/todo/${id}`, { method: "DELETE" }).then(handleResponse);
    } catch (err) {
      console.error("[db.deleteTodo] failed to fetch todo id", err.message);
    }
  },
  toggleTodo(id) {
    const todos = this.getTodos().map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    // this.saveTodosToStorage(todos);
  },
};
