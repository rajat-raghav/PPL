import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../helpers/api';
import { ROUTES } from '../../Config';
import store from '../../redux/store';
import { error } from '../../redux/actions/errorAction';
import { fetchSinglePostData } from '../../redux/actions/sagaActions';
import { fetchPreviousComments } from '../../redux/actions/sagaActions';

const NewComment = (props) => {
  const {
    commentsLimitCount,
    userID,
    postID
  } = props;

  const addComment = event => {
    event.preventDefault();
    const data = {
      cid: postID,
      userid: userID,
      comment: event.target.comment.value
    };
    api(ROUTES.COMMENT, data)
      .then(() => {
        store.dispatch(fetchPreviousComments(postID, 0, commentsLimitCount));
        store.dispatch(fetchSinglePostData(postID));
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
    event.target.comment.value = null;
    window.scrollTo(500, 500);
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <div className="cmnt_div1">
          <input
            type="text"
            name="comment"
            placeholder="Enter your Comment"
            className="cmnt_bx1"
            required
          />
          <br />
          <input
            type="submit"
            className="sub_bttn1"
            defaultValue="Submit Comment"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    commentsLimitCount: state.comments.commentsLimitCount,
    addComment: ownProps.addComment,
    userID: state.user.userID
  };
};

NewComment.propTypes = {
  commentsLimitCount: PropTypes.number,
  userID: PropTypes.string,
  postID: PropTypes.string
};

export default connect(mapStateToProps)(NewComment);
