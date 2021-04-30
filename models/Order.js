const pg = require("../helpers/connect_db");
const queryOrder = require("../helpers/queryOrder");

const OrderModel = {
  addNewOrder: (request) => {
    return new Promise((resolve, reject) => {
      const query = queryOrder.addNew(request);
      pg.query(query, (err) => {
        console.log(err, "model");
        if (!err) {
          resolve("Add order success", 201);
        } else {
          reject("Add order failed", 500);
        }
      });
    });
  },
};

module.exports = OrderModel;
