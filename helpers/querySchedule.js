const querySchedule = {
  getSchedule: (request) => {
    const query = `SELECT * from schedule WHERE movie_id = ${request}`;

    return query;
  },

  getScheduleByCinemas: (request) => {
    const query = `SELECT * from schedule WHERE cinema_id = ${request}`;

    return query;
  },

  getScheduleById: (request) => {
    const query = `SELECT a.id, a.start_date, a.start_time, a.price, b.title, c.name, c.logo from schedule as a
                  INNER JOIN movies as b ON b.id = a.movie_id
                  INNER JOIN cinemas as c ON c.id = a.cinema_id
                  WHERE a.id = ${request}`

    return query;
  },

  addSchedule: (request) => {
    const { movie_id, cinema_id, price, start_date, start_time } = request;
    const query = `INSERT INTO schedule(movie_id, cinema_id, price, start_date, start_time) VALUES('${movie_id}', '${cinema_id}', '${price}', '${start_date}', '${start_time}')`

    return query;
  },

  editSchedule: (request, initial) => {
    const { movie_id = initial.movie_id, cinema_id = initial.cinema_id, price = initial.price, start_date = initial.to_char, start_time = initial.start_time } = request
    const query = `UPDATE schedule SET movie_id = ${movie_id}, cinema_id = ${cinema_id}, price = '${price}', start_date = '${start_date}', start_time = '${start_time}' WHERE id = ${request.id}`

    console.log(query)

    return query;
  }
}

module.exports = querySchedule;