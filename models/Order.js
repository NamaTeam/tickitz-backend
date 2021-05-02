const pg = require("../helpers/connect_db");
const queryOrder = require("../helpers/queryOrder");
const fromResponse = require('../helpers/fromResponse');

const OrderModel = {
  addNewOrder: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryOrder.addNew(request);
      pg.query(query, (err, result) => {
        console.log(err, 'err')
        if (!err) {
          resolve(fromResponse("Add order success", 201, result.rows[0].id));
        } else {
          reject(fromResponse("Add order failed", 500));
        }
      });
    });
  },

  getOrderHistory: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryOrder.getOrderHistory(request);
      pg.query(query, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Order not found', 400));
            return;
          }
          resolve(fromResponse('Get order history', 200, result.rows));
        } else {
          reject(fromResponse('Get order history failed', 500));
        }
      });
    });
  },

  getOrderById: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryOrder.getOrderById(request);
      pg.query(query, (err, result) => {
        console.log(err, 'test err');
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Order not found', 400));
            return;
          }
          resolve(fromResponse('Get order history', 200, result.rows[0]));
        } else {
          reject(fromResponse('Get order history failed', 500));
        }
      });
    });
  },

  updateOrder: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT * from orders WHERE id = '${request.id}'`, (err, initial) => {
        console.log(err, 'test err update')
        if (!err) {
          if (initial.rows.length < 1) {
            reject(fromResponse('Order not found', 400));
            return;
          }
          const query = queryOrder.updateOrder(request, initial.rows[0]);
          pg.query(query, error => {
            console.log(error, 'test error update')
            if (!error) {
              resolve(fromResponse('Update order success', 200));
            } else {
              reject(fromResponse('Update order failed', 500));
            }
          })
        } else {
          reject(fromResponse('Update user failed', 500));
        }
      });
    });
  },

  deleteOrder: (request) => {
    return new Promise((resolve, reject) => {
      pg.query(`SELECT * from orders WHERE id = '${request.id}'`, (err, result) => {
        if (!err) {
          if (result.rows.length < 1) {
            reject(fromResponse('Order not found', 400));
          }
          pg.query(`DELETE from orders WHERE id = '${request.id}'`, error => {
            if (!error) {
              resolve(fromResponse('Delete order success', 200));
            } else {
              reject(fromResponse('Delete order failed', 500));
            }
          })
        } else {
          reject(fromResponse('Delete order failed', 500));
        }
      });
    });
  }
};

module.exports = OrderModel;
