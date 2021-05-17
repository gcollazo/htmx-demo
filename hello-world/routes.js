import express from "express";

const router = express();
const templateDir = `${process.cwd()}/hello-world/templates`;

router.set("views", templateDir);

router.get("/", (req, res) => {
  res.render("foo", {
    layout: "layout",
    context: {
      backButton: "Back",
      foo: "Foo",
      bar: 5,
      isCool: true,
    },
  });
});

export default router;
