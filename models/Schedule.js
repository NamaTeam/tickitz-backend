const pg = require('../helpers/connect_db');
const fromResponse = require('../helpers/fromResponse');
const querySchedule = require('../helpers/querySchedule');

const scheduleModel = {
  getSchedule: (request) => {
    return new Promise((resolve, reject) => {
      const query = querySchedule.getSchedule(request.id);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Schedule empty', 400));
            return;
          }
          resolve(fromResponse('Get schedule success', 200, result.rows));
        } else {
          reject(fromResponse('Get Schedule failed', 500));
        }
      });
    });
  },

  getScheduleByCinemas: (request) => {
    return new Promise((resolve, reject) => {
      const query = querySchedule.getScheduleByCinemas(request.id);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Schedule empty', 400));
            return;
          }
          resolve(fromResponse('Get schedule success', 200, result.rows));
        } else {
          reject(fromResponse('Get Schedule failed', 500));
        }
      });
    });
  },

  getScheduleById: (request) => {
    return new Promise((resolve, reject) => {
      const query = querySchedule.getScheduleById(request.id);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Schedule empty', 400));
            return;
          }
          resolve(fromResponse('Get schedule success', 200, result.rows[0]));
        } else {
          reject(fromResponse('Get Schedule failed', 500));
        }
      });
    });
  },

  addSchedule: (request) => {
    return new Promise((resolve, reject) => {
      const { movie_id, cinema_id, start_date, start_time } = request;
      pg.query(`SELECT id from schedule WHERE movie_id = ${movie_id} AND cinema_id = ${cinema_id} AND start_date = '${start_date}' AND start_time= '${start_time}'`, (err, result) => {
        console.log(err, 'test1')
        if (!err) {
          if (result.rows.length >= 1) {
            reject(fromResponse('Schedule exist', 400));
            return;
          }
          const query = querySchedule.addSchedule(request);
          pg.query(query, error => {
            console.log(error, 'test2')
            if (!error) {
              resolve(fromResponse('Add schedule success', 201));
            } else {
              reject(fromResponse('Add schedule failed', 500));
            }
          })
        } else {
          reject(fromResponse('Add schedule failed', 500));
        }
      });
    });
  },

  editSchedule: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT movie_id, cinema_id, start_time, TO_CHAR(start_date, 'YYYY-MM-DD'), price from schedule WHERE id = ${request.id}`, (error, initial) => {
        if (!error) {
          if (initial.rows.length < 1) {
            reject(fromResponse('Schedule not found', 400));
            return;
          }
          const query = querySchedule.editSchedule(request, initial.rows[0]);
          pg.query(query, err => {
            if (!err) {
              resolve(fromResponse('Update schedule success', 200));
            } else {
              reject(fromResponse('Update schedule failed'));
            }
          })
        } else {
          reject(fromResponse('Update schedule failed', 500));
        }
      })
    })
  },

  deleteSchedule: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`DELETE from schedule WHERE id = ${request}`, err => {
        console.log(err, 'test delete')
        if (!err) {
          resolve(fromResponse('Delete schedule success', 200));
        } else {
          reject(fromResponse('Delete schedule failed', 500));
        }
      });
    });
  }
}

module.exports = scheduleModel;