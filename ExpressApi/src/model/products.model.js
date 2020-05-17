const collection = require('./DB/connection');
const sampleProducts = require('../data/product');
const {COLLECTION_NAME} = require('../keys/constant');

const productsModel = {};

productsModel.insertSampleProducts = () => {
    return collection.getCollection(COLLECTION_NAME.PRODUCTS)
        .then(model => model.insertMany(sampleProducts))
        .then(response => response);
}

productsModel.deleteAllProducts = () => {
    return collection.getCollection(COLLECTION_NAME.PRODUCTS)
        .then(model => model.deleteMany())
        .then(response => response);
}

productsModel.getAllProducts = () => {
    return collection.getCollection(COLLECTION_NAME.PRODUCTS)
        .then(model => model.find())
        .then(response => response);
}

productsModel.getProductById = productId => {
    return collection.getCollection(COLLECTION_NAME.PRODUCTS)
        .then(model => model.findOne({"productId" : productId}))
        .then(response => response);
}

productsModel.deleteProductById = productId => {
    return collection.getCollection(COLLECTION_NAME.PRODUCTS)
        .then(model => model.deleteOne({"productId" : productId}))
        .then(response => response);
}

module.exports = productsModel;