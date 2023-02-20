import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../Contexts/user-context';
import { useHistory } from 'react-router-dom';

import './Login.scss';

const Login = () => {
  const { loginSuccess, loginError } = useUser();
  const history = useHistory();

  const handleSuccess = (response) => {
    loginSuccess(response);
    history.push('/');
  };

  return (
    <div className="login">
      <img src='/login.svg' className='login__img'/>
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={loginError}
        useOneTap
        auto_select
      />
    </div>
  );
};

export default Login;