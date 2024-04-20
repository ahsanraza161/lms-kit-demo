import React, { useContext, useEffect } from 'react';
import Pending_student from './pending_student';
import { Table } from 'react-bootstrap';

import AdminContext from '../../../../context/admin/admincontext';

const PendingRegistrations = () => {
  const { getPendingStudents, pendingStudents } = useContext(AdminContext);
  useEffect(() => {
    getPendingStudents();
  }, []);

  return (
    <div>
      <h1 className="text-center m-3 ">Pending Registrations</h1>
       <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Usertype</th>
              <th>Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {pendingStudents.map((item) => (
        <Pending_student
          key={item._id}
          name={item.name}
          email={item.email}
          id={item._id}
          usertype={item.usertype}
          fatherName={item.fatherName}
          dateOfBirth={item.dateOfBirth}
          qualification={item.qualification}
          gender={item.gender}
        />
      ))}
          </tbody>
        </Table>
    </div>
  );
};

export default PendingRegistrations;
