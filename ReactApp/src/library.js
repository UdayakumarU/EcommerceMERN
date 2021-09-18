import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Link, Route, Switch, BrowserRouter, withRouter, useRouteMatch } from "react-router-dom";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { connect, Provider } from "react-redux";
import { logger } from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import { get, set, isEmpty } from "lodash";
import axios from "axios";

import Tile from "./core-components/tile";
import Field from "./core-components/field";
import Loader from "./core-components/loader";
import Notifier from "./core-components/notifier";
import ScrollToTop from "./core-components/scrollToTop";
import DialogModal from "./core-components/dialogModal";

import {getValue, setValue, isNotEmpty} from "./utils/modelutils";

export { ReactDOM, React, Component };
export { Link, Route, Switch, BrowserRouter, withRouter, useRouteMatch };

export { createStore, applyMiddleware, combineReducers, connect, Provider, logger };
export { persistStore, persistReducer, PersistGate, storage };


export { get, set, isEmpty };
export { axios };

export { Tile, Field, Loader, Notifier, ScrollToTop, DialogModal };
export { getValue, setValue, isNotEmpty };