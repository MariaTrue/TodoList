import express from "express";
import path from "path";
import { db } from "./server/dbServer.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post("/todo", (req, res) => {
  const todo = db.addTodo(req.body.title);
  return res.send(todo).status(200);
});

app.patch("/todo", (req, res) => {
  try {
    const todo = db.updateTodo(req.body.todo);
    return res.send(todo).status(200);
  } catch (err) {
    res.send({ error: err.message }).status(400);
  }
});

app.delete("/todo/:id", (req, res) => {
  try {
    const todo = db.deleteTodo(req.params.id);
    return res.send(todo).status(200);
  } catch (err) {
    res.send({ error: err.message }).status(400);
  }
});

app.get("/todo", (req, res) => {
  const { filter } = req.query;
  const todos = JSON.stringify(db.getTodos(filter));
  return res.send(todos).status(200);
});

app.get("/", (req, res) => {
  return res.sendFile(path.resolve() + "/index.html");
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`);
});
