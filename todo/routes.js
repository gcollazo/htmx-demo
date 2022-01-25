import Layout from "../common/layout.js";
import TodoList from "./components/todo-list.js";
import express from "express";
import { hyperscriptToHtml } from "valyrian.js/plugins/node";

const router = express();
const templateDir = `${process.cwd()}/todo/templates`;

router.set("views", templateDir);

router.get("/", (req, res) => {
  res.send(
    hyperscriptToHtml(
      <Layout title="Todo">
        <TodoList />
      </Layout>
    )
  );
});

router.post("/add", (req, res) => {
  if (req.body.todo.length > 0) {
    TodoList.addTodo({ title: req.body.todo });
  }

  res.send(hyperscriptToHtml(<TodoList.List />));
});

router.delete("/remove/:id", (req, res) => {
  TodoList.removeTodo(req.params.id);
  res.send(hyperscriptToHtml(<TodoList.List />));
});

router.patch("/update/:id", (req, res) => {
  TodoList.toggleTodo(req.params.id);
  res.send(hyperscriptToHtml(<TodoList.List />));
});

export default router;
