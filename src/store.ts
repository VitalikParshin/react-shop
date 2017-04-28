import { createStore, combineReducers, compose, applyMiddleware } from "redux";
// import logger from "redux-logger";
import thunk from "redux-thunk";
import {
  routerReducer,
  routerMiddleware,
} from "react-router-redux";
import rootReducer from "./rootReducer";
import client from "./graphqlClient";
import history from './history'

const initialState = {};

// const isDebug = process.env.NODE_ENV === 'development';
const isDebug = true;

const middlewares = [
  thunk,
  routerMiddleware(history),
  client.middleware(),
];
// if (isDebug) {
//   middlewares.push(logger);
// }

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

export default store;
