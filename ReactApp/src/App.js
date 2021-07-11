import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/homePage";
import LoginSignupPage from "./pages/loginSignupPage";
import ProductPage from "./pages/productPage";
import CategoryPage from "./pages/categoryPage";
import CartPage from "./pages/cartPage";
import Loader from "./core-components/loader";

import { getLoaderStatus } from "./redux/loader/loader.selector";

const mapStateToProps = (state) =>({
  loaderOn : getLoaderStatus(state)
});

class App extends React.Component {
  render() {
    return (
      <div>
          { this.props.loaderOn && <Loader/> }
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user" component={LoginSignupPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/product/:productId" component={ProductPage} />
            <Route path="/category/:category" component={CategoryPage} />
          </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
