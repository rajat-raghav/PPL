import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import { useHistory } from 'react-router-dom';

import UploadButtons from '../components/uploadSection/uploadButtons';
import Features from '../components/features/Features';
import Profile from '../components/timeline/profile/profile';
import ErrorMessage from '../helpers/errormessage';
import store from '../redux/store';
import { all_post } from '../redux/actions/allpostActions';
import { fetchCategories } from '../redux/actions/sagaActions';
import Loading from '../helpers/loding';

const PostsPagination = Loadable({
  loader: () => import('../components/timeline/post/postsPagination'),
  loading: Loading,
  delay: 500
});

const Categories = Loadable({
  loader: () => import('../components/category/Categories'),
  loading: Loading,
  delay: 500
});

const Homepage = (props) => {
  const { userID, hasError, errorMsg } = props;
  let history = useHistory();

  useEffect(() => {
    if (!userID) {
      history.push('/Login');
    } else {
      store.dispatch(fetchCategories());
    }
    return () => {
      store.dispatch(all_post(0, [], '', '', true));
    };
  }, [userID]);

  return (
    <div className="container">
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      {hasError ?
        ErrorMessage(errorMsg) :
        <div className="content">
          <div className="content_lft">
            <Profile />
            <PostsPagination />
          </div>
          <div className="content_rgt">
            <UploadButtons />
            <Categories />
            <Features />
          </div>
        </div>}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hasError: state.error.hasError,
    errorMsg: state.error.errorMsg,
    userID: state.user.userID
  };
};

Homepage.propTypes = {
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  userID: PropTypes.string,
};

export default connect(mapStateToProps)(Homepage);