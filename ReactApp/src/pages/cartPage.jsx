import React, { Component } from "react";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";

class CartPage extends Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default CartPage;