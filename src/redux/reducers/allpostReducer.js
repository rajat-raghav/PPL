
const initialState = {
  content: [],
  singlePostContent: [],
  items: 0,
  postsperpage: 6,
  category: '',
  postsUserID: '',
  hasMoreItems: true
};

const allpostReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'single_post':
      return {
        ...state,
        singlePostContent: action.singlePostContent
      };

    case 'like_post': {
      const updatedContent = state.content.map(item => {
        if (item._id === action.singlePostContent[0]._id) {
          item.likes = action.singlePostContent[0].likes;
          item.likeStatus = action.singlePostContent[0].likeStatus;
          return item;
        }
        return item;
      });
      return {
        ...state,
        content: updatedContent,
        singlePostContent: action.singlePostContent
      };
    }
    case 'all_post':
      if (action.skipcount > 0) {
        return {
          ...state,
          content: [...state.content, ...action.content],
          items: action.skipcount + state.postsperpage,
          category: action.category,
          postsUserID: action.postsUserID,
          hasMoreItems: action.hasMoreItems
        };
      } else {
        const itemsCount =
          action.content.length > 0
            ? action.skipcount + state.postsperpage
            : action.skipcount;
        return {
          ...state,
          content: action.content,
          items: itemsCount,
          category: action.category,
          postsUserID: action.postsUserID,
          hasMoreItems: action.hasMoreItems
        };
      }

    default:
      return state;
  }
};

export default allpostReducer;
