const orderModel = require('../model/order.model');
const customersModel = require('../model/customers.model');
const productsModel = require('../model/products.model');

const { ID_PREFIX } = require('../keys/constant');
const { generateId,getPriceAfterDiscount } = require('../utilites/serviceUtils');
const { ApiError, Order } = require('../objectCreator/objectCreator');

const orderService ={};

orderService.checkoutOrder = (customerId, orderDetails) => {
    if(orderDetails.checkoutItems.length === 0) throw ApiError("No product to place order",400);
    return orderModel.getAllOrders()
        .then(async allOrders => {
            const orderId = generateId(ID_PREFIX.ORDER, allOrders.length);
            let orderPrice = 0;
            for(const checkoutItem of orderDetails.checkoutItems){
                let product = await productsModel.getProductById(checkoutItem.productId);
                orderPrice += getPriceAfterDiscount(product.productActualPrice, product.discount);
            }
            orderPrice = orderPrice.toFixed(2);
            const orderDetail = new Order({ ...orderDetails, customerId, orderId, orderPrice });
            return orderModel.insertOrder(orderDetail);
        })
        .then(async orderResponse => {
            if (orderResponse){
                await customersModel.addOrderId(customerId, orderResponse.orderId);
                return orderResponse;
            } 
            throw new ApiError("Order not Placed. Please! try Later", 500);
        })
        .then(orderResponse => {
            return { 
                orderedProducts : orderResponse.products.map(product =>({"productId": product.productId})),
                message : "Order Placed Successfully"}
            } 
        );
}

module.exports = orderService;
