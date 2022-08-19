import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVideoGlobalContext } from '../actions/video';
import { useAuthGlobalContext } from '../actions/auth';
const initialState = {
  title: '',
  description: '',
  tags: '',
  category: 'Anime & Animation',
};
const EditVideo = () => {
  const { editVideo, current, getVideoByID, loading } = useVideoGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [upVideo, setUpVideo] = useState({
    videoPath: '',
  });
  const [show, setShow] = useState({
    field1: false,
    field2: false,
  });
  const { description, title, tags, category } = formData;
  const onFocus = (e) => setShow({ ...show, [e.target.dataset.input]: true });
  const onBlur = (e) => setShow({ ...show, [e.target.dataset.input]: false });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeVideo = (e) => {
    console.log(e.target.file, e.target.files);
    if (e.target.files && e.target.files[0]) {
      let vid = e.target.files[0];
      setUpVideo({ ...upVideo, [e.target.name]: vid });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formD = new FormData();
    formD.append('title', title);
    formD.append('description', description);
    formD.append('category', category);
    formD.append('tags', tags);
    formD.append('videoPath', upVideo.videoPath);
    // console.log('msg', msg);
    editVideo(formD, current._id);
    navigate('/dashboard');
  };
  useEffect(() => {
    getVideoByID(id);
  }, [id]);
  useEffect(() => {
    if (!current) getVideoByID(id);

    if (current) {
      const videoData = { ...initialState };
      for (const key in current) {
        if (key in videoData) {
          videoData[key] = current[key];
        }
      }
      if (Array.isArray(videoData.tags))
        videoData.tags = videoData.tags.join(', ');
      setFormData(videoData);
      console.log(videoData, initialState);
    }
  }, [loading, current, getVideoByID]);
  console.log(current);
  return (
    <section className='vid-p'>
      <div className='form center'>
        <div className='create'>
          <div className='info'>
            <h2 className='main-header h2'>Edit a Video</h2>
          </div>
          <form encType='multipart/form-data' onSubmit={(e) => onSubmit(e)}>
            <div className='file-upload'>
              <i className='fa-solid fa-video'></i>
              <input
                type='file'
                onChange={(e) => onChangeVideo(e)}
                name='videoPath'
              />
              <label htmlFor='image'>Upload a Video</label>
            </div>
            <div className={`form-control ${show.field1 && 'active'}`}>
              <label htmlFor='title'>Title :</label>
              <input
                data-input='field1'
                className='input'
                type='text'
                placeholder='Enter Title...'
                id='title'
                name='title'
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
                value={title}
              />
            </div>
            <div className='form-select'>
              <label for='category'>Category</label>
              <select
                id='category'
                name='category'
                className='select'
                onChange={(e) => onChange(e)}
                value={category}
              >
                <option value='Select a Category' disabled selected={true}>
                  Select a Category
                </option>
                <option value='Anime &amp; Animation'>
                  Anime &amp; Animation
                </option>
                <option value='Autos &amp; Vehicles'>
                  Autos &amp; Vehicles
                </option>
                <option value='Comedy'>Comedy</option>
                <option value='Education'>Education</option>
                <option value='Entertainment'>Entertainment</option>
                <option value='Fashion &amp; Style'>Fashion &amp; Style</option>
                <option value='Film &amp; Movies'>Film &amp; Movies</option>
                <option value='How-to-do'>How-to-do</option>
                <option value='Gaming'>Gaming</option>
                <option value='Music'>Music</option>
                <option value='News &amp; Politics'>News &amp; Politics</option>
                <option value='People &amp; Blogs'>People &amp; Blogs</option>
                <option value='Pets &amp; Animals'>Pets &amp; Animals</option>
                <option value='Science &amp; Technology'>
                  Science &amp; Technology
                </option>
                <option value='Sports'>Sports</option>
                <option value='Travel &amp; Events'>Travel &amp; Events</option>
              </select>
            </div>
            <div className={`form-control ${show.field2 && 'active'}`}>
              <label for='tags'>Tags :</label>
              <input
                data-input='field2'
                type='text'
                className='input'
                placeholder='Enter Tags...'
                id='tags'
                name='tags'
                value={tags}
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={`form-textarea `}>
              <label htmlFor='description'>Description :</label>

              <textarea
                className='textarea'
                placeholder='Enter Description...'
                id='description'
                name='description'
                onChange={(e) => onChange(e)}
                value={description}
              ></textarea>
            </div>

            <button type='submit' className='btn'>
              Edit a Video
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default EditVideo;
