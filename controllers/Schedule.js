const scheduleModel = require('../models/Schedule');

const scheduleController = {
  getSchedule: async (req, res) => {
    const request = { id: req.params.id }
    try {
      const result = await scheduleModel.getSchedule(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getScheduleByCinemas: async (req, res) => {
    const request = { id: req.params.id }
    try {
      const result = await scheduleModel.getScheduleByCinemas(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  // addSchedule: async (req, res) => {
  //   const request = {
  //     ...req.body,
  //     start: new Date().getTime(req.body.start)
  //   };
  //   try {
  //     const result = await scheduleModel.addSchedule(request);
  //     res.status(result.statusCode).send(result);
  //   } catch (err) {
  //     res.status(err.statusCode).send(err);
  //   }
  // },

  deleteSchedule: async (req, res) => {
    const request = req.params.id;
    try {
      const result = await scheduleModel.deleteSchedule(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
}

module.exports = scheduleController;