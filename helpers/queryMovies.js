const queryMovies ={
    getMovies:(request)=>{
       
        const getMoviesById=(`SELECT * FROM movies WHERE id=${request}`)
        return getMoviesById
    },

    addMovies: (request) => {
        const { category, title, release_date, synopsis, cast, duration,poster} = request;
        console.log(request)
        const query = `INSERT INTO movies(category, title,synopsis, cast, duration,poster) VALUES('${category}', '${title}','${release_date}', '${synopsis}','${cast}', '${duration}', '${poster}')`
        
        return query;
      },
}

module.exports=queryMovies