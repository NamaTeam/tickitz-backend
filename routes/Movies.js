const route = require('express').Router()
const moviesController = require('../controllers/Movies')
const { uploadPoster } = require('../helpers/fromUpload');
const moviesModel = require('../models/Movies');

route.post('/', uploadPoster, moviesController.addMovies);
route.get('/', moviesController.getMoviesNow);
route.get('/month', moviesModel.getMoviesByMonth)
route.get("/:id", moviesController.getMovies)
route.delete("/:id", moviesController.deleteMovies)
route.get("/", moviesController.getAllMovies)
route.patch('/:id', uploadPoster, moviesController.updateMovies);

module.exports = route
