const moviesModel = require("../models/Movies")

const moviesController = {
  getAllMovies: (req, res) => {
    const request = {
      ...req.query
    }
    moviesModel
      .getAllMovies(request)
      .then((result) => {
        res.status(result.statusCode).send(result)
      })
      .catch((err) => {
        res.status(err.statusCode).send(err)
      })
  },

  getMovies: (req, res) => {
    moviesModel
      .getMovies(req.params.id)
      .then((result) => {
        res.status(result.statusCode).send(result)
      })
      .catch((err) => {
        res.status(err.statusCode).send(err)
      })
  },

  getMoviesNow: async (req, res) => {
    const request = {
      start_date: req.query.start,
    }
    try {
      const result = await moviesModel.getMoviesNow(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  getUpcomingMovies: (req, res) => {
    moviesModel
      .getUpcomingMovies(req)
      .then((result) => {
        res.status(result.statusCode).send(result)
      })
      .catch((err) => {
        res.status(err.statusCode).send(err)
      })
  },

  getMoviesByMonth: async (req, res) => {
    const request = {
      start_month: req.query.month,
    }
    console.log(request, 'cont')
    try {
      const result = await moviesModel.getMoviesByMonth(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteMovies: async (req, res) => {
    if (!req.params.id) {
      res.status(400).send({
        message: 'Id not match',
        statusCode: 400,
      })
    }
    try {
      const result = await moviesModel.deleteMovies(req.params);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addMovies: async (req, res) => {
    const request = {
      ...req.body,
      poster: `/upload/poster/${req.file.filename}`,
    }

    try {
      const result = await moviesModel.addMovies(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  updateMovies: async (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      // poster: `/upload/poster/${req.file.filename}`,
    }
    console.log(request, 'ini controller')
    try {
      const result = await moviesModel.updateMovies(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  searchMovieByTitle : async (req, res) =>{
    try{
      const result = await moviesModel.searchMovieByTitle(req.query);
      res.status(result.statusCode).send(result)
    }catch(err){
      res.status(err.statusCode).send(err)
    }
  }
}

module.exports = moviesController