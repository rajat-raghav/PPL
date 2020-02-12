import React from 'react';
import PropTypes from 'prop-types';

import Posts from '../helpers/Posts';
import Comments from './comments';

const SinglePostContentLeft = props => {
  const { singlePostData, likepost, addComment, previousComments } = props;
  return (
    <div className="content_lft">
      {/* <Posts content={this.props.singlePostData} /> */}
      {singlePostData
        ? singlePostData.map((data, i) => (
            <Posts data={data} likepost={likepost} key={'key' + i} />
          ))
        : null}

      <Comments addComment={addComment} previousComments={previousComments} />
    </div>
  );
};

SinglePostContentLeft.propTypes = {
  singlePostData: PropTypes.array,
  likepost: PropTypes.func,
  addComment: PropTypes.func,
  previousComments: PropTypes.func
};

export default SinglePostContentLeft;
