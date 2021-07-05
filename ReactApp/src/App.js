import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/homePage";
import LoginSignupPage from "./pages/loginSignupPage";
import ProductPage from "./pages/productPage";
import CategoryPage from "./pages/categoryPage";
import CartPage from "./pages/cartPage";

class App extends React.Component {
  render() {
    return (
      <div>
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

export default App;
