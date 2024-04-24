import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authcontext';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const RequireAuth = () => {
  const {
    isAdminAuthenticated,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    RefreshPage,
    LogoutUser,
  } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
const token =  RefreshPage();
if (token) ;
  });
  if (location.pathname.includes('dashboard') && !isAdminAuthenticated) {
    console.log(isAdminAuthenticated);
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('user') && !isStudentAuthenticated) {
    //LogoutUser();
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('teacher') && !isTeacherAuthenticated) {
    //LogoutUser();
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
