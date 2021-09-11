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
        this.products = OrderDetails.checkoutItems;
        this.paymentType = OrderDetails.paymentType;
        this.deliveryAddress = OrderDetails.deliveryAddress;
        this.orderDate = new Date();
        this.deliveredDate = new Date(new Date().getTime() + (2*24*60*60*1000));
        this.status = "Order placed";
    }
}

class ApiError extends Error {
    constructor(message,status) {
      super(message);
      this.status = status;
    }
}

module.exports = {Customer, Order, ApiError}