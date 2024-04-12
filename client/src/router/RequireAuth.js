import React, { useContext } from 'react';
import AuthContext from '../context/auth/authcontext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const {
    isAdminAuthenticated,
    isStudentAuthenticated,
    isTeacherAuthenticated,
  } = useContext(AuthContext);
  const location = useLocation();

  console.log(location.pathname);

  if (location.pathname.includes('dashboard') && !isAdminAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('user') && !isStudentAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('teacher') && !isTeacherAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
