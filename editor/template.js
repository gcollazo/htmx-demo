export function displayFragment(document) {
  return `
    <div>
      <button
        hx-get="/editor/edit/${document.id}"
        hx-target="#detail"
      >
        Edit
      </button>
    </div>
    <hr />
    ${document.text}
  `;
}

export function editorFragment(document) {
  return `
    <form hx-put="/editor/edit/${document.id}" hx-target="#detail">
      <div><button type="submit">Save</button></div>
      <hr />
      <textarea name="text">${document.text}</textarea>
    </form>
  `;
}

export function createFragment() {
  return `
    <form hx-post="/editor" hx-target="#detail" hx-push-url="true">
      <div><button type="submit">Save</button></div>
      <hr />
      <textarea name="text"></textarea>
    </form>
  `;
}

export function menuFragment(documents, activeDocument) {
  return documents
    .map((item, index) => {
      let activeClass = item.id === activeDocument.id ? "active" : "";

      return `<li>
        <a href="/editor/${item.id}"
          hx-get="/editor/${item.id}"
          hx-target="#detail"
          hx-push-url="true"
          class="${activeClass}"
        >
          ${item.title}
        </a>
      </li>`;
    })
    .join("");
}

export function layout(documents, activeDocument) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/editor/style.css">
      <title>Editor</title>
    </head>
    <body>
      <h1>Editor</h1>
      <div class="container">
        <div class="sidebar">
          <div>
            <button
              hx-get="/editor/new"
              hx-target="#detail"
              _="on click remove .active from .active"
            >
              New
            </button>
          </div>
          <ul _="on htmx:afterOnLoad take .active for event.target" id="menu">
            ${menuFragment(documents, activeDocument)}
          </ul>
        </div>
        <div id="detail">
          ${displayFragment(activeDocument)}
        </div>
      </div>
      <script src="https://unpkg.com/htmx.org@1.3.3"></script>
      <script src="https://unpkg.com/hyperscript.org@0.0.9"></script>
    </body>
    </html>
  `;
}
