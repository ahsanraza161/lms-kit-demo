import React, { useReducer } from 'react';
import AuthContext from './authcontext';
import Authreducer from './authreducer';
import axios from 'axios';
import { LOGIN_SUCCESS } from '../type';
import toast from 'react-hot-toast';

const Authstate = ({ children }) => {
  const notify = (msg) => toast(msg);
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
      if (res.data === 'Your account request has been sent to admin') {
        notify(res.data);
      } else if (1) {
      }
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
