import { React, Component, connect } from "../../library";

import OrderOverview from "../../components/orders/orderOverview";

import { getCustomerOrders } from "../../redux/customer/customer.selector";
import { mapProductsInOrders, numberToPrice } from "../../utils/util";

const mapStatetoProps = () => {
    return {
        orders : mapProductsInOrders(getCustomerOrders())
    } 
}

class OrdersList extends Component{
    render(){
        return this.props.orders.map(order => {
            const {product} = order;
            return(
                <OrderOverview
                    key = {order.orderId}
                    productId = {product.productId}
                    productName = {product.productName}
                    thumnail = {product.productImage}
                    sellerId = {product.sellerId}
                    price = {numberToPrice(order.orderPrice)}
                    status = {order.status}
                    orderedDate = {order.orderDate}
                />
            )
        })
    }
}

export default connect(mapStatetoProps)(OrdersList);