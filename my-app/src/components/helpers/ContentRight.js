import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import RightContentButtons from "./RightContentButtons";
import Categories from "../contentright/Categories";
import Features from "../contentright/Features";

const ContentRight = props => {
  // categoryUploadHandler = event => {
  //   event.preventDefault();
  //   //console.log("newcate---", event.target.newcategory.value);
  //   //let fd = new FormData();
  //   //fd.append("category", this.state.newcategory);
  //   const data = {
  //     category_name: event.target.newcategory.value
  //   };
  //   axios
  //     .post(SERVER.SERVER_URL + SERVER.ROUTES.CATEGORY_UPLOAD, data)
  //     .then(response => {
  //       //console.log("ressss-----------", response);
  //       // var c_status = response.data.status;
  //       const categoriesData = response.data.result;
  //       store.dispatch(categories(categoriesData));
  //       //this.setState({ categories });
  //       //console.log("categories----", this.state.categories);
  //       store.dispatch(categoryUploadForm(!this.props.showCategoryForm));
  //       //////alert(c_status);
  //       //this.setState({ newcategory: "" });
  //       // this.removevalue();
  //     })
  //     .catch(error => {
  //       //console.log(error);
  //       if (error.message === "Network Error") {
  //         this.props.history.push("/ServerError");
  //         //alert("something went wrong");
  //       }
  //     });
  // };

  // defaultCategory = () => {
  //   axios
  //     .post(SERVER.SERVER_URL + SERVER.ROUTES.DEFAULT_CATEGORY)
  //     .then(response => {
  //       //console.log("Default Category Response -----------", response);
  //       //var c_status = response.data.status;
  //       const categoriesData = response.data.result;
  //       store.dispatch(categories(categoriesData));
  //       //this.setState({ categories });
  //       //console.log("categories----", this.state.categoryarr);
  //       //alert(c_status);
  //     })
  //     .catch(error => {
  //       //console.log(error);
  //       if (error.message === "Network Error") {
  //         this.props.history.push("/ServerError");
  //         //alert("something went wrong");
  //       }
  //     });
  //   //   this.setState({count:false})
  // };

  // postUploadHandler = event => {
  //   console.log("postUploadHandler");
  //   const userid = localStorage.getItem("userID");
  //   event.preventDefault();
  //   let formdata = new FormData();

  //   formdata.append("selectedFiles", event.target.selectedFiles.files[0]);
  //   //formdata.append("email", event.target.email.value);
  //   let categoryname = event.target.category.value;
  //   formdata.append("category", categoryname);
  //   formdata.append("userid", userid);
  //   formdata.append("title", event.target.title.value);
  //   //formdata.append("username", event.target.username.value);
  //   //formdata.append("likes", this.state.likes);
  //   console.log("imagename", event.target.selectedFiles.files[0]);
  //   //console.log("fd", formdata);
  //   axios
  //     .post(SERVER.SERVER_URL + SERVER.ROUTES.UPLOAD_POST, formdata)
  //     .then(response => {
  //       //console.log("ressss-----------", response);
  //       //const status = response.data.status;
  //       //const content = response.data.result;
  //       //   const images = content.map((post) =>{
  //       //   return post.selectedFiles;
  //       // });
  //       //content.reverse();

  //       // const posttime = content.map

  //       //this.setState({ content: [] });
  //       //console.log("image content----", this.state.content);
  //       //this.handleClick();
  //       store.dispatch(postUploadForm(!this.props.showPopup));

  //       //alert(status);
  //       this.props.allPosts(0);
  //       //this.removevalue();
  //     })
  //     .catch(error => {
  //       //console.log(error);
  //       if (error.message === "Network Error") {
  //         this.props.history.push("/ServerError");
  //         //alert("something went wrong");
  //       }
  //     });
  // };

  // logout = () => {
  //   localStorage.removeItem("userID");
  //   localStorage.removeItem("name");
  //   this.props.history.push("/Login");
  // };

  // componentDidMount() {
  //   this.defaultCategory();
  // }

  //console.log("render content right", this.props);
  const {
    postUploadHandler,
    categoryUploadHandler,
    categoryForm,
    allPosts
  } = props;
  return (
    <div className="content_rgt">
      {props.match && props.match.params.id ? null : (
        <RightContentButtons
          postUploadHandler={postUploadHandler}
          categoryUploadHandler={categoryUploadHandler}
          categoryForm={categoryForm}
        />
      )}

      <Categories allPosts={allPosts} />
      <Features />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  //console.log("contentright", state, ownProps);
  return {
    categoriesData: state.categories.categoriesData,
    showPopup: state.forms.showPopup,
    showCategoryForm: state.forms.showCategoryForm,
    allPosts: ownProps.allPosts,
    categoryUploadHandler: ownProps.categoryUploadHandler
  };
};

ContentRight.propTypes = {
  categoriesData: PropTypes.array,
  showPopup: PropTypes.bool,
  showCategoryForm: PropTypes.bool,
  allPosts: PropTypes.func,
  categoryUploadHandler: PropTypes.func
};

export default connect(mapStateToProps)(ContentRight);
