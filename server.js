import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
// import path from "path";
const app = express();
const PORT=3000;
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("./public/"));

app.get("/",(req,res,next)=>{
  const file= fs.readFileSync("./public/index.html","utf-8");
  res.send(file);

});









app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
  console.log(`http://localhost:${PORT}`);
});