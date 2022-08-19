import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileGlobalContext } from '../actions/profile';
import { useAuthGlobalContext } from '../actions/auth';
import { getCountries } from '../utils/apis';

const initialState = {
  bio: '',
  location: 'Morocco',
};
const initialStateImage = {
  image: '',
  cover: '',
};
const EditProfile = () => {
  const { userProfile, loadProfile, loading } = useAuthGlobalContext();
  const { createProfile } = useProfileGlobalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [countries, setCountries] = useState([]);
  const [images, setImages] = useState(initialStateImage);
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
    console.log(formD);
    createProfile(formD);
    navigate(`/profiles/${userProfile.user._id}`);
  };
  useEffect(() => {
    if (!userProfile) loadProfile();

    if (userProfile) {
      const profileData = { ...initialState };
      const imagesData = { ...initialStateImage };
      for (const key in userProfile) {
        if (key in profileData) {
          profileData[key] = userProfile[key];
        }
        if (key in imagesData) {
          imagesData[key] = userProfile[key];
        }
      }
      console.log('profileData', profileData, imagesData);
      imagesData.image = `http://localhost:5000/${imagesData.image}`;
      imagesData.cover = `http://localhost:5000/${imagesData.cover}`;
      setFormData(profileData);
      setImages(imagesData);
    }
  }, [loading, userProfile, loadProfile]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);
  console.log(userProfile);

  return (
    <section className='profile'>
      <div className='form center'>
        <div className='create'>
          <div className='info'>
            <h2 className='main-header h2'>Edit a Profile</h2>
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

            <div className={`form-select ${show.field1 && 'active'}`}>
              <label htmlFor='location'>Location :</label>
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
              <label htmlFor='bio'>Bio :</label>
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
              <label htmlFor=''>Upload a Cover </label>
            </div>

            <button type='submit' className='btn'>
              Edit Your Profile
            </button>
          </form>
        </div>
      </div>
      <div className={`preview ${images.image && images.cover ? 'show' : ''}`}>
        <i id='close-preview' className='fa-solid fa-times'></i>
        <div className='image'>
          <span>Profile Image</span>
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
          <span>Profile Cover</span>
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
