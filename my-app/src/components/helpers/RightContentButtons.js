import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import store from "../../redux/store";
import PostUploadFormPopup from "../contentright/PostUploadFormPopup";
import CategoryForm from "../contentright/CategoryForm";
import RightButton from "../contentright/RightButton";
import {
  postUploadForm,
  categoryUploadForm
} from "../../redux/actions/formsAction";

const RightContentButtons = props => {
  const {
    showPopup,
    showCategoryForm,
    postUploadHandler,
    categoriesData,
    categoryUploadHandler
  } = props;
  return (
    <div>
      {/* <div className="rght_btn" onClick={logout}>
          <span className="rght_btn_icon">
            <img src="/images/btn_iconb.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="/images/btn_sep.png" alt="sep" />
          </span>{" "}
          <a>Logout</a>{" "}
        </div> */}

      <RightButton
        buttonIcon="/images/btn_iconb.png"
        onButtonClick={() => store.dispatch(postUploadForm(!showPopup))}
        buttonText="Upload Post"
      />
      <RightButton
        buttonIcon="/images/category_icon2.png"
        onButtonClick={() =>
          store.dispatch(categoryUploadForm(!showCategoryForm))
        }
        buttonText="Upload Category"
      />

      {/* <div
          className="rght_btn"
          onClick={() => store.dispatch(postUploadForm(!showPopup))}
        >
          {" "}
          <span className="rght_btn_icon">
            <img src="/images/btn_iconb.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="/images/btn_sep.png" alt="sep" />
          </span>{" "}
          <a>Upload Post</a>{" "}
        </div>
        <div
          className="rght_btn"
          onClick={() =>
            store.dispatch(categoryUploadForm(!showCategoryForm))
          }
        >
          {" "}
          <span className="rght_btn_icon">
            <img src="/images/category_icon2.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="/images/btn_sep.png" alt="sep" />
          </span>{" "}
          <a>Upload Category</a>{" "}
        </div> */}
      {//this.state.ans ? this.form() : null
      showPopup ? (
        <PostUploadFormPopup
          fileUpload={postUploadHandler}
          categories={categoriesData}
          showPopup={showPopup}
        />
      ) : null}
      <div>
        {showCategoryForm ? (
          <CategoryForm categoryUploadHandler={categoryUploadHandler} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  //console.log("right content buttons", state, ownProps);
  return {
    showPopup: state.forms.showPopup,
    showCategoryForm: state.forms.showCategoryForm,
    categoriesData: state.categories.categoriesData,
    postUploadHandler: ownProps.postUploadHandler,
    categoryUploadHandler: ownProps.categoryUploadHandler,
    logout: ownProps.logout,
    categoryForm: ownProps.categoryForm
  };
};

RightContentButtons.propTypes = {
  showPopup: PropTypes.bool,
  showCategoryForm: PropTypes.bool,
  categoriesData: PropTypes.array,
  postUploadHandler: PropTypes.func,
  categoryUploadHandler: PropTypes.func,
  logout: PropTypes.func,
  categoryForm: PropTypes.func
};

export default connect(mapStateToProps)(RightContentButtons);
