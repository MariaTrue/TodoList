import request from "supertest";
import { getApp } from "../app";

/**
 * @typedef  Todo
 * @property {string} id;
 * @property {boolean} completed;
 * @property {string} title;
 */
export class Driver {
  app = null;

  init() {
    this.app = getApp();
  }

  clean() {
    this.app = null;
  }

  request() {
    return request(this.app);
  }

  when = {
    getTodos: () => {
      return this.request().get("/todo");
    },
    /**
     *
     * @param {string} title
     * @returns
     */
    addTodo: (title) => {
      return this.request()
        .post("/todo")
        .send({ title })
        .set("Content-Type", "application/json");
    },
    /**
     *
     * @param {Todo} todo
     * @returns
     */
    updateTodo: (todo) => {
      return this.request()
        .patch("/todo")
        .send({ todo })
        .set("Content-Type", "application/json");
    },
    removeTodo: (id) => {
      return this.request().delete(`/todo/${id}`);
    },
    getTodo: async (id) => {
      const response = await this.when.getTodos();
      const todo = JSON.parse(response.text).find((todo) => todo.id === id);
      return todo;
    },
    deleteAllTodos: async () => {
      return await this.request()
        .delete("/todo-delete")
        .then((r) => JSON.parse(r.text)).value;
    },
  };
}
