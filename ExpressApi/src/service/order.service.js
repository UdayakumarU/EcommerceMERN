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
        .then(allOrders => {
            return orderDetails.checkoutItems.map( async (checkoutItem, index) =>{
                let orderId = generateId(ID_PREFIX.ORDER, allOrders.length+index); // prone to multithread
                let product = await productsModel.getProductById(checkoutItem.productId);
                let orderPrice = getPriceAfterDiscount(product.productActualPrice, product.discount);
                orderPrice = orderPrice.toFixed(2);
                return new Order({ ...orderDetails, orderId, customerId, orderPrice, checkoutItem }) 
            });
        })
        .then( unresolvedOrders =>{
            return Promise.all(unresolvedOrders).then(orders => orderModel.insertOrders(orders));
        })
        .then(async orderResponse => {
            if (!orderResponse || orderResponse.length == 0)
                throw new ApiError("Order not Placed. Please! try Later", 500);
            await customersModel.addOrderIds(customerId, orderResponse.map(order=>order.orderId));
            return orderResponse;
        })
        .then(orderResponse => {
            return { 
                orderedProducts : orderResponse.map(order =>({"productId": order.product.productId})),
                message : "Order Placed Successfully"}
            }
        );
}

orderService.getOrdersByCustomerId = (customerId) => {
    return orderModel.getOrdersByCustomerId(customerId);
}

module.exports = orderService;
