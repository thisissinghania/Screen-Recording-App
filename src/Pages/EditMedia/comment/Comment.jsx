import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ id, publishDate, content }) => (
    <div className="comment" key={id}>
        <div className="commentBody">
            <div className="commentHeader">
                <span className="commentContent" >{content}</span>
                <span className="publishDate">{publishDate}</span>
            </div>
        </div>
    </div>
);

Comment.propTypes = {
    publishDate: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Comment;
