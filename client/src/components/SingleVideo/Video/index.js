import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../../../actions/auth';
import { useVideoGlobalContext } from '../../../actions/video';

const VideoComponent = ({ singleVideo }) => {
  const navigate = useNavigate();
  const { isAuthenticated, userChannel } = useAuthGlobalContext();
  const { deleteVideo } = useVideoGlobalContext();
  const onDelete = (vid) => {
    deleteVideo(vid);
    navigate('/');
  };
  return (
    <div className='vid-container'>
      <video
        src={`http://localhost:5000/${singleVideo.videoPath}`}
        controls
      ></video>
      {isAuthenticated &&
      userChannel &&
      userChannel._id === singleVideo.channel._id ? (
        <div>
          <Link to={`/video/edit/${singleVideo._id}`}>
            <button>
              <i className='fa-solid fa-pen-to-square'></i>
            </button>
          </Link>
          <button onClick={() => onDelete(singleVideo._id)}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default VideoComponent;
