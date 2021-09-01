import React, { Component } from "react";
import { connect } from 'react-redux';

import { Tile } from "../library";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import EmptyCart from "../components/cart/emptyCart";
import CartPriceDetail from "../components/cart/cartPriceDetail";
import ItemList from "../components/itemList";

import { getCartItems } from '../redux/cart/cart.selector';
import { removeItemFromCart, emptyCart } from "../redux/cart/cart.action";
import { moveItemsToCheckout } from "../redux/checkout/checkout.action";

const mapStateToProps = (state) => ({ 
    cartItems : getCartItems(state)
});

const mapDispatchToProps = (dispatch) => ({
    emptyCart: () => dispatch(emptyCart()),
    removeItemFromCart : (productId) => dispatch(removeItemFromCart(productId)),
    moveItemsToCheckout: cartItems => dispatch(moveItemsToCheckout(cartItems))
});

class CartPage extends Component {
    handlePlaceOrder = () =>{
        const { moveItemsToCheckout, emptyCart, cartItems, history } = this.props;
        moveItemsToCheckout(cartItems);
        history.push("./checkout");
        emptyCart();
    }

    render(){
        const { cartItems, removeItemFromCart } = this.props;
        return (
            <React.Fragment>
                <Header hideCart={true}/>
                { (cartItems.length === 0)? <EmptyCart/>:(
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col-md-8"> 
                                <Tile>
                                    <h5>{`My Cart (${cartItems.length})`}</h5>
                                    <hr/>
                                    <ItemList items={cartItems} handleRemoveItem ={removeItemFromCart}/>
                                </Tile>
                                <Tile>
                                    <div className= "col-md-3 offset-md-9">
                                        <button className="btn btn-block btn-lg btn-dark"> 
                                            <small>PLACE ORDER</small>  
                                        </button>
                                    </div>
                                </Tile>
                            </div>
                            <div className="col-md-4"> 
                                <CartPriceDetail/> 
                            </div>
                        </div>
                    </div>
                ) }
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);