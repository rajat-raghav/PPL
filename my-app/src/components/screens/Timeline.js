import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import ContentLeft from "../timeline/ContentLeft";
import ContentRight from "../helpers/ContentRight";
import getData from "../helpers/getData";
import { ROUTES } from "../helpers/Config";
import { all_post, like_post } from "../../redux/actions/allpostActions";
import { categories } from "../../redux/actions/categoriesAction";
import { loginUser } from "../../redux/actions/userActions";
import store from "../../redux/store";
import {
  postUploadForm,
  categoryUploadForm
} from "../../redux/actions/formsAction";

class Timeline extends React.Component {
  allPosts = (
    skipcount,
    category = "",
    postsUserID = "",
    hasMoreItems = true
  ) => {
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
        const content = response.data.result;
        //console.log("all post content", content);
        store.dispatch(
          all_post(skipcount, content, category, postsUserID, hasMoreItems)
        );
      })
      .catch(error => {
        //console.log("network error");
        if (error.message === "Network Error") {
          this.props.history.push("/ServerError");
        }
      });
  };

  loadMore = () => {
    const data = {
      category: this.props.category,
      postsUserID: this.props.postsUserID
    };
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.POST_COUNT, data)
    getData(ROUTES.POST_COUNT, data)
      .then(res => {
        const totalpost = res.data.result;
        console.log("loadmore", this.props.items, totalpost);
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
      .catch(error => {
        if (error.message === "Network Error") {
          this.props.history.push("/ServerError");
        }
      });
  };

  likepost = id => {
    const data = {
      postid: id,
      userid: localStorage.getItem("userID")
    };
    //console.log("likepost()---", data);
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.LIKE, data)
    getData(ROUTES.LIKE, data)
      .then(response => {
        const contentcopy = response.data.result;
        store.dispatch(like_post(contentcopy));
      })
      .catch(error => {
        if (error.message === "Network Error") {
          this.props.history.push("/ServerError");
        }
      });
  };

  static getDerivedStateFromError(error) {
    //return <h1>Something went wrong.</h1>;
    //alert("something went wrong");
    console.log("something went wrong");
  }
  //-----Content Right Functions--------------------------------

  categoryUploadHandler = event => {
    //console.log("cat upload()");
    event.preventDefault();
    //console.log("newcate---", event.target.newcategory.value);
    //let fd = new FormData();
    //fd.append("category", this.state.newcategory);
    const data = {
      category_name: event.target.newcategory.value
    };
    //console.log("category Upload Handler", data);
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.CATEGORY_UPLOAD, data)
    getData(ROUTES.CATEGORY_UPLOAD, data)
      .then(response => {
        //console.log("ressss-----------", response);
        //const c_status = response.data.status;
        //const categoriesData = response.data.result;
        //store.dispatch(categories(categoriesData));
        //this.setState({ categories });
        //console.log("categories----", this.state.categories);
        store.dispatch(categoryUploadForm(!this.props.showCategoryForm));
        this.defaultCategory();
        //alert(c_status);
        //this.setState({ newcategory: "" });
        // this.removevalue();
      })
      .catch(error => {
        //console.log(error);
        if (error.message === "Network Error") {
          this.props.history.push("/ServerError");
          //alert("something went wrong");
        }
      });
  };

  defaultCategory = () => {
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
      .catch(error => {
        //console.log(error);
        if (error.message === "Network Error") {
          this.props.history.push("/ServerError");
          //alert("something went wrong");
        }
      });
    //   this.setState({count:false})
  };

  postUploadHandler = event => {
    //console.log("postUploadHandler");
    const userid = localStorage.getItem("userID");
    event.preventDefault();
    let formdata = new FormData();

    formdata.append("selectedFiles", event.target.selectedFiles.files[0]);
    //formdata.append("email", event.target.email.value);
    let categoryname = event.target.category.value;
    formdata.append("category", categoryname);
    formdata.append("userid", userid);
    formdata.append("title", event.target.title.value);
    //formdata.append("username", event.target.username.value);
    //formdata.append("likes", this.state.likes);
    //console.log("imagename", event.target.selectedFiles.files[0]);
    //console.log("fd", formdata);
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.UPLOAD_POST, formdata)
    getData(ROUTES.UPLOAD_POST, formdata)
      .then(response => {
        //console.log("ressss-----------", response);
        //const status = response.data.status;
        //const content = response.data.result;
        //   const images = content.map((post) =>{
        //   return post.selectedFiles;
        // });
        //content.reverse();

        // const posttime = content.map

        //this.setState({ content: [] });
        //console.log("image content----", this.state.content);
        //this.handleClick();
        store.dispatch(postUploadForm(!this.props.showPopup));

        //alert(status);
        this.allPosts(0);
        //this.removevalue();
      })
      .catch(error => {
        //console.log(error);
        if (error.message === "Network Error") {
          this.props.history.push("/ServerError");
          //alert("something went wrong");
        }
      });
  };

  //----------------------------
  componentDidMount() {
    //console.log("component Will mount--------");
    if (!localStorage.getItem("userID")) {
      this.props.history.push("/Login");
    } else {
      this.defaultCategory();
      store.dispatch(loginUser(localStorage.getItem("userID")));
    }
  }

  componentWillUnmount() {
    //console.log("component will unmount");
    store.dispatch(all_post(0, [], "", "", true));
  }

  render() {
    //console.log("<<---------------------render---------------------->>");

    return (
      <div className="container">
        <Helmet>
          <title>Timeline</title>
        </Helmet>
        <div className="content">
          <ContentLeft
            loadMore={this.loadMore}
            allPosts={this.allPosts}
            likepost={this.likepost}
          />
          <ContentRight
            history={this.props.history}
            allPosts={this.allPosts}
            categoryUploadHandler={this.categoryUploadHandler}
            postUploadHandler={this.postUploadHandler}
            defaultCategory={this.defaultCategory}
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
    showPopup: state.forms.showPopup
  };
};

Timeline.propTypes = {
  items: PropTypes.number,
  postsperpage: PropTypes.number,
  category: PropTypes.string,
  postsUserID: PropTypes.string,
  hasMoreItems: PropTypes.bool,
  showCategoryForm: PropTypes.bool,
  showPopup: PropTypes.bool
};

export default connect(mapStateToProps)(Timeline);
