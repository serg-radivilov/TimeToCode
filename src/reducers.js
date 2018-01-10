import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import appData from './Moduls/redusers/appData.js';

export default combineReducers({
  routing: routerReducer,
  appData
})