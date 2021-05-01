const authModel = require("../models/Auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserModel = require("../models/User");
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
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
      jwt.verify(token, process.env.JWT_NODEMAILER_KEY, (err, decoded) => {
        if (err) {
          res.status(400).send({
            message: "Incorrect or Expired token",
            statusCode: 400,
          });
        } else {
          authModel
            .register(decoded)
            .then((result) => {
              res.status(result.statusCode).send({ ...result, decoded });
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
      const token = jwt.sign({ request }, process.env.JWT_NODEMAILER_KEY, {
        expiresIn: "20m",
      });
      transporter
        .sendMail({
          from: "Trickitz Admin <no-reply@admin.tickitz.com>", // sender address
          to: request.email, // list of receivers
          subject: "Account Activation Token", // Subject line
          text: token, // plain text body
          html: `
            <h1>Copy the token to activated your account</h1>
            <h3>${token}</h3>
          `, // html body
        })
        .then(() => {
          res.status(result.statusCode).send({
            ...result,
          });
        })
        .catch(() => {
          res.status(500).send({
            message: "Register error",
            statusCode: 500,
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
      const token = jwt.sign({ ...req.body }, process.env.JWT_NODEMAILER_KEY, {
        expiresIn: "20m",
      });
      transporter
        .sendMail({
          from: "Trickitz Admin <no-reply@admin.tickitz.com>", // sender address
          to: email, // list of receivers
          subject: "Confirm your email", // Subject line
          text: token, // plain text body
          html: `
            <h1>Copy the token to change your password</h1>
            <h3>${token}</h3>
          `, // html body
        })
        .then(() => {
          res.status(result.statusCode).send({
            ...result,
          });
        })
        .catch(() => {
          res.status(500).send({
            message: "Error occurs",
            statusCode: 500,
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
      jwt.verify(token, process.env.JWT_NODEMAILER_KEY, (err, decoded) => {
        if (err) {
          res.status(400).send({
            message: "Incorrect or Expired token",
            statusCode: 400,
          });
        } else {
          authModel.changeResquest(decoded)
            .then(result => {
              res.status(200).send({
                message: "Email verified",
                statusCode: 200,
                data: result,
              });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error when verified email",
                statusCode: 500,
              })
            })
        }
      });
    }
  },
};

module.exports = authController;
