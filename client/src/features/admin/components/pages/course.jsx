import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
import axios from 'axios';

const Course = ({
  name,
  teacher,
  start_date,
  total_days,
  id,
  students,
  classes_days,
}) => {
  const {
    deleteCourse,
    approvedStudents,
    getApprovedStudents,
    addStudentInCourse,
    deleteStudentCourse,
  } = useContext(AdminContext);
  const [showUserDataModal, setShowUserDataModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [studentList, setStudentList] = useState(students);
  const [studensThatCanBeAddToCourse, setStudensThatCanBeAddToCourse] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialDate, setMaterialDate] = useState('');
  const [materialAttachment, setMaterialAttachment] = useState(null);
  const [tutorialLink, setTutorialLink] = useState('');

  const inputDate = start_date;
  const dateObj = new Date(inputDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  const deleteHandler = async () => {
    try {
      await deleteCourse(id);
      setStudentList([]);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleShowUserDataModal = () => {
    setShowUserDataModal(true);
  };

  const handleAddStudents = () => {
    setShowAddStudentModal(true);
    const newArray = approvedStudents.filter(
      (obj2) => !studentList.some((obj1) => obj1.name === obj2.name)
    );
    setStudensThatCanBeAddToCourse(newArray);
  };

  const handleCloseUserDataModal = () => setShowUserDataModal(false);
  const handleCloseAddStudentModal = () => setShowAddStudentModal(false); // Corrected typo here
  const handleCloseAddMaterialModal = () => setShowAddMaterialModal(false);

  useEffect(() => {
    getApprovedStudents();
  }, []);

  const handleMaterialSubmit = async () => {
    if (!materialTitle || !materialDate || !materialAttachment) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', materialTitle);
      formData.append('date', materialDate);
      formData.append('attachment', materialAttachment);
      formData.append('tutorialLink', tutorialLink);

      // Concatenate courseId with the base URL
      const apiUrl = `http://localhost:8080/api/materials/${id}/upload`;

      const response = await axios.post(apiUrl, formData);

      if (!response.ok) {
        throw new Error('Material upload failed');
      }

      setMaterialTitle('');
      setMaterialDate('');
      setMaterialAttachment(null);
      setTutorialLink('');

      setShowAddMaterialModal(false);
    } catch (error) {
      console.error('Error uploading material:', error);
    }
  };
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{teacher}</td>
        <td>{formattedDate}</td>
        <td>{classes_days ? classes_days : ''}</td>
        <td>{total_days}</td>
        <td className="actionBtnStudent">
          <Button variant="primary" onClick={handleShowUserDataModal}>
            Show Students
          </Button>
          <Button variant="success" onClick={handleAddStudents}>
            Add Students
          </Button>
          <Button
            variant="success"
            onClick={() => setShowAddMaterialModal(true)}
          >
            Add Material
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </td>
      </tr>
      <Modal
        show={showUserDataModal}
        className="modal-lg"
        onHide={handleCloseUserDataModal}
      >
        <Modal.Header>
          <Modal.Title>Students Of {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            {students.map((student) => {
              return (
                <tbody key={student._id}>
                  <tr>
                    <td>{student?.name}</td>
                    <td>{student?.fatherName}</td>
                    <td>{student.email}</td>
                    <td>
                      {loading ? (
                        <span>Loading...</span>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteStudentCourse(id, student._id);
                          }}
                        >
                          Remove
                        </Button>
                      )}
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
      <Modal
        show={showAddStudentModal}
        className="modal-lg"
        onHide={handleCloseAddStudentModal}
      >
        <Modal.Header>
          <Modal.Title>Add Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            {studensThatCanBeAddToCourse.map((student) => {
              return (
                <tbody key={student._id}>
                  <tr>
                    <td>{student.name}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.email}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          addStudentInCourse(student._id, id);
                        }}
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddStudentModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showAddMaterialModal}
        className="modal-lg"
        onHide={handleCloseAddMaterialModal}
      >
        <Modal.Header>
          <Modal.Title>Add Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="materialTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter material title"
                value={materialTitle}
                onChange={(e) => setMaterialTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="materialDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={materialDate}
                onChange={(e) => setMaterialDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="materialAttachment">
              <Form.Label>Attachment</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setMaterialAttachment(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="tutorialLink">
              <Form.Label>Tutorial Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tutorial link"
                value={tutorialLink}
                onChange={(e) => setTutorialLink(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddMaterialModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMaterialSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Course;
