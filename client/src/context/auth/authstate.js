import React, { useReducer } from 'react';
import AuthContext from './authcontext';
import Authreducer from './authreducer';
import axios from 'axios';
import { LOGIN_SUCCESS } from '../type';

const Authstate = ({ children }) => {
  const initstate = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    isLoading: true,
    error: null,
    data: '',
    token: localStorage.getItem('token'),
  };

  const LoginHandler = async (formData) => {
    try {
      const config = {
        data: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        'http://localhost:8080/api/auth',
        formData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const [state, dispatch] = useReducer(Authreducer, initstate);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        isLoading: state.isLoading,
        error: state.error,
        data: state.data,
        LoginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Authstate;
