import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { Loader, Notifier } from "./library";
import HomePage from "./pages/homePage";
import LoginSignupPage from "./pages/loginSignupPage";
import ProductPage from "./pages/productPage";
import DirectoryPage from "./pages/directoryPage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkoutPage";

import { getLoaderStatus, getErrorMessages, getSuccessMessages } from "./redux/misc/misc.selector";
import APP_CONST from "./APP_CONST";

const mapStateToProps = (state) =>({
  loaderOn : getLoaderStatus(state),
  errors : getErrorMessages(state),
  success : getSuccessMessages(state),
});

class App extends React.Component {
  render() {
    const {errors, success, loaderOn} = this.props;
    return (
      <div>
          { errors.length > 0 && <Notifier messageType={APP_CONST.FAILURE} messages={errors}/>}
          { success.length > 0 && <Notifier messageType={APP_CONST.SUCCESS} messages={success}/>}
          { loaderOn && <Loader/> }
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user" component={LoginSignupPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/product/:productId" component={ProductPage} />
            <Route path="/:category/:subCategory" component={DirectoryPage} />
            <Route path="/:category" component={DirectoryPage} />
          </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
