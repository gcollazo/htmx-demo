import { fragment, layout } from "./template.js";

import express from "express";

let router = express();

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

router.get("/", (req, res) => {
  let state = getState(_count);
  res.send(layout(state));
});

router.post("/add", (req, res) => {
  if (_count < MAX) {
    _count++;
  }
  let state = getState(_count);
  res.send(fragment(state));
});

router.post("/sub", (req, res) => {
  if (_count > MIN) {
    _count--;
  }
  let state = getState(_count);
  res.send(fragment(state));
});

export default router;
