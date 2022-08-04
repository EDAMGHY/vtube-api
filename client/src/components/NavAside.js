import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Asidebar from './Asidebar';
import Navbar from './Navbar';
const NavAside = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Navbar show={show} setShow={setShow} />
      <div className='all'>
        <Asidebar show={show} />
        <Outlet />
      </div>
    </>
  );
};
export default NavAside;
