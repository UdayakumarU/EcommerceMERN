import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Products extends Component {
    getProductCards(){
        return (
                <div className="row">
                {
                this.props.products.map( (product,key) =>( 
                    <div key={key} className="col-md-4 col-sm-6 col-lg-3">
                    <div className="card product-card" >
                        <Link to = {'/viewProduct/'+ product.productId}>
                            <div className="card-body">
                                <img
                                    src={product.productImage}
                                    className="card-img-top"
                                    alt={product.productName}
                                />
                            </div>
                        </Link>
                        <div className="card-footer blue-gradient">
                            <h5>{product.productName}</h5>
                            <h6>{product.productActualPrice}</h6>
                            <h6>{product.discount}</h6>
                            <button className="btn btn-outline-light">Buy now</button>
                            <button className="btn btn-outline-light" style={{"float":"right"}}>Add to cart</button>
                        </div>
                    </div>
                    </div>
                    ))
                } 
            </div>
        );
    }

    render() { 
        return ( 
            this.props.products && 
                <div className = "container"> 
                    {this.getProductCards()}
                </div>
                
         );
    }
}
 
export default Products;

