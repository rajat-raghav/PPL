import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Comments = props => {
  const {
    commentsData,
    commentsCount,
    commentsSkipCount,
    previousComments,
    addComment
  } = props;
  return (
    <div className="contnt_3">
      <ul>
        {commentsData
          ? commentsData?.map((data, index) => {
            return (
              <li key={'key' + index}>
                <div className="list_image">
                  <div className="image_sec">
                    <img src="/images/post_img.png" />
                  </div>
                  <div className="image_name">{data.username}</div>
                </div>
                <div className="list_info">{data.comment}</div>
                <input
                  type="button"
                  defaultValue="Reply"
                  className="orng_btn"
                />
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
          <a onClick={() => previousComments(commentsSkipCount)}>View more</a>
        </div>
      ) : (
          <div className="view_div">
            <p>No More Comments</p>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    commentsData: state.comments.commentsData,
    commentsSkipCount: state.comments.commentsSkipCount,
    commentsCount: state.posts.singlePostContent[0]?.commentsCount,
    addComment: ownProps.addComment,
    previousComments: ownProps.previousComments
  };
};

Comments.propTypes = {
  commentsData: PropTypes.array,
  commentsSkipCount: PropTypes.number,
  commentsCount: PropTypes.number,
  addComment: PropTypes.func,
  previousComments: PropTypes.func
};

export default connect(mapStateToProps)(Comments);
