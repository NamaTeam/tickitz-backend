const authRouter = require("./Auth");
const userRouter = require("./Users");
const paymentRouter = require("./Payment");
const orderRouter = require("./Order");
const cinemasRouter = require('./Cinemas');
const moviesRouter = require('./Movies');
const scheduleRouter = require('./Schedule');
const statsRouter = require('./Stats');

const routes = (app, prefix) => {
  // app.use(`${prefix}/...,`, fileRouter)
  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/users`, userRouter);
  app.use(`${prefix}/orders`, orderRouter);
  app.use(`${prefix}/payment`, paymentRouter);
  app.use(`${prefix}/cinemas`, cinemasRouter);
  app.use(`${prefix}/movies`, moviesRouter);
  app.use(`${prefix}/schedules`, scheduleRouter);
  app.use(`${prefix}/stats`, statsRouter);
};

module.exports = routes;
