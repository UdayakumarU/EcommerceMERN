import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.css";
import "./css/theme.css";

import App from "./App";
import {store, persistor} from "./redux/store";

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <PersistGate persistor = {persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
