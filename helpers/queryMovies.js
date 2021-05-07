const queryMovies = {
  getAllMovies: (req) => {
    const { limit = 10, page = 0 } = req.query; 
    const getallMovies = (`SELECT * FROM movies ORDER BY release_date LIMIT '${limit}' OFFSET '${page}'`)
    return getallMovies
  },

  getMovies: (request) => {
    const { limit = 10, page = 0 } = request.query; 
    const getMoviesById = (`SELECT * FROM movies WHERE id=${request} ORDER BY release_date LIMIT '${limit}' OFFSET '${page}'`)
    return getMoviesById
  },

  getMoviesNow: (request) => {
    const query = `SELECT b.id, b.title, b.category, b.poster, TO_CHAR(a.start_date, 'YYYY-MM-DD') as start_date from schedule as a
                  INNER JOIN movies as b ON b.id = a.movie_id WHERE start_date = '${request.start_date}'
                  GROUP BY b.title, b.id, a.start_date`

    return query;
  },

  getUpcomingMovies: (request) => {
    const query = `SELECT b.id, b.title, b.category, b.poster, TO_CHAR(a.start_date, 'YYYY-MM-DD') as start_date from schedule as a
                  INNER JOIN movies as b ON b.id = a.movie_id WHERE start_date > current_date
                  GROUP BY b.title, b.id, a.start_date`

    return query;
  },

  getMoviesByMonth: (request) => {
    const query = `SELECT b.id, b.title, b.category, b.poster, TO_CHAR(a.start_date, 'MM') as start_date from schedule as a
                  INNER JOIN movies as b ON b.id = a.movie_id WHERE TO_CHAR(a.start_date, 'MM') = '${request.start_month}'
				          GROUP BY b.title, b.id, a.start_date`
    console.log(query)

    return query;
  },

  addMovies: (request) => {
    const { category, title, synopsis, actors, duration, poster, release_date } = request;
    const query = `INSERT INTO movies(category, title, release_date, created_at, synopsis, actors, duration, poster) VALUES ('${category}', '${title}', '${release_date}','now()', '${synopsis}','${actors}','${duration}', '${poster}')`

    return query;
  },

  updateMovies: (request, initial) => {
    const { id, category = initial.category, title = initial.title, synopsis = initial.synopsis, actors = initial.actors, duration = initial.duration, poster = initial.poster } = request
    const query = `UPDATE movies SET category='${category}', title='${title}',release_date='now()',created_at='now()', synopsis='${synopsis}',actors ='${actors}',duration='${duration}', poster='${poster}',updated_at='now()' WHERE id = ${id}`

    return query;
  },

  searchMovie: (request) => {
    const { title, limit = 10, page = 1 } = request;
    return `SELECT id, category, title, release_date, created_at, synopsis, actors, duration, poster FROM movies WHERE LOWER(title) LIKE '%${title.toLowerCase()}%' ORDER BY title LIMIT ${limit} OFFSET ${
      (page - 1) * limit
    }`;
  }
}

module.exports = queryMovies