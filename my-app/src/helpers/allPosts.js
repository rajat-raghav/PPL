import api from './api'
import { ROUTES } from '../Config';
import store from '../redux/store';
import { all_post } from '../redux/actions/allpostActions'
import { error } from '../redux/actions/errorAction';


export default function allPosts(
  skipcount,
  postsperpage,
  category = '',
  postsUserID = '',
  hasMoreItems = true
) {
  //console.log('****-----****',this.props);
  const data = {
    skipcount: skipcount,
    category: category,
    postsperpage: postsperpage,
    postsUserID: postsUserID
  };
  api(ROUTES.ALL_POST, data)
    .then(response => {
      const content = response.data;
      store.dispatch(
        all_post(skipcount, content, category, postsUserID, hasMoreItems)
      );
    })
    .catch(err => {
      console.log("all post()", err)
      store.dispatch(error(true, err.message));
    });
}

