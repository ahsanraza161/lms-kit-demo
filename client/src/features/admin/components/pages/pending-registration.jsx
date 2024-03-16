import React, { useContext, useEffect } from 'react';
import Pending_student from './pending_student';
import AdminContext from '../../../../context/admin/admincontext';

const PendingRegistrations = () => {
  const { getPendingStudents, pendingStudents } = useContext(AdminContext);
  useEffect(() => {
    getPendingStudents();
  }, []);

  return (
    <div>
      <h1>Pending Registrations</h1>
      {pendingStudents.map((item) => (
        <Pending_student
          key={item._id}
          name={item.name}
          email={item.email}
          id={item._id}
        />
      ))}
    </div>
  );
};

export default PendingRegistrations;
