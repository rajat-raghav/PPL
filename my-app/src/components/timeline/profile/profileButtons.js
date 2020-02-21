import React from 'react';

import allPosts from '../../../helpers/allPosts';
import store from '../../../redux/store';

const ProfileButtons = () => {
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
              //allPosts(0, 6, '', '', true);
              store.dispatch({
                type: 'allPosts',
                skipcount: 0,
                postsperpage: 6,
                category: '',
                postsUserID: '',
                hasMoreItems: true
              })
            }}

          >
            Timeline{' '}
          </a>
        </li>
        <li>
          <a>About </a>
        </li>
        <li>
          <a >Album</a>
        </li>
        <li>
          <a > Pets</a>
        </li>
        <li>
          <a
            id="myuploads"
            onClick={() => {
              document.getElementById('myuploads').className = 'active';
              document.getElementById('timeline').className = '';
              //allPosts(0, 6, '', localStorage.getItem('userID'), true);
              store.dispatch({
                type: 'allPosts',
                skipcount: 0,
                postsperpage: 6,
                category: '',
                postsUserID: localStorage.getItem('userID'),
                hasMoreItems: true
              })
            }}
            href="#"
          >
            My Uploads{' '}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileButtons;