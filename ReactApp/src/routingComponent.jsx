import React, { Component } from 'react';
import ProductPage from "./product/productPage";
import ViewProduct from "./product/viewProduct";
import { Route } from 'react-router-dom';

class RoutingComponent extends Component {
    render() {
        return (
            <div >
                <Route exact path="/" component={ProductPage} />
                <Route exact path="/viewproduct/:productId" component={ViewProduct} />
            </div>);
    }
}

export default RoutingComponent;