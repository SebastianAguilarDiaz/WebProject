import express from "express";
import bodyParser from "body-parser";
import principalRoutes from "./src/routes/principalRoutes.js";
import { loadEnvFile } from "node:process";
import {connectDB} from "./config/db.js";
const app = express();
const PORT=3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");


//Load environment variables from .env file
loadEnvFile();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbName = "WebProject";

// const mongoUrl=`mongodb+srv://${dbuser}:${dbpassword}@cluster0.nk1sl9s.mongodb.net/${dbName}`;
const mongoUrl = `mongodb://${dbuser}:${dbpassword}@ac-cdtiaqo-shard-00-00.nk1sl9s.mongodb.net:27017,ac-cdtiaqo-shard-00-01.nk1sl9s.mongodb.net:27017,ac-cdtiaqo-shard-00-02.nk1sl9s.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-11qq4b-shard-0&authSource=admin`;

connectDB(mongoUrl);


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