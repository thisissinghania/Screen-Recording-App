function Video({ videoUrl, title }) {
    return (
        <div className="video">
            <iframe
                title={title}
                src={videoUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="mt-3 "
                id="blob_video"
                autoPlay
                controls
            ></iframe>
            {/* <h3>{title}</h3> */}
        </div>
    );
}
export default Video;