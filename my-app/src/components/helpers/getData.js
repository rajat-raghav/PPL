import { SERVER_URL,ROUTES } from './Config';
import axios from 'axios';
import store from '../../redux/store';
import { categories } from '../../redux/actions/categoriesAction';
import { error } from '../../redux/actions/errorAction';
import { like_post } from '../../redux/actions/allpostActions';



export function getData (route, data = '') {
  return axios.post(SERVER_URL + route, data);
}

export function defaultCategory() {
  // axios
  //   .post(SERVER.SERVER_URL + SERVER.ROUTES.DEFAULT_CATEGORY)
  getData(ROUTES.DEFAULT_CATEGORY)
    .then(response => {
      //console.log("Default Category Response -----------", response);
      //var c_status = response.data.status;
      const categoriesData = response.data.result;
      store.dispatch(categories(categoriesData));
      //this.setState({ categories });
      //console.log("categories----", this.state.categoryarr);
      //alert(c_status);
    })
    .catch(err => {
      console.log('defaultcategory()',err);
      store.dispatch(error(true, err.message));
    });
  //   this.setState({count:false})
}

export function likepost (id) {
  const data = {
    postid: id,
    userid: localStorage.getItem('userID')
  };
  //console.log('likepost()---', data);
  // axios
  //   .post(SERVER.SERVER_URL + SERVER.ROUTES.LIKE, data)
  getData(ROUTES.LIKE, data)
    .then(response => {
      const contentcopy = response.data.result;
      store.dispatch(like_post(contentcopy));
    })
    .catch(err => {
      console.log('getdata()',err);
      store.dispatch(error(true, err.message));
    });
}
