import React, { useState } from 'react';
import LoginDropDown from '../LoginDropDown/LoginDropDown';
import './Login.scss';

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogindrowDownOpen, setIsLoginDropDownOpen] = useState(false);

  const loginSuccess = (response) => {
    console.log('response', response);
    setUserInfo({
      name: response.profileObj.name,
      emailId: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl
    });
  };

  const loginError = (response) => {
    console.error(response);
  };

  const logOut = () => {
    setUserInfo(null);
  };

  const handleLoginClick = () => {
    console.log('ITT');
    setIsLoginDropDownOpen(!isLogindrowDownOpen);
  };

  return (
    <div className='login'>
      {
        userInfo
        ? <img src={userInfo.imageUrl} alt='Profile Picture' className='login__profile-picture' onClick={handleLoginClick} />
        : <span className='login__label' onClick={handleLoginClick}>Login</span>
      }
      {
        isLogindrowDownOpen
        ? <LoginDropDown isLoggedIn={!!userInfo} loginSuccess={loginSuccess} loginError={loginError} logOut={logOut} handleLoginClick={handleLoginClick}/>
        : null
      }
    </div>
  );
};

export default Login;