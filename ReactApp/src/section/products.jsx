import React, { Component } from 'react';
import { connect } from "react-redux";

import { Tile } from  '../library';
import { addHomeProducts } from "../redux/product/product.action";
import { getHomeProducts } from "../redux/product/product.selector";
import ProductOverview from "../components/productOverview";
import * as api from "../api/api.js";

const mapDispatchToProps = dispatch =>({
    addHomeProducts : (products) => dispatch(addHomeProducts(products))
});

const mapStateToProps = (state) => ({
    products : getHomeProducts(state)
});

class Products extends Component{
    componentDidMount() {
        api.getProducts().then( response => {
            this.props.addHomeProducts(response);
        })
    }

    render(){
        const {products} = this.props;
        return <Tile>
            <div className = "row">
                { products.map( (product, index) => <ProductOverview product={product} key={index}/>) }
            </div>
        </Tile>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
