import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
import toast, { Toaster } from 'react-hot-toast';

const Course = ({
  name,
  teacher,
  start_date,
  total_days,
  id,
  students = [],
  classes_days,
}) => {
  const {
    deleteCourse,
    approvedStudents,
    getApprovedStudents,
    addStudentInCourse,
    deleteStudentCourse,
    addMaterial,
    fetchMaterials,
    materials = [],
    getAllCourses,
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
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);

  const inputDate = start_date;
  const dateObj = new Date(inputDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  const deleteHandler = async () => {
    try {
      await deleteCourse(id);
      setStudentList([]);
      await getAllCourses();
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
  const handleCloseAddStudentModal = () => setShowAddStudentModal(false);
  const handleCloseAddMaterialModal = () => setShowAddMaterialModal(false);

  useEffect(() => {
    getApprovedStudents();
  }, []);

  const handleMaterialSubmit = async () => {
    if (!allFieldsFilled(materialTitle, materialDate, materialAttachment)) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', materialTitle);
      formData.append('date', materialDate);
      formData.append('attachment', materialAttachment);
      formData.append('tutorialLink', tutorialLink || '');

      await addMaterial(id, formData);
      clearMaterialForm();
      setShowAddMaterialModal(false);
      toast.success('Material uploaded successfully.');
    } catch (error) {
      console.error('Error uploading material:', error);
    }
  };

  function allFieldsFilled(...fields) {
    return fields.every((field) => field);
  }

  function clearMaterialForm() {
    setMaterialTitle('');
    setMaterialDate('');
    setMaterialAttachment(null);
    setTutorialLink('');
  }

  const handleAddStudentToCourse = async (studentId) => {
    try {
      await addStudentInCourse(studentId, id);
      await getAllCourses();
      setShowAddStudentModal(false);
      const student = approvedStudents.find((s) => s._id === studentId);
      toast.success(`${student.name} added successfully.`, {
        position: 'center-center', // Position at the center
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleRemoveStudentFromCourse = async (studentId) => {
    try {
      await deleteStudentCourse(id, studentId);
      await getAllCourses();
      const student = students.find((s) => s._id === studentId);
      toast.success(`${student.name} removed successfully.`, {
        position: 'center-center', // Position at the center
      });
    } catch (error) {
      console.error('Error removing student:', error);
    }
  };

  // Function to handle viewing materials
  const handleCloseMaterialsModal = () => setShowMaterialsModal(false);

  const handleViewMaterials = () => {
    fetchMaterials(id); // Pass the id to fetchMaterials
    setShowMaterialsModal(true);
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
            {students.length > 0
              ? students.map((student) => (
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
                            onClick={() => handleRemoveStudentFromCourse(student._id)}
                          >
                            Remove
                          </Button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              : (
                  <tbody>
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>No students found</td>
                    </tr>
                  </tbody>
                )}
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
            {studensThatCanBeAddToCourse.length > 0
              ? studensThatCanBeAddToCourse.map((student) => (
                  <tbody key={student._id}>
                    <tr>
                      <td>{student.name}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.email}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleAddStudentToCourse(student._id)}
                        >
                          Add
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))
              : (
                  <tbody>
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>No students available to add</td>
                    </tr>
                  </tbody>
                )}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddStudentModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster position="center-center" />
    </>
  );
};

export default Course;
