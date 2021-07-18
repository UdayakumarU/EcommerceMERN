import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tile } from  '../../library';

class ProductOverview extends Component{
    render(){
        const {product} = this.props;
        return <Tile
            className="col-md-3"
            footerClass="_primary_bg"
            footer={
                <React.Fragment>
                    <h5 className="_cut_text">{product.productName}</h5>
                    <h6>{product.productActualPrice}</h6>
                    <h6>{product.discount}</h6>
                    <button className="btn btn-outline-dark">Buy now</button>
                    <button className="btn btn-outline-dark" style={{ "float": "right" }}>Add to cart</button>
                </React.Fragment>
            }
        >
            <Link to={'/product/' + product.productId}>
                <img
                    src={product.productImages[0]}
                    className="card-img-top"
                    alt={product.productName}
                />
            </Link>
        </Tile>
    }
}

export default ProductOverview;
