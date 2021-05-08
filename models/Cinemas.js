
const pg = require('../helpers/connect_db');
const fromResponse = require('../helpers/fromResponse');
const queryCinemas = require('../helpers/queryCinemas');
const fs = require('fs');

const cinemasModel = {
  showCinemas: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryCinemas.showCinemas(request);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Cinemas not found in this location', 400));
            return;
          };
          resolve(fromResponse('Get cinemas success', 200, {
            ...result.rows[0],
            schedule: result.rows
          }));
        } else {
          reject(fromResponse('Get cinemas failed', 500));
        }
      })
    })
  },

  showScheduleCinemas: (request) => {
    return new Promise((resolve, reject) => {
      console.log(request)
      const query = queryCinemas.showScheduleCinemas(request);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Cinemas not found in this location', 400));
            return;
          };
          resolve(fromResponse('Get cinemas success', 200, {
            ...result.rows[0],
            schedule: result.rows
          }));
        } else {
          reject(fromResponse('Get cinemas failed', 500));
        }
      })
    })
  },

  getAllCinemas: (request) => {
    return new Promise((resolve, reject) => {
      const getallCinemas = queryCinemas.getAllCinemas(request);
      pg.query(getallCinemas, (err, result) => {
        console.log(err, "ini error");
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse("Cinemas not found", 400));
          } else {
            resolve(
              fromResponse("Get all cinemas success", 200, result.rows)
            );
          }
        } else {
          reject(fromResponse("Get all cinemas failed", 500));
        }
      });
    });
  },

  addCinemas: (request) => {
    return new Promise((resolve, reject) => {
      const { name, city, street, street_number, logo } = request;
      if (!name || !city || !street || !street_number || !logo) {
        reject(fromResponse('Field is empty', 400))
        return;
      }
      pg.query(`SELECT id from cinemas WHERE name = '${name}' AND city = '${city.toLowerCase()}' AND street = '${street.toLowerCase()}'`, (err, response) => {
        console.log(err, 'test1')
        if (!err) {
          if (response.rows.length >= 1) {
            reject(fromResponse('Cinemas exist', 400));
            return;
          }
          const query = queryCinemas.addCinemas(request);
          pg.query(query, error => {
            if (!error) {
              resolve(fromResponse('Add cinemas success', 201));
            } else {
              reject(fromResponse('Add cinemas failed', 500));
            }
          })
        } else {
          reject(fromResponse('Add cinems failed', 500));
        }
      })
    })
  },

  updateCinemas: (request) => {
    return new Promise((resolve, reject) => {
      const { id, name, city, street, street_number, logo } = request;
      pg.query(`SELECT * from cinemas WHERE id = ${id}`, (err, initialValue) => {
        console.log(err, 'test err 1')
        if (!err) {
          if (initialValue.rows.length < 1) {
            reject(fromResponse('Cinemas not found', 400));
            return;
          }
          const query = queryCinemas.updateCinemas(request, initialValue.rows[0])
          pg.query(query, (error) => {
            console.log(error, 'test err 2')
            if (!error) {
              if (logo && initialValue.rows[0].logo) {
                fs.unlinkSync(`public${initialValue.rows[0].logo}`)
              }
              resolve(fromResponse('Update cinemas success', 200));
            } else {
              reject(fromResponse('Update cinemas failed', 500));
            }
          })
        } else {
          reject(fromResponse('Update cinemas failed', 500));
        }
      })
    })
  },

  deleteCinemas: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT logo from cinemas WHERE id = ${request.id}`, (err, result) => {
        console.log(err, 'test1')
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Cinemas not found', 400));
          } else {
            pg.query(`DELETE FROM cinemas WHERE id = ${request.id}`, (error) => {
              console.log(error, 'test 2')
              if (!error) {
                fs.unlinkSync(`public${result.rows[0].logo}`);
                resolve(fromResponse('Delete cinemas success', 200));
              } else {
                reject(fromResponse('Delete cinemas error', 500));
              }
            })
          }
        } else {
          reject(fromResponse('Delete cinemas error', 500));
        }
      })
    })
  },
};

module.exports = cinemasModel;