import React, { useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
import Approved_Student from './approved_student';

const AdminStudentsTable = () => {
  const { getApprovedStudents, approvedStudents } = useContext(AdminContext);

  // Call API
  useEffect(() => {
    getApprovedStudents();
  }, []);

  return (
    <Table striped bordered hover responsive className="mt-5 p-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Father's Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>CNIC</th>
          <th>Address</th>
          <th>Qualification</th>
          <th>Subject</th>
          <th>Completion Year</th>
          <th>University/College</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {approvedStudents.map((item) => (
          <Approved_Student item={item} key={item._id} />
        ))}
      </tbody>
    </Table>
  );
};

export default AdminStudentsTable;
