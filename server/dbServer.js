export const db = {
    todos: [],
    filter: "ALL_TASKS",
    getTodos() { return this.todos},
    addTodo(title) {
        const todo = {
            title,
            completed: false,
            id: String(Math.ceil(Math.random() * 10000)),
        }
        this.todos.push(todo);
        return todo;
    },
    deleteTodo(id) {
        const idxTodo = this.todos.findIndex((todo) => todo.id === id);

        if(idxTodo === -1) {
            console.error("[dbServer.deleteTodo] todo doesn't exist", id);
            throw new Error(`Todo with id ${id} doesn't exist`);
        }
        return this.todos.splice(idxTodo, 1);
    },
    toggleTodo(id) {
        this.todos.forEach((todo) => {
            if(todo.id == id) {
                todo.completed = !todo.completed;
            }
        })
    },
    getFilter() {return this.filter},
    setFilter(filter) {this.filter = filter}
}
