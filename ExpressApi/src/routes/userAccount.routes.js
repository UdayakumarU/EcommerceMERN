const express = require("express");
const userAccountService = require("../service/userAccount.service");
const {userAuth} = require('../middleware/auth');

const userAccountRouter = express.Router();

userAccountRouter.post("/create-customer", (req, res, next) => {
    userAccountService.createCustomerAccount(req.body)
        .then(response => res.send(response))
        .catch(error => next(error));
});

userAccountRouter.post("/login-customer", (req, res, next) => {
    userAccountService.loginCustomer(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userAccountRouter.get("/delete-account/:customerId", userAuth, (req, res, next) => {
    userAccountService.deleteAccountById(req.params.customerId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

userAccountRouter.put("/add-address/:customerId", userAuth, (req, res, next) => {
    userAccountService.addCustomerAddress(req.params.customerId, req.body)
        .then(response => res.send(response))
        .catch(error => next(error));
});

userAccountRouter.put("/delete-address/:customerId/:addressId", userAuth, (req, res, next) => {
    userAccountService.deleteCustomerAddress(req.params.customerId, req.params.addressId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

userAccountRouter.put("/update-password/:customerId", userAuth, (req, res, next) => {
    userAccountService.updateCustomerPassword(req.params.customerId, req.body)
        .then(response => res.send(response))
        .catch(error => next(error));
});

userAccountRouter.put("/add-to-cart/:productId", userAuth, (req, res, next) => {
    userAccountService.addToCart(req.auth.customerId, req.params.productId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

userAccountRouter.put("/delete-from-cart/:productId", userAuth, (req, res, next) => {
    userAccountService.deleteFromCart(req.auth.customerId, req.params.productId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

//make sure UI send only +ve Interger in quantity
userAccountRouter.put("/update-cart/:productId/:quantity", userAuth, (req, res, next) => {
    userAccountService.updateCart(req.auth.customerId, req.params.productId, req.params.quantity)
        .then(response => res.send(response))
        .catch(error => next(error));
});

//Remove in production
userAccountRouter.get("/get-all-customers", (req, res, next) => {
    userAccountService.getAllCustomers()
        .then(response => res.send(response))
        .catch(error => next(error));
});

module.exports = userAccountRouter;
