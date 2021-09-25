import { React, Component, connect } from "../../library";

import OrderOverview from "../../components/orders/orderOverview";

import { getCustomerOrders } from "../../redux/customer/customer.selector";
import { mapProductsInOrders, numberToPrice, getCurrentStatus, getCurrentStatusDate, sortByCreatedAt } from "../../utils/util";

const mapStatetoProps = () => {
    return {
        orders : sortByCreatedAt(mapProductsInOrders(getCustomerOrders()))
    } 
}

class OrdersList extends Component{
    render(){
        return this.props.orders.map(order => {
            const {product} = order;
            return(
                <OrderOverview
                    key = {order.orderId}
                    orderId= {order.orderId}
                    productId = {product.productId}
                    productName = {product.productName}
                    thumnail = {product.productImage}
                    sellerId = {product.sellerId}
                    price = {numberToPrice(order.orderPrice)}
                    status = {getCurrentStatus(order.statusTrack)}
                    orderedDate = {getCurrentStatusDate(order.statusTrack)}
                />
            )
        })
    }
}

export default connect(mapStatetoProps)(OrdersList);