import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';


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
  const [studensThatCanBeAddToCourse, setStudensThatCanBeAddToCourse] =
    useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const handleCloseUserDataModal = () => setShowUserDataModal(false);
  const [showAddStudentModel, setShowAddStudentModel] = useState(false);
  const handleCloseAddStudentModel = () => setShowAddStudentModel(false);
// MATERIAL  
  const handleCloseAddMaterialModal = () => setShowAddMaterialModal(false);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false); // Added state for material modal
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialDate, setMaterialDate] = useState('');
  const [materialAttachment, setMaterialAttachment] = useState('');
  const [tutorialLink, setTutorialLink] = useState('');
 


  const inputDate = start_date;
  const dateObj = new Date(inputDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  const deleteHandler = () => {
    deleteCourse(id);
  };

  const handleShowUserDataModal = () => {
    setShowUserDataModal(true);
  };

  const handleAddStudents = () => {
    setShowAddStudentModel(true);
    const newArray = approvedStudents.filter(
      (obj2) => !students.some((obj1) => obj1.name === obj2.name)
    );
    setStudensThatCanBeAddToCourse(newArray);
  };
  const handleAddMaterial = () => {
    setShowAddMaterialModal(true);
  };

  useEffect(() => {
    getApprovedStudents();
  }, []);

  
  const handleMaterialSubmit = () => {
    // Perform material submission logic here
    // For simplicity, let's just log the material details
    console.log({
      title: materialTitle,
      date: materialDate,
      attachment: materialAttachment,
      tutorialLink: tutorialLink,
    });

    // Reset the form fields
    setMaterialTitle('');
    setMaterialDate('');
    setMaterialAttachment('');
    setTutorialLink('');

    // Close the modal
    setShowAddMaterialModal(false);
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
          <Button variant="success" onClick={handleAddMaterial}>
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
          <Modal.Title>Students Of Web development</Modal.Title>
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
        show={showAddStudentModel}
        className="modal-lg"
        onHide={handleCloseAddStudentModel}
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
          <Button variant="secondary" onClick={handleCloseAddStudentModel}>
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
