import React, { useContext, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

import './UserOrders.css';
import '../../../global.css';
import AuthContext from '../../../context/auth/authcontext';

function YourCourses() {
  const { GetCoursesOfStudent, studentcourses } = useContext(AuthContext);
  useEffect(() => {
    GetCoursesOfStudent();
  }, []);

  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  return (
    <div className="container mt-3">
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Teacher</th>
            <th>Start Date</th>
            <th>Clases date</th>
            <th>Action</th>
          </tr>
        </thead>
        {studentcourses.map((item) => {
          return (
            <tbody>
              <tr>
                <td>{item.name}</td>
                <td>{item.teacher}</td>
                <td>{formatDateString(item.start_date)}</td>
                <td>Every Saturday & Sunday</td>
                <td className="actionBtnStudent">
                  <Button variant="primary">Show detail</Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default YourCourses;
