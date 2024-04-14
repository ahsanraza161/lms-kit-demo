import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
import AuthContext from '../../../../context/auth/authcontext';

const Course = ({ name, teacher, start_date, id, students }) => {
  const { deleteCourse } = useContext(AdminContext);
  const { GetStudentsOfCourses } = useContext(AuthContext);
  const [showUserDataModal, setShowUserDataModal] = useState(false);
  const handleCloseUserDataModal = () => setShowUserDataModal(false);
  const [showAddStudentModel, setShowAddStudentModel] = useState(false);
  const handleCloseAddStudentModel = () => setShowAddStudentModel(false);
  const inputDate = start_date;

  // Parse the input date string into a Date object
  const dateObj = new Date(inputDate);

  // Format the date using built-in toLocaleDateString() method
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  const deleteHandler = () => {
    deleteCourse(id);
  };

  //   Student data
  const handleShowUserDataModal = () => {
    setShowUserDataModal(true);
  };

  //  Adding student to the course
  const handleAddStudnets = () => {
    setShowAddStudentModel(true);
  };
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{teacher}</td>
        <td>{formattedDate}</td>
        <td>Every Saturday & Sunday</td>
        <td className="actionBtnStudent">
          <Button variant="primary" onClick={handleShowUserDataModal}>
            Show Students
          </Button>
          <Button variant="success" onClick={handleAddStudnets}>
            Add Students
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </td>
      </tr>
      <Modal show={showUserDataModal} onHide={handleCloseUserDataModal}>
        <Modal.Header>
          <Modal.Title>Students Of Web development</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>Email</th>
              </tr>
            </thead>

            {students.map((student) => {
              return (
                <tbody>
                  <tr>
                    <td>{student?.name}</td>
                    <td>{student?.fatherName}</td>
                    <td>{student.email}</td>
                    <td>
                      <Button variant="danger">remove</Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserDataModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddStudentModel} onHide={handleCloseAddStudentModel}>
        <Modal.Header>
          <Modal.Title>Add Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ahsan raza</td>
                <td>Muhammad Sarwar</td>
                <td>ahsan@gmail.com</td>
                <td>
                  <Button variant="danger">Add</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddStudentModel}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Course;
