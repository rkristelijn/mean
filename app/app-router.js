const express = require('express');
const pug = require('pug');

let routes = () => {
  let apiRouter = express.Router();


  apiRouter.get('/', (req, res) => {
    res.end(pug.renderFile(__dirname + '/app.pug', {
          user: req.user
        }
      ));
  });

  return apiRouter;
};

module.exports = routes;
