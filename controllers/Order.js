const orderModel = require("../models/Order");

const OrderController = {
  addNewOrder: async (req, res) => {
    const request = {
      ...req.body,
      user_id: req.params.id
    };
    try {
      const result = await orderModel.addNewOrder(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getOrderHistory: async (req, res) => {
    const request = {
      id: req.params.id,
      ...req.query
    }
    try {
      const result = await orderModel.getOrderHistory(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getOrderById: async (req, res) => {
    try {
      const result = await orderModel.getOrderById(req.params.id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getOrderBySchedule: async (req, res) => {
    try {
      const result = await orderModel.getOrderBySchedule(req.params.id);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  updateOrder: async (req, res) => {
    const request = {
      id: req.params.id,
      schedule_id: req.body.schedule_id || undefined,
      status: req.body.status || undefined,
      seat: req.body.seat || undefined,
      total_payment: req.body.total_payment || undefined,
    }
    try {
      const result = await orderModel.updateOrder(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteOrder: async (req, res) => {
    const request = {
      id: req.params.id,
    }
    try {
      const result = await orderModel.deleteOrder(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = OrderController;
