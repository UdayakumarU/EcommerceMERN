import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { Tile } from "../library";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import EmptyCart from "../components/cart/emptyCart";
import PriceDetail from "../components/priceDetail";
import ItemList from "../components/itemList";

import { getCartItems } from '../redux/cart/cart.selector';
import { removeItemFromCart } from "../redux/cart/cart.action";

const mapStateToProps = (state) => ({ 
    cartItems : getCartItems(state)
});

const mapDispatchToProps = (dispatch) => ({
    removeItemFromCart : (productId) => dispatch(removeItemFromCart(productId))
});

class CartPage extends Component {
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
                                    <h5>{`My Cart (${cartItems.length})`}</h5><hr/>
                                    <ItemList items={cartItems} handleRemoveItem ={removeItemFromCart}/>
                                </Tile>
                                <Tile>
                                    <div className= "col-md-3 offset-md-9">
                                        <Link to="./checkout" 
                                            className="btn btn-block btn-lg btn-dark" 
                                            onClick={this.handlePlaceOrder}> 
                                                <small>PLACE ORDER</small>  
                                        </Link>
                                    </div>
                                </Tile>
                            </div>
                            <div className="col-md-4"> 
                                <PriceDetail items={cartItems}/> 
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