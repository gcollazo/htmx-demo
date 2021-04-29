import Home from "./common/home.js";
import counter from "./counter/routes.js";
import editor from "./editor/routes.js";
import express from "express";
import todo from "./todo/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send(v.mount('body', () => <Home />)));
app.use("/counter", counter);
app.use("/todo", todo);
app.use("/editor", editor);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}....`);
});
