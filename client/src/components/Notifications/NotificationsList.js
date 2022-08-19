import React, { useEffect, useState } from 'react';
import { useProfileGlobalContext } from '../../actions/profile';
import CommentCard from './NotificationsTypes/CommentCard';
import LikeCard from './NotificationsTypes/LikeCard';
import SubscribeCard from './NotificationsTypes/SubscribeCard';
import UploadCard from './NotificationsTypes/UploadCard';

function NotificationsList({
  setShowAccount,
  showNotification,
  setShowNotification,
}) {
  const {
    profile,
    notifications,
    unseen,
    getNotifications,
    updateNotifications,
  } = useProfileGlobalContext();
  const toggleNotification = () => {
    setShowAccount(false);
    setShowNotification(!showNotification);
    updateNotifications();
  };
  useEffect(() => {
    getNotifications();
  }, [getNotifications, profile]);
  return (
    <button className='noti-button' onClick={toggleNotification}>
      {unseen !== 0 && <span className='num'> {unseen}</span>}
      <i className='fa-solid fa-bell'></i>
      <ul
        className={`notification-container  scrollbar ${
          showNotification ? '' : 'none'
        }`}
      >
        {notifications.length > 0 ? (
          <>
            {notifications.map((item, index) =>
              (() => {
                if (item.user) {
                  switch (item.type) {
                    case 'subscribe':
                      return <SubscribeCard key={index} item={item} />;
                    case 'like':
                      return <LikeCard key={index} item={item} />;
                    case 'comment':
                      return <CommentCard key={index} item={item} />;
                    case 'upload':
                      return <UploadCard key={index} item={item} />;
                  }
                }
              })()
            )}
          </>
        ) : (
          <h4 className='text-center my-4'>No Notification...</h4>
        )}
      </ul>
    </button>
  );
}

export default NotificationsList;
