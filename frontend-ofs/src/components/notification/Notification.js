import './notification.css';
import React from 'react';

export const Notification = (props) => {
  const { forceHidden, className, center, message, multiple, type } = props;

  const classes = {
    'notification': true,
    [className]: !!className,
    [`notification-${type}`]: !!type,
    'notification-center': !!center
  };

  const showNotificaiton = () => {
    if (forceHidden || !!message) {
      return true;
    }
  }

  const renderMessages = () => {
    return !multiple 
      ? <p>{message}</p> 
      : <div dangerouslySetInnerHTML={{__html: message}}></div>;
  }

  const getClass = (classes) => (classes instanceof Object 
      ? Object.keys(classes).reduce((acc, key) => classes[key] ? [...acc, key] : acc, [])
      : ['']).join(' ');

  return (
    <div hidden={!showNotificaiton()} className={getClass(classes)}>
      {renderMessages()}
    </div>
  );
};

export default Notification;