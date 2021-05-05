const route = require('express').Router()
const moviesController = require('../controllers/Movies')
const { uploadPoster } = require('../helpers/fromUpload');

route.post('/', uploadPoster, moviesController.addMovies);
route.get("/", moviesController.getAllMovies)
route.get('/date', moviesController.getMoviesNow);
route.get('/month', moviesController.getMoviesByMonth)
route.get("/:id", moviesController.getMovies)
route.delete("/:id", moviesController.deleteMovies)
route.patch('/:id', uploadPoster, moviesController.updateMovies);

module.exports = route
