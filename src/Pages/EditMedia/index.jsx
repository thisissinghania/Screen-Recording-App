import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./styles.css";
import LikeButton from "./component/LikeButton";
import CommentBox from "./comment/CommentBox";
import VideoPlayer from "./component/VideoPlayer";
import { LOCAL_STORAGE } from "../../utils/constants";
import { useSelector } from 'react-redux';
function VideoEditor() {
  const id = useSelector((state) => state.id.value) || localStorage.getItem('video-id');
  const [liked, setLiked] = useState();
  const firstCardRef = useRef(null);
  const [isReactionOnVideo, setIsReactionOnVideo] = useState(true);
  const blobLink = localStorage.getItem(LOCAL_STORAGE.BLOB_LINK);
  const reaction = useSelector((state) => state.setting.commentAndReaction) ||
    JSON.parse(localStorage.getItem("commentAndReaction"));
  console.log("reaction>>", reaction)
  useLayoutEffect(() => {

    setIsReactionOnVideo(reaction)

  }, [reaction])
  const data = {
    comments: []
  };


  const handleEdit = () => {
    const editorUrl = `https://studio.cinema8.site/video-editor/edit?media-id=${id}`;
    window.open(editorUrl, '_blank').focus();
  }
  const handleLikeClick = () => {
    setLiked(!liked)
  };

  return (
    <div className='web_h-screen'>
      <div className="mx-auto flex my-5 wrapper-edit">
        <div ref={firstCardRef} className="card p-5  items-center justify-center" style={{ flex: '70%', }}>
          <div className="card-title mb-5 text-2xl font-bold">VIDEO EDITOR</div>
          <div className="card-content  h-full aspect-w-16 aspect-h-9">
            <VideoPlayer localVideoLink={blobLink} isReactionOnVideo={isReactionOnVideo} />
          </div>
          <div className="btns">
            {isReactionOnVideo && <LikeButton liked={liked} onClick={handleLikeClick} />}
            <button className={`edit-button`} onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
        {isReactionOnVideo && <div className="card p-5 items-center comments" style={{ flex: '30%', maxHeight: 'var(--comments-max-height)', overflowY: 'auto' }}>
          <div className="mb-5 text-2xl font-bold">Comments</div>
          <CommentBox comments={data.comments} />
        </div>}
      </div>
    </div>
  );
}

export default VideoEditor;
