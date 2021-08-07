import React, { Component } from "react";
import { connect } from 'react-redux';

import { Tile } from "../library";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import EmptyCart from "../components/cart/emptyCart";
import CartItemList from "../components/cart/cartItemList";
import CartPriceDetail from "../components/cart/cartPriceDetail";

import { getCartItems } from '../redux/cart/cart.selector';
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({ 
    cartItems : getCartItems(state)
});

class CartPage extends Component {
    render(){
        const { cartItems } = this.props;
        return (
            <React.Fragment>
                <Header hideCart={true}/>
                { (cartItems.length === 0)? <EmptyCart/>:(
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col-md-8"> 
                                <CartItemList/> 
                                <Tile>
                                    <div className= "col-md-3 offset-md-9">
                                        <Link to="./checkout"className="btn btn-block btn-lg btn-dark"> 
                                            <small>PLACE ORDER</small>  
                                        </Link>
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

export default connect(mapStateToProps)(CartPage);