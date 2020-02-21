import React from 'react';

const ProfileInfo = () => {
	return (
		<div className="timeline_div">
			<div className="timeline_div1">
				<div className="profile_pic">
					<img src="/images/timeline_profile.jpg" alt="" />
					<div className="profile_text">
						<a href="#">Change Profile Pic</a>
					</div>
				</div>
				<div className="profile_info">
					<div className="edit_div">
						<a href="#">
							Edit <img src="/images/timeline_img.png" alt="" />
						</a>
					</div>
					<div className="profile_form">
						<ul>
							<li>
								<div className="div_name1">Name :</div>
								<div className="div_name2">
									{localStorage.getItem('name')}
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
		</div>
	);
};

export default ProfileInfo;