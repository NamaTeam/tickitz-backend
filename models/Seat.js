const pg = require('../helpers/connect_db');
const fromResponse = require('../helpers/fromResponse');

const userModel = {
  getSeat: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT seat_number from seat WHERE cinema_id = ${request}`, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Cinemas not found', 400));
            return;
          }
          resolve(fromResponse('Get seat success', 200, result.rows[0]));
        } else {
          reject(fromResponse('Get seat failed', 500));
        }
      });
    });
  },

  addSeat: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT id from seat where cinema_id = ${request.cinema_id}`, (err, result) => {
        if (!err) {
          if (result.rows.length >= 1) {
            reject(fromResponse('Seat exist', 400));
            return;
          }
          pg.query(`INSERT into seat(cinema_id, seat_number) VALUES(${request.cinema_id}, ARRAY[${request.seat_number}])`, error => {
            console.log(error, 'test')
            if (!error) {
              resolve(fromResponse('Add seat success', 201));
            } else {
              reject(fromResponse('Add seat failed', 500));
            }
          })
        } else {
          reject(fromResponse('Add seat failed', 500))
        }
      });
    });
  },

  deleteSeat: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT id from seat WHERE id = ${request}`, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Seat not found', 400));
            return;
          }
          pg.query(`DELETE from seat WHERE id = ${request}`, error => {
            if (!error) {
              resolve(fromResponse('Delete seat success', 200));
            } else {
              reject(fromResponse('Delete seat failed', 500));
            }
          })
        } else {
          reject(fromResponse('Delete seat failed', 500));
        }
      })
    })
  }
}

module.exports = userModel;