import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import allpostReducer from './reducers/allpostReducer';
import commentsReducer from './reducers/commentsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import formsReducer from './reducers/formsReducer';
import userReducer from './reducers/userReducer';
import errorReduser from './reducers/errorReducer';

const rootReducer = combineReducers({
  posts: allpostReducer,
  comments: commentsReducer,
  categories: categoriesReducer,
  forms: formsReducer,
  user: userReducer,
  error: errorReduser
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
