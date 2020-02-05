import React from "react";
import PropTypes from "prop-types";

const Profile = props => {
  const { allPosts } = props;
  return (
    <div className="contnt_1">
      <div className="list_1">
        <ul>
          <li>
            <input type="checkbox" className="chk_bx" />
            Friends
          </li>
          <li>
            <input type="checkbox" className="chk_bx" />
            Flaged
          </li>
        </ul>
      </div>
      <div className="timeline_div">
        <div className="timeline_div1">
          <div className="profile_pic">
            <img src="images/timeline_profile.jpg" alt="" />
            <div className="profile_text">
              <a href="#">Change Profile Pic</a>
            </div>
          </div>
          <div className="profile_info">
            <div className="edit_div">
              <a href="#">
                Edit <img src="images/timeline_img.png" alt="" />
              </a>
            </div>
            <div className="profile_form">
              <ul>
                <li>
                  <div className="div_name1">Name :</div>
                  <div className="div_name2">
                    {localStorage.getItem("name")}
                  </div>
                </li>
                {/* <li>
                      <div className="div_name1">Sex :</div>
                      <div className="div_name2">Female</div>
                    </li> */}
                <li>
                  <div className="div_name1">Description :</div>
                  <div className="div_name3">
                    This is an example of a comment. You can create as many
                    comments like this one or sub comments as you like and
                    manage all of your content inside Account.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="timeline_div2">
          <ul>
            <li>
              <a
                id="timeline"
                className="active"
                onClick={() => {
                  document.getElementById("timeline").className = "active";
                  document.getElementById("myuploads").className = "";
                  allPosts(0, "", "", true);
                }}
                href="#"
              >
                Timeline{" "}
              </a>
            </li>
            <li>
              <a href="#">About </a>
            </li>
            <li>
              <a href="#">Album</a>
            </li>
            <li>
              <a href="#"> Pets</a>
            </li>
            <li>
              <a
                id="myuploads"
                onClick={() => {
                  document.getElementById("myuploads").className = "active";
                  document.getElementById("timeline").className = "";
                  allPosts(0, "", localStorage.getItem("userID"), true);
                }}
                href="#"
              >
                My Uploads{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  allPosts: PropTypes.func
};

export default Profile;
