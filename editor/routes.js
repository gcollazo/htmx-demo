import express from "express";

const router = express();
const templateDir = `${process.cwd()}/editor/templates`;

router.set("views", templateDir);

let documents = [];

function getNextId(allDocuments) {
  if (allDocuments.length === 0) {
    return 1;
  }
  return allDocuments[allDocuments.length - 1].id + 1;
}

router.get("/", (req, res) => {
  res.render("layout", {
    documents,
    isUpdate: false,
  });
});

router.get("/new", (req, res) => {
  res.render("partials/form-create");
});

router.post("/", (req, res) => {
  let nextId = getNextId(documents);

  let newDoc = {
    id: nextId,
    title: req.body.title || `Untitled document ${nextId}`,
    text: req.body.text,
  };

  documents.push(newDoc);
  res.redirect(`/editor/${nextId}?new=1`);
});

router.get("/:id", (req, res) => {
  let isHxRequest = req.headers["hx-request"] || false;
  let doc = documents.find((item) => `${item.id}` === req.params.id);

  documents = documents.map((item) => {
    if (`${item.id}` === req.params.id) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }

    return item;
  });

  let isNew = req.query.new === "1";

  if (isHxRequest && isNew) {
    return res.render("partials/detail", {
      documents,
      document: doc,
      isUpdate: true,
    });
  } else if (isHxRequest) {
    return res.render("partials/detail", {
      documents,
      document: doc,
      isUpdate: false,
    });
  }

  res.render("layout", {
    documents,
    document: doc,
    isUpdate: false,
  });
});

router.get("/edit/:id", (req, res) => {
  let doc = documents.find((item) => `${item.id}` === req.params.id);
  res.render("partials/form-edit", { document: doc });
});

router.put("/edit/:id", (req, res) => {
  let doc = documents.find((item) => `${item.id}` === req.params.id);

  documents = documents.map((item) => {
    if (`${item.id}` === req.params.id) {
      item.isActive = true;
      item.text = req.body.text;
      item.title = req.body.title;
      doc = item;
    } else {
      item.isActive = false;
    }

    return item;
  });

  res.render("partials/detail", {
    documents,
    document: doc,
    isUpdate: true,
  });
});

export default router;
