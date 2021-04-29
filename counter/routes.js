import express from "express";

const router = express();

import Counter from "./counter";
import Layout from "../common/layout.js";
import express from "express";
import render from "../common/utility-render";

router.get("/", (req, res) => {
  res.send(
    render(
      <Layout title="Counter">
        <Counter />
      </Layout>
    )
  );
});

router.post("/add", (req, res) => {
  Counter.add();
  res.send(render(<Counter />));
});

router.post("/sub", (req, res) => {
  Counter.subtract();
  res.send(render(<Counter />));
});

export default router;
