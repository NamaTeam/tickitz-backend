const pg = require("../helpers/connect_db");
const fromResponse = require("../helpers/fromResponse");
const queryMovies = require("../helpers/queryMovies");
const fs = require("fs");

const moviesModel = {
  getAllMovies: (request) => {
    return new Promise((resolve, reject) => {
      const getallMovies = queryMovies.getAllMovies(request);
      pg.query(getallMovies, (err, result) => {
        console.log(err, "ini error");
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Movies not found", 400));
          } else {
            resolve(
              fromResponse("Get all movies success", 200, result.rows)
            );
          }
        } else {
          reject(fromResponse("Get all movies failed", 500));
        }
      });
    });
  },

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

  getMoviesNow: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryMovies.getMoviesNow(request);
      pg.query(query, (err, result) => {
        console.log(err, "ini error");
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Movies not found", 400));
            return
          }
          resolve(fromResponse("Get movies success", 200, result.rows));
        } else {
          reject(fromResponse("Get movies failed", 500));
        }
      });
    });
  },

  getUpcomingMovies: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryMovies.getUpcomingMovies(request);
      pg.query(query, (err, result) => {
        console.log(err, "ini error");
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Movies not found", 400));
            return
          }
          resolve(fromResponse("Get movies success", 200, result.rows));
        } else {
          reject(fromResponse("Get movies failed", 500));
        }
      });
    });
  },

  getMoviesByMonth: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryMovies.getMoviesByMonth(request);
      pg.query(query, (err, result) => {
        console.log(err, "ini error");
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Movies not found", 400));
            return;
          }
          console.log(result, 'resu;lt')
          resolve(fromResponse("Get movies success", 200, result.rows));
        } else {
          reject(fromResponse("Get movies failed", 500));
        }
      });
    });
  },

  addMovies: (request) => {
    return new Promise((resolve, reject) => {
      const { category, title, synopsis, duration, actors, poster, release_date } = request;
      if (!category || !title || !synopsis || !duration || !actors || !poster || !release_date) {
        reject(fromResponse("Field can't empty", 400));
        return;
      }
      pg.query(
        `SELECT id from movies WHERE title = '${title}' AND release_date = '${release_date}'`,
        (err, response) => {
          console.log(err, "test1");
          if (!err) {
            if (response?.rows?.length >= 1) {
              reject(fromResponse("Movies exist", 400));
              return;
            }
            const query = queryMovies.addMovies(request);
            pg.query(query, (error) => {
              console.log(error, "ini error bawah model");
              if (!error) {
                resolve(fromResponse("Add Movies success", 201));
              } else {
                reject(fromResponse("Add Movies failed", 500));
              }
            });
          } else {
            reject(fromResponse("Add Movies failed", 500));
          }
        }
      );
    });
  },

  deleteMovies: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(
        `SELECT title from movies WHERE id = ${request.id}`,
        (err, result) => {
          console.log(err, "test1");
          if (!err) {
            if (result.rows.length < 1) {
              reject(fromResponse("Movies not found", 400));
            } else {
              pg.query(
                `DELETE FROM movies WHERE id = ${request.id}`,
                (error) => {
                  console.log(error, "test 2");
                  if (!error) {
                    resolve(fromResponse("Delete Movies success", 200));
                  } else {
                    reject(fromResponse("Delete Movies error", 500));
                  }
                }
              );
            }
          } else {
            reject(fromResponse("Delete Movies error", 500));
          }
        }
      );
    });
  },

  updateMovies: (request) => {
    return new Promise((resolve, reject) => {
      const { id, category, title, synopsis, cast, duration, poster } = request;
      pg.query(`SELECT * from movies WHERE id = ${id}`, (err, initialValue) => {
        console.log(err, "test err 1");
        if (!err) {
          if (initialValue?.rows?.length < 1) {
            reject(fromResponse("Cinemas not found", 400));
            return;
          }
          const query = queryMovies.updateMovies(
            request,
            initialValue?.rows[0]
          );
          pg.query(query, (error) => {
            console.log(error, "test err 2");
            if (!error) {
              if (poster && initialValue.rows[0].poster) {
                fs.unlinkSync(`public${initialValue.rows[0].poster}`);
              }
              resolve(fromResponse("Update cinemas success", 200));
            } else {
              reject(fromResponse("Update cinemas failed", 500));
            }
          });
        } else {
          reject(fromResponse("Update cinemas failed", 500));
        }
      });
    });
  },

  // add search in here 
  searchMovieByTitle: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryMovies.searchMovie(request)
      pg.query(query, (err, result) => {
        console.log(err, "ini error query")
        console.log(result)
        if (result.rows.length < 1) {
          reject(fromResponse("Movies not found", 400))
          return;
        }
        if (!err) {
          resolve(fromResponse("Succses search movies by title", 200, result.rows))
        } else {
          reject(fromResponse("Error occrous when searching movies", 500))
        }
      })
    })
  }
};

module.exports = moviesModel;
