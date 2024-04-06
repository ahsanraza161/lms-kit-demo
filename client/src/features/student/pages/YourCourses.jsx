import React from 'react';
import { Table, Col, Row, Button } from 'react-bootstrap';

import './UserOrders.css';
import '../../../global.css';

function YourCourses () {
  return(
  <div className='container mt-3'>
  <Row>
    <Col xs={12}>
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
    </Col>
  </Row>
  </div>
  // <h1>hello</h1>
)
};


export default YourCourses;
