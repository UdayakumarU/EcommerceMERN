import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tile } from  '../../library';
import ProductOverview from "../product/productOverview";

class ProductSlider extends Component{
    render(){
        const {products, title, link} = this.props;
        return <Tile className="m-2 mt-4">
            <div className="d-flex mb-2">
                <div className="flex-grow-1"><h5>{title}</h5></div>
                {link && <Link to={link}> <button className="btn btn-dark">VIEW ALL</button> </Link>}
            </div>
            <div className = "row">
                { products.map( (product) => <ProductOverview product={product} key={product.productId}/>) }
            </div>
        </Tile>
    }
}

export default ProductSlider;
