const queryOrder = {
  addNew: (request) => {
    const { id, schedule_id, user_id, total, status } = request;
    const query = `INSERT INTO orders(id, schedule_id, user_id, order_date, total_payment, status) VALUES('${id}', '${schedule_id}', '${user_id}', 'now()', '${total}', '${status}') `;

    return query;
  },

  // getOrderHistorty: (request) => {
  //   const query = ``;
  // },
};

module.exports = queryOrder;
