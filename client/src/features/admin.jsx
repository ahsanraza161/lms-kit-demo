import React from 'react';
import Sidebar from './admin/components/common/sidebar';
import Topbar from './admin/components/common/topbar';
import Dashboard from './admin/components/pages/dashboard';
import { Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div className='admin'>
      <Sidebar>
        <Topbar />
        <Outlet />  
      </Sidebar>
    </div>
  );
}
export default Admin;
