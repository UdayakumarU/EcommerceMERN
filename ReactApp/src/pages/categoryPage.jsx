import React, { Component } from "react";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import ProductList from "../components/misc/productList";

class HomePage extends Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <ProductList/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default HomePage