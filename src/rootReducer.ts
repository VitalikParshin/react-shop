import client from './graphqlClient';
import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import layout from "./modules/layout/reducer";

const rootReducers = combineReducers({
  layout,
  apollo: client.reducer(),
  router: routerReducer,
});

export default rootReducers;

