const authModel = require("../models/Auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox439064f0fe104fe495123e9c9ecbecd1.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_KEY, domain: DOMAIN });

const authController = {
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Request not be empty",
        statusCode: 400,
      });
      return;
    }
    try {
      const result = await authModel.login(req.body);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  verifyEmail: (req, res) => {
    const { token } = req.body;
    if (!token) {
      res.status(400).send({
        message: "Token not be empty",
        statusCode: 400,
      });
    } else {
      jwt.verify(token, "tickitzactivation123", (err, decoded) => {
        if (err) {
          res.status(400).send({
            message: "Incorrect or Expired token",
            statusCode: 400,
          });
        } else {
          authModel
            .register(decoded)
            .then((result) => {
              res.status(result.statusCode).send(result);
            })
            .catch((err) => {
              res.status(err.statusCode).send(err);
            });
        }
      });
    }
    // try {
    //   const result = await authModel.register(decoded);
    //   res.status(result.statusCode).send(result);
    // } catch (err) {
    //   res.status(err.statusCode).send(err);
    // }
  },

  register: async (req, res) => {
    const request = { ...req.body };
    try {
      const result = await authModel.checkUser(req.body);
      const token = jwt.sign({ request }, "tickitzactivation123", {
        expiresIn: "20m",
      });
      const data = {
        from: "Trickitz Admin <no-reply@admin.tickitz.com>",
        to: req.body.email,
        subject: "Account Activation Token",
        text: token,
      };
      mg.messages().send(data, function (error) {
        if (error) {
          console.log(error, "mailgun");
          res.status(500).send({
            message: "Register error",
            statusCode: 500,
          });
          return;
        }
        res.status(result.statusCode).send({
          ...result,
          token,
        });
      });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = authController;
