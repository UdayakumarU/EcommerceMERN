import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/homePage";
import LoginSignupPage from "./pages/loginSignupPage";
import ProductPage from "./pages/productPage";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/user" component={LoginSignupPage} />
          <Route path="/product/:productId" component={ProductPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
