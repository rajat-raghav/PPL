export const fetchCategories = () => {
  return {
    type: 'fetchCategories'
  };
};

export const fetchSinglePostData = (id) => {
  return {
    type: 'fetchSinglePostData',
    id: id
  };
};

export const fetchPreviousComments = (id, commentsSkipCount, commentsLimitCount) => {
  return {
    type: 'fetchPreviousComments',
    id: id,
    commentsSkipCount: commentsSkipCount,
    commentsLimitCount: commentsLimitCount
  };
};

export const fetchAllPosts = (skipcount, postsperpage, category = '', postsUserID = '', hasMoreItems = true) => {
  return {
    type: 'fetchAllPosts',
    skipcount: skipcount,
    postsperpage: postsperpage,
    category: category,
    postsUserID: postsUserID,
    hasMoreItems: hasMoreItems
  };
};

export const fetchLikedPost = (id) => {
  return {
    type: 'fetchLikedPost',
    id: id
  };
};