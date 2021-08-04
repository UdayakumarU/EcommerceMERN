import React, { Component } from 'react';

import ProductOverview from "./productOverview";

class ProductList extends Component{
    render(){
        const {products} = this.props;
        return(
            <div className = "row">
                { products.map( (product) => <ProductOverview product={product} key={product.productId}/>) }
            </div>
        )
    }
}

export default ProductList;
