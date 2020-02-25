import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../redux/store';
import CategoryHeader from './categoryHeader';
import { fetchAllPosts } from '../../redux/actions/sagaActions';

const Categories = props => {
  const { categoriesData, postsUserID, postsperpage } = props;
  return (
    <div className="rght_cate">
      <CategoryHeader />
      <div className="rght_list">
        <ul>
          {categoriesData.map((data, index) => {
            return (
              <li
                key={'key' + index}
              >
                <div
                  onClick={() => {
                    //console.log("postsuserid", postsUserId);
                    //allPosts(0, postsperpage, data.category, postsUserID);
                    store.dispatch(fetchAllPosts(0, postsperpage, data.category, postsUserID));
                  }}
                  href="#"
                >
                  <span className="list_icon">
                    <img src="/images/category_icon3.png" alt="up" />
                  </span>{' '}
                  <span className="list_data">{data.category}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div >
  );
};

const mapStateToProps = (state) => {
  //console.log("categories", state, ownProps);
  return {
    categoriesData: state.categories.categoriesData,
    postsUserID: state.posts.postsUserID,
    postsperpage: state.posts.postsperpage,
  };
};

Categories.propTypes = {
  categoriesData: PropTypes.array,
  postsUserID: PropTypes.string,
  postsperpage: PropTypes.number
};

export default connect(mapStateToProps)(Categories);
