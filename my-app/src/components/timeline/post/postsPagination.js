import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
//import { createRef, Component, ref } from 'react';
//import { FixedSizeList as List } from 'react-window';
//import InfiniteLoader from 'react-window-infinite-loader';
//import AutoSizer from 'react-virtualized-auto-sizer';

import Post from './Post';
import api from '../../../helpers/api';
import { ROUTES } from '../../../Config'
import store from '../../../redux/store'
import { error } from '../../../redux/actions/errorAction'
import allPosts from '../../../helpers/allPosts'

const PostsPagination = props => {
  const { content, hasMoreItems, category, postsUserID, items, postsperpage } = props;
  const loadMore = () => {
    const data = {
      category: category,
      postsUserID: postsUserID
    };
    api(ROUTES.POST_COUNT, data)
      .then(res => {
        const totalpost = res.data.result;
        console.log('loadmore', items, totalpost);
        if (items < totalpost) {
          allPosts(
            items,
            postsperpage,
            category,
            postsUserID
          );
        } else if (items >= totalpost) {
          allPosts(
            items,
            postsperpage,
            category,
            postsUserID,
            false
          );
        }
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  }

  // const getPost = ({ index, style }) => {
  //   console.log("index", index);
  //   console.log("this.props.content", content);
  //   if (content[index]) {
  //     return <Posts style={style} data={content[index]} likepost={likepost} />;
  //   } else {
  //     return null;
  //   }
  // };
  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasMoreItems}
      loader={
        <div className="loader" key={0}>
          <img
            src="images/loading3.gif"
            alt="loading"
            style={{
              margin: '2% 25%',
              height: '80px',
              width: '50%'
            }}
          ></img>
        </div>
      }
    >
      {content
        ? content.map((data, i) => (
          <div key={'key' + data._id} className="contnt_2">
            <Post data={data} key={'key' + i} />
          </div>
        ))
        : null}
    </InfiniteScroll>
    // <InfiniteLoader
    //   isItemLoaded={() => {
    //     return !hasMoreItems;
    //   }}
    //   style={{ width: "100%" }}
    //   itemCount={35}
    //   loadMoreItems={() => {
    //     console.log("load more called");
    //     loadMore();
    //   }}
    // >
    //   {({ onItemsRendered, ref }) => (
    //     <List
    //       className="List"
    //       height={1000}
    //       itemCount={50}
    //       itemSize={650}
    //       onItemsRendered={onItemsRendered}
    //       ref={ref}
    //       width={740}
    //     >
    //       {getPost}
    //     </List>
    //   )}
    // </InfiniteLoader>
  );
};



const mapStateToProps = (state) => {
  return {
    content: state.posts.content,
    hasMoreItems: state.posts.hasMoreItems,
    items: state.posts.items,
    category: state.posts.category,
    postsUserID: state.posts.postsUserID,
    postsperpage: state.posts.postsperpage

  };
};

PostsPagination.propTypes = {
  content: PropTypes.array,
  hasMoreItems: PropTypes.bool,
  loadMore: PropTypes.func,
};

export default connect(mapStateToProps)(PostsPagination);
