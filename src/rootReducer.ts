import client from './graphqlClient';
import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";


const rootReducers = combineReducers({
  apollo: client.reducer(),
  router: routerReducer,
});

export default rootReducers;

