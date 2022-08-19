import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileGlobalContext } from '../actions/profile';
import { getCountries } from '../utils/apis';
const CreateProfile = () => {
  const { createProfile } = useProfileGlobalContext();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    bio: '',
    location: 'Morocco',
  });
  const [images, setImages] = useState({
    image: '',
    cover: '',
  });
  const [show, setShow] = useState({
    field1: false,
    field2: false,
  });
  const { location, bio } = formData;
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
    formD.append('bio', bio);
    formD.append('location', location);
    formD.append('image', images.image);
    formD.append('cover', images.cover);
    if (!location || !bio) {
      window.alert('Please fill all the required fields');
    } else {
      createProfile(formD);
      navigate('/dashboard');
    }
  };
  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);
  return (
    <section className='profile'>
      <div className='form center'>
        <div className='create'>
          <div className='info'>
            <h2 className='main-header h2'>Create a Profile</h2>
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
            <div className={`form-select ${show.field1 && 'active'}`}>
              <label htmlFor='location'>
                Location : <span className='required'>*</span>
              </label>
              <select
                data-input='field1'
                type='text'
                className='input'
                placeholder='Enter Location...'
                id='location'
                name='location'
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
                value={location}
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={`form-textarea ${show.field2 && 'active'}`}>
              <label htmlFor='bio'>
                Bio : <span className='required'>*</span>
              </label>
              <textarea
                data-input='field2'
                className='textarea'
                placeholder='Enter Bio...'
                id='bio'
                name='bio'
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)}
                value={bio}
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

            <button type='submit' className='btn'>
              Create a Profile
            </button>
          </form>
        </div>
      </div>
      <div className={`preview ${images.image || images.cover ? 'show' : ''}`}>
        <i id='close-preview' className='fa-solid fa-times'></i>
        <div className='image'>
          <span>Profile Image</span>
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
          <span>Profile Cover</span>
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
export default CreateProfile;
