const express = require('express');

let routes = (authController) => {
  let authRouter = express.Router();
  authRouter.route('/')
    .post(authController.login)
    .get(authController.logout);
  return authRouter;
};

module.exports = routes;
