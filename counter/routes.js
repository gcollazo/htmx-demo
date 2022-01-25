import express from "express";

const router = express();

import Counter from "./counter";
import Layout from "../common/layout.js";
import express from "express";
import { hyperscriptToHtml } from "valyrian.js/plugins/node";

let router = express();

router.get("/", (req, res) => {
  res.send(
    hyperscriptToHtml(
      <Layout title="Counter">
        <Counter />
      </Layout>
    )
  );
});

router.post("/add", (req, res) => {
  Counter.add();
  res.send(hyperscriptToHtml(<Counter />));
});

router.post("/sub", (req, res) => {
  Counter.subtract();
  res.send(hyperscriptToHtml(<Counter />));
});

export default router;
