const pg = require('../helpers/connect_db');
const fromResponse = require('../helpers/fromResponse');
const queryStats = require('../helpers/queryStats');

const statsModel = {
  allStats: () => {
    return new Promise((resolve, reject) => {
      const users = queryStats.allStats().users
      pg.query(users, (errUser, user) => {
        if (!errUser) {
          const movies = queryStats.allStats().movies
          pg.query(movies, (errMovies, movie) => {
            if (!errMovies) {
              const cinemas = queryStats.allStats().cinemas
              pg.query(cinemas, (errCinemas, cinema) => {
                if (!errCinemas) {
                  const orders = queryStats.allStats().orders
                  pg.query(orders, (errOrders, order) => {
                    if (!errOrders) {
                      resolve(fromResponse('Get all stats success', 200, {
                        users: user.rows.length,
                        movies: movie.rows.length,
                        cinemas: cinema.rows.length,
                        orders: order.rows.length
                      }))
                    } else {
                      reject(fromResponse('Get stats failed', 500))
                    }
                  })
                } else {
                  reject(fromResponse('Get stats failed', 500))
                }
              })
            } else {
              reject(fromResponse('Get stats failed', 500))
            }
          })
        } else {
          reject(fromResponse('Get stats failed', 500))
        }
      })
    })
  }
};

module.exports = statsModel;