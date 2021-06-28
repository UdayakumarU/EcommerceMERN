import React, { Component } from "react";
import Banner from "../core-components/banner";

import Footer from "../components/misc/footer";
import Header from "../components/misc/header";
import Directory from "../components/misc/directory";
import Products from "../components/misc/products";

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