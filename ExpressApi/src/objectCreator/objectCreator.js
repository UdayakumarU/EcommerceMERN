class Customer{
    constructor(customerDetails){
        this.customerId = customerDetails.customerId;
        this.customerName = customerDetails.customerName;
        this.customerEmail = customerDetails.customerEmail;
        this.customerMobile = customerDetails.customerMobile;
        this.customerPassword = customerDetails.customerPassword;
    }
}

class ApiError extends Error {
    constructor(message,status) {
      super(message);
      this.status = status;
    }
}

module.exports = {Customer, ApiError}