const cinemasModel = require('../models/Cinemas');

const cinemasController = {
  showCinemas: async (req, res) => {
    const request = {
      city: req.body.location,
      ...req.query
    };
    try {
      const result = await cinemasModel.showCinemas(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      console.log(err)
      res.status(err.statusCode).send(err);
    };
  },

  showScheduleCinemas: async (req, res) => {
    const request = {
      city: req.body.location,
      id: req.params.id
    };
    try {
      const result = await cinemasModel.showScheduleCinemas(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      console.log(err)
      res.status(err.statusCode).send(err);
    };
  },

  getAllCinemas: (req, res) => {
    const request = {
      city: req.body.location,
    }
    cinemasModel
      .getAllCinemas(request)
      .then((result) => {
        res.status(result.statusCode).send(result)
      })
      .catch((err) => {
        res.status(err.statusCode).send(err)
      })
  },

  getAllCinema: (req, res) => {
    const request = {
      ...req.query
    }
    cinemasModel
      .getAllCinema(request)
      .then((result) => {
        res.status(result.statusCode).send(result)
      })
      .catch((err) => {
        res.status(err.statusCode).send(err)
      })
  },

  getCinemaById: (req, res) => {
    const request = {
      id: req.params.id
    }
    cinemasModel
      .getCinemaById(request)
      .then((result) => {
        res.status(result.statusCode).send(result)
      })
      .catch((err) => {
        res.status(err.statusCode).send(err)
      })
  },

  addCinemas: async (req, res) => {
    const request = {
      ...req.body,
      logo: req.file ? `/upload/logos/${req.file.filename}` : undefined,
    }

    try {
      const result = await cinemasModel.addCinemas(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  updateCinemas: async (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      logo: req.file ? `/upload/logos/${req.file.filename}` : undefined,
    }

    try {
      const result = await cinemasModel.updateCinemas(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteCinemas: async (req, res) => {
    if (!req.params.id) {
      res.status(400).send({
        message: 'Id not match',
        statusCode: 400,
      })
    }

    try {
      const result = await cinemasModel.deleteCinemas(req.params);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = cinemasController;