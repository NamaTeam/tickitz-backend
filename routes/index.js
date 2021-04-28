const authRouter = require("./Auth");
const userRouter = require("./Users")
const routes = (app, prefix) => {
  // app.use(`${prefix}/...,`, fileRouter)
  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/users` , userRouter);
};

module.exports = routes;
