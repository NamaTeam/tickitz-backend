const route= require('express').Router()
const moviesController=require('../controllers/Movies')
const {uploadPoster} =require('../helpers/fromUpload')

route.post('/', uploadPoster, moviesController.addMovies);
route.get("/:id", moviesController.getMovies)

module.exports=route
