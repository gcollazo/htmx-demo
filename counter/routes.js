import cookieParser from "cookie-parser";
import csrf from "csurf";
import express from "express";
import hbs from "express-hbs";

const router = express();
const csrfProtection = csrf({ cookie: true });
const templateDir = `${process.cwd()}/counter/templates`;

router.use(cookieParser());

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

router.get("/", csrfProtection, (req, res) => {
  let isHxRequest = req.headers["hx-request"] || false;
  let state = getState(_count);
  state.csrfToken = req.csrfToken();

  if (isHxRequest) {
    return res.render(`partials/counter`, { state });
  }

  res.render(`layout`, { state });
});

router.post("/add", csrfProtection, (req, res) => {
  if (_count < MAX) {
    _count++;
  }
  res.redirect("/counter/");
});

router.post("/sub", csrfProtection, (req, res) => {
  if (_count > MIN) {
    _count--;
  }
  res.redirect("/counter/");
});

export default router;
