import { combineReducers } from 'redux';

import posts from './posts';
import currentid from './currentpost'
import auth from './auth'
export const reducers = combineReducers({ posts,currentid,auth });