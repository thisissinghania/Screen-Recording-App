function LikeButton({ liked, onClick }) {
    return (
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={onClick}>
            {liked ? 'Liked!' : 'Like'}
        </button>
    );
}
export default LikeButton;