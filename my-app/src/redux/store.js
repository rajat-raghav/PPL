import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
//import { composeWithDevTools } from 'redux-devtools-extension';

import mySaga from './saga'
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

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export default store;
