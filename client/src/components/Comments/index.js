import React, { useState } from 'react';
import { useVideoGlobalContext } from '../../actions/video';
import CommentItem from './CommentItem';

const Comments = ({ singleVideo }) => {
  const { commentVideo } = useVideoGlobalContext();

  const [text, setText] = useState('');

  const [show, setShow] = useState({
    field1: false,
  });

  const onFocus = (e) => setShow({ ...show, [e.target.dataset.input]: true });
  const onBlur = (e) => setShow({ ...show, [e.target.dataset.input]: false });

  const commentAVideo = (e) => {
    e.preventDefault();
    if (text) {
      commentVideo(singleVideo._id, text);
      setText('');
    } else {
      window.alert('Please add Comment...');
    }
  };

  return (
    <div className='comments'>
      <h4>{singleVideo.comments.length} Comments</h4>
      <form className='form' onSubmit={commentAVideo}>
        <div className={`form-control ${show.field1 && 'active'}`}>
          <input
            data-input='field1'
            onFocus={(e) => onFocus(e)}
            onBlur={(e) => onBlur(e)}
            type='text'
            name='text'
            placeholder='Add a comment...'
            className='input'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className='btn'>Add</button>
      </form>
      <div className='comment-container'>
        {singleVideo.comments.length > 0 ? (
          singleVideo.comments.map((comment) => (
            <CommentItem singleVideo={singleVideo} comment={comment} />
          ))
        ) : (
          <h3 className='text-center'>No Comments</h3>
        )}
      </div>
    </div>
  );
};

export default Comments;
