import express from "express";
import bodyParser from "body-parser";
import principalRoutes from "./src/routes/principalRoutes.js";
import opportunityRoutes from "./src/routes/opportunityRoutes.js";
import { loadEnvFile } from "node:process";
import {connectDB} from "./config/db.js";

const app = express();
const PORT=3000;

// Parse URL-encoded bodies sent by the Contribute and Vote forms.
app.use(bodyParser.urlencoded({ extended: true }));

// Use EJS and keep the views in their own folder, outside the routes.
app.set("view engine", "ejs");
app.set("views", "./views");

// Load the database credentials from the .env file.
loadEnvFile();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbName = "WebProject";

// MongoDB Atlas connection string.
// const mongoUrl=`mongodb+srv://${dbuser}:${dbpassword}@cluster0.nk1sl9s.mongodb.net/${dbName}`;
const mongoUrl = `mongodb://${dbuser}:${dbpassword}@ac-cdtiaqo-shard-00-00.nk1sl9s.mongodb.net:27017,ac-cdtiaqo-shard-00-01.nk1sl9s.mongodb.net:27017,ac-cdtiaqo-shard-00-02.nk1sl9s.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-11qq4b-shard-0&authSource=admin`;

connectDB(mongoUrl);

// Serve each asset type from its own public folder.
app.use("/css", express.static("./public/css"));
app.use("/js", express.static("./public/js"));
app.use("/images", express.static("./public/images"));

// Page routes and form/action routes.
app.use("/", principalRoutes);
app.use("/", opportunityRoutes);

// Any unmatched route renders the 404 page.
app.use((req, res) => {
  res.status(404).render("404");
});

// Start the server.
app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
  console.log(`http://localhost:${PORT}`);
});
