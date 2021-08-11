const collection = require('./DB/connection');
const { COLLECTION_NAME } = require('../keys/constant');

const customersModel = {};

customersModel.createCustomerAccount = accountDetails => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.create(accountDetails))
        .then(response => response);
}


customersModel.deleteAccountById = customerId => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.deleteOne({ "customerId" : customerId}))
        .then(response => response);
}

customersModel.getCustomer = customerDetails => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOne({ $or:[...customerDetails] }))
        .then(response =>  response);
}

customersModel.getCustomerAddresses = (customerId)  => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOne({ customerId }, "addresses") )
        .then(response => response);
}

customersModel.addCustomerAddress = (customerId, customerAddress)  => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId },
            { "$push": { "addresses": customerAddress } },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
}

customersModel.deleteCustomerAddress = (customerId, addressId)  => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId },
            { "$pull": { "addresses": { _id: addressId } } },
            { new: true }))
        .then(response => response);
}

customersModel.setCustomerPassword = (customerId, newPassword)  => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            {customerId},
            { "$set": { "customerPassword": newPassword }},
            {new:true}))
        .then(response =>  response);
}

customersModel.saveCartProducts = (customerId, cartProducts) => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId },
            { cart: cartProducts },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
}

customersModel.isProductExistInCart = (customerId, productId) => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOne({ "customerId" : customerId, "cart.productId" : productId }))
        .then(response => response?true:false);
}

customersModel.addToCart = (customerId, cartObj) => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId },
            { "$push": { "cart": cartObj } },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
}

customersModel.deleteFromCart = (customerId, productId) => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId },
            { "$pull": { "cart": { productId } } },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
}

customersModel.updateCart = (customerId, productId, updatedQuantity) => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId, "cart.productId": productId},
            { "$set": { "cart.$.quantity":updatedQuantity } },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
}

customersModel.deleteCartByCustomerId = customerId => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId },
            { "$set": { "cart": [] } },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
}

customersModel.addOrderId = (customerId,orderId)  => {
    return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
        .then(model => model.findOneAndUpdate(
            { customerId },
            { "$push": { "orders": orderId } },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
}

//Remove in production
customersModel.getAllCustomers = () => {
  return collection.getCollection(COLLECTION_NAME.CUSTOMERS)
    .then(model =>  model.find())
    .then(data => data );
}

module.exports = customersModel;