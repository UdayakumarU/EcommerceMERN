import React, { Component } from 'react';

import { Tile } from  '../../library';
import ProductOverview from "../product/productOverview";

class ProductList extends Component{
    render(){
        const {products} = this.props;
        return <Tile>
            <div className = "row">
                { products.map( (product) => <ProductOverview product={product} key={product.productId}/>) }
            </div>
        </Tile>
    }
}

export default ProductList;
