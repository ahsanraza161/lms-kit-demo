import React, { useContext, useEffect } from 'react';
import '../../global.css';
import { useLocation } from 'react-router-dom';
import Topbar from './common/topbar.jsx';
import { useParams } from 'react-router-dom';
import UserSidebar from './common/sidebar';
import AccountSettings from './pages/AccountSettings.jsx';
import './student.css';
import ChangePassword from './pages/ChangePassword.jsx';
import YourCourses from './pages/YourCourses';
import UserAddress from './pages/UserAddress';
import LegalNotice from './pages/LegalNotice';
import AuthContext from '../../context/auth/authcontext';

const StudentPanel = () => {
  const { activepage } = useParams();
  const { GetUserData, GetCoursesOfStudent } = useContext(AuthContext);
  useEffect(() => {
    GetUserData();
    GetCoursesOfStudent();
  }, []);

  // alert(activepage);
  return (
    <div className="userprofile">
      <Topbar />
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === 'accountsettings' && <AccountSettings />}
          {activepage === 'changepassword' && <ChangePassword />}
          {activepage === 'yourcourses' && <YourCourses />}
          {activepage === 'address' && <UserAddress />}
          {activepage === 'legalnotice' && <LegalNotice />}
        </div>
      </div>
    </div>
  );
};

export default StudentPanel;
