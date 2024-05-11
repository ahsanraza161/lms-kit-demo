import React, { useEffect, useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';

import AdminContext from '../../../../context/admin/admincontext';
import GetTeachers from './getTeachers.jsx';
import './students.css';

const AdminTeacherTable = () => {
  const { getAllFaculty, faculties } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);


  // Call API
  useEffect(() => {
    const fetchData = async () => {
      await getAllFaculty();
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);


  return (
    <>
     {loading ? (
        <div className="loading">
          
          <CircularProgress color="success" />

        </div>
      ) : (
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
          <GetTeachers key={faculty._id} item={faculty} />
        ))}
      </tbody>
    </Table>
     )}
    </>
  );
};

export default AdminTeacherTable;
