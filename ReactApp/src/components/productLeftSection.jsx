import React, { Component } from 'react';

export default class ProductLeftSection extends Component {
    render() {
        const { productImages, productName } = this.props.product;
        return (
            <div>
              <img className="img-thumbnail" src={productImages[0]} alt={productName} />
              <br/><br/>
              <div className="row">
                <div className="col-md-7">
                  <button className="btn btn-outline-dark btn-md btn-block">
                    <i className="material-icons">shopping_cart</i>
                    <span className="align-straight">Add to Cart</span> </button>
                </div>
                <div className="col-md-5">
                  <button className="btn btn-outline-dark btn-md btn-block">
                    <i className="material-icons">play_arrow</i>
                    <span className="align-straight">Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
        )
    }
}
