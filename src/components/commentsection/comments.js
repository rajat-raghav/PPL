import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';


import NewComment from './newComment';
import ViewMoreCommentsButton from './viewMoreCommentsButton';

const Comments = props => {
  const { commentsData, postID } = props;

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
          <NewComment postID={postID} />
        </li>
      </ul>
      <ViewMoreCommentsButton postID={postID} />
    </div >
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    commentsData: state.comments.commentsData,
    postID: ownProps.postID
  };
};

Comments.propTypes = {
  commentsData: PropTypes.array,
  postID: PropTypes.string
};

export default connect(mapStateToProps)(Comments);
