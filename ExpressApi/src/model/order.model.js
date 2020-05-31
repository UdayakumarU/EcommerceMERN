const collection = require('./DB/connection');
const {COLLECTION_NAME} = require('../keys/constant');

const orderModel = {};

orderModel.getAllOrders = () => {
    return collection.getCollection(COLLECTION_NAME.ORDERS)
      .then(model =>  model.find())
      .then(data => data );
  }

orderModel.insertOrder = (orderDetails) => {
  return collection.getCollection(COLLECTION_NAME.ORDERS)
    .then(model => model.create(orderDetails))
    .then(response => response);
}

module.exports = orderModel;