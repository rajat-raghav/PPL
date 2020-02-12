import React from 'react';
//import { createRef, Component, ref } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
//import { FixedSizeList as List } from 'react-window';
//import InfiniteLoader from 'react-window-infinite-loader';
//import AutoSizer from 'react-virtualized-auto-sizer';

import Posts from '../helpers/Posts';

const Pagination = props => {
  const { content, likepost, hasMoreItems, loadMore } = props;

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
            <Posts data={data} likepost={likepost} key={'key' + i} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    content: state.posts.content,
    hasMoreItems: state.posts.hasMoreItems,
    loadMore: ownProps.loadMore,
    likepost: ownProps.likepost
  };
};

Pagination.propTypes = {
  content: PropTypes.array,
  hasMoreItems: PropTypes.bool,
  loadMore: PropTypes.func,
  likepost: PropTypes.func
};

export default connect(mapStateToProps)(Pagination);
