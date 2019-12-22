import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import Card from "./card";
import axios from "axios";
import Error from "./error"
// import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: "",
      error : ""
    };
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts = () => {
    axios
      .get("http://localhost:5000")
      .then(response => {
        let data = response.data;
        this.setState({
          products: data.map((product, key) => (
            <Card key={key} product={product} />
          ))
        });
      })
      .catch(error => {
      this.setState({ error :<Error message={error.message}/> });
      });
  };
  render() {
    return (  
      <React.Fragment>
        <Header/>
        <div className="container">
          <div className="row">
              {this.state.products?this.state.products:this.state.error}
          </div>
        </div>
        <Footer/>
        
      </React.Fragment>
    );
  }
}

export default Home;
