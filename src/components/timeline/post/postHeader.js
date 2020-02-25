import React from 'react';
import PropTypes from 'prop-types';

const PostHeader = props => {
    const { data } = props;
    return (
        <div>
            <div className="div_title">{data.title}</div>
            <div className="btm_rgt">
                <div className="btm_arc">{data.category}</div>
            </div>
        </div>
    );
};

PostHeader.propTypes = {
    data: PropTypes.object,
};
export default PostHeader;