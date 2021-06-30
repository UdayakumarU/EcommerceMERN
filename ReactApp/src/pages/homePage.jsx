import React, { Component } from "react";
import { connect } from "react-redux";

import Banner from "../core-components/banner";
import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import ProductList from "../components/misc/productList";
import * as api from "../api/api.js";

import { addHomeProducts } from "../redux/product/product.action";
import { getHomeProducts } from "../redux/product/product.selector";

const caroselitems = [
    {imageUrl:"./banners/banner1.jpg", altName:"First slide"},
    {imageUrl:"./banners/banner2.jpg", altName:"Second slide"},
    {imageUrl:"./banners/banner3.jpg", altName:"Third slide"},
];

const mapDispatchToProps = dispatch =>({
    addHomeProducts : (products) => dispatch(addHomeProducts(products))
});

const mapStateToProps = (state) => ({
    products : getHomeProducts(state)
});

class HomePage extends Component {
    componentDidMount() {
        api.getProducts().then( response => {
            this.props.addHomeProducts(response);
        })
    }

    render(){
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <Banner items={caroselitems}/>
                <ProductList products = {this.props.products}/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);