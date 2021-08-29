const queryStats = {
  allStats: () => {
    const users = `SELECT id from users WHERE role = 'user' OR role = 'member'`
    const movies = `SELECT id from movies`
    const cinemas = `SELECT id from cinemas`
    const orders = `SELECT id from orders`

    return { users, movies, cinemas, orders }
  }
}

module.exports = queryStats;