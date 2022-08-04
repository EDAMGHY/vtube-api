import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthGlobalContext();
  const [show, setShow] = useState({
    field1: false,
    field2: false,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFocus = (e) => setShow({ ...show, [e.target.dataset.input]: true });
  const onBlur = (e) => setShow({ ...show, [e.target.dataset.input]: false });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return navigate('/dashboard');
  }
  return (
    <section className='section'>
      <div className='grid-2'>
        <div className='form center'>
          <div className='logo'>
            <img src='./img/logo-1.svg' alt='' />
          </div>
          <div className='info'>
            <h1 className='main-header h1'>Sign In</h1>
          </div>
          <form className='center column' onSubmit={(e) => onSubmit(e)}>
            <div className={`form-control ${show.field1 && 'active'}`}>
              <label htmlFor='email'>Email :</label>
              <input
                data-input='field1'
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                type='email'
                className='input'
                placeholder='Enter Email...'
                id='email'
                name='email'
                required
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={`form-control ${show.field2 && 'active'}`}>
              <label htmlFor='password'>Password :</label>
              <input
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                type='password'
                data-input='field2'
                placeholder='Enter Password...'
                id='password'
                name='password'
                className='input'
                required
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>

            <button type='submit' className='btn'>
              Sign In
            </button>
          </form>
          <p className='paragraph'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </div>
        <div className='image-container center'>
          <img src='./img/login.svg' alt='' />
        </div>
      </div>
    </section>
  );
};
export default Login;
