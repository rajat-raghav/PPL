import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Categories = props => {
  const { categoriesData, postsUserId, allPosts } = props;
  return (
    <div className="rght_cate">
      <div className="rght_cate_hd" id="rght_cat_bg">
        Categories
      </div>
      <div className="rght_list">
        <ul>
          {categoriesData?.map((data, index) => {
            return (
              <li
                key={"key" + index}
                style={{
                  margin: "2px",
                  boxShadow: "2px 2px #888888"
                }}
              >
                <a
                  onClick={() => {
                    //console.log("postsuserid", postsUserId);
                    props.allPosts(0, data.category, postsUserId);
                  }}
                  href="#"
                >
                  <span className="list_icon">
                    <img src="/images/category_icon3.png" alt="up" />
                  </span>{" "}
                  <span className="list_data">{data.category}</span>
                </a>
              </li>
            );
          })}
          <li
            style={{
              margin: "2px",
              boxShadow: "2px 2px #888888"
            }}
          >
            <a onClick={() => allPosts(0)} href="#">
              <span className="list_icon">
                <img src="/images/category_icon3.png" alt="up" />
              </span>{" "}
              <span className="list_data">All Posts</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  //console.log("categories", state, ownProps);
  return {
    categoriesData: state.categories.categoriesData,
    postsUserId: state.posts.postsUserID,
    allPosts: ownProps.allPosts
  };
};

Categories.propTypes = {
  categoriesData: PropTypes.array,
  postsUserId: PropTypes.string,
  allPosts: PropTypes.func
};

export default connect(mapStateToProps)(Categories);
