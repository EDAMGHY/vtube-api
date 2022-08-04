import React from 'react';

const Home = ({ nameClass, children }) => {
  return (
    <main className={`${nameClass}`}>
      <div className='container'>{children}</div>
    </main>
  );
};

export default Home;
