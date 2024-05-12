import React, { useState } from "react";

const VideoPlayer = ({ localVideoLink, isReactionOnVideo }) => {
    const [reactions, setReactions] = useState([]);

    return (
        <div className="video-container">
            <video
                id="blob_video"
                autoPlay
                controls
                className={isReactionOnVideo ? 'video' : 'video-without-reaction'}
                src={localVideoLink}
            >

            </video>

        </div>
    );
};

export default VideoPlayer;
