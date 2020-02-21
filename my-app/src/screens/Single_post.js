import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

//import defaultCategory from '../helpers/defaultCategory';
import likepost from '../helpers/likepost';
import Categories from '../components/category/Categories';
import Features from '../components/features/Features';
import Post from '../components/timeline/post/Post';
import Comments from '../components/singlepost/comments';
import ErrorMessage from '../helpers/errormessage';
import singlePost from '../helpers/singlePost';
import previousComments from '../helpers/previousComments';
import store from '../redux/store';


function Single_post(props) {
  const { userID, commentsLimitCount, hasError, errorMsg, singlePostData } = props;
  useEffect(() => {
    if (userID === null) {
      props.history.push('/Login');
    }
    //singlePost(props.match.params.id);
    store.dispatch({ type: 'singlePostData', id: props.match.params.id })
    //previousComments(props.match.params.id, 0, commentsLimitCount);
    store.dispatch({ type: 'previousComments', id: props.match.params.id, commentsSkipCount: 0, commentsLimitCount: commentsLimitCount })
    store.dispatch({ type: 'FetchCategories' });
    //store.dispatch(loginUser(this.props.userID, {}, {}, ''));
    window.scrollTo(0, 0);
  }, [userID]);

  return (
    <div className="container">
      <Helmet>
        <title>Single Post</title>
      </Helmet>
      {hasError ?
        ErrorMessage(errorMsg) :
        <div className="content">
          <div className="content_rgt">
            <Categories />
            <Features />
          </div>
          <div className="content_lft">
            {/* <Posts content={this.props.singlePostData} /> */}
            {singlePostData
              ? singlePostData.map((data, i) => (
                <div key={'key' + data._id} className="contnt_2">
                  <Post data={data} key={'key' + i} />
                </div>
              ))
              : null}

            <Comments postID={props.match.params.id} />
          </div>
        </div>
      }
    </div>
  );
}

// class Single_post extends React.Component {

//   componentDidMount() {
//     if (this.props.userID === null) {
//       this.props.history.push('/Login');
//     }
//     singlePost(this.props.match.params.id);
//     previousComments(this.props.match.params.id, 0, this.props.commentsLimitCount);
//     defaultCategory();
//     //store.dispatch(loginUser(this.props.userID, {}, {}, ''));
//     window.scrollTo(0, 0);
//   }

//   render() {
//     const { singlePostData, hasError, errorMsg } = this.props;
//     if (hasError) {
//       return ErrorMessage(errorMsg)
//     }
//     return (
//       <div className="container">
//         <Helmet>
//           <title>Single Post</title>
//         </Helmet>
//         <div className="content">
//           <div className="content_rgt">
//             <Categories />
//             <Features />
//           </div>
//           <div className="content_lft">
//             {/* <Posts content={this.props.singlePostData} /> */}
//             {singlePostData
//               ? singlePostData.map((data, i) => (
//                 <div key={'key' + data._id} className="contnt_2">
//                   <Post data={data} key={'key' + i} likepost={likepost} />
//                 </div>
//               ))
//               : null}

//             <Comments postID={this.props.match.params.id} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const mapStateToProps = state => {
  //console.log("single-post map state to props", state);
  return {
    commentsLimitCount: state.comments.commentsLimitCount,
    singlePostData: state.posts.singlePostContent,
    errorMsg: state.error.errorMsg,
    hasError: state.error.hasError,
    userID: state.user.userID
  };
};

Single_post.propTypes = {
  singlePostData: PropTypes.array,
  commentsLimitCount: PropTypes.number,
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  match: PropTypes.object,
  history: PropTypes.object,
  userID: PropTypes.string
};

export default connect(mapStateToProps)(Single_post);
