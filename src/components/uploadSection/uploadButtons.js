import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../../redux/store';
import PostUploadFormPopup from './PostUploadFormPopup';
import CategoryForm from './CategoryForm';
import RightButton from './RightButton';
import { postUploadForm, categoryUploadForm } from '../../redux/actions/formsAction';
import api from '../../helpers/api';
import { ROUTES } from '../../Config';
import { error } from '../../redux/actions/errorAction';
import { fetchCategories, fetchAllPosts } from '../../redux/actions/sagaActions';


const UploadButtons = props => {
  const {
    showPopup,
    showCategoryForm,
    categoriesData,
    userID,
    postsperpage
  } = props;

  const postUploadHandler = event => {
    //console.log("postUploadHandler");
    const userid = userID;
    event.preventDefault();
    let formdata = new FormData();

    formdata.append('selectedFiles', event.target.selectedFiles.files[0]);
    let categoryname = event.target.category.value;
    formdata.append('category', categoryname);
    formdata.append('userid', userid);
    formdata.append('title', event.target.title.value);
    api(ROUTES.UPLOAD_POST, formdata)
      .then(() => {
        store.dispatch(postUploadForm(!showPopup));
        //allPosts(0, postsperpage);
        store.dispatch(fetchAllPosts(0, postsperpage));
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  };

  const categoryUploadHandler = event => {
    event.preventDefault();
    const data = {
      category_name: event.target.newcategory.value
    };
    api(ROUTES.CATEGORY_UPLOAD, data)
      .then(() => {
        store.dispatch(categoryUploadForm(!showCategoryForm));
        store.dispatch(fetchCategories());
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  };


  return (
    <div>
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
      {showPopup ? (
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
  return {
    showPopup: state.forms.showPopup,
    showCategoryForm: state.forms.showCategoryForm,
    categoriesData: state.categories.categoriesData,
    categoryUploadHandler: ownProps.categoryUploadHandler,
    logout: ownProps.logout,
    categoryForm: ownProps.categoryForm,
    userID: state.user.userID,
    postsperpage: state.posts.postsperpage
  };
};

UploadButtons.propTypes = {
  showPopup: PropTypes.bool,
  showCategoryForm: PropTypes.bool,
  categoriesData: PropTypes.array,
  categoryUploadHandler: PropTypes.func,
  logout: PropTypes.func,
  categoryForm: PropTypes.func,
  userID: PropTypes.string,
  postsperpage: PropTypes.number
};

export default connect(mapStateToProps)(UploadButtons);
