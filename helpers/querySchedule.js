const querySchedule = {
  getSchedule: (request) => {
    const query = `SELECT * from schedule WHERE movie_id = ${request}`;

    return query;
  },

  addSchedule: (request) => {
    const { movie_id, cinema_id, price, start } = request;
    const query = `INSERT INTO schedule(movie_id, cinema_id, price, start_date) VALUES('${movie_id}', '${cinema_id}', '${price}', '${new Date(start)}')`

    return query;
  },
}

module.exports = querySchedule;