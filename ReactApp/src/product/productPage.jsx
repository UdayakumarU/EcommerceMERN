import React, { Component } from 'react';
import Banner from './../banner';
import * as APICalls from './../api/api';
import Products from './../product/products';
import Error from './../error';

class ProductPage extends Component {
    constructor() {
        super();
        this.state = {
            products: "",
            errorMessage: ""
        }
    }

    componentDidMount() {
        APICalls.getProducts().then(products => {
            this.setState({ products });
        }).catch(errorMessage => {
            this.setState({ errorMessage });
        })
    }
    render() {
        return (
            <React.Fragment>
                <Banner />
                <Products products={this.state.products} />
                {this.state.errorMessage && <Error message={this.state.errorMessage} />}
            </React.Fragment>
        );
    }
}

export default ProductPage;