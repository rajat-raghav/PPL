import React from 'react';
import { Link } from 'react-router-dom';

const PostImage = props => {
  const { data } = props;
  return (
    <div className="div_image">
      <Link to={'/single_post/' + data._id}>
        {' '}
        <img
          src={'http://localhost:8089/' + data.selectedFiles}
          alt="pet"
        />{' '}
      </Link>
    </div>
  )
}

export default PostImage;