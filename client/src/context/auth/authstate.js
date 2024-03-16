import React, { useReducer } from 'react';
import AuthContext from './authcontext';
import Authreducer from './authreducer';
import axios from 'axios';
import { LOGIN_FAIL, REGISTER_SUCCESS } from '../type';

const Authstate = ({ children }) => {
  const initstate = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    isLoading: true,
    error: null,
    data: '',
    token: localStorage.getItem('token'),
    message: null,
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
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  const RegisterHandler = async (formData) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users',
        formData
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.msg,
      });
    } catch (err) {
      console.log(err.response);
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
        message: state.message,
        LoginHandler,
        RegisterHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Authstate;
