import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import store from '../../../redux/store';
import { fetchAllPosts } from '../../../redux/actions/sagaActions';

const ProfileButtons = (props) => {
  return (
    <div className="timeline_div2">
      <ul>
        <li>
          <a
            id="timeline"
            className="active"
            onClick={() => {
              document.getElementById('timeline').className = 'active';
              document.getElementById('myuploads').className = '';
              store.dispatch(fetchAllPosts(0, props.postsperpage, '', ''));
            }}

          >
            Timeline{' '}
          </a>
        </li>
        <li>
          <a >About </a>
        </li>
        <li>
          <a>Album</a>
        </li>
        <li>
          <a> Pets</a>
        </li>
        <li>
          <a
            id="myuploads"
            onClick={() => {
              document.getElementById('myuploads').className = 'active';
              document.getElementById('timeline').className = '';
              store.dispatch(fetchAllPosts(0, props.postsperpage, '', localStorage.getItem('userID')));
            }}
          >
            My Uploads{' '}
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    postsperpage: state.posts.postsperpage
  };
};

ProfileButtons.propTypes = {
  postsperpage: PropTypes.number
};

export default connect(mapStateToProps)(ProfileButtons);