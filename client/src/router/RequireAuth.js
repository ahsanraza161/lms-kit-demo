import React, { useContext } from 'react';
import AuthContext from '../context/auth/authcontext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const {
    isAdminAuthenticated,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    LogoutUser,
  } = useContext(AuthContext);
  const location = useLocation();

  // if (location.pathname.includes('dashboard') && !isAdminAuthenticated) {
  //   console.log(isAdminAuthenticated);
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // } else if (location.pathname.includes('user') && !isStudentAuthenticated) {
  //   //LogoutUser();
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // } else if (location.pathname.includes('teacher') && !isTeacherAuthenticated) {
  //   //LogoutUser();
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // } else {
  //   return <Outlet />;

    return <Outlet />;
  }

export default RequireAuth;
