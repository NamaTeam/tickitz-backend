const { request } = require("express");
const express = require("express");

const authModel = {
  login: (request) => {
    return new Promise((resolve, reject) => {
      if (request === "true") {
        resolve({
          message: "Login success",
          statusCode: 200,
        });
      } else {
        reject({
          message: "Login Failed",
          statusCode: 500,
        });
      }
    });
  },

  register: (request) => {
    return new Promise((resolve, reject) => {
      if (request === "true") {
        resolve({
          message: "Register success",
          statusCode: 200,
        });
      } else {
        reject({
          message: "Register Failed",
          statusCode: 500,
        });
      }
    });
  },
};

module.exports = authModel;
