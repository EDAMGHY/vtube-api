import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
const NotFound = () => {
  return (
    <Section nameClass='not-found'>
      {/* <img src='./img/not-found.png' alt='' /> */}
      <img src='./img/new-not-found.png' alt='' />
      <Link to='/' className='btn'>
        Back To Home
      </Link>
    </Section>
  );
};
export default NotFound;
