import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";

class Home extends Component {

  render() {
    return (  
      <React.Fragment>
        <Header/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default Home;
