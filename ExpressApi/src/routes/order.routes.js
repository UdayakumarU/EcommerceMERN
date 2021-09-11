const express = require("express");
const orderService = require("../service/order.service");
const {userAuth} = require('../middleware/auth');

const orderRouter = express.Router();

orderRouter.post("/place-order", userAuth, (req, res, next) => {
    orderService.checkoutOrder(req.auth.customerId, req.body)
      .then(response => res.send(response))
      .catch(error => next(error));
});

module.exports = orderRouter;