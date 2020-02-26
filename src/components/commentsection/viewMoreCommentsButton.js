import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPreviousComments } from '../../redux/actions/sagaActions';
import store from '../../redux/store';


const ViewMoreCommentsButton = (props) => {
  const {
    commentsCount,
    commentsSkipCount,
    commentsLimitCount,
    postID
  } = props;
  return (
    <div>
      {commentsSkipCount < commentsCount ? (
        <div className="view_div">
          <a onClick={() => store.dispatch(fetchPreviousComments(postID, commentsSkipCount, commentsLimitCount))
          }>
            View more
          </a>
        </div>
      ) : (
          <div className="view_div">
            <p>No More Comments</p>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    commentsSkipCount: state.comments.commentsSkipCount,
    commentsLimitCount: state.comments.commentsLimitCount,
    commentsCount: state.posts.singlePostContent[0]?.commentsCount,
    postID: ownProps.postID
  };
};

ViewMoreCommentsButton.propTypes = {
  commentsSkipCount: PropTypes.number,
  commentsCount: PropTypes.number,
  commentsLimitCount: PropTypes.number,
  postID: PropTypes.string
};

export default connect(mapStateToProps)(ViewMoreCommentsButton);
