import cookieParser from "cookie-parser";
import csrf from "csurf";
import express from "express";
import hbs from "express-hbs";

const router = express();
const csrfProtection = csrf({ cookie: true });
const templateDir = `${process.cwd()}/hello-world/templates`;

router.set("views", templateDir);

router.get("/", (req, res) => {
  res.render("layout");
});

export default router;
