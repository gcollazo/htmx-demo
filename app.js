import { fragment, layout } from "./page.js";

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const MIN = 0;
const MAX = 10;
let _count = 0;

function getState(count) {
  return {
    count,
    buttonState: {
      subIsDisabled: count === MIN ? true : false,
      addIsDisabled: count === MAX ? true : false,
    },
  };
}

app.get("/", (req, res) => {
  let state = getState(_count);
  res.send(layout(state));
});

app.post("/add", (req, res) => {
  if (_count < MAX) {
    _count++;
  }
  let state = getState(_count);
  res.send(fragment(state));
});

app.post("/sub", (req, res) => {
  if (_count > MIN) {
    _count--;
  }
  let state = getState(_count);
  res.send(fragment(state));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}....`);
});
