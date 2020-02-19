const express = require('express')
const router = express.Router();
const customerService = require('./../service/customerService');

router.get("/setupDB", (req, res, next) => {
  customerService.insertScript().then((data) => {
    if (data) {
      res.status(201)
      res.json({ message: "Inserted " + data + " document in database" })
    }
  })
})

router.get('/products', (req, res, next) => {
  customerService.getAllProducts().then(data =>{
    res.send(data);
  }).catch( error =>{
    next(error);
  })
});

router.get('/products/:productId', (req, res, next) => {
  customerService.getPrductById(req.params.productId).then(product =>{
    res.send(product);
  }).catch( error =>{
    next(error);
  })
});

router.post('/create-account', (req, res, next) => {
  console.log(req.body);
  customerService.createCustomerAccount(req.body).then(response =>{
    res.send(response);
  }).catch( error =>{
    next(error);
  })
});

router.post('/login-customer', (req, res, next) => {
  console.log(req.body);
  customerService.loginCustomer(req.body).then(response =>{
    res.send(response);
  }).catch( error =>{
    next(error);
  })
});

module.exports = router;