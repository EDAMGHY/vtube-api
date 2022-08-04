import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
const NoAccount = () => {
  return (
    <Section nameClass='no-account'>
      {/* <img src='./img/new-not-found.png' alt='' /> */}
      <div>
        <h3 className='text-center'>
          It seems that you don't have an Account. Create One!
        </h3>
        <Link className='btn-2' to='/register'>
          Register
        </Link>
      </div>
      <div>
        <h3 className='text-center'>Am I Wrong? Then Log In!</h3>
        <Link className='btn-2' to='/login'>
          Login
        </Link>
      </div>
      <div>
        <h3 className='text-center'>
          I don't Why I keep guessing wrong, Well have a Look!
        </h3>
        <Link className='btn-2' to='/'>
          Back Home
        </Link>
      </div>
    </Section>
  );
};
export default NoAccount;
