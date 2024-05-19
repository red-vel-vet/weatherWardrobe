import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import 'dotenv/config'

const app = express();
const port = 3000;

app.use(express.static("public"));



const d = new Date();
const year = d.getFullYear();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let weather = "default";
  console.log(process.env.GOOGLE_API_KEY);
  res.render("index.ejs", {year:year, weather:weather});
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", {year:year});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});