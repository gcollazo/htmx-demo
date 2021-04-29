import Layout from "../common/layout.js"
import TodoList from "./components/todo-list.js";
import express from "express";
import render from "../common/utility-render.js"

let router = express();

router.get("/", (req, res) => {
  res.send(render(<Layout title="Todo"><TodoList /></Layout>));
});

router.post("/add", (req, res) => {
  if (req.body.todo.length > 0) {
    TodoList.addTodo({title: req.body.todo});
  }

  res.send(render(<TodoList.List />));
});

router.delete("/remove/:id", (req, res) => {
  TodoList.removeTodo(req.params.id);
  res.send(render(<TodoList.List />));
});

router.patch("/update/:id", (req, res) => {
  TodoList.toggleTodo(req.params.id);
  res.send(render(<TodoList.List />));
});

export default router;
