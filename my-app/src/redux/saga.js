import { call, put } from 'redux-saga/effects';
import { all } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects';
import store from './store';
import { categories } from './actions/categoriesAction';
import { error } from './actions/errorAction';
import { ROUTES } from '../Config';
import { single_post } from './actions/allpostActions';
import { comments } from './actions/commentsAction';
import { SERVER_URL } from '../Config';
import axios from 'axios';
import { all_post } from './actions/allpostActions';
import { like_post } from './actions/allpostActions';

function* watchFetchData() {
  //console.log('--inside fetch ategories in saga');
  yield takeEvery('FetchCategories', defaultCategory);
  yield takeEvery('singlePostData', singlePost)
  yield takeEvery('previousComments', previousComments)
  yield takeEvery('allPosts', allPosts)
  yield takeEvery('likePost', likepost)
}


function* defaultCategory() {
  try {
    const response = yield call(serverCall, ROUTES.DEFAULT_CATEGORY)
    const categoriesData = response.data.result;
    store.dispatch(categories(categoriesData));
  }
  catch (err) {
    console.log('defaultcategory()', err);
    store.dispatch(error(true, err.message));
  };
}

function* singlePost({ id }) {
  try {
    const data = { id: id }
    const response = yield call(serverCall, ROUTES.SINGLE_POST, data)
    const singlePostData = response.data;
    store.dispatch(single_post(singlePostData));
  }
  catch (err) {
    store.dispatch(error(true, err.message));
  };
};

function* previousComments({ id, commentsSkipCount, commentsLimitCount }) {
  try {
    const data = {
      id: id,
      commentsSkipCount: commentsSkipCount,
      commentsLimitCount: commentsLimitCount
    };
    const response = yield call(serverCall, ROUTES.DEFAULT_COMMENT, data);
    let commentsData = response.data.result;
    store.dispatch(comments(commentsData, commentsSkipCount));
  }
  catch (err) {
    console.log("previous Comments")
    store.dispatch(error(true, err.message));
  };
};


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
    const response = yield call(serverCall, ROUTES.ALL_POST, data)
    const content = response.data;
    store.dispatch(
      all_post(skipcount, content, category, postsUserID, hasMoreItems)
    );
  }
  catch (err) {
    console.log("all post()", err)
    store.dispatch(error(true, err.message));
  };
}

function* likepost({ id }) {
  try {
    const data = {
      postid: id,
      userid: localStorage.getItem('userID')
    };
    const response = yield call(serverCall, ROUTES.LIKE, data)
    const contentcopy = response.data.result;
    store.dispatch(like_post(contentcopy));
  }
  catch (err) {
    console.log('likepost', err);
    store.dispatch(error(true, err.message));
  };
}

function serverCall(route, data = '') {
  return axios.post(SERVER_URL + route, data);
}
// function* fetchData(action) {
//   try {
//     const data = yield call(Api.fetchUser, action.payload.url);
//     yield put({ type: 'FETCH_SUCCEEDED', data });
//   } catch (error) {
//     yield put({ type: 'FETCH_FAILED', error });
//   }
// }

export default function* rootSaga() {
  yield all([
    watchFetchData()
  ]);
}