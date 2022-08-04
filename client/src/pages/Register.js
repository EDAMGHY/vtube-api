import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState({
    field1: false,
    field2: false,
    field3: false,
    field4: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { register, isAuthenticated } = useAuthGlobalContext();

  const onFocus = (e) => setShow({ ...show, [e.target.dataset.input]: true });
  const onBlur = (e) => setShow({ ...show, [e.target.dataset.input]: false });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      window.alert('Passwords do not match!');
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return navigate('/profile');
  }
  return (
    <section className='section'>
      <div className='grid-2'>
        <div className='image-container center'>
          <img src='./img/register.svg' alt='' />
        </div>
        <div className='form center'>
          <div className='logo'>
            <img src='./img/logo-1.svg' alt='' />
          </div>
          <div className='info'>
            <h1 className='main-header h1'>Sign Up</h1>
          </div>
          <form className='center column' onSubmit={(e) => onSubmit(e)}>
            <div className={`form-control ${show.field1 && 'active'}`}>
              <label htmlFor='name'>Name :</label>
              <input
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                data-input='field1'
                className='input'
                type='text'
                placeholder='Enter Name...'
                id='name'
                name='name'
                required
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={`form-control ${show.field2 && 'active'}`}>
              <label htmlFor='email'>Email :</label>
              <input
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                type='email'
                data-input='field2'
                className='input'
                placeholder='Enter Email...'
                id='email'
                name='email'
                required
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={`form-control ${show.field3 && 'active'}`}>
              <label htmlFor='password'>Password :</label>
              <input
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                data-input='field3'
                type='password'
                placeholder='Enter Password...'
                id='password'
                name='password'
                className='input'
                required
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={`form-control ${show.field4 && 'active'}`}>
              <label htmlFor='password2'>Confirm Password :</label>
              <input
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                data-input='field4'
                type='password'
                placeholder='Confirm Password...'
                id='password2'
                name='password2'
                className='input'
                required
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button type='submit' className='btn'>
              Sign Up
            </button>
          </form>
          <p className='paragraph'>
            Already have an Account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Register;
