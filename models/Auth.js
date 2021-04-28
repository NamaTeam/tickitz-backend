const express = require("express");
const bcrypt = require("bcrypt");
const pg = require("../helpers/connect_db");
const queryAuth = require("../helpers/queryAuth");
const jwt = require("jsonwebtoken");

const authModel = {
  login: (request) => {
    return new Promise((resolve, reject) => {
      const { password } = request;
      const query = queryAuth.login(request);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject({
              message: "Wrong email / password",
              statusCode: 400,
            });
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              (errComp, resComp) => {
                if (!errComp) {
                  if (resComp) {
                    const payload = {
                      id: result.rows[0].id,
                      role: result.rows[0].role,
                    };
                    jwt.sign(
                      payload,
                      process.env.SECRET_KEY,
                      (errToken, resToken) => {
                        if (!errToken) {
                          resolve({
                            message: "Login success",
                            statusCode: 200,
                            data: {
                              id: result.rows[0].id,
                              role: result.rows[0].role,
                              token: resToken,
                            },
                          });
                        } else {
                          reject({
                            message: "Login error",
                            statusCode: 500,
                          });
                        }
                      }
                    );
                  }
                } else {
                  reject({
                    message: "Login error",
                    statusCode: 500,
                  });
                }
              }
            );
          }
        } else {
          reject({
            message: "Wrong email / password",
            statusCode: 400,
          });
        }
      });
    });
  },

  register: (request) => {
    return new Promise((resolve, reject) => {
      const { email, password } = request;
      pg.query(
        `SELECT email FROM users WHERE email = '${email}'`,
        (err, value) => {
          if (!err) {
            if (value.rows.length < 1) {
              bcrypt.hash(password, 10, function (errHash, hash) {
                if (!errHash) {
                  const newUser = {
                    ...request,
                    password: hash,
                  };
                  const query = queryAuth.register(newUser);
                  pg.query(query, (err) => {
                    if (!err) {
                      resolve({
                        message: "Register success",
                        statusCode: 201,
                      });
                    } else {
                      reject({
                        message: "Register failed",
                        statusCode: 500,
                      });
                    }
                  });
                } else {
                  reject({
                    message: "Register failed",
                    statusCode: 500,
                  });
                }
              });
            } else {
              reject({
                message: "User exist",
                statusCode: 400,
              });
            }
          }
        }
      );
    });
  },
};

module.exports = authModel;
