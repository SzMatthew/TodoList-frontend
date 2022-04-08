import React, { createContext, useContext, useMemo, useReducer } from 'react';

const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return {
                user: action.payload,
                isLogindrowDownOpen: state.isLogindrowDownOpen
            };
        }
        case 'SET_ISLOGINDROPDOWNOPEN': {
            return {
                user: state.user,
                isLogindrowDownOpen: action.payload
            };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const initialeState = {
    user: null,
    isLogindrowDownOpen: true
};

const UserProvider = props => {
    const [state, dispatch] = useReducer(userReducer, initialeState);
    const value = useMemo(() => [state, dispatch], [state]);
    return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a TodoListProvider');
    }
    const [state, dispatch] = context;

    const setUser = user => {
        if (state.user !== user) {
            dispatch({type: 'SET_USER', payload: user});
        }
    };

    const loginSuccess = response => {
      setUser({
        userId: response.profileObj.googleId,
        name: response.profileObj.name,
        email: response.profileObj.email,
        imageUrl: response.profileObj.imageUrl
      });
    };

    const loginError = response => {
      console.error(response);
    };

    const logOut = () => {
      setUser(null);
    };

    const handleLoginClick = () => {
        dispatch({type: 'SET_ISLOGINDROPDOWNOPEN', payload: !state.isLogindrowDownOpen});
    };

    return {
        state,
        dispatch,
        setUser,
        loginSuccess,
        loginError,
        logOut,
        handleLoginClick
    };
};

export { useUser, UserProvider };