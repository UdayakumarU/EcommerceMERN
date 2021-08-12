import React, { Component } from "react";
import { connect } from "react-redux";

import Banner from "../core-components/banner";
import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import ProductSlider from "../components/product/productSlider";
import * as api from "../api/api.js";

import { addHomeProducts } from "../redux/product/product.action";
import { getHomeProducts } from "../redux/product/product.selector";
import { getProductsByType } from "../utils/util";

const caroselitems = [
    {imageUrl:"./banners/banner1.jpg", altName:"First slide"},
    {imageUrl:"./banners/banner2.jpg", altName:"Second slide"},
    {imageUrl:"./banners/banner3.jpg", altName:"Third slide"},
];

const mapDispatchToProps = dispatch =>({
    addHomeProducts : (products) => dispatch(addHomeProducts(products))
});

const mapStateToProps = (state) => {
    const products = getHomeProducts(state);
    return {
        trending : products,
        fashions : getProductsByType(products, "Fashion", 'category'),
        electronics : getProductsByType(products, "Electronics", 'category')
    };
}

class HomePage extends Component {
    componentDidMount() {
        api.getProducts().then( response => {
            this.props.addHomeProducts(response);
        })
    }

    render(){
        const {trending,fashions,electronics} = this.props;
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <div className="_light_bg">
                    <Banner items={caroselitems}/>
                    <ProductSlider products = {trending} title="Trending Offers"/>
                    <ProductSlider products = {fashions} title="Fashions" link="/fashion"/>
                    <ProductSlider products = {electronics} title="Electronics" link="/electronics"/>
                    <Footer/>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);