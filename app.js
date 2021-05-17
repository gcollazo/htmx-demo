import counter from "./counter/routes.js";
import editor from "./editor/routes.js";
import express from "express";
import hbs from "express-hbs";
import helloWorld from "./hello-world/routes.js";
import todo from "./todo/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

let partialsDir = ["counter", "todo", "editor"].map(
  (app) => `${process.cwd()}/${app}/templates/partials`
);

app.set("view engine", "hbs");
app.engine("hbs", hbs.express4({ partialsDir }));

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("./public"));
app.use("/hello-world", helloWorld);
app.use("/counter", counter);
app.use("/todo", todo);
app.use("/editor", editor);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}....`);
});
