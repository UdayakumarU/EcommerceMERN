import React, { Component } from 'react';
import Banner from './../banner';
import * as APICalls from './../api/api';
import Products from './../product/products';
import Error from './../error';
import Spinner from '../spinner';

class ProductPage extends Component {
    constructor() {
        super();
        this.state = {
            products: "",
            errorMessage: "",
            isProductPresent:false
        }
    }

    componentDidMount() {
        APICalls.getProducts().then(products => {
            this.setState({isProductPresent : true})
            this.setState({ products });
            
        }).catch(errorMessage => {
            this.setState({ errorMessage });
        })
    }
    render() {
        return (
            <React.Fragment>
                <Banner />       
                { this.state.isProductPresent? <Products products={this.state.products} />: 
                <div style={{marginBottom:"15rem", marginTop:"5rem"}}><Spinner/></div> }
                { this.state.errorMessage && <Error message={this.state.errorMessage} />}
            </React.Fragment>
        );
    }
}

export default ProductPage;