import React from "react";
export default class Card extends React.Component {
  render() {
    return (
        
    <div className="col-md-4 col-sm-6 col-lg-3">
      <div className="card">
        <div className="card-body">
          <img
            src={this.props.product.productImage}
            className="card-img-top"
            alt={this.props.product.productName}
          />
        </div>
        <div className="card-footer blue-gradient">
          <h5>{this.props.product.productName}</h5>
          <h6>{this.props.product.productActualPrice}</h6>
          <h6>{this.props.product.discount}</h6>
          <button className="btn btn-outline-light">Buy now</button>
          <button className="btn btn-outline-light" style={{"float":"right"}}>Add to cart</button>
        </div>
      </div>
    </div>
    );
  }
}
