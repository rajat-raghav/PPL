import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import { useHistory, useParams } from 'react-router-dom';

import Features from '../components/features/Features';
import ErrorMessage from '../helpers/errormessage';
import store from '../redux/store';
import Loading from '../helpers/loding';
import { fetchCategories, fetchSinglePostData, fetchPreviousComments } from '../redux/actions/sagaActions';

const Comments = Loadable({
  loader: () => import('../components/singlepost/comments'),
  loading: Loading,
  delay: 500
});

const Categories = Loadable({
  loader: () => import('../components/category/Categories'),
  loading: Loading,
  delay: 500
});

const Post = Loadable({
  loader: () => import('../components/timeline/post/Post'),
  loading: Loading,
  delay: 500
});

const Single_post = (props) => {
  const { userID, commentsLimitCount, hasError, errorMsg, singlePostData } = props;

  let history = useHistory();
  let postID = useParams();

  useEffect(() => {
    if (userID === null) {
      history.push('/Login');
    }
    store.dispatch(fetchSinglePostData(postID.id));
    store.dispatch(fetchPreviousComments(postID.id, 0, commentsLimitCount));
    store.dispatch(fetchCategories());
    window.scrollTo(0, 0);
  }, [userID]);

  return (
    <div className="container">
      <Helmet>
        <title>Single Post</title>
      </Helmet>
      {hasError ?
        ErrorMessage(errorMsg) :
        <div className="content">
          <div className="content_rgt">
            <Categories />
            <Features />
          </div>
          <div className="content_lft">
            {singlePostData
              ? singlePostData.map((data, i) => (
                <div key={'key' + data._id} className="contnt_2">
                  <Post data={data} key={'key' + i} />
                </div>
              ))
              : null}

            <Comments postID={postID.id} />
          </div>
        </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  //console.log("single-post map state to props", state);
  return {
    commentsLimitCount: state.comments.commentsLimitCount,
    singlePostData: state.posts.singlePostContent,
    errorMsg: state.error.errorMsg,
    hasError: state.error.hasError,
    userID: state.user.userID
  };
};

Single_post.propTypes = {
  singlePostData: PropTypes.array,
  commentsLimitCount: PropTypes.number,
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  match: PropTypes.object,
  userID: PropTypes.string
};

export default connect(mapStateToProps)(Single_post);
