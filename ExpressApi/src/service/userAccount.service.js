const bycrypt = require('bcryptjs'); 
const customersModel = require('../model/customers.model');
const jwt = require('jsonwebtoken');
const { Customer, ApiError } = require('../objectCreator/objectCreator');
const { ID_PREFIX,JWT_KEY } = require('../keys/constant');
const { generateId } = require('../utilites/serviceUtils');

const userAccountService ={};

userAccountService.createCustomerAccount = accountDetails => {
    return customersModel.getCustomer({ customerEmail: accountDetails.customerEmail })
        .then(user => {
            if (!user) return;
            throw new ApiError("Email already exist!", 409);
        })
        .then(() => customersModel.getAllCustomers())
        .then(allCustomers => {
            const customerId = generateId(ID_PREFIX.CUSTOMER, allCustomers.length);
            return bycrypt.hash(accountDetails.customerPassword, 12)
                .then( customerPassword => {
                    const customerDetails = new Customer({ ... accountDetails, customerId, customerPassword });
                    return customersModel.createCustomerAccount(customerDetails);
                });
        })
        .then(response => {
            if (response) return "Account Created. Please Login";
            throw new ApiError("Account not created. Please! try Later", 500);
        });
}

userAccountService.deleteAccountById = customerId => {
    return customersModel.deleteAccountById(customerId)
        .then(response => {
            if (response.deletedCount === 0) throw new ApiError("Account not found", 404);
            return "Account deleted";
        });
}

userAccountService.loginCustomer = async loginDetails  => {
    try{
        const customerdata = await customersModel.getCustomer({customerEmail : loginDetails.customerEmail});
        if(customerdata){
            const isMatch = await bycrypt.compare(loginDetails.customerPassword, customerdata.customerPassword);
            if (isMatch) {
                const message = "Logged in successfully";
                const payload = { customerEmail: loginDetails.customerEmail };
                const token = "Bearer " + jwt.sign(payload, JWT_KEY.SECRET, { expiresIn: 300 });
                const customerData = {  
                                        id: customerdata.customerId,
                                        cart: customerdata.cart,
                                        name: customerdata.customerName,
                                    }
                return { message, token, customerData}
            }
        }
    }
    catch(e){ 
        throw new ApiError("Invalid username or password", 401) 
    }
}

userAccountService.addCustomerAddress = (customerId, customerAddress) => {
    return customersModel.addCustomerAddress(customerId, customerAddress)
        .then(response => {
            if(response) return response;
            throw new ApiError("Address not added.Please! try Later", 500);
        });
}

userAccountService.deleteCustomerAddress = (customerId, addressId) => {
    return customersModel.deleteCustomerAddress(customerId, addressId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Address not deleted.Please! try Later", 500);
        });
}

userAccountService.updateCustomerPassword = (customerId,{currentPassword, newPassword}) => {
    return customersModel.getCustomer({customerId})
        .then(customerData => {
            if(customerData) return customerData.password; 
            throw new ApiError("Invalid user!", 401);
        })
        .then(password => {
            if(password === currentPassword)
                return customersModel.setCustomerPassword(customerId, newPassword);
            throw new ApiError("Invalid current Password. Please! enter valid current password", 401);
        })
        .then(response => {
            if(response) return response;
            throw new Error("Password not updated.Please! try Later", 500);
        });
}

//Remove in production
userAccountService.getAllCustomers = loginDetails => {
    return customersModel.getAllCustomers(loginDetails)
        .then(response => response);
}

module.exports = userAccountService;
