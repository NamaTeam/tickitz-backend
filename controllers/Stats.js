const statsModel = require('../models/Stats')

const statsController = {
  allStats: async (req, res) => {
    try {
      const result = await statsModel.allStats();
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err)
    }
  }
};

module.exports = statsController;