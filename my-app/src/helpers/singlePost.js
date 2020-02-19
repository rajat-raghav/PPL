import api from './api'
import { ROUTES } from '../Config';
import store from '../redux/store';
import { single_post } from '../redux/actions/allpostActions'
import { error } from '../redux/actions/errorAction';

export default function singlePost(id) {
  const data = { id: id }
  api(ROUTES.SINGLE_POST, data)
    .then(response => {
      const singlePostData = response.data;
      store.dispatch(single_post(singlePostData));
    })
    .catch(err => {
      store.dispatch(error(true, err.message));
    });
};