import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';


import api from '../../helpers/api';
import { ROUTES } from '../../Config';
import store from '../../redux/store';
import { error } from '../../redux/actions/errorAction';
import { fetchSinglePostData } from '../../redux/actions/sagaActions';
import { fetchPreviousComments } from '../../redux/actions/sagaActions';
//import previousComments from '../../helpers/previousComments';
//import singlePost from '../../helpers/singlePost';

const Comments = props => {
  const {
    commentsData,
    commentsCount,
    commentsSkipCount,
    commentsLimitCount,
    userID,
    postID
  } = props;

  const addComment = event => {
    event.preventDefault();
    const id = userID;
    const data = {
      cid: postID,
      userid: id,
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
    <div className="contnt_3">
      <ul>
        {commentsData
          ? commentsData.map((data, index) => {
            return (
              <li key={'key' + index}>
                <div className="list_image">
                  <div className="image_sec">
                    <img src="/images/post_img.png" alt="post_img" />
                  </div>
                  <div className="image_name">{data.username}</div>
                </div>
                <div className="list_info">{data.comment}</div>
                <div className='list_time'>
                  <span className="span_time">
                    {moment(data.time).format('h:mm:ss A')}
                  </span>
                  <span className="span_date">
                    {moment(data.time).format('MMM Do, YYYY')}
                  </span>
                </div>
                {/* <input
                  type="button"
                  defaultValue="Reply"
                  className="orng_btn"
                /> */}
              </li>
            );
          })
          : null}
        <li>
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
        </li>
      </ul>
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
    </div >
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    commentsData: state.comments.commentsData,
    commentsSkipCount: state.comments.commentsSkipCount,
    commentsLimitCount: state.comments.commentsLimitCount,
    commentsCount: state.posts.singlePostContent[0]?.commentsCount,
    addComment: ownProps.addComment,
    previousComments: ownProps.previousComments,
    userID: state.user.userID
  };
};

Comments.propTypes = {
  commentsData: PropTypes.array,
  commentsSkipCount: PropTypes.number,
  commentsCount: PropTypes.number,
  addComment: PropTypes.func,
  previousComments: PropTypes.func,
  commentsLimitCount: PropTypes.number,
  userID: PropTypes.string,
  postID: PropTypes.string
};

export default connect(mapStateToProps)(Comments);