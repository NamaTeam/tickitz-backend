const orderModel = require("../models/Order");

const OrderController = {
  addNewOrder: async (req, res) => {
    const request = {
      ...req.body,
      id: `TRICKITS-${new Date().getTime()}${Math.floor(Math.random() * 100)}`,
    };
    try {
      const result = await orderModel.addNewOrder(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getOrderHistory: async (req, res) => {
    try {
      const result = await orderModel.getOrderHistory(req.params.id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = OrderController;
