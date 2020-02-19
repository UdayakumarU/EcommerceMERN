
class Customer{
    constructor(customerId,customerDetails){
        this.customerId = customerId;
        this.customerName = customerDetails.customerName;
        this.customerEmail = customerDetails.customerEmail;
        this.customerMobile = customerDetails.customerMobile;
        this.customerPassword = customerDetails.customerPassword;
    }
}

module.exports = {Customer}