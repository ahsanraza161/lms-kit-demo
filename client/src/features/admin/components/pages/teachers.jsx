import React, { useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
<<<<<<< HEAD
import GetTeachers from './getTeachers.jsx';
=======
import GetTeachers from "./getTeachers.jsx"
>>>>>>> fbe0ac753718d50e39d74bab5d6a48c4052fcba5
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
<<<<<<< HEAD
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
        {faculties.map((faculty) => {
          return <GetTeachers key={faculty._id} item={faculty} />;
        })}
      </tbody>
=======
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

>>>>>>> fbe0ac753718d50e39d74bab5d6a48c4052fcba5
    </Table>
  );
};

export default AdminTeacherTable;
