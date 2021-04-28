import counter from "./counter/routes.js";
import editor from "./editor/routes.js";
import express from "express";
import todo from "./todo/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("./public"));
app.use("/counter", counter);
app.use("/todo", todo);
app.use("/editor", editor);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}....`);
});
