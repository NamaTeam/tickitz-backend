const express = require("express");
const authModel = require("../models/Auth");

const authController = {
  login: async (req, res) => {
    try {
      const result = await authModel.login(req.body.test);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  register: async (req, res) => {
    try {
      const result = await authModel.register(req.body.test);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = authController;
