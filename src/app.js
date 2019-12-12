import React, { Component } from "react";
import Card from "./card";
import axios from "axios";

class CartCard extends Component {
  constructor() {
    super();
    this.state = {
      products: ""
    };
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts = () => {
    axios
      .get("./data.json")
      .then(response => {
        let data = response.data;
        this.setState({
          products: data.map((product, key) => (
            <Card key={key} product={product} />
          ))
        });
        console.log(this.state.products);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark text-dark blue-gradient">
          <span className="navbar-brand">Brand Logo</span>
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
              
              {this.state.products}
          </div>
        </div>

        <footer
          id="sticky-footer"
          className="py-4 bg-dark text-white-50"
          style={{ marginTop: "130px" }}
        >
          <div className="container text-center">
            <small>Copyright &copy; UdayShop</small>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default CartCard;
