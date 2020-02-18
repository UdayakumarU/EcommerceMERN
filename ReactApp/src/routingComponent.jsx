import React, { Component } from 'react';
import ProductPage from "./product/productPage";
import Login from "./login/login";
import Signup from "./login/signup";
import ViewProduct from "./product/viewProduct";
import { Route } from 'react-router-dom';

class RoutingComponent extends Component {
    render() {
        return (
            <div >
                <Route exact path="/" component={ProductPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/viewproduct/:productId" component={ViewProduct} />
            </div>);
    }
}

export default RoutingComponent;