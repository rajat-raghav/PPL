import React from 'react';
import PropTypes from 'prop-types';
import PostHeader from './postHeader';
import PostInfo from './postInfo';
import PostButtons from './postButtons'
import PostImage from './postImage';

const Post = props => {
  const { data } = props;
  return (
    <div key={'div_'} className="div_a">
      <PostHeader data={data} />
      <PostInfo data={data} />
      <PostImage data={data} />
      <PostButtons data={data} />
    </div>
  );
}
Post.propTypes = {
  data: PropTypes.object,
};
export default Post;
