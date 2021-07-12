import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { Loader, Error } from "./library";
import HomePage from "./pages/homePage";
import LoginSignupPage from "./pages/loginSignupPage";
import ProductPage from "./pages/productPage";
import CategoryPage from "./pages/categoryPage";
import CartPage from "./pages/cartPage";


import { getLoaderStatus, getErrorMessages } from "./redux/misc/misc.selector";

const mapStateToProps = (state) =>({
  loaderOn : getLoaderStatus(state),
  errors : getErrorMessages(state)
});

class App extends React.Component {
  render() {
    const {errors, loaderOn} = this.props;
    return (
      <div>
          { errors.length > 0 && <Error messages={errors}/>}
          { loaderOn && <Loader/> }
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
