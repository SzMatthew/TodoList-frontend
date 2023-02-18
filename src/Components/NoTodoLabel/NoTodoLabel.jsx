import React from 'react';
import './NoTodoLabel.scss';

const NoTodoLabel = ({ text }) => {
  return (
    <div className='noTodoWrapper'>
      <span>{text}</span>
    </div>
  );
};

export default NoTodoLabel;