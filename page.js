export function fragment({ count, buttonState }) {
  let subIsDisabled = buttonState.subIsDisabled ? "disabled" : "";
  let addIsDisabled = buttonState.addIsDisabled ? "disabled" : "";

  return `
    <button hx-post="/sub" hx-target="#container" ${subIsDisabled}>-</button>
    <span>${count}</span>
    <button hx-post="/add" hx-target="#container" ${addIsDisabled}>+</button>
  `;
}

export function layout(state) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>html{font-family: sans-serif;}</style>
    <title>Document</title>
  </head>
  <body>
    <script src="https://unpkg.com/htmx.org@1.3.3"></script>
    <div id="container">
      ${fragment(state)}
    </div>
  </body>
  </html>
  `;
}
