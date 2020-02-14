import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import ContentLeft from '../timeline/ContentLeft';
import ContentRight from '../helpers/ContentRight';
import { getData , defaultCategory, likepost}  from '../helpers/getData';
import { ROUTES } from '../helpers/Config';
import { all_post } from '../../redux/actions/allpostActions';
import { loginUser } from '../../redux/actions/userActions';
import { error } from '../../redux/actions/errorAction';
import store from '../../redux/store';
import {
  postUploadForm,
  categoryUploadForm
} from '../../redux/actions/formsAction';


class Homepage extends React.Component {

  loadMore = () => {
    //console.log('********',this.props);
    const data = {
      category: this.props.category,
      postsUserID: this.props.postsUserID
    };
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.POST_COUNT, data)
    getData(ROUTES.POST_COUNT, data)
      .then(res => {
        const totalpost = res.data.result;
        console.log('loadmore', this.props.items, totalpost);
        // if (!this.props.items) {
        //   this.allPosts(0, this.props.category, this.props.postsUserID);
        // } else
        if (this.props.items < totalpost) {
          this.allPosts(
            this.props.items,
            this.props.category,
            this.props.postsUserID
          );
        } else if (this.props.items >= totalpost) {
          //this.setState({ hasMoreItems: false });
          this.allPosts(
            this.props.items,
            this.props.category,
            this.props.postsUserID,
            false
          );
        }
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  }
  
  
  allPosts = (
    skipcount,
    category = '',
    postsUserID = '',
    hasMoreItems = true
  ) => {
    //console.log('****-----****',this.props);
    const data = {
      skipcount: skipcount,
      category: category,
      postsperpage: this.props.postsperpage,
      postsUserID: postsUserID
    };
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.ALL_POST, data)
    getData(ROUTES.ALL_POST, data)
      .then(response => {
        const content = response.data;
        //console.log("all post content", content);
        store.dispatch(
          all_post(skipcount, content, category, postsUserID, hasMoreItems)
        );
      })
      .catch(error => {
        store.dispatch(error(true, error.message));
      });
  }
  

  static getDerivedStateFromError(error) {
    //return <h1>Something went wrong.</h1>;
    //alert("something went wrong");
    store.dispatch(error(true, 'Error!!!!!!!!!!!!!'));
  }
  //-----Content Right Functions--------------------------------

  categoryUploadHandler = event => {
    //console.log("cat upload()");
    event.preventDefault();
 
    const data = {
      category_name: event.target.newcategory.value
    };
    //console.log("category Upload Handler", data);
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.CATEGORY_UPLOAD, data)
    getData(ROUTES.CATEGORY_UPLOAD, data)
      .then(() => {

        store.dispatch(categoryUploadForm(!this.props.showCategoryForm));
        this.defaultCategory();
        //alert(c_status);
        //this.setState({ newcategory: "" });
        // this.removevalue();
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  };

  
  postUploadHandler = event => {
    //console.log("postUploadHandler");
    const userid = localStorage.getItem('userID');
    event.preventDefault();
    let formdata = new FormData();

    formdata.append('selectedFiles', event.target.selectedFiles.files[0]);
    //formdata.append("email", event.target.email.value);
    let categoryname = event.target.category.value;
    formdata.append('category', categoryname);
    formdata.append('userid', userid);
    formdata.append('title', event.target.title.value);
    getData(ROUTES.UPLOAD_POST, formdata)
      .then(() => {
   
        store.dispatch(postUploadForm(!this.props.showPopup));

        //alert(status);
        this.allPosts(0);
        //this.removevalue();
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  };

  //----------------------------
  componentDidMount() {
    //console.log("component Will mount--------");
    if (!localStorage.getItem('userID')) {
      this.props.history.push('/Login');
    } else {
      defaultCategory();
      store.dispatch(loginUser(localStorage.getItem('userID')));
    }
  }

  componentWillUnmount() {
    //console.log("component will unmount");
    store.dispatch(all_post(0, [], '', '', true));
  }

  render() {
    //console.log("<<---------------------render---------------------->>");
    if (this.props.hasError) {
      return (
        <div
          style={{
            padding: '16% 30%',
            color: '#f47b13',
            textAlign: 'center'
            //backgroundImage: "url(" + "/images/Errorimg.jpg" + ")"
          }}
        >
          <h1>Something went wrong.</h1>
          <h2>Error:{this.props.errorMsg}</h2>
        </div>
      );
    }

    return (
      <div className="container">
        <Helmet>
          <title>Homepage</title>
        </Helmet>
        <div className="content">
          <ContentLeft
            loadMore={this.loadMore}
            allPosts={this.allPosts}
            likepost={likepost}
          />
          <ContentRight
            history={this.props.history}
            allPosts={this.allPosts}
            categoryUploadHandler={this.categoryUploadHandler}
            postUploadHandler={this.postUploadHandler}
            defaultCategory={defaultCategory}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.posts.items,
    postsperpage: state.posts.postsperpage,
    category: state.posts.category,
    postsUserID: state.posts.postsUserID,
    hasMoreItems: state.posts.hasMoreItems,
    showCategoryForm: state.forms.showCategoryForm,
    showPopup: state.forms.showPopup,
    hasError: state.error.hasError,
    errorMsg: state.error.errorMsg
  };
};

Homepage.propTypes = {
  items: PropTypes.number,
  postsperpage: PropTypes.number,
  category: PropTypes.string,
  postsUserID: PropTypes.string,
  hasMoreItems: PropTypes.bool,
  showCategoryForm: PropTypes.bool,
  showPopup: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  history:PropTypes.object
};

export default connect(mapStateToProps)(Homepage);
