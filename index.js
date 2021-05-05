const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let whitelist = ['http://localhost:3000']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

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
