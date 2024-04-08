import React from 'react';
import './dashboard.css'
import { Container, Row, Col } from 'react-bootstrap';
import Teacher from '../pages/teachers'
import Students from '../pages/students'
import Courses from '../pages/courses'
import AddUser from '../pages/adduser'


function Dashboard  () {
  return (
    
    <Container className='overflow' fluid>
      <Row>
        <Col className='width' xs={6} md={3}>
          <Courses/>
        </Col>
        <Col  className='width' xs={6} md={3}>
          <AddUser/>

        </Col>
        <Col className='width' xs={6} md={3}>
          <Teacher/>

        </Col>
        <Col  className='width' xs={6} md={3}>
          <Students/>

        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
