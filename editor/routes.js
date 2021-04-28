import {
  createFragment,
  displayFragment,
  editorFragment,
  layout,
  menuFragment,
} from "./template.js";

import express from "express";

let router = express();

let documents = [
  { id: 1, title: "First", text: "Uno lorem ipsum 1" },
  { id: 2, title: "Second", text: "Dos lorem ipsum 2" },
  { id: 3, title: "Third", text: "Tres lorem ipsum 3" },
];

function getNextId(allDocuments) {
  if (allDocuments.length === 0) {
    return 1;
  }
  return allDocuments[allDocuments.length - 1].id + 1;
}

router.use("/", express.static("./editor/"));

router.get("/", (req, res) => {
  let firstDocument = documents[0];
  res.redirect(`/editor/${firstDocument.id}`);
});

router.get("/new", (req, res) => {
  res.send(createFragment());
});

router.post("/", (req, res) => {
  let nextId = getNextId(documents);

  let newDoc = {
    id: nextId,
    title: `Document ${nextId}`,
    text: req.body.text,
  };

  documents.push(newDoc);
  res.redirect(`/editor/${nextId}`);
});

router.get("/:id", (req, res) => {
  let isHxRequest = req.headers["hx-request"] || false;
  let doc = documents.find((item) => `${item.id}` === req.params.id);

  if (isHxRequest) {
    return res.send(displayFragment(doc));
  }

  res.send(layout(documents, doc));
});

router.get("/edit/:id", (req, res) => {
  let doc = documents.find((item) => `${item.id}` === req.params.id);
  res.send(editorFragment(doc));
});

router.put("/edit/:id", (req, res) => {
  let doc;

  documents = documents.map((item) => {
    if (`${item.id}` === req.params.id) {
      item.text = req.body.text;
      doc = item;
    }

    return item;
  });
  res.send(displayFragment(doc));
});

export default router;
