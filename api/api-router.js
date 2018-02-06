const express = require('express');

let routes = () => {
  let apiRouter = express.Router();
  apiRouter.use('/', (req, res, next) => {
    next();
  });

  return apiRouter;
};

module.exports = routes;
