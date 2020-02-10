import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const Posts = props => {
  //console.log("inside post props",props);
  const { data, style, likepost } = props;
  return (
    <div style={style} key={"key" + data._id} className="contnt_2">
      <div key={"div_"} className="div_a">
        <div className="div_title">{data.title}</div>
        <div className="btm_rgt">
          <div className="btm_arc">{data.category}</div>
        </div>
        <div className="div_top">
          <div className="div_top_lft">
            <img src="images/img_6.png" alt="" />
            {data.username}
          </div>
          <div className="div_top_rgt">
            <span className="span_date">
              {moment(data.time).format("MMM Do, YYYY")}
            </span>
            <span className="span_time">
              {moment(data.time).format("h:mm:ss A")}
            </span>
          </div>
        </div>
        <div className="div_image">
          <Link to={"/single_post/" + data._id}>
            {" "}
            <img
              src={"http://localhost:8089/" + data.selectedFiles}
              alt="pet"
            />{" "}
          </Link>
        </div>
        <div className="div_btm">
          <div className="btm_list">
            <ul>
              <li>
                <a href="#">
                  <span className="btn_icon">
                    <img src="/images/icon_001.png" alt="share" />
                  </span>
                  Share
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="btn_icon">
                    <img src="/images/icon_002.png" alt="share" />
                  </span>
                  Flag
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    likepost(data._id);
                  }}
                >
                  <span className="btn_icon">
                    <img src="/images/icon_003.png" alt="share" />
                  </span>
                  {data.likes.length} Like
                </a>
              </li>
              <li>
                <Link to={"/single_post/" + data._id}>
                  <span className="btn_icon">
                    <img src="/images/icon_004.png" alt="share" />
                  </span>
                  {data.commentsCount} Comments
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  data: PropTypes.object,
  style: PropTypes.object,
  likepost: PropTypes.func
};
export default Posts;
