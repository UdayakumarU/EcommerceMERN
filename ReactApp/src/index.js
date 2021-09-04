import { ReactDOM, React, BrowserRouter, Provider, PersistGate, ScrollToTop } from "./library";
import {store, persistor} from "./redux/store";
import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "./css/theme.css";

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <ScrollToTop/>
      <PersistGate persistor = {persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
