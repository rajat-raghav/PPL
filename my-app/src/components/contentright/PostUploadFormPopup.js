import React from 'react';
import PropTypes from 'prop-types';

import store from '../../redux/store';
import { postUploadForm } from '../../redux/actions/formsAction';

import '../../popupStyle.css';

const PostUploadFormPopup = props => {
  const { showPopup, fileUpload, categories } = props;
  return (
    <div className="popup">
      <div className="popup\_inner">
        <h4 style={{ textAlign: 'center' }}>Upload Post</h4>
        <div className="topright">
          <a
            onClick={() => store.dispatch(postUploadForm(!showPopup))}
            href="#"
          >
            <img height="20px" width="30px" src="/images/close_icon.ico"></img>
          </a>
        </div>
        <form
          onSubmit={fileUpload}
          method="POST"
          encType="multipart/form-data"
          id="rcorners1"
        >
          <ul>
            <li>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" required />
            </li>
            <li>
              <label htmlFor="category">category</label>

              <select name="category" required>
                <option value="" hidden>
                  Select category
                </option>
                {categories &&
                  categories.map((data, index) => {
                    return (
                      <option key={index} value={data.category}>
                        {data.category}
                      </option>
                    );
                  })}
              </select>
            </li>
            <li>
              <input
                type="file"
                name="selectedFiles"
                accept="image/x-png,image/gif,image/jpeg"
                required
              />
            </li>
            <br />
            <li>
              <input type="Submit" name="upload" />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

PostUploadFormPopup.propTypes = {
  showPopup: PropTypes.bool,
  fileUpload: PropTypes.func,
  categories: PropTypes.array
};

export default PostUploadFormPopup;
