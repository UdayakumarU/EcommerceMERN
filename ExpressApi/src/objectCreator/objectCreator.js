class Customer{
    constructor(customerDetails){
        this.customerId = customerDetails.customerId;
        this.customerName = customerDetails.customerName;
        this.customerEmail = customerDetails.customerEmail;
        this.customerPassword = customerDetails.customerPassword;
    }
}

class Order{
    constructor(OrderDetails){
        this.orderId = OrderDetails.orderId;
        this.customerId = OrderDetails.customerId;
        this.orderPrice = OrderDetails.orderPrice;
        this.product = OrderDetails.checkoutItem;
        this.paymentType = OrderDetails.paymentType;
        this.deliveryAddress = OrderDetails.deliveryAddress;
        this.statusTrack = [{statusCd:1, date:new Date()}];
    }
}

class ApiError extends Error {
    constructor(message,status) {
      super(message);
      this.status = status;
    }
}

module.exports = {Customer, Order, ApiError}