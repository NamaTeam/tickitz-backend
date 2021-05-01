const express = require("express");
const bcrypt = require("bcrypt");
const pg = require("../helpers/connect_db");
const queryAuth = require("../helpers/queryAuth");
const jwt = require("jsonwebtoken");
const fromResponse = require("../helpers/fromResponse");

const authModel = {
  login: (request) => {
    return new Promise((resolve, reject) => {
      const { password } = request;
      const query = queryAuth.login(request);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Wrong email/password", 400));
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
                          resolve(
                            fromResponse("Login success", 200, {
                              id: result.rows[0].id,
                              role: result.rows[0].role,
                              token: resToken,
                            })
                          );
                        } else {
                          reject({
                            message: "Login error",
                            statusCode: 500,
                          });
                        }
                      }
                    );
                  } else {
                    reject(fromResponse("Wrong email/password", 400));
                  }
                } else {
                  reject(fromResponse("Login failed", 500));
                }
              }
            );
          }
        } else {
          reject(fromResponse("Wrong email/password", 400));
        }
      });
    });
  },

  register: (request) => {
    return new Promise((resolve, reject) => {
      const { email, password } = request.request;
      pg.query(
        `SELECT email FROM users WHERE email = '${email}'`,
        (err, value) => {
          if (!err) {
            if (value.rows.length < 1) {
              bcrypt.hash(password, 10, function (errHash, hash) {
                if (!errHash) {
                  const newUser = {
                    email: email,
                    password: hash,
                  };
                  const query = queryAuth.register(newUser);
                  pg.query(query, (err) => {
                    if (!err) {
                      resolve(fromResponse("Register success", 201));
                    } else {
                      reject(fromResponse("Register failed", 500));
                    }
                  });
                } else {
                  reject(fromResponse("Register failed", 500));
                }
              });
            } else {
              reject(fromResponse("User exist", 400));
            }
          }
        }
      );
    });
  },

  checkUser: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT id from users WHERE email = '${request.email}'`,
        (err, response) => {
          if (!err) {
            if (response.rows.length < 1) {
              resolve(
                fromResponse(
                  "Please check email to activated your account",
                  200,
                )
              );
            } else {
              reject(fromResponse("User exist", 400));
            }
          } else {
            reject(fromResponse("Register failed", 500));
          }
        }
      );
    });
  },

  changeResquest: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT id from users WHERE email = '${request.email}'`, (err, response) => {
        if (!err) {
          if (response.rows.length < 1) {
            reject();
            return;
          }
          resolve(response.rows[0].id);
        } else {
          reject();
        };
      });
    });
  },
};

module.exports = authModel;
