import React, { useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
import GetTeachers from "./getTeachers.jsx"
import './students.css';

const AdminTeacherTable = () => {
  const { getAllFaculty, faculties } = useContext(AdminContext);

  // Call API
  useEffect(() => {
    getAllFaculty();
  }, []);

  return (
    <Table striped bordered hover responsive className="tableStudent mt-5 p-3">
      <thead>
  <tr className="sHeading">
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
{faculties.map((faculty) => (
          <GetTeachers item={faculty} key={faculty._id} />
        ))}
</tbody>
</Table>
  );
};

export default AdminTeacherTable;
