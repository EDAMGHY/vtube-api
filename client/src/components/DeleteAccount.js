import React from 'react';

const DeleteAccount = ({ deleteTheAccount }) => {
  return (
    <div className='edit'>
      <h2>Delete Account</h2>
      <p>You can delete your entire account!</p>
      <button onClick={deleteTheAccount} className='btn-2'>
        <i className='fa-solid fa-user-minus'></i> Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
