const authRouter = require("./Auth");

const routes = (app, prefix) => {
  // app.use(`${prefix}/...,`, fileRouter)
  app.use(`${prefix}/auth`, authRouter);
};

module.exports = routes;
