const bycrypt = require('bcryptjs'); 
const customersModel = require('../model/customers.model');
const jwt = require('jsonwebtoken');
const { Customer, ApiError } = require('../objectCreator/objectCreator');
const { ID_PREFIX,JWT_KEY } = require('../keys/constant');
const { generateId } = require('../utilites/serviceUtils');

const userAccountService ={};

userAccountService.createCustomerAccount = accountDetails => {
    return customersModel.getCustomer([{ customerEmail: accountDetails.customerEmail }])
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
        const {customerEmail, customerMobile} = loginDetails;
        const mobile = isNaN(parseInt(customerMobile))? 0: customerMobile;
        const customerdata = await customersModel.getCustomer([{customerEmail}, {customerMobile: mobile}]);
        if(customerdata){
            const isMatch = await bycrypt.compare(loginDetails.customerPassword, customerdata.customerPassword);
            if (isMatch) {
                const message = "Logged in successfully";
                const payload = { customerId: customerdata.customerId, customerEmail: customerdata.customerEmail };
                const token = "Bearer " + jwt.sign(payload, JWT_KEY.SECRET);
                const customerData = {  
                                        customerId: customerdata.customerId,
                                        cart: customerdata.cart,
                                        customerName: customerdata.customerName,
                                    }
                return { message, token, customerData}
            }
        }
        throw new ApiError("Invalid username or password", 401) 
    }
    catch(e){ 
        throw new ApiError("Invalid username or password", 401) 
    }
}

userAccountService.getCustomerAddresses = (customerId) => {
    return customersModel.getCustomerAddresses(customerId) 
        .then(response => {
            if(response) return response;
            throw new ApiError("Can't get address. Please! try Later", 500);
        });
}

userAccountService.addCustomerAddress = (customerId, customerAddress) => {
    return customersModel.addCustomerAddress(customerId, customerAddress)
        .then(response => {
            if(response) return response;
            throw new ApiError("Address not added. Please! try Later", 500);
        });
}

userAccountService.deleteCustomerAddress = (customerId, addressId) => {
    return customersModel.deleteCustomerAddress(customerId, addressId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Address not deleted. Please! try Later", 500);
        });
}

// comeup with better approach instead of delete and add a new one
userAccountService.updateCustomerAddress = (customerId, addressId, customerAddress) => {
    return customersModel.deleteCustomerAddress(customerId, addressId)
        .then(response => {
            if(response) return customersModel.addCustomerAddress(customerId, customerAddress)
        })
        .then(response => {
            if(response) return response;
            throw new ApiError("Address not updated. Please! try Later", 500);
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

userAccountService.saveCartProducts = (customerId, {cartProducts}) => {
    return customersModel.saveCartProducts(customerId, cartProducts)
        .then(response => {
            if (response){
                const message = "Cart products saved successfully";
                return {message};
            }
            throw new ApiError("Products not saved to cart. Please! login again", 500);
        });
}

userAccountService.addToCart = (customerId, productId) => {
    return customersModel.isProductExistInCart(customerId, productId)
        .then(isExist => {
            if(!isExist) return customersModel.addToCart(customerId, {productId,quantity:1})
            return {message : "Product added already"}
        })
        .then(response => {
            if(response) return response;
            throw new ApiError("Product not added to cart. Please! try Later", 500);
        });   
}

userAccountService.deleteFromCart = (customerId, productId) => {
    return customersModel.isProductExistInCart(customerId, productId)
        .then(isExist => {
            if(isExist) return customersModel.deleteFromCart(customerId,productId)
            return {message : "Product removed already"}
        })
        .then(response => {
            if(response) return response;
            throw new ApiError("Product not removed from cart. Please! try Later", 500);
        });
}

userAccountService.updateCart = (customerId, productId, quantity) => {
    return customersModel.isProductExistInCart(customerId, productId)
    .then(isExist => {
        if(isExist && quantity > 0) return customersModel.updateCart(customerId, productId,quantity)
        return {message : "Product not available to update"}
    })
    .then(response => {
        if(response) return response;
        throw new ApiError("Can't update cart. Please! try Later", 500);
    });
}
//Remove in production
userAccountService.getAllCustomers = loginDetails => {
    return customersModel.getAllCustomers(loginDetails)
        .then(response => response);
}

module.exports = userAccountService;
