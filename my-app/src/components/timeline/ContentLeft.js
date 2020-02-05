import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Profile from "./profile";
import Pagination from "./Pagination";

const ContentLeft = props => {
  const { allPosts, category, loadMore, likepost } = props;
  return (
    <div key={""} className="content_lft">
      <Profile allPosts={allPosts} category={category} />
      <Pagination loadMore={loadMore} likepost={likepost} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.posts.category,
    allPosts: ownProps.allPosts,
    loadMore: ownProps.loadMore,
    likepost: ownProps.likepost
  };
};

ContentLeft.propTypes = {
  category: PropTypes.string,
  allPosts: PropTypes.func,
  loadMore: PropTypes.func,
  likepost: PropTypes.func
};

export default connect(mapStateToProps)(ContentLeft);
