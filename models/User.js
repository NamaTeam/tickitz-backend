const pg = require("../helpers/connect_db");
const fromResponse = require("../helpers/fromResponse");
const queryUser = require("../helpers/queryUser");
const bcrypt = require("bcrypt");
const fs = require('fs')

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

  updateUser: (req, res) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT * FROM users WHERE id = '${req.params.id}'`, (error, result) => {
        if (result.rows == '' || result.rows.length < 1) {
          reject(fromResponse("user id not found", 400));
        }
        if (!error) {
          const file = req.file?.filename ? `/upload/photo/${req.file.filename}` : result.rows[0].photo
          const {
            first_name = result.rows[0]?.first_name,
            last_name = result.rows[0]?.last_name,
            phone = result.rows[0]?.phone,
            username = result.rows[0]?.username,
            email = result.rows[0]?.email,
            password = result.rows[0]?.password,
          } = req.body
          const { id } = req.params;
          bcrypt.genSalt(10, function (saltError, salt) {
            bcrypt.hash(password, salt, function (hashingError, hash) {
              if (!hashingError) {
                let newBody = { ...req.body, password: req.body.password ? hash : result.rows[0]?.password, photo: file }
                if (newBody.photo != result.rows[0].photo) {
                  fs.unlink(`./public${result.rows[0].photo}`, (err1) => {
                    if (!err1) {
                      console.log('successfully deleted local image')
                    } else {
                      console.log(`failed to deleted local image ${err1}`)
                    }
                  });
                  pg.query("UPDATE users SET first_name=$1, last_name=$2, phone=$3, photo=$4, username=$5, email=$6, password=$7, updated_at=$8 WHERE id=$9 RETURNING *", [first_name, last_name, phone, newBody.photo, username, email, newBody.password, 'NOW()', id], (err, response) => {
                    if (!err) {
                      resolve(fromResponse(`update user id ${id} success`, 200, response.rows[0]));
                    } else {
                      reject(fromResponse("update data failed", 500));
                    }
                  })
                } else {
                  pg.query("UPDATE users SET first_name=$1, last_name=$2, phone=$3, photo=$4, username=$5, email=$6, password=$7, updated_at=$8 WHERE id=$9 RETURNING *", [first_name, last_name, phone, newBody.photo, username, email, newBody.password, 'NOW()', id], (err, response) => {
                    if (!err) {
                      resolve(fromResponse(`update user id ${id} success`, 200, response.rows[0]));
                    } else {
                      reject(fromResponse("update data failed", 500));
                    }
                  })
                }
              } else {
                reject(fromResponse("hashing failed", 500));
              }
            });
          });
        } else {
          reject(fromResponse("update data failed", 500));
        }
      })
    })
  },
};
module.exports = UserModel;
