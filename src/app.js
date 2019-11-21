import React, { Component } from "react";

class CartCard extends Component {
  render() {
    let products = [
      {
        productId: 1001,
        productName: "Yellow Jersey",
        productActualPrice: 499,
        discount: 10,
        productImage:
          "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
      },
      {
        productId: 1001,
        productName: "Yellow Jersey",
        productActualPrice: 499,
        discount: 10,
        productImage:
          "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
      },
      {
        productId: 1001,
        productName: "Yellow Jersey",
        productActualPrice: 499,
        discount: 10,
        productImage:
          "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
      },
      {
        productId: 1001,
        productName: "Yellow Jersey",
        productActualPrice: 499,
        discount: 10,
        productImage:
          "https://www.unived.in/wp-content/uploads/2018/02/unived-athlete-front-mens-t-shirt-600x600.jpg"
      }
    ];
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark text-dark blue-gradient" >
          <a className="navbar-brand" href="#">
            Brand Logo
          </a>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-dark my-1 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
        <br />
        <br />

        <div className="container">
          <div className="row">
            {products.map(product => (
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <img
                      src={product.productImage}
                      className="card-img-top"
                      alt={product.productName}
                    />
                  </div>
                  <div className="card-footer blue-gradient">
                    <h5>{product.productName}</h5>
                    <h6>{product.productActualPrice}</h6>
                    <h6>{product.discount}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer id="sticky-footer" className="py-4 bg-dark text-white-50" style={{ marginTop : "130px"}}>
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default CartCard;
