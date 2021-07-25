import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tile } from "../../library";
import { getCartItems } from "../../redux/cart/cart.selector";
import { removeItemFromCart } from "../../redux/cart/cart.action";

import {calculatePriceAfterDiscount} from "../../utils/util";

const mapStateToProps = (state) => ({
    cartItems: getCartItems(state)
});

const mapDispatchToProps = (dispatch) => ({
    removeItemFromCart : (productId) => dispatch(removeItemFromCart(productId))
});

class CartItemList extends Component {
    render() {
        const { cartItems, removeItemFromCart } = this.props;
        return (
            <Tile className ="container mt-4"> 
                <h5>{`My Cart (${cartItems.length})`}</h5>
                {cartItems.map(item => {
                    const {brand, productName, productActualPrice, discount, productId, productImages} = item;
                    return(<div key={productId}>
                            <hr/>
                            <div className="mt-2 row">
                                <div className ="col-md-2">
                                    <img className="img-thumbnail" src={productImages[0]} alt={productName} />
                                </div>
                                <div className ="col-md-6">
                                    <p className="blockquote _cut_text">{productName}</p>
                                    <h6 className="text-muted">{brand}</h6>
                                    <div> 
                                        <strong className="mr-2">₹{calculatePriceAfterDiscount(productActualPrice, discount)}</strong>
                                        <s className="mr-2">{productActualPrice}</s>
                                        <small className="text-success"><strong>{discount}% off</strong></small>  
                                    </div>
                                </div>
                                <div className ="col-md-3">
                                    <p><small>Delivery in 2 days, Mon | ₹40 </small></p>
                                </div>
                                <div className ="col-md-1">
                                    <div className="_absolute_top_right">
                                        <span className="btn text-danger" onClick={() => removeItemFromCart(productId)}>
                                            <span className="material-icons">delete</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </Tile>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemList);