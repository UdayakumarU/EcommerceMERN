const customerModel = require('./../model/customerDB');
const Creator = require('../model/objectCreator')
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

customerService.createCustomerAccount = accountDetails => {
    const customerDetails = new Creator.Customer('CU1001',accountDetails); 
    return customerModel.createCustomerAccount(customerDetails).then((response) => {
        return response;
    })
}

customerService.loginCustomer = loginDetails => {
    return customerModel.loginCustomer(loginDetails).then((response) => {
        return response;
    })
}
module.exports = customerService;
