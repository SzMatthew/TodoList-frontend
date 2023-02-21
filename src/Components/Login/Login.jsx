import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../Contexts/user-context';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Login.scss';

const Login = () => {
  const { user, loginSuccess, loginError } = useUser();
  const history = useHistory();

  useEffect(() => {
    const user = Cookies.get('user');
    console.log('🚀 ~ user:', user);
    if (user) {
      handleSuccess(JSON.parse(user));
    }
  },[]);

  const handleSuccess = (response) => {
    loginSuccess(response);
    Cookies.set('user', JSON.stringify(response), { expires: 60 });
    history.push('/');
  };

  return !user && (
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