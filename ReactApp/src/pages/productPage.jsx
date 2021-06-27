import React, { Component } from "react";
import { connect } from "react-redux";

import Footer from "../section/footer";
import Header from "../section/header";
import Directory from "../section/directory";
import ProductDetails from "../components/productDetails";
import * as api from "../api/api.js";

import { setCurrentProduct } from "../redux/product/product.action";

const mapDispatchToProps = dispatch =>({
    setCurrentProduct : (selectedProduct) => dispatch(setCurrentProduct(selectedProduct))
});

class ProductPage extends Component {
    componentDidMount(){
        api.getProductById(this.props.match.params.productId).then( response => {
            this.props.setCurrentProduct(response);
        });
    }
    render(){
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <ProductDetails/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(null, mapDispatchToProps)(ProductPage);