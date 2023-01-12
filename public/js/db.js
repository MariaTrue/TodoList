export const db = {
  getTodos() {
    let todos;
    async() => {
      try {
        const response = await fetch('/todo', {method: "GET"});
        todos = response.json();
      }catch(err) {
        console.log(`Todos didn't load :${err}`);
        todos = null;
      }
    }
    return todos;
  },
  setFilter(selectedValue) {
    localStorage.setItem("filter", selectedValue);
  },
  getFilter() {
    return localStorage.getItem("filter");
  },
  addTodo(name) {
    async() => {
        try{
          await fetch("/todo", {body: JSON.stringify(name), method: "POST"});
        }catch(err){
          console.log(`Todo didn't add : ${err}`);
        }
    }
  },
  deleteTodo(id) {
    async() => {
      try{
        await fetch("/delete-todo", {body: JSON.stringify(id), method: "DELETE"});
      }catch(err){
        console.log(`Todo didn't delete : ${err}`);
      }
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
