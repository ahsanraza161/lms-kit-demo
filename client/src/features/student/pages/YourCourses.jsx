import React, { useContext, useEffect } from 'react';
import { Table, Col, Row, Button } from 'react-bootstrap';
import './UserOrders.css';
import '../../../global.css';
import AuthContext from '../../../context/auth/authcontext';

function YourCourses() {
  const { GetCoursesOfStudent, studentcourses } = useContext(AuthContext);
  useEffect(() => {
    GetCoursesOfStudent();
  }, []);

  return (
    <div className="container mt-3">
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
            {studentcourses.length > 0
              ? studentcourses.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{item.name ?? ''}</td>
                        <td>{item.teacher ?? ''} </td>
                        <td>{item.start_date ?? ''}</td>
                        <td>Every Saturday & Sunday</td>
                        <td className="actionBtnStudent">
                          <Button variant="primary">Show detail</Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : ''}
          </Table>
        </Col>
      </Row>
    </div>
    // <h1>hello</h1>
  );
}

export default YourCourses;
