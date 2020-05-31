const express = require("express");
const orderService = require("../service/order.service");
const {userAuth} = require('../middleware/auth');

const orderRouter = express.Router();

orderRouter.post("/checkout", userAuth, (req, res, next) => {
    orderService.checkoutOrder(req.auth, req.body)
      .then(response => res.send(response))
      .catch(error => next(error));
});

module.exports = orderRouter;