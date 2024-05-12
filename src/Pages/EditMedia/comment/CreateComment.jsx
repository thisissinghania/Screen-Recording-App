import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles.css'
const CreateComment = ({ onCommentSubmit }) => {
    const [content, setContent] = useState('');

    const handleTextChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        onCommentSubmit({
            content: content.trim(),
            publishDate: formattedDate,
        });

        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="createComment">
            <textarea
                id="comment"
                type="text"
                placeholder="Comment"
                className='text-area'
                value={content}
                onChange={handleTextChange}
                required
            />
            <button type="submit" className='post-btn' style={{
                color: '#0f0f0f',
                backgroundColor: 'burlywood',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                alignSelf: 'center',
                marginTop: '5px'
            }}>Post Comment</button>
        </form>
    );
};

CreateComment.propTypes = {
    onCommentSubmit: PropTypes.func.isRequired,
};

export default CreateComment;
