import React, { Component } from "react";

class CartCard extends Component {
  render() {
    return (
      <div className="Container">
        <div className="row">
          <div className="col-md-3">
          <div className="card">
        <div className="card-body">
          <img src="https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg" className="card-img-top"/>
        </div>
        <div className="card-footer">
          product Name
        </div>
      </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default CartCard;
