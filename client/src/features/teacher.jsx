import React from 'react';
import '../global.css';
import Topbar from './teacher/common/topbar.jsx';
import { useParams } from 'react-router-dom';
import UserSidebar from './teacher/common/sidebar';
import AccountSettings from './teacher/pages/AccountSettings.jsx';
import './student.css';
import ChangePassword from './teacher/pages/ChangePassword.jsx';
import YourCourses from './teacher/pages/YourCourses.jsx';
import UserAddress from './teacher/pages/UserAddress';
import LegalNotice from './teacher/pages/LegalNotice';

const TeacherPanel = () => {
  const { activepage } = useParams();

  // alert(activepage);
  return (
    <div className="userprofile">
      <Topbar/>
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

export default TeacherPanel
