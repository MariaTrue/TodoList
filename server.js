import express from "express";
import path from 'path';
const app = express();
import { db } from "./server/dbServer.js";

const PORT = 3000;


app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({extended:true}));

app.post("/todo", (req, res) => {
  const todoName = JSON.parse(req.body());
  db.addTodo(todoName);
});

app.delete("/delete-todo", (req, res) => {
  const todoId = JSON.parse(req.body());
  db.deleteTodo(todoId);
})

app.get("/todo", (req, res) => {
  const todos = JSON.stringify(db.getTodos());
  res.send(todos).status(200);
})

app.get("/", (req, res) => {
  res.sendFile(path.resolve() + "/index.html");
});

app.use(express.static("public"));
