import React, { Component } from "react";
import { connect } from 'react-redux';

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import EmptyCart from "../components/cart/emptyCart";
import CartItemList from "../components/cart/cartItemList";
import CartPriceDetail from "../components/cart/cartPriceDetail";

import { getCartItems } from '../redux/cart/cart.selector';

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
                        <div className="row">
                            <div className="col-md-8"> <CartItemList/> </div>
                            <div className="col-md-4"> <CartPriceDetail/> </div>
                        </div>
                    </div>
                ) }
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(CartPage);