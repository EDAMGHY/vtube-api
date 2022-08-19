import React from 'react';
import { useAuthGlobalContext } from '../../actions/auth';
import { useVideoGlobalContext } from '../../actions/video';
import { timeSince } from '../../utils/utilities';

const CommentItem = ({ comment, singleVideo }) => {
  const { deleteComment } = useVideoGlobalContext();
  const { user, isAuthenticated } = useAuthGlobalContext();
  return (
    <div className='comment'>
      <img
        src={
          comment.userImage
            ? `http://localhost:5000/${comment.userImage}`
            : '/img/no-image.png'
        }
        alt=''
      />
      {isAuthenticated && user._id === comment.user ? (
        <button
          onClick={() => deleteComment(singleVideo._id, comment._id)}
          className='delete'
        >
          <i className='fa-solid fa-trash-can'></i>
        </button>
      ) : (
        ''
      )}

      <div className='info'>
        <div>
          <h5>{comment.userName}</h5>
          <span>{timeSince(comment.date)}</span>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
