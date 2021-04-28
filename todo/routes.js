import express from "express";

const router = express();
const templateDir = `${process.cwd()}/todo/templates`;

router.set("views", templateDir);

let todoItems = [];

function getNextId(todoItems) {
  if (todoItems.length === 0) {
    return 1;
  }
  return todoItems[todoItems.length - 1].id + 1;
}

function getCounts(todoItems) {
  let all = todoItems.length;
  let incomplete = todoItems.filter((t) => t.done === false).length;
  let completed = todoItems.filter((t) => t.done === true).length;

  if (all === 0) {
    return "";
  }

  return `All: ${all}, Incomplete: ${incomplete}, Completed: ${completed}`;
}

router.get("/", (req, res) => {
  res.render("layout", { todos: todoItems, counts: getCounts(todoItems) });
});

router.post("/add", (req, res) => {
  if (req.body.todo.length > 0) {
    todoItems.push({
      id: getNextId(todoItems),
      title: req.body.todo,
      done: false,
    });
  }

  res.render("partials/list", {
    todos: todoItems,
    counts: getCounts(todoItems),
    isUpdate: true,
  });
});

router.delete("/remove/:id", (req, res) => {
  todoItems = todoItems.filter((item) => `${item.id}` !== req.params.id);
  res.render("partials/list", {
    todos: todoItems,
    counts: getCounts(todoItems),
    isUpdate: true,
  });
});

router.patch("/update/:id", (req, res) => {
  todoItems = todoItems.map((item) => {
    if (`${item.id}` === req.params.id) {
      item.done = !item.done;
      return item;
    }

    return item;
  });
  res.render("partials/list", {
    todos: todoItems,
    counts: getCounts(todoItems),
    isUpdate: true,
  });
});

export default router;
