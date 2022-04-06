import React, { useState } from 'react';
import LoginDropDown from '../LoginDropDown/LoginDropDown';
import { useUser } from '../../Contexts/user-context';
import './Login.scss';

const Login = () => {
  const { state: {user} } = useUser();
  const [isLogindrowDownOpen, setIsLoginDropDownOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginDropDownOpen(!isLogindrowDownOpen);
  };

  return (
    <div className='login'>
      {
        user
        ? <img src={user.imageUrl} alt='Profile Picture' className='login__profile-picture' onClick={handleLoginClick} />
        : <span className='login__label' onClick={handleLoginClick}>Login</span>
      }
      {
        isLogindrowDownOpen
        ? <LoginDropDown handleLoginClick={handleLoginClick}/>
        : null
      }
    </div>
  );
};

export default Login;