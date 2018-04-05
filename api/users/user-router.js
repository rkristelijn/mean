const express = require('express');

let routes = (userController) => {
  let userRouter = express.Router();

  userRouter.use((req, res, next) => {
    //console.log('in generic userRouter');
    //console.log(userController.isAdmin(req));
    next();
  });

  userRouter.route('/')
    .post(userController.create)
    .get(userController.readAll)
    .delete((req, res) => {
      res.status(404);
      res.send('Not Found');
    });
  userRouter.route('/:userId')
    .get(userController.readOne)
    .put(userController.updateOne)
    .patch(userController.updateOne)
    .delete(userController.deleteOne);
  return userRouter;
};

module.exports = routes;
