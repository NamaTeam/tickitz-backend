const moviesModel = require("../models/Movies")

const moviesController={
    getMovies:(req, res)=>{
        moviesModel
        .getMovies(req.params.id)
        .then((result)=>{
            res.status(result.statusCode).send(result)
        })
        .catch((err)=>{
            res.status(err.statusCode).send(err)
        })
    },

    addMovies: async (req, res) => {
        const request = {
          ...req.body,
          logo: `/upload/poster/${req.file.filename}`,
        }
    
        try {
          const result = await moviesModel.addMovies(request);
          res.status(result.statusCode).send(result);
        } catch (err) {
          res.status(err.statusCode).send(err);
        }
      }
}

module.exports=moviesController