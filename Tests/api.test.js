import { beforeEach, describe, expect, it } from "@jest/globals";
import { Driver } from "./driver.js";
import { faker } from "@faker-js/faker";

const randomStr = () => faker.random.word();

describe("API testing", () => {
  const driver = new Driver();
  driver.init();

  beforeEach(() => {
    driver.when.deleteAllTodos();
  });

  it("should return array with todos", async () => {
    const response = await driver.request().get("/todo");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual([]);
  });

  it("should create and return new todo, when api is called with title", async () => {
    const title = randomStr();
    const response = await driver.when.addTodo(title);
    expect(response.body).toMatchObject({
      completed: false,
      id: expect.any(String),
      title,
    });
  });

  it("should return error if title isn't passed", async () => {
    const response = await driver.when.addTodo();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Title is required" });
  });

  it("should return html page", async () => {
    const response = await driver.request().get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text.length).toBeGreaterThan(0);
  });

  it("should return updated todo, when updated todo exists", async () => {
    const todo = await driver.when
      .addTodo(randomStr())
      .then((r) => JSON.parse(r.text));
    todo.completed = true;
    const request = await driver.when.updateTodo(todo);
    expect(request.status).toBe(200);
    expect(JSON.parse(request.text)).toEqual(todo);
  });

  it("should return error, when updated todo doesn't exist", async () => {
    const todo = {
      title: randomStr(),
      id: randomStr(),
      completed: false,
    };
    const request = await driver.when.updateTodo(todo);
    expect(request.status).toBe(400);
  });

  it("should return error, when updated todo was not passed", async () => {
    const request = await driver.when.updateTodo();
    expect(request.status).toBe(400);
  });

  it("should return deleted todo, when todo with passed id exists", async () => {
    const todo = await driver.when
      .addTodo(randomStr())
      .then((r) => JSON.parse(r.text));
    const request = await driver.when.removeTodo(todo.id);
    expect(JSON.parse(request.text)).toEqual(todo);
    const deletedTodo = await driver.when.getTodo(todo.id);
    expect(deletedTodo).toBeUndefined();
  });

  it("should return error, when deleted todo doesnt exist", async () => {
    const todo = {
      title: randomStr(),
      id: randomStr(),
      completed: false,
    };
    const request = await driver.when.removeTodo(todo.id);
    expect(request.status).toBe(400);
  });

  it("should return array with todos", async () => {
    const response = await driver.request().get("/todo");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual([]);
  });

  it("should return completed todos, when COMPLETED filter is passed", async () => {
    const todo = await driver.when
      .addTodo(randomStr())
      .then((r) => JSON.parse(r.text));
    todo.completed = true;
    await driver.when.updateTodo(todo);
    const request = await driver.request().get("/todo?filter=COMPLETED");
    expect(JSON.parse(request.text)).toEqual([todo]);
  });

  it("should return uncompleted todos, when UNCOMPLETED filter is passed", async () => {
    const todo = await driver.when
      .addTodo(randomStr())
      .then((r) => JSON.parse(r.text));
    await driver.when.updateTodo(todo);
    const request = await driver.request().get("/todo?filter=UNCOMPLETED");
    expect(JSON.parse(request.text)).toEqual([todo]);
  });

  it("should return all todos, when ALL filter is passed", async () => {
    const todo = await driver.when
      .addTodo(randomStr())
      .then((r) => JSON.parse(r.text));
    const request = await driver.request().get("/todo?filter=ALL_TASKS");
    expect(JSON.parse(request.text)).toEqual([todo]);
  });
});
