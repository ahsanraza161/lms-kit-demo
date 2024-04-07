import React, { useReducer } from 'react';
import AuthContext from './authcontext';
import Authreducer from './authreducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { LOGIN_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS } from '../type';

const Authstate = ({ children }) => {
  const initstate = {
    isAdminAuthenticated: '',
    isStudentAuthenticated: '',
    isTeacherAuthenticated: '',
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
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
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
  const GetUserData = async () => {
    try {
      setAuthToken(state.token);
      const res = await axios.get('http://localhost:8080/api/auth');
      dispatch({
        type: 'getuserdata',
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);
    }
  };
  const UpdateUser = async (data) => {
    try {
      const config = {
        data: {
          'Content-Type': 'application/json',
        },
      };
      const res = axios.put('http://localhost:8080/api/auth', data, config);
      console.log(res.data);
      dispatch({
        type: 'updateuser',
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const LogoutUser = () => {
    dispatch({
      type: 'logout',
    });
  };

  const [state, dispatch] = useReducer(Authreducer, initstate);
  return (
    <AuthContext.Provider
      value={{
        isAdminAuthenticated: state.isAdminAuthenticated,
        isStudentAuthenticated: state.isStudentAuthenticated,
        isTeacherAuthenticated: state.isTeacherAuthenticated,
        token: state.token,
        isLoading: state.isLoading,
        error: state.error,
        data: state.data,
        message: state.message,
        LoginHandler,
        RegisterHandler,
        GetUserData,
        UpdateUser,
        LogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Authstate;
