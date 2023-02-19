import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../Contexts/user-context';
import './LoginDropDown.scss';

const LoginDropDown = () => {
  const { user, loginSuccess, loginError, logOut, handleLoginClick } = useUser();

  return (
    <div className='dropDown' >
      {
        !user && <GoogleLogin
          onSuccess={loginSuccess}
          onFailure={loginError}
          useOneTap
          auto_select
        />
      }
    </div>
  );
};

export default LoginDropDown;