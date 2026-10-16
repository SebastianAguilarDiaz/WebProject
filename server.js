import express from "express";
import bodyParser from "body-parser";
import principalRoutes from "./src/routes/principalRoutes.js";

const app = express();
const PORT=3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/css", express.static("./public/css"));
app.use("/js", express.static("./public/js"));
app.use("/images", express.static("./public/images"));

app.use("/", principalRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});









app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
  console.log(`http://localhost:${PORT}`);
});