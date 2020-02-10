import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import { ROUTES } from "../helpers/Config";
import store from "../../redux/store";
import { single_post, like_post } from "../../redux/actions/allpostActions";
import { comments } from "../../redux/actions/commentsAction";
import { error } from "../../redux/actions/errorAction";
import ContentRight from "../helpers/ContentRight";
import SinglePostContentLeft from "../singlepost/SinglePostContentLeft";
import getData from "../helpers/getData";

class Single_post extends React.Component {
  addComment = event => {
    event.preventDefault();
    const id = localStorage.getItem("userID");
    //console.log("userid----", id);

    const data = {
      cid: this.props.match.params.id,
      userid: id,
      comment: event.target.comment.value
    };
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.COMMENT, data)
    getData(ROUTES.COMMENT, data)
      .then(() => {
        this.previousComments(0);
        this.postData();
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
    event.target.comment.value = null;
    window.scrollTo(500, 500);
  };

  postData = e => {
    //console.log("postData");
    const id = this.props.match.params;
    //console.log('id',id)
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.SINGLE_POST, id)
    getData(ROUTES.SINGLE_POST, id)
      .then(response => {
        //console.log("response-data-------", response);
        const singlePostData = response.data.result;
        //console.log("-singlepostdata-------", singlePostData);
        //this.setState({ singlePostData: response.data.result });
        store.dispatch(single_post(singlePostData));
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  };

  previousComments = commentsSkipCount => {
    const data = {
      id: this.props.match.params.id,
      commentsSkipCount: commentsSkipCount,
      commentsLimitCount: this.props.commentsLimitCount
    };
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.DEFAULT_COMMENT, data)
    getData(ROUTES.DEFAULT_COMMENT, data)
      .then(response => {
        //console.log("Default Comment Response -----------", response.data);
        //const commentstatus = response.data.status;
        let commentsData = response.data.result;
        //commentsData.reverse();
        //let commentsCount = commentsData.length;

        store.dispatch(comments(commentsData, commentsSkipCount));

        //this.setState({ commentstatus, commentsData, commentsCount });
        //console.log("commentss----", this.state.commentsData);
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  };

  likepost = id => {
    const data = {
      postid: id,
      userid: localStorage.getItem("userID")
    };
    //console.log("likepost()---", data);
    // axios
    //   .post(SERVER.SERVER_URL + SERVER.ROUTES.LIKE, data)
    getData(ROUTES.LIKE, data)
      .then(response => {
        const contentcopy = response.data.result;
        store.dispatch(like_post(contentcopy));
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  };

  componentWillUnmount() {
    //console.log("----------component will unmount-----------");
  }

  componentDidMount() {
    //console.log("----------component Did mount-----------");
    if (this.props.history.action === "POP") {
      this.props.history.push("/Timeline");
    }
    this.postData();
    this.previousComments(0);
    window.scrollTo(0, 0);
  }

  render() {
    const { singlePostData } = this.props;
    if (this.props.hasError) {
      return (
        <div
          style={{ padding: "16% 30%", color: "#f47b13", textAlign: "center" }}
        >
          <h1>Something went wrong.</h1>
          <h2>Error:{this.props.errorMsg}</h2>
        </div>
      );
    }
    return (
      <div className="container">
        <Helmet>
          <title>Single Post</title>
        </Helmet>
        <div className="content">
          <ContentRight
            allPosts={() => this.props.history.push("/Timeline")}
            {...this.props}
          />
          <SinglePostContentLeft
            addComment={this.addComment}
            previousComments={this.previousComments}
            singlePostData={singlePostData}
            likepost={this.likepost}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log("single-post map state to props", state);
  return {
    commentsData: state.comments.commentsData,
    commentsLimitCount: state.comments.commentsLimitCount,
    singlePostData: state.posts.singlePostContent,
    errorMsg: state.error.errorMsg,
    hasError: state.error.hasError
  };
};

Single_post.propTypes = {
  commentsData: PropTypes.array,
  singlePostData: PropTypes.array,
  commentsLimitCount: PropTypes.number,
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string
};

export default connect(mapStateToProps)(Single_post);
