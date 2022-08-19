import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChannelGlobalContext } from '../actions/channel';
import { useAuthGlobalContext } from '../actions/auth';

const initialState = {
  title: '',
  description: '',
};
const initialStateImage = {
  image: '',
  cover: '',
};
const EditProfile = () => {
  const { userChannel, loadChannel, loading } = useAuthGlobalContext();
  const { createChannel } = useChannelGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [images, setImages] = useState(initialStateImage);
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
    console.log(formD);
    createChannel(formD);
    navigate(`/dashboard`);
  };
  useEffect(() => {
    if (!userChannel) loadChannel();

    if (userChannel) {
      const channelData = { ...initialState };
      const imagesData = { ...initialStateImage };
      for (const key in userChannel) {
        if (key in channelData) {
          channelData[key] = userChannel[key];
        }
        if (key in imagesData) {
          imagesData[key] = userChannel[key];
        }
      }
      console.log('channelData', channelData, imagesData);
      imagesData.image = `http://localhost:5000/${imagesData.image}`;
      imagesData.cover = `http://localhost:5000/${imagesData.cover}`;
      setFormData(channelData);
      setImages(imagesData);
    }
  }, [loading, userChannel, loadChannel]);
  console.log(userChannel);
  return (
    <section className='channel'>
      <div className='form center'>
        <div className='create'>
          <div className='info'>
            <h2 className='main-header h2'>Edit a Channel</h2>
          </div>
          <form onSubmit={onSubmit}>
            <div className='file-upload'>
              <i className='fa-solid fa-camera'></i>
              <input
                type='file'
                onChange={(e) => onChangeImages(e)}
                name='image'
              />
              <label htmlFor=''>Upload a Image</label>
            </div>
            <div className={`form-textarea ${show.field2 && 'active'}`}>
              <label htmlFor='title'>Title :</label>
              <textarea
                data-input='field2'
                className='textarea'
                placeholder='Enter Title...'
                id='title'
                name='title'
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
                value={title}
              ></textarea>
            </div>{' '}
            <div className={`form-textarea ${show.field2 && 'active'}`}>
              <label htmlFor='description'>Description :</label>

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
              <label htmlFor=''>Upload a Cover </label>
            </div>
            <button type='submit' className='btn'>
              Edit Your Channel
            </button>
          </form>
        </div>
      </div>
      <div className={`preview ${images.image && images.cover ? 'show' : ''}`}>
        <i id='close-preview' className='fa-solid fa-times'></i>
        <div className='image'>
          <span>Channel Image</span>
          <img
            src={
              images.image && images.image.name
                ? URL.createObjectURL(images.image)
                : images.image &&
                  images.image.includes('http') &&
                  images.image.includes('uploads')
                ? images.image
                : images.image &&
                  images.image.includes('http') &&
                  !images.image.includes('uploads')
                ? '/img/no-image.png'
                : ''
            }
            alt=''
          />
        </div>
        <div className='cover'>
          <span>Channel Cover</span>
          <img
            src={
              images.cover && images.cover.name
                ? URL.createObjectURL(images.cover)
                : images.cover &&
                  images.cover.includes('http') &&
                  images.cover.includes('uploads')
                ? images.cover
                : images.cover &&
                  images.cover.includes('http') &&
                  !images.cover.includes('uploads')
                ? '/img/no-cover.png'
                : ''
            }
            alt=''
          />
        </div>
      </div>
    </section>
  );
};
export default EditProfile;
