const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let whitelist = [
  "http://localhost:3000",
  "http://54.205.45.185:3000",
  "http://localhost:6001",
  "http://tickitz.mooo.com",
  "https://tickitz.mooo.com",
];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const router = require("./routes");
router(app, "/tickitz/api");

app.get("*", (req, res) => {
  res.send("Not Found!");
});

app.listen(port, () => {
  console.log(
    `app listening at http://${process.env.HOST || "localhost"}:${port}`
  );
});
