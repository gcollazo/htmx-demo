import { layout, todoListFragment } from "./template.js";

import express from "express";

let router = express();

router.use(express.urlencoded());

let todoItems = [];

function getNextId(todoItems) {
  if (todoItems.length === 0) {
    return 1;
  }
  return todoItems[todoItems.length - 1].id + 1;
}

router.get("/", (req, res) => {
  res.send(layout(todoItems));
});

router.post("/add", (req, res) => {
  if (req.body.todo.length > 0) {
    todoItems.push({
      id: getNextId(todoItems),
      title: req.body.todo,
      done: false,
    });
  }

  res.send(todoListFragment(todoItems));
});

router.delete("/remove/:id", (req, res) => {
  todoItems = todoItems.filter((item) => `${item.id}` !== req.params.id);
  res.send(todoListFragment(todoItems));
});

router.patch("/update/:id", (req, res) => {
  todoItems = todoItems.map((item) => {
    if (`${item.id}` === req.params.id) {
      item.done = !item.done;
      return item;
    }

    return item;
  });
  res.send(todoListFragment(todoItems));
});

export default router;
