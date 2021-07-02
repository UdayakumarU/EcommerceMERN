import React, { Component } from "react";
import { connect } from "react-redux";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import Breadcrum from "../components/misc/breadcrum";
import ProductDetails from "../components/product/productDetails";
import { getProductById, getBreadcrumSections } from "../utils/util";

import { setCurrentProduct } from "../redux/product/product.action";
import { getHomeProducts } from "../redux/product/product.selector";

const mapStateToProps = (state, props) => {
    const availableProducts = getHomeProducts(state);
    const selectedProduct = getProductById(availableProducts, props.match.params.productId);
    const breadcrumSections = getBreadcrumSections(selectedProduct);
    return { 
        selectedProduct, 
        breadcrumSections 
    };
};

const mapDispatchToProps = (dispatch) =>({
    setCurrentProduct : (selectedProduct) => dispatch(setCurrentProduct(selectedProduct))
});

class ProductPage extends Component {
    componentDidMount(){
        const { setCurrentProduct, selectedProduct } = this.props;
        setCurrentProduct(selectedProduct); // need to persist this else lose it on page refresh
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <Breadcrum sections={this.props.breadcrumSections}/>
                <ProductDetails/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);