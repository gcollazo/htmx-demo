import express from "express";
import hbs from "express-hbs";

const router = express();
const templateDir = `${process.cwd()}/counter/templates`;

router.set("views", templateDir);

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
  res.render(`layout`, { state });
});

router.post("/add", (req, res) => {
  if (_count < MAX) {
    _count++;
  }
  let state = getState(_count);
  res.render(`partials/counter`, { state });
});

router.post("/sub", (req, res) => {
  if (_count > MIN) {
    _count--;
  }
  let state = getState(_count);
  res.render(`partials/counter`, { state });
});

export default router;
