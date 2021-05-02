const pg = require("../helpers/connect_db");
const fromResponse = require("../helpers/fromResponse");
const queryMovies = require("../helpers/queryMovies");
const bcrypt = require("bcrypt");
const fs = require("fs");

const moviesModel = {
  getMovies: (request) => {
    return new Promise((resolve, reject) => {
      const getMoviesById = queryMovies.getMovies(request);
      pg.query(getMoviesById, (err, result) => {
        console.log(err, "ini error");
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Movies not found", 400));
          } else {
            resolve(fromResponse("Get movies success", 200, result.rows[0]));
          }
        } else {
          reject(fromResponse("Get movies failed", 500));
        }
      });
    });
  },

//   addMovies: (request) => {
//     return new Promise((resolve, reject) => {
//       const { category, title, synopsis, cast, duration } = request;
//       if (
        // !category == null ||
        // !title == null ||
        // !synopsis == null ||
        // !cast == null ||
        // !duration == null
//       ) {
//         reject(fromResponse("File not null", 400));
//         return;
//       }
//       pg.query(
//         `SELECT id from movies WHERE title = '${title}' AND '${cast}'`,
//         (err, response) => {
//           console.log(err, "test1");
//           if (!err) {
//             if (response.rows.length >= 1) {
//               reject(fromResponse("Movies exist", 400));
//               return;
//             }
//             const query = queryMovies.addMovies(request);
//             pg.query(query, (error) => {
//                 console.log(error,"ini error bawah model")
//               if (!error) {
//                 resolve(fromResponse("Add Movies success", 201));
//               } else {
//                 reject(fromResponse("Add Movies failed", 500));
//               }
//             });
//           } else {
//             reject(fromResponse("Add Movies failed", 500));
//           }
//         }
//       );
//     });
//   },
};

module.exports = moviesModel;
