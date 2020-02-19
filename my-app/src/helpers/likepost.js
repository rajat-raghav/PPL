import { like_post } from '../redux/actions/allpostActions';
import { error } from '../redux/actions/errorAction';
import store from '../redux/store';
import { ROUTES } from '../Config';
import api from './api'


export default function likepost(id) {
  const data = {
    postid: id,
    userid: localStorage.getItem('userID')
  };
  api(ROUTES.LIKE, data)
    .then(response => {
      const contentcopy = response.data.result;
      store.dispatch(like_post(contentcopy));
    })
    .catch(err => {
      console.log('likepost', err);
      store.dispatch(error(true, err.message));
    });
}
