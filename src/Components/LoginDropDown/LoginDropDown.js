import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './LoginDropDown.scss';

const LoginDropDown = ({isLoggedIn, loginSuccess, loginError, logOut, handleLoginClick}) => {
  return (
    <div className='dropDown' >
      {
        isLoggedIn
        ? <GoogleLogout
            clientId={'500105997849-mr28pnsqlc5vussqcv35lqf73q2u2t33.apps.googleusercontent.com'}
            buttonText={'Logout'}
            onLogoutSuccess={logOut}
            textInputProps={{
              onBlur  : {handleLoginClick}
            }}
          ></GoogleLogout>
        : <GoogleLogin
            clientId={'500105997849-mr28pnsqlc5vussqcv35lqf73q2u2t33.apps.googleusercontent.com'}
            buttonText="Sign In with Google"
            onSuccess={loginSuccess}
            onFailure={loginError}
            isSignedIn={true}
            textInputProps={{
              onBlur  : {handleLoginClick}
            }}
            cookiePolicy={'single_host_origin'}
          />
      }
    </div>
  );
};

export default LoginDropDown;