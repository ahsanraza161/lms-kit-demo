import React from 'react';
import '../global.css';
import Topbar from './student/common/topbar.jsx';
import { useParams } from 'react-router-dom';
// import Navbar from '../../COMPONENTS/Navbar/Navbar'
import UserSidebar from './student/common/sidebar';
import AccountSettings from './student/pages/AccountSettings.jsx';
import './student.css';
import ChangePassword from './student/pages/ChangePassword.jsx';
// import YourOrders from './student/pages/UserOrders';
import UserAddress from './student/pages/UserAddress';
import LegalNotice from './student/pages/LegalNotice';

const UserProfile = () => {
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
          {activepage === 'yourorders' && <YourOrders />}
          {activepage === 'address' && <UserAddress />}
          {activepage === 'legalnotice' && <LegalNotice />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
