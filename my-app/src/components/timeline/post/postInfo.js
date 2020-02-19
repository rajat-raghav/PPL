import React from 'react';
import moment from 'moment';

const PostInfo = props => {
  const { data } = props;

  return (
    <div className="div_top">
      <div className="div_top_lft">
        <img src="images/img_6.png" alt="" />
        {data.username}
      </div>
      <div className="div_top_rgt">
        <span className="span_date">
          {moment(data.time).format('MMM Do, YYYY')}
        </span>
        <span className="span_time">
          {moment(data.time).format('h:mm:ss A')}
        </span>
      </div>
    </div>
  )
}
export default PostInfo;