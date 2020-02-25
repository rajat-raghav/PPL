import { call, takeEvery } from 'redux-saga/effects';

import store from './store';
import api from '../helpers/api';
import { ROUTES } from '../Config';
import { categories } from './actions/categoriesAction';
import { error } from './actions/errorAction';
import { comments } from './actions/commentsAction';
import { all_post, like_post, single_post } from './actions/allpostActions';

function* defaultCategory() {
  try {
    const response = yield call(api, ROUTES.DEFAULT_CATEGORY);
    const categoriesData = response.data.result;
    store.dispatch(categories(categoriesData));
  }
  catch (err) {
    console.log('defaultcategory()', err);
    store.dispatch(error(true, err.message));
  }
}

function* singlePost({ id }) {
  try {
    const data = { id: id };
    const response = yield call(api, ROUTES.SINGLE_POST, data);
    const singlePostData = response.data;
    store.dispatch(single_post(singlePostData));
  }
  catch (err) {
    store.dispatch(error(true, err.message));
  }
}

function* previousComments({ id, commentsSkipCount, commentsLimitCount }) {
  try {
    const data = {
      id: id,
      commentsSkipCount: commentsSkipCount,
      commentsLimitCount: commentsLimitCount
    };
    const response = yield call(api, ROUTES.DEFAULT_COMMENT, data);
    let commentsData = response.data.result;
    store.dispatch(comments(commentsData, commentsSkipCount));
  }
  catch (err) {
    console.log('previous Comments');
    store.dispatch(error(true, err.message));
  }
}


function* allPosts({
  skipcount,
  postsperpage,
  category = '',
  postsUserID = '',
  hasMoreItems = true
}) {
  try {
    const data = {
      skipcount: skipcount,
      category: category,
      postsperpage: postsperpage,
      postsUserID: postsUserID
    };
    const response = yield call(api, ROUTES.ALL_POST, data);
    const content = response.data;
    store.dispatch(
      all_post(skipcount, content, category, postsUserID, hasMoreItems)
    );
  }
  catch (err) {
    console.log('all post()', err);
    store.dispatch(error(true, err.message));
  }
}

function* likepost({ id }) {
  try {
    const data = {
      postid: id,
      userid: localStorage.getItem('userID')
    };
    const response = yield call(api, ROUTES.LIKE, data);
    const contentcopy = response.data.result;
    store.dispatch(like_post(contentcopy));
  }
  catch (err) {
    console.log('likepost', err);
    store.dispatch(error(true, err.message));
  }
}

export default function* rootSaga() {
  yield takeEvery('fetchCategories', defaultCategory);
  yield takeEvery('fetchSinglePostData', singlePost);
  yield takeEvery('fetchPreviousComments', previousComments);
  yield takeEvery('fetchAllPosts', allPosts);
  yield takeEvery('fetchLikedPost', likepost);
}