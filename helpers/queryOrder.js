const queryOrder = {
  addNew: (request) => {
    const { id, schedule_id, user_id, total, status, seat } = request;
    let seatReq = []
    seat.map(e => seatReq.push(`'${e}'`))

    const query = `INSERT INTO orders(id, schedule_id, user_id, order_date, total_payment, status, seat) VALUES('${id}', '${schedule_id}', '${user_id}', 'now()', '${total}', '${status}', ARRAY[${seatReq}]) RETURNING id`;
    console.log(query, 'query')
    return query;
  },

  getOrderHistory: (request) => {
    const query = `SELECT a.id, a.order_date, a.total_payment, a.status, a.seat, b.start_date, b.start_time, b.title as movie_title, b.name as cinema_name from orders as a
                  INNER JOIN (SELECT a.id, a.start_date, a.start_time, b.title, c.name from schedule as a
                    INNER JOIN movies as b on b.id = a.movie_id
                    INNER JOIN cinemas as c on c.id = a.cinema_id) as b on b.id = a.schedule_id
                  WHERE a.user_id = ${request}`;

    return query;
  },

  getOrderById: (request) => {
    const query = `SELECT a.id, a.order_date, a.total_payment, a.status, a.seat, b.start_date, b.start_time, b.title as movie_title, b.name as cinema_name from orders as a
                  INNER JOIN (SELECT a.id, a.start_date, a.start_time, b.title, c.name from schedule as a
                    INNER JOIN movies as b on b.id = a.movie_id
                    INNER JOIN cinemas as c on c.id = a.cinema_id) as b on b.id = a.schedule_id
                  WHERE a.id = '${request}'`;

    return query;
  },

  getOrderBySchedule: (request) => {
    const query = `SELECT a.id, a.order_date, a.total_payment, a.status, a.seat from orders as a
                  INNER JOIN schedule as b ON b.id = a.schedule_id WHERE a.schedule_id = ${request}`

    return query;
  },

  updateOrder: (request, initial) => {
    const { id, schedule_id = initial.schedule_id, status = initial.status, total_payment = initial.total_payment, seat } = request;
    let seatReq = []
    seat.map(e => seatReq.push(`'${e}'`))

    const query = seat !== undefined ? `UPDATE orders SET schedule_id = ${schedule_id}, status = '${status}', seat = ARRAY[${seatReq}], total_payment = ${total_payment} WHERE id = '${id}'` : `UPDATE orders SET schedule_id = ${schedule_id}, status = '${status}' WHERE id = '${id}'`

    return query;
  },
};

module.exports = queryOrder;
