const headers = { "Content-Type": "application/json" };

const handleResponse = async (res) => {
  if (res.status !== 200) {
    const data = await res.text();
    throw new Error(JSON.stringify({ status: res.status, data }));
  }
  return res.json();
};

export const todoService = {
  getTodos(filter) {
    try {
      return fetch(`/todo?filter=${filter}`, { method: "GET" }).then(
        handleResponse
      );
    } catch (err) {
      console.error("[db.getTodos] failed to fetch todos", err);
    }
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
  async updateTodo(todo) {
    try {
      await fetch("/todo", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ todo }),
      }).then(handleResponse);
    } catch (err) {
      console.error("[db.updateTodo] failed to update todo");
    }
  },
};
