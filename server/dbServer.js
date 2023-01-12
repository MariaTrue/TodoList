export const db = {
    todos: [],
    filter: "ALL_TASKS",
    getTodos() { return this.todos},
    addTodo(name) {
        this.todos.push({
            name,
            completed: false,
            id: Math.ceil(Math.random() * 10000),
        })
    },
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id)
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
