import { React, Component, connect, Tile } from '../library';
import { numberToPrice } from "../utils/util";
import { calculateCartActualPrice, calculateCartDiscountPrice } from "../utils/cartUtils";

const mapStateToProps = (state, props) => {
    const actualTotalPrice = numberToPrice(calculateCartActualPrice(props.items));
    const discountPrice = numberToPrice(calculateCartDiscountPrice(props.items));
    return{
        actualTotalPrice ,
        discountPrice,
        totalItems: props.items.length,
        totalPrice: numberToPrice(actualTotalPrice-discountPrice)
    }
}

class PriceDetail extends Component {
    render() {
        const {totalItems, actualTotalPrice, discountPrice, totalPrice} = this.props;
        return (
            <div>
                <Tile>
                    <h6 className="text-muted">PRICE DETAILS</h6>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <p>Price ({`${totalItems} item${totalItems>1? 's': ''}`})</p> 
                        <p>₹{actualTotalPrice}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Discount</p> 
                        <p className="text-success">- ₹{discountPrice} </p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Delivery Charges</p> 
                        <p>₹40 </p>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <h5>Total Amount</h5> 
                        <h5>₹{totalPrice} </h5>
                    </div>
                    <hr/>
                    <p className="text-success">You will save ₹{discountPrice} on this order</p> 
                </Tile>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PriceDetail)