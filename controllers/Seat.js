const seatModel = require('../models/Seat');

const seatController = {
  getSeat: async (req, res) => {
    const request = req.params.id;
    try {
      const result = await seatModel.getSeat(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addSeat: async (req, res) => {
    const request = {
      cinema_id: req.params.id,
      seat_number: req.body.seat,
    }
    try {
      const result = await seatModel.addSeat(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteSeat: async (req, res) => {
    const request = req.params.id;
    try {
      const result = await seatModel.deleteSeat(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
}

module.exports = seatController;