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

  if (location.pathname.includes('gfd') && !isAdminAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('gsd') && !isStudentAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('gsg') && !isTeacherAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
