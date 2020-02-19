import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import UploadButtons from '../components/uploadSection/uploadButtons';
import Categories from '../components/category/Categories';
import Features from '../components/features/Features';
import Profile from '../components/timeline/profile/profile';
import PostsPagination from '../components/timeline/post/postsPagination';
import defaultCategory from '../helpers/defaultCategory';
import ErrorMessage from '../helpers/errormessage';
import store from '../redux/store';
import { all_post } from '../redux/actions/allpostActions';


function Homepage(props) {
  const { userID, hasError, errorMsg } = props
  useEffect(() => {
    if (!userID) {
      props.history.push('/Login');
    } else {
      defaultCategory();
    }
    return () => {
      store.dispatch(all_post(0, [], '', '', true));
    }
  }, [])

  return (
    <div className="container">
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      {hasError ?
        ErrorMessage(errorMsg) :
        <div className="content">
          <div className="content_lft">
            <Profile />
            <PostsPagination />
          </div>
          <div className="content_rgt">
            <UploadButtons />
            <Categories />
            <Features />
          </div>
        </div>}
    </div>
  );
}

// class Homepage extends React.Component {

//   componentDidMount() {
//     //console.log("component Will mount--------");
//     if (!this.props.userID) {
//       this.props.history.push('/Login');
//     } else {
//       defaultCategory();
//     }
//   }

//   componentWillUnmount() {
//     //console.log("component will unmount");
//     store.dispatch(all_post(0, [], '', '', true));
//   }

//   render() {
//     //console.log("<<---------------------render---------------------->>");
//     const { hasError, errorMsg } = this.props;
//     if (hasError) {
//       return ErrorMessage(errorMsg)
//     }
//     return (
//       <div className="container">
//         <Helmet>
//           <title>Homepage</title>
//         </Helmet>
//         <div className="content">
//           <div className="content_lft">
//             <Profile />
//             <PostsPagination />
//           </div>
//           <div className="content_rgt">
//             <UploadButtons />
//             <Categories />
//             <Features />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


const mapStateToProps = state => {
  return {
    hasError: state.error.hasError,
    errorMsg: state.error.errorMsg,
    userID: state.user.userID
  };
};

Homepage.propTypes = {

  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  userID: PropTypes.string
};

export default connect(mapStateToProps)(Homepage);
