const customerModel = require('./../model/customerDB');
const customerService ={};

customerService.insertScript = () => {
    return customerModel.insertScript().then((response) => {
        return response;
    })
}

customerService.getAllProducts = () => {
    return customerModel.getAllProducts().then((response) => {
        return response;
    })
}

customerService.getPrductById = productId => {
    return customerModel.getPrductById(productId).then((response) => {
        return response;
    })
}

module.exports = customerService;
