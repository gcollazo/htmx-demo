export default function Layout({ title }, ...children) {
  return [
    "<!DOCTYPE html>",
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{"html {font-family: sans-serif;}"}</style>
        <title>{title}</title>
      </head>
      <body>
        <script src="https://unpkg.com/htmx.org@1.3.3"></script>
        <h1>{title}</h1>
        <div id="container">{children}</div>
      </body>
    </html>,
  ];
}
