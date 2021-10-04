import { React, Component, connect, Tile } from "../library";

import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import OrderedProduct from "../components/orders/orderedProduct";
import OrderedAddress from "../components/orders/orderedAddress";
import OrderTracker from "../components/orders/orderTracker";

import { getCustomerOrders } from "../redux/customer/customer.selector";
import { mapProductsInOrders, numberToPrice } from "../utils/util";

const mapStateToProps = (state, props) =>{
    const [ order ] = mapProductsInOrders([getCustomerOrders().find(order=> order.orderId === props.match.params.orderId)]);
    return { order };
};

class OrderDetailsPage extends Component{
    render(){
        const { order } = this.props;
        const { product } = order;
        return(
            <React.Fragment>
                <Header/>
                <Directory/>
                <Tile className="container my-3">
                    <div className="row">
                        <div className="col-md-4">
                            <OrderedAddress address={order.deliveryAddress}/>
                        </div>
                    </div>
                </Tile>
                <Tile className="container my-3">
                    <div className="row">
                        <div className="col-md-4">
                            <OrderedProduct
                                productId={product.productId}
                                productName={product.productName}
                                thumnail={product.productImage}
                                sellerId={product.sellerId}
                                price={numberToPrice(order.orderPrice)}
                            />
                        </div>
                        <div className="col-md-6">
                            <OrderTracker statusTrack = {order.statusTrack}/>
                        </div>
                    </div>
                </Tile>
            </React.Fragment>)
    }
}

export default connect(mapStateToProps)(OrderDetailsPage);