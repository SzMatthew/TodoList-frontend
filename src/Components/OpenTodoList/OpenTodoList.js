import React from 'react';
import './OpenTodoList.scss';

const OpenTodoList = () => {
  return (
    <section className='openTodo'>
      <span className='openTodo__label'>Please select a TodoList from the side navigation!</span>
      <img src='/choose.svg' className='openTodo__img'/>
    </section>
  );
};

export default OpenTodoList;