import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

import '../../../global.css';
import AuthContext from '../../../context/auth/authcontext';

function YourCourses() {
  const { GetCoursesOfStudent, studentcourses } = useContext(AuthContext);
  const [selectedCourseMaterials, setSelectedCourseMaterials] = useState([]);
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  useEffect(() => {
    GetCoursesOfStudent();
  }, []);

  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleShowMaterials = (materials) => {
    setSelectedCourseMaterials(materials);
    setShowMaterialModal(true);
  };

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
        <tbody>
          {studentcourses.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.teacher}</td>
              <td>{formatDateString(item.start_date)}</td>
              <td>Every Saturday & Sunday</td>
              <td className="actionBtnStudent">
                <Button
                  variant="primary"
                  onClick={() => handleShowMaterials(item.materials)}
                >
                  Show Materials
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={showMaterialModal}
        onHide={() => setShowMaterialModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Materials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Attachment</th>
                <th>Tutorial Link</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourseMaterials.map((material, index) => (
                <tr key={index}>
                  <td>{material.title}</td>
                  <td>{material.date}</td>
                  <td>{material.attachment}</td>
                  <td>{material.tutorialLink}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMaterialModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default YourCourses;
