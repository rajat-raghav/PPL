import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CategoryHeader from './categoryHeader';
import allPosts from '../../helpers/allPosts'

const Categories = props => {
  const { categoriesData, postsUserId, postsperpage } = props;
  return (
    <div className="rght_cate">
      <CategoryHeader />
      <div className="rght_list">
        <ul>
          {categoriesData?.map((data, index) => {
            return (
              <li
                key={'key' + index}
                style={{
                  margin: '2px',
                  boxShadow: '2px 2px #888888'
                }}
              >
                <a
                  onClick={() => {
                    //console.log("postsuserid", postsUserId);
                    allPosts(0, postsperpage, data.category, postsUserId);
                  }}
                  href="#"
                >
                  <span className="list_icon">
                    <img src="/images/category_icon3.png" alt="up" />
                  </span>{' '}
                  <span className="list_data">{data.category}</span>
                </a>
              </li>
            );
          })}
          <li
            style={{
              margin: '2px',
              boxShadow: '2px 2px #888888'
            }}
          >
            <a onClick={() => allPosts(0)} href="#">
              <span className="list_icon">
                <img src="/images/category_icon3.png" alt="up" />
              </span>{' '}
              <span className="list_data">All Posts</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  //console.log("categories", state, ownProps);
  return {
    categoriesData: state.categories.categoriesData,
    postsUserId: state.posts.postsUserID,
    postsperpage: state.posts.postsperpage,
  };
};

Categories.propTypes = {
  categoriesData: PropTypes.array,
  postsUserId: PropTypes.string,
  postsperpage: PropTypes.number
};

export default connect(mapStateToProps)(Categories);
