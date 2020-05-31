const orderModel = require('../model/order.model');
const customersModel = require('../model/customers.model');
const productsModel = require('../model/products.model');

const { ID_PREFIX } = require('../keys/constant');
const { generateId,getPriceAfterDiscount } = require('../utilites/serviceUtils');
const { ApiError, Order } = require('../objectCreator/objectCreator');

const orderService ={};

orderService.checkoutOrder = ({customerId}, orderDetails) => {
    if(orderDetails.cart.length === 0) throw ApiError("No product in your cart to place order",400);
    return orderModel.getAllOrders()
        .then(async allOrders => {
            const orderId = generateId(ID_PREFIX.ORDER, allOrders.length);
            let orderPrice = 0;
            for(const cartItem of orderDetails.cart){
                let product = await productsModel.getProductById(cartItem.productId);
                orderPrice += getPriceAfterDiscount(product.productActualPrice, product.discount);
            }
            orderPrice = orderPrice.toFixed(2);
            const orderDetail = new Order({ ...orderDetails, customerId, orderId, orderPrice });
            return orderModel.insertOrder(orderDetail);
        })
        .then(orderResponse =>{
            console.log(orderResponse.orderId);
            if (orderResponse) return customersModel.addOrderId(customerId, orderResponse.orderId);
        })
        .then(isAdded => {
            console.log(isAdded);
            if (isAdded) return customersModel.deleteCartByCustomerId(customerId);
            throw new ApiError("Order not Placed. Please! try Later", 500);
        })
        .then(() => "Order Placed Successfullly");
}

module.exports = orderService;
