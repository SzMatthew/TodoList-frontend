import React, { useState } from 'react';
import LoginDropDown from '../LoginDropDown/LoginDropDown';
import { useUser } from '../../Contexts/user-context';
import './Login.scss';

const Login = () => {
  const { state: { user, isLogindrowDownOpen }, handleLoginClick } = useUser();

  return (
    <div className='login'>
      {
        user
          ? <img src={user.imageUrl} alt='Profile Picture' className='login__profile-picture' onClick={handleLoginClick} />
          : <span className='login__label' onClick={handleLoginClick}>Login</span>
      }
      { isLogindrowDownOpen && <LoginDropDown/> }
    </div>
  );
};

export default Login;