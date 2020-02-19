import React from 'react'
import { Link } from 'react-router-dom';

import likepost from '../../../helpers/likepost'

const PostButtons = props => {
	const { data } = props;
	return (
		<div className="div_btm">
			<div className="btm_list">
				<ul>
					<li>
						<a href="#">
							<span className="btn_icon">
								<img src="/images/icon_001.png" alt="share" />
							</span>
							Share
              </a>
					</li>
					<li>
						<a href="#">
							<span className="btn_icon">
								<img src="/images/icon_002.png" alt="share" />
							</span>
							Flag
              </a>
					</li>
					<li>
						<a
							onClick={() => {
								likepost(data._id);
							}}
						>
							<span className="btn_icon">
								<img src="/images/icon_003.png" alt="share" />
							</span>
							{data.likes.length} Like
              </a>
					</li>
					<li>
						<Link to={'/single_post/' + data._id}>
							<span className="btn_icon">
								<img src="/images/icon_004.png" alt="share" />
							</span>
							{data.commentsCount} Comments
              </Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default PostButtons;