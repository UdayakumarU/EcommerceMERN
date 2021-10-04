import { React, Route, Switch, connect, Loader, Notifier } from "./library";

import HomePage from "./pages/homePage";
import LoginSignupPage from "./pages/loginSignupPage";
import ProductPage from "./pages/productPage";
import DirectoryPage from "./pages/directoryPage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkoutPage";
import OrdersPage from "./pages/ordersPage";
import OrderDetailsPage from "./pages/orderDetailsPage";
import Footer from "./components/misc/footer";

import { getLoaderStatus, getErrorMessages, getSuccessMessages, getFooterDisplay } from "./redux/misc/misc.selector";
import APP_CONST from "./APP_CONST";

const mapStateToProps = () => ({
  loaderOn: getLoaderStatus(),
  errors: getErrorMessages(),
  success: getSuccessMessages(),
  showFooter: getFooterDisplay()
});

class App extends React.Component {
  render() {
    const {errors, success, loaderOn, showFooter} = this.props;
    return (
      <div className = "_main_container">
          { errors.length > 0 && <Notifier messageType={APP_CONST.FAILURE} messages={errors}/>}
          { success.length > 0 && <Notifier messageType={APP_CONST.SUCCESS} messages={success}/>}
          { loaderOn && <Loader/> }
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user" component={LoginSignupPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/order-details/:orderId" component={OrderDetailsPage} />
            <Route path="/product/:productId" component={ProductPage} />
            <Route path="/:category/:subCategory" component={DirectoryPage} />
            <Route path="/:category" component={DirectoryPage} />
          </Switch>
          {showFooter && <Footer/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
