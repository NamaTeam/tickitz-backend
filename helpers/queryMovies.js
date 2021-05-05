const queryMovies ={
    getAllMovies:()=>{
        const getallMovies=(`SELECT * FROM movies `)
        return getallMovies
    },

    getMovies:(request)=>{
        const getMoviesById=(`SELECT * FROM movies WHERE id=${request}`)
        return getMoviesById
    },


    addMovies: (request) => {
        const { category, title, synopsis, cast,duration,poster} = request;
        console.log(request)
        const query = `INSERT INTO movies(category, title, release_date,created_at, synopsis,"cast", duration,poster) VALUES ('${category}', '${title}','now()','now()', '${synopsis}','${cast}','${duration}', '${poster}')`
        
        return query;
      },

      updateMovies: (request, initial) => {
        const { id, category= initial.category, title = initial.title, synopsis = initial.synopsis, cast = initial.cast, duration = initial.duration, poster = initial.poster } = request
        const query = `UPDATE movies SET category='${category}', title='${title}',release_date='now()',created_at='now()', synopsis='${synopsis}',"cast" ='${cast}',duration='${duration}', poster='${poster}',updated_at='now()' WHERE id = ${id}`
    
        return query;
      }
} 

module.exports=queryMovies