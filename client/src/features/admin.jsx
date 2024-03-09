import React from 'react';
import HomeAdmin from './admin/mainadmin';
import Sidebar from './admin/components/common/sidebar';
import Topbar from './admin/components/common/topbar';

function Admin() {
  return (
    <div>
      <Sidebar>
        <Topbar />
        <HomeAdmin />
      </Sidebar>
    </div>
  );
}
export default Admin;
