import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useChannelGlobalContext } from '../actions/channel';
const CreateChannel = () => {
  const { createChannel, error } = useChannelGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [images, setImages] = useState({
    image: '',
    cover: '',
  });
  const [show, setShow] = useState({
    field1: false,
    field2: false,
  });
  const { description, title } = formData;
  const onFocus = (e) => setShow({ ...show, [e.target.dataset.input]: true });
  const onBlur = (e) => setShow({ ...show, [e.target.dataset.input]: false });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImages = (e) => {
    console.log(e.target.file, e.target.files);
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImages({ ...images, [e.target.name]: img });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formD = new FormData();
    formD.append('title', title);
    formD.append('description', description);
    formD.append('image', images.image);
    formD.append('cover', images.cover);
    if (description && title) {
      createChannel(formD);
      navigate('/dashboard');
    } else {
      window.alert('Please fill all the required fields');
    }
  };
  return (
    <section className='channel'>
      <div className='form center'>
        <div className='create'>
          <div className='info'>
            <h2 className='main-header h2'>Create a Channel</h2>
          </div>
          <form encType='multipart/form-data' onSubmit={(e) => onSubmit(e)}>
            <div className='file-upload'>
              <i className='fa-solid fa-camera'></i>
              <input
                type='file'
                onChange={(e) => onChangeImages(e)}
                name='image'
              />
              <label htmlFor='image'>Upload a Image</label>
            </div>
            <div className={`form-control ${show.field1 && 'active'}`}>
              <label htmlFor='title'>
                Title : <span className='required'>*</span>{' '}
              </label>
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
            <div className={`form-textarea ${show.field2 && 'active'}`}>
              <label htmlFor='description'>
                Description : <span className='required'>*</span>
              </label>

              <textarea
                data-input='field2'
                className='textarea'
                placeholder='Enter Description...'
                id='description'
                name='description'
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
                value={description}
              ></textarea>
            </div>

            <div className='file-upload'>
              <i className='fa-solid fa-camera'></i>
              <input
                type='file'
                onChange={(e) => onChangeImages(e)}
                name='cover'
              />
              <label htmlFor='cover'>Upload a Cover </label>
            </div>

            {/* <Link to='/' className='btn-2'>
              Back
            </Link> */}
            <button type='submit' className='btn'>
              Create a Channel
            </button>
          </form>
        </div>
      </div>
      <div className={`preview ${images.image || images.cover ? 'show' : ''}`}>
        <i id='close-preview' className='fa-solid fa-times'></i>
        <div className='image'>
          <span>Channel Image</span>
          <img
            src={
              images.image
                ? URL.createObjectURL(images.image)
                : '/img/no-image.png'
            }
            alt=''
          />
        </div>
        <div className='cover'>
          <span>Channel Cover</span>
          <img
            src={
              images.cover
                ? URL.createObjectURL(images.cover)
                : '/img/no-cover.png'
            }
            alt=''
          />
        </div>
      </div>
    </section>
  );
};
export default CreateChannel;
