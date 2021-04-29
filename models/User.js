const pg = require("../helpers/connect_db");
const fromResponse = require("../helpers/fromResponse");

const UserModel = {
  getUserById: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT id,email,username,first_name,last_name,phone,photo FROM users WHERE id=${parseInt(
          request
        )}`,
        (err, result) => {
          if (!err) {
            resolve(fromResponse("Get user success", 200, result.rows[0]));
          } else {
            reject(fromResponse("Get user failed", 500));
          }
        }
      );
    });
  },
};

module.exports = UserModel;
