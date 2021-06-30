import React, { Component } from "react";
import { connect } from "react-redux";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import ProductList from "../components/misc/productList";
import {getProductsByCategory} from "../utils/util";

import { getHomeProducts } from "../redux/product/product.selector";

const mapStateToProps = (state, props) =>{
    const products = getHomeProducts(state);
    const productsByCategory = getProductsByCategory(products, props.match.params.category);
    return { productsByCategory };
};

class CategoryPage extends Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <ProductList products = {this.props.productsByCategory}/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(CategoryPage);