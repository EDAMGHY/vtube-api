import React, { useState } from 'react';
import Section from '../components/Section';
import { useThemeGlobalContext } from '../actions/theme';
import { useAuthGlobalContext } from '../actions/auth';
const Settings = () => {
  const { toggleDarkMode, darkMode, toggleColorScheme, colorScheme } =
    useThemeGlobalContext();
  const { isAuthenticated, user } = useAuthGlobalContext();

  const [toggle, setToggle] = useState(darkMode);
  const [color, setColor] = useState(colorScheme);

  const onClick = (e) => {
    setToggle(e.target.dataset.theme);
    toggleDarkMode(e.target.dataset.theme);
    console.log(toggle);
  };
  const toggleColor = (e) => {
    setColor(e.target.dataset.clr);
    toggleColorScheme(e.target.dataset.clr);
    console.log(color);
  };
  return (
    <Section nameClass='settings'>
      <h3 className='h3 my-2'>
        Hi again{' '}
        <span className='primary'>
          {isAuthenticated && user ? user.name : 'No Name...'}
        </span>
        ,
      </h3>
      <p className='main-2'>
        Improve you experience with these out-of-the-box features!
      </p>
      <div className='theme'>
        <h2>Change vTube Theme</h2>
        <p>You can switch between these primary palette colors!</p>
        <div className='colors'>
          <div
            className={`yellow ${color === 'yellow' && 'active'}`}
            onClick={toggleColor}
            data-clr='yellow'
          ></div>
          <div
            className={`red ${color === 'red' && 'active'}`}
            onClick={toggleColor}
            data-clr='red'
          ></div>
          <div
            className={`blue ${color === 'blue' && 'active'}`}
            onClick={toggleColor}
            data-clr='blue'
          ></div>
          <div
            className={`green ${color === 'green' && 'active'}`}
            onClick={toggleColor}
            data-clr='green'
          ></div>
          <div
            className={`orange ${color === 'orange' && 'active'}`}
            onClick={toggleColor}
            data-clr='orange'
          ></div>
          <div
            className={`purple ${color === 'purple' && 'active'}`}
            onClick={toggleColor}
            data-clr='purple'
          ></div>
        </div>
        <p>You can switch between Dark and Light Mode!</p>
        <div>
          <button
            onClick={onClick}
            data-theme='light'
            className={toggle === 'light' ? 'active' : ''}
          >
            <i data-theme='light' className='fa-solid fa-sun'></i> Light
          </button>
          <button
            onClick={onClick}
            data-theme='dark'
            className={toggle === 'dark' ? 'active' : ''}
          >
            <i data-theme='dark' className='fa-solid fa-moon'></i> Dark
          </button>
        </div>
      </div>
    </Section>
  );
};
export default Settings;
