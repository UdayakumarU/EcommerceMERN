const express = require("express");
const productService = require("../service/product.service");

const productRouter = express.Router();

productRouter.get("/restore-default-products", (req, res, next) => {
    productService.insertScript()
      .then(response => {
          res.status(201);
          res.json({ message: "Inserted " + response + " products in DB" });
      })
      .catch(error => next(error));
});

productRouter.get("/", (req, res, next) => {
    productService.getAllProducts()
      .then(response => res.send(response))
      .catch(error => next(error));
});

productRouter.get("/:productId", (req, res, next) => {
    productService.getProductById(req.params.productId)
      .then(response => res.send(response))
      .catch(error => next(error));
});

productRouter.get("/delete-product/:productId", (req, res, next) => {
    productService.deleteProductById(req.params.productId)
      .then(response => res.send(response))
      .catch(error => next(error));
});

module.exports = productRouter;
