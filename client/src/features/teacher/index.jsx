import React from 'react';
import '../../global.css';
import Topbar from './common/topbar.jsx';
import { useParams } from 'react-router-dom';
import UserSidebar from './common/sidebar.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import '../student/student.css';
import ChangePassword from './pages/ChangePassword.jsx';
import YourCourses from './pages/YourCourses.jsx';
import UserAddress from './pages/UserAddress.jsx';
import LegalNotice from './pages/LegalNotice.jsx';

const TeacherPanel = () => {
  const { activepage } = useParams();

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

export default TeacherPanel;
