const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const api = require("./routes/api");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/api", api);

/// LISTEN & DATABASE CONNECTION
mongoose
  .connect(
    "mongodb+srv://sehrawatkar:4VMJeqTtbE3bMJiG@cluster0.asoz7zk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to mongo db");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
