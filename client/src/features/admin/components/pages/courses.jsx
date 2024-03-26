import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Table, Row, Col, Modal, Button } from 'react-bootstrap';
import '../../mainadmin.css';

function Courses() {
  const [showUserDataModal, setShowUserDataModal] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);

  const onApproveHandler = () => {
    approveHandler(id);
  };

  //   Student data
  const handleShowUserDataModal = () => {
    setShowUserDataModal(true);
  };
  const handleCloseUserDataModal = () => setShowUserDataModal(false);

  //   add course btn

  const handleAddNewCourse = () => {
    setShowAddCourse(true);
  };
  const handleCloseAddCourse = () => setShowAddCourse(false);

  return (
    <div className="container">
      <div className="addCoursebtn">
        <Button variant="danger" onClick={handleAddNewCourse}>
          Add Course
        </Button>
      </div>
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
                <td>Web Development</td>
                <td>rafay</td>
                <td>22/august/2111</td>
                <td>Every Saturday & Sunday</td>
                <td className="actionBtnStudent">
                  <Button variant="primary" onClick={handleShowUserDataModal}>
                    Show Students
                  </Button>
                  <Button variant="success" onClick={onApproveHandler}>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Modal show={showUserDataModal} onHide={handleCloseUserDataModal}>
          <Modal.Header>
            <Modal.Title>Students Of : Web development</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Father's Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Qualification</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ahsan raza</td>
                    <td>ahsan@gmail.com</td>
                    <td>sarwar</td>
                    <td>22/august/2111</td>
                    <td>male</td>
                    <td>Intermediate</td>
                    <td>
                      <Button variant="danger" onClick={onApproveHandler}>
                        remove
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUserDataModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* add course  */}

        <Modal show={showAddCourse} onHide={handleCloseAddCourse}>
          <Modal.Header>
            <Modal.Title>Add New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingCourseCustom"
                  type="text"
                  placeholder="web development"
                />
                <label htmlFor="floatingInputCustom">Course Name</label>
              </Form.Floating>
              <Form.Floating>
                <Form.Control
                  id="floatingPasswordCustom"
                  type="Text"
                  placeholder="Ahsan raza"
                />
                <label htmlFor="floatingTeacherCustom">Teacher</label>
              </Form.Floating>
              <Form.Floating className="mt-3">
                <Form.Control
                  id="floatingStartDateCustom"
                  type="date"
                  placeholder="1-1-2024"
                />
                <label htmlFor="floatingStartDateCustom">Start Date</label>
              </Form.Floating>
              <Form.Floating className="mt-3">
                <Form.Control
                  id="floatingClassDateCustom"
                  type="date"
                  placeholder="1-1-2024"
                />
                <label htmlFor="floatingClassDateCustom">Clases date</label>
              </Form.Floating>
              <div className="addCoursebtn">
                <Button variant="primary">Add</Button>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddCourse}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
}

export default Courses;
