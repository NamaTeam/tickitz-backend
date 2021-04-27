const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const router = require("./routes");
router(app, "/tickitz/api");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://${process.env.HOST || "localhost"}:${port}`
  );
});
