const collection = require('./DB/connection');
const {COLLECTION_NAME} = require('../keys/constant');

const orderModel = {};

orderModel.getAllOrders = () => {
    return collection.getCollection(COLLECTION_NAME.ORDERS)
      .then(model =>  model.find())
      .then(data => data );
}

orderModel.insertOrders = (orders) => {
  return collection.getCollection(COLLECTION_NAME.ORDERS)
    .then(model => model.insertMany(orders))
    .then(response => response);
}

orderModel.getOrdersByCustomerId = (customerId) => {
  return collection.getCollection(COLLECTION_NAME.ORDERS)
    .then(model => model.find({"customerId" : customerId}))
    .then(response => response);
}

module.exports = orderModel;