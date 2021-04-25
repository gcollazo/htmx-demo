export function formFragment() {
  return `
  <form
    hx-post="/todo/add"
    hx-target="#list"
    _="on submit put '' into #todoField.value"
  >
    <input id="todoField" type="text" name="todo" placeholder="Todo title...">
    <button type="text">Add</button>
  </form>
  `;
}

export function todoListFragment(items) {
  if (items.length === 0) {
    return "<small>Nothing to see here</small>";
  }

  return items
    .map((item) => {
      let checked = item.done ? "checked" : "";

      return `
      <li>
        <input
          type="checkbox"
          hx-patch="/todo/update/${item.id}"
          hx-target="#list"
          ${checked}
        >
        ${item.done ? "<strike>" : ""}
        ${item.title}
        ${item.done ? "</strike>" : ""}
        <button hx-delete="/todo/remove/${item.id}" hx-target="#list">x</button>
      </li>
    `;
    })
    .join("");
}

export function layout(todoItems) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>html{font-family: sans-serif;} ul{padding:0;}</style>
    <title>Document</title>
  </head>
  <body>
    <script src="https://unpkg.com/htmx.org@1.3.3"></script>
    <script src="https://unpkg.com/hyperscript.org@0.0.9"></script>
    <h1>Todo</h1>
    <ul id="list">
      ${todoListFragment(todoItems)}
    </ul>
    ${formFragment()}
  </body>
  </html>
  `;
}
