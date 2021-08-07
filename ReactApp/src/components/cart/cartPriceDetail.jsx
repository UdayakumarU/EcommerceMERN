import React, { Component } from 'react'
import { connect } from 'react-redux';

import {Tile} from '../../library';
import { getCartItems } from "../../redux/cart/cart.selector";
import {numberToPrice} from "../../utils/util";
import { calculateCartActualPrice, calculateCartDiscountPrice } from "../../utils/cartUtils";

const mapStateToProps = (state) => {
    const cartItems = getCartItems(state)
    const actualTotalPrice = numberToPrice(calculateCartActualPrice(cartItems));
    const discountPrice = numberToPrice(calculateCartDiscountPrice(cartItems));
    return{
        actualTotalPrice ,
        discountPrice,
        totalItems : cartItems.length,
        totalPrice : numberToPrice(actualTotalPrice-discountPrice)
    }
}

class CartPriceDetail extends Component {
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

export default connect(mapStateToProps)(CartPriceDetail)