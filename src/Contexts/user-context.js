import React, { createContext, useContext, useMemo, useState } from 'react';
import jwt_decode from 'jwt-decode';

const UserContext = createContext();


const initialeState = {
  user: null,
  isLogindrowDownOpen: true
};

const UserProvider = props => {
  const [state, setState] = useState(initialeState);
  const value = useMemo(() => [state, setState], [state]);
  return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
  const [state, setState] = useContext(UserContext);

  const setUser = user => {
    setState({ isLogindrowDownOpen: false, user: user });
  };

  const loginSuccess = response => {
    const decodedCredential = jwt_decode(response.credential);
    console.log('🚀 ~ decodedCredential', decodedCredential);
    setUser({
      email: decodedCredential.email,
      name: decodedCredential.name,
      imageUrl: decodedCredential.picture,
      userId: decodedCredential.sub
    });
  };

  const loginError = response => {
    console.error(response);
  };

  const logOut = () => {
    setUser(null);
  };

  const handleLoginClick = () => {
    setState({ user: state.user, isLogindrowDownOpen: !state.isLogindrowDownOpen });
  };

  const closeLoginDropDown = () => {
    setState({ user: state.user, isLogindrowDownOpen: false });
  };

  return {
    user: state.user,
    isLogindrowDownOpen: state.isLogindrowDownOpen,
    setUser,
    loginSuccess,
    loginError,
    logOut,
    handleLoginClick,
    closeLoginDropDown
  };
};

export { useUser, UserProvider };