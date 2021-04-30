const pg = require("../helpers/connect_db");
const fromResponse = require("../helpers/fromResponse");
const queryUser = require("../helpers/queryUser");
const bcrypt = require("bcrypt");

const UserModel = {
  getAllUsers: (req) => {
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT id,email,username,first_name,last_name,phone,photo FROM users `,
        (err, result) => {
          console.log(err);
          if (!err) {
            resolve(fromResponse("Get all Users success", 200, result.rows[0]));
          } else {
            reject(fromResponse("Get all Users failed", 500));
          }
        }
      );
    });
  },

  getUserById: (request) => {
    return new Promise((resolve, reject) => {
      const getUserbyid = queryUser.getUserById(request);
      pg.query(getUserbyid, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("User not found", 400));
          } else {
            resolve(fromResponse("Get user success", 200, result.rows[0]));
          }
        } else {
          reject(fromResponse("Get user failed", 500));
        }
      });
    });
  },

  addNewUsers: (request) => {
    return new Promise((resolve, reject) => {
      const {
        email,
        password,
        username,
        first_name,
        last_name,
        phone,
        role,
      } = request.body;
      const photos = request.file.filename;
      pg.query(
        `SELECT * FROM users WHERE email='${email}'`,
        (error, result) => {
          console.log(error, "ini error di atas tidak error");
          if (!error) {
            if (result.rows.length < 1) {
              bcrypt.genSalt(10, function (saltError, salt) {
                console.log(saltError, "ini salterror");
                if (!saltError) {
                  bcrypt.hash(password, salt, function (hashingError, hash) {
                    console.log(hashingError, "ini hashingerror");
                    if (!hashingError) {
                      pg.query(
                        `INSERT INTO users(email,password,username,first_name,last_name,phone,photo,role,created_at)
      VALUES('${email}', '${hash}', '${username}', '${first_name}','${last_name}','${phone}','/upload/photo/${photos}','${role}','now()')`,
                        (err) => {
                          console.log(err, "error bawah");
                          if (!err) {
                            resolve(
                              fromResponse(
                                "Add user success",
                                200,
                                result.rows[0]
                              )
                            );
                          } else {
                            reject(fromResponse("Add user Failed", 500));
                          }
                        }
                      );
                    } else {
                      reject(fromResponse("Add user Failed", 500));
                    }
                  });
                } else {
                  reject(fromResponse("Add user Failed", 500));
                }
              });
            } else {
              reject(fromResponse("User exist", 400));
            }
          } else {
            reject(fromResponse("Add user failed", 500));
          }
        }
      );
    });
  },
};
module.exports = UserModel;
