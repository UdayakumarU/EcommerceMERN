import React, { Component } from "react";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import EmptyCart from "../components/cart/emptyCart";

class CartPage extends Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
                <EmptyCart/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default CartPage;