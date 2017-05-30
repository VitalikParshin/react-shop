import client from './graphqlClient';
import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import layout from "./modules/layout/reducer";
import product from "./modules/product/reducer";
import catalog from "./modules/catalog/reducer";

const rootReducers = combineReducers({
  layout,
  catalog,
  product,
  apollo: client.reducer(),
  router: routerReducer,
});

export default rootReducers;

