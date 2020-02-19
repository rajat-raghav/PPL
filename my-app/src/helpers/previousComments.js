import api from './api'
import { ROUTES } from '../Config';
import store from '../redux/store';
import { comments } from '../redux/actions/commentsAction';
import { error } from '../redux/actions/errorAction';

export default function previousComments(id, commentsSkipCount, commentsLimitCount) {
  const data = {
    id: id,
    commentsSkipCount: commentsSkipCount,
    commentsLimitCount: commentsLimitCount
  };
  api(ROUTES.DEFAULT_COMMENT, data)
    .then(response => {
      let commentsData = response.data.result;
      store.dispatch(comments(commentsData, commentsSkipCount));
    })
    .catch(err => {
      console.log("previous Comments")
      store.dispatch(error(true, err.message));
    });
};