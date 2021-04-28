const queryAuth = {
  register: (request) => {
    const { email, password } = request;
    const query = `INSERT into users(email, password, role, created_at) VALUES('${email}', '${password}', 'user', 'now()')`;

    return query;
  },

  login: (request) => {
    const { email } = request;
    const getUser = `SELECT id, email, password, role from users where email = '${email}'`;

    return getUser;
  },
};

module.exports = queryAuth;
