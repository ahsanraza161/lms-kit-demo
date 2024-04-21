import React, { useReducer } from 'react';
import AuthContext from './authcontext';
import Authreducer from './authreducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MSG,
} from '../type';

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
    studentcourses: [],
  };

  const LoginHandler = async (formData) => {
    try {
      const config = {
        data: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        'https://lms2-two.vercel.app/api/auth',
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
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERROR,
        });
      }, 1000);
    }
  };
  const RegisterHandler = async (formData) => {
    try {
      const response = await axios.post(
        'https://lms2-two.vercel.app/api/users',
        formData
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_MSG,
        });
      }, 1000);
    } catch (err) {
      console.log(err.response);
    }
  };
  const GetUserData = async () => {
    try {
      setAuthToken(state.token);
      const res = await axios.get('https://lms2-two.vercel.app/api/auth');
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
      const res = axios.put(
        'https://lms2-two.vercel.app/api/auth',
        data,
        config
      );
      console.log(res.data);
      dispatch({
        type: 'updateuser',
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const LogoutUser = (role) => {
    dispatch({
      type: 'logout',
      payload: role,
    });
  };
  const GetCoursesOfStudent = async () => {
    try {
      setAuthToken(state.token);
      const res = await axios.get(`https://lms2-two.vercel.app/api/students`);
      dispatch({
        type: 'getcoursesofstudents',
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const GetStudentsOfCourses = async (id) => {
    try {
      console.log(id);
      const res = await axios.get(
        'https://lms2-two.vercel.app/api/courses/getstudents',
        { id }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const ResetPassword = async (password, confirmPassword, token) => {
    try {
      const res = await axios.put(`https://lms2-two.vercel.app/api/users/${token}`, {
        password,
        confirmPassword,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const ForgetPassword = async (email) => {
    try {
      const res = await axios.get('https://lms2-two.vercel.app/api/users', { email });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
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
        studentcourses: state.studentcourses,
        LoginHandler,
        RegisterHandler,
        GetUserData,
        UpdateUser,
        LogoutUser,
        GetCoursesOfStudent,
        GetStudentsOfCourses,
        ForgetPassword,
        ResetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Authstate;
