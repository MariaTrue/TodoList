export const db = {
  getTodos() {
    return async () => {
      let todos;
      try {
        const response = await fetch('/todo', {method: "GET"});
        todos = response.json();
      }catch(err) {
        console.log(`Todos didn't load :${err}`);
        todos = null;
      }
      return todos;
    }
    
  },
  setFilter(selectedValue) {
    localStorage.setItem("filter", selectedValue);
  },
  getFilter() {
    return localStorage.getItem("filter");
  },
  addTodo(name) {
    async () => {
        try{
          const response = await fetch("/todo", {body: JSON.stringify(name), method: "POST"});
        }catch(err){
          console.log(`Todo didn't add : ${err}`);
        }
    }
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
