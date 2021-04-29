const authModel = require("../models/Auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

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
      jwt.verify(token, process.env.MAILGUN_SECRET_KEY, (err, decoded) => {
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
  },

  register: async (req, res) => {
    const request = { ...req.body };
    if (!req.body.acc) {
      res.status(400).send({
        message: "User must accepted aggrement",
        statusCode: 400,
      });
      return;
    }
    try {
      const result = await authModel.checkUser(req.body);
      const token = jwt.sign({ request }, process.env.MAILGUN_SECRET_KEY, {
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
        });
      });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  forgotPassword: async (req, res) => {
    const email = req.body.email;
    try {
      const result = await authModel.checkUser(email);
      const token = jwt.sign({ ...req.body }, process.env.MAILGUN_SECRET_KEY, {
        expiresIn: "20m",
      });
      const data = {
        from: "Trickitz Admin <no-reply@admin.tickitz.com>",
        to: req.body.email,
        subject: "Confirm your email",
        text: token,
      };
      mg.messages().send(data, function (error) {
        if (error) {
          console.log(error, "mailgun");
          res.status(500).send({
            message: "Error occurs",
            statusCode: 500,
          });
          return;
        }
        res.status(result.statusCode).send({
          ...result,
        });
      });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  emailVerified: (req, res) => {
    const { token } = req.body;
    if (!token) {
      res.status(400).send({
        message: "Token not be empty",
        statusCode: 400,
      });
    } else {
      jwt.verify(token, process.env.MAILGUN_SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(400).send({
            message: "Incorrect or Expired token",
            statusCode: 400,
          });
        } else {
          res.status(200).send({
            message: "Email verified",
            statusCode: 200,
          });
        }
      });
    }
  },
};

module.exports = authController;
