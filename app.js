import express from "express";
import path from "path";
import { db } from "./server/dbServer.js";

export const getApp = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));

  app.post("/todo", (req, res) => {
    try {
      const todo = db.addTodo(req.body.title);
      return res.status(200).send(todo);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });

  app.patch("/todo", (req, res) => {
    try {
      const todo = db.updateTodo(req.body.todo);
      return res.status(200).send(todo);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });

  app.delete("/todo/:id", (req, res) => {
    try {
      const todo = db.deleteTodo(req.params.id);
      return res.status(200).send(todo);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });

  app.delete("/todo-delete", (req, res) => {
    try {
      const todos = db.deleteAllTodos();
      return res.status(200).send(todos);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });

  app.get("/todo", (req, res) => {
    const { filter } = req.query;
    const todos = JSON.stringify(db.getTodos(filter));
    return res.status(200).send(todos);
  });

  app.get("/", (req, res) => {
    return res.sendFile(path.resolve() + "/index.html");
  });

  return app;
};
