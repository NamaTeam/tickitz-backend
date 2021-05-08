
const queryCinemas = {
  showCinemas: (request) => {
    const query = `SELECT a.id, a.name, a.city, a.street, a.street_number, a.created_at, a.updated_at, a.logo, b.id as schedule_id, b.movie_id, b.start_date, b.price, b.start_time
                  FROM cinemas as a
                  INNER JOIN (SELECT a.id, a.movie_id, a.start_date, a.price, a.cinema_id, a.start_time from schedule as a) as b on b.cinema_id = a.id WHERE a.city = '${request.toLowerCase()}'`
    return query;
  },

  showScheduleCinemas: (request) => {
    const query = `SELECT a.id, a.name, a.city, a.street, a.street_number, a.created_at, a.updated_at, a.logo, b.id as schedule_id, b.movie_id, b.start_date, b.price, b.start_time
	FROM cinemas as a
	INNER JOIN (SELECT a.id, a.movie_id, a.start_date, a.price, a.cinema_id, a.start_time from schedule as a) as b on b.cinema_id = a.id WHERE a.city = '${request.city.toLowerCase()}' AND b.movie_id = '${request.id}'`
    return query;
  },

  getAllCinemas: () => {
    const getallCinemas = (`SELECT * FROM cinemas `)
    return getallCinemas
  },

  getAllCinema: (request) => {
    const getPages = `SELECT * FROM cinemas WHERE city = '${request.city}'`
    const getallCinema = `SELECT * FROM cinemas WHERE city = '${request.city}'
                          ORDER BY created_at DESC
                          LIMIT '${request.limit || 10}' OFFSET '${(request.page - 1) * request.limit || 0}'`
    return { getallCinema, getPages }
  },

  addCinemas: (request) => {
    const { name, logo, city, street, street_number } = request;
    const query = `INSERT INTO cinemas(name, logo, city, street, street_number, created_at) VALUES('${name}', '${logo}', '${city.toLowerCase()}', '${street.toLowerCase()}', '${street_number}', 'now()')`

    return query;
  },

  updateCinemas: (request, initial) => {
    const { id, name = initial.name, city = initial.city, street = initial.street, street_number = initial.street_number, logo = initial.logo } = request
    const query = `UPDATE cinemas SET name='${name}', city='${city.toLowerCase()}', street='${street.toLowerCase()}', street_number='${street_number}', logo='${logo}', updated_at='now()' WHERE id = ${id}`

    return query;
  }
};

module.exports = queryCinemas;