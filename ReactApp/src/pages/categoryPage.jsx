import React, { Component } from "react";
import { connect } from "react-redux";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import ProductList from "../components/misc/productList";
import Breadcrum from "../components/misc/breadcrum";

import {getProductsByCategory, getBreadcrumSections} from "../utils/util";

import { getHomeProducts } from "../redux/product/product.selector";

const mapStateToProps = (state, props) =>{
    const products = getHomeProducts(state);
    const productsByCategory = getProductsByCategory(products, props.match.params.category);
    const breadcrumSections = getBreadcrumSections([props.match.params.category]);
    return { 
        productsByCategory, 
        breadcrumSections 
    };
};

class CategoryPage extends Component {
    render(){
        const {productsByCategory, breadcrumSections} = this.props;
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <Breadcrum sections = {breadcrumSections}/> 
                <ProductList products = {productsByCategory}/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(CategoryPage);