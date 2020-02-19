import React from 'react';

const PostHeader = props => {
    const { data } = props;
    return (
        <div>
            <div className="div_title">{data.title}</div>
            <div className="btm_rgt">
                <div className="btm_arc">{data.category}</div>
            </div>
        </div>
    )
}
export default PostHeader