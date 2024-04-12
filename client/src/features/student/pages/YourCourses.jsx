import React from 'react';
import { Table, Button } from 'react-bootstrap';

import './UserOrders.css';
import '../../../global.css';
import AuthContext from '../../../context/auth/authcontext';

function YourCourses () {
  return(
  <div className='container mt-3'>
  
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
        <tbody>
          <tr>
            <td>web</td>
            <td>Sir Basit </td>
            <td>2222</td>
            <td>Every Saturday & Sunday</td>
            <td className="actionBtnStudent">
              <Button variant="primary">Show detail</Button>
            </td>
          </tr>
        </tbody>
      </Table>
   
  </div>
)
};


export default YourCourses;
