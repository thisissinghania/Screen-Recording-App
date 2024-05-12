import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CreateComment from './CreateComment';

const CommentBox = ({ comments }) => {
    const [commentList, setCommentList] = useState(comments);

    const handleCommentSubmit = (comment) => {
        const newCommentList = [comment, ...commentList];
        setCommentList(newCommentList);
    };



    return (
        <div className="commentBox">

            <CreateComment onCommentSubmit={handleCommentSubmit} />

            {commentList.map((comment) => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    publishDate={comment.publishDate}
                    content={comment.content}
                />
            ))}
        </div>
    );
};

CommentBox.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentBox;
