import React, { Component } from "react";
import Banner from "../core-components/banner";

import Footer from "../section/footer";
import Header from "../section/header";
import Directory from "../section/directory";
import Products from "../section/products";

const caroselitems = [
    {imageUrl:"./banners/banner1.jpg", altName:"First slide"},
    {imageUrl:"./banners/banner2.jpg", altName:"Second slide"},
    {imageUrl:"./banners/banner3.jpg", altName:"Third slide"},
];

class HomePage extends Component {
    render(){
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <Banner items={caroselitems}/>
                <Products/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default HomePage