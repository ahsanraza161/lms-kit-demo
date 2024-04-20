import { React, useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FormSelect, Table, Row, Col, Modal, Button } from 'react-bootstrap';
import '../../mainadmin.css';
import Course from './course';
import AdminContext from '../../../../context/admin/admincontext';
function Courses() {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const { getAllCourses, courses, addCourse, faculties, getAllFaculty } =
    useContext(AdminContext);

  const handleAddNewCourse = () => {
    setShowAddCourse(true);
  };
  const handleCloseAddCourse = () => setShowAddCourse(false);

  useEffect(() => {
    getAllCourses();
    getAllFaculty();
  }, []);

  // add course get data
  const [course, setCourse] = useState({
    name: '',
    teacher: '',
    start_date: '',
    classes_days: '',
    total_days: '',
  });

  const onChangeHandler = (e) => {
    setCourse((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSumitCourseHandler = (e) => {
    e.preventDefault();

    const formattedCourse = {
      ...course,
      start_date: course.start_date.replace(/-/g, '/'),
    };
    // Now, you can send the request with the updated course object
    addCourse(course);
    setCourse({
      name: '',
      teacher: '',
      start_date: '',
      classes_days: '',
      total_days: '',
    });
    // addCourse(formattedCourse);
  };
  return (
    <div className="container">
      <div className="addCoursebtn">
        <Button variant="success" onClick={handleAddNewCourse}>
          Add Course
        </Button>
      </div>
      <Row>
        <Col xs={12}>
          <Table responsive striped bordered hover>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>Course Name</th>
                <th>Teacher</th>
                <th>Start Date</th>
                <th>Clases date</th>
                <th>Total Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item) => {
                return (
                  <Course
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    teacher={item.teacher}
                    start_date={item.start_date}
                    total_days={item.total_days}
                    students={item.students}
                    classes_days={item.classes_days}
                  />
                );
              })}
            </tbody>
          </Table>
        </Col>

        <Modal show={showAddCourse} onHide={handleCloseAddCourse}>
          <Modal.Header>
            <Modal.Title>Add New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Floating className="mb-3">
              <Form.Control
                id="course_name"
                type="text"
                placeholder="Course_name"
                name="name"
                value={course.name}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingInputCustom">Course Name</label>
            </Form.Floating>
            <Form.Floating>
              <FormSelect
                id="teacher"
                name="teacher"
                value={course.teacher}
                onChange={onChangeHandler}
              >
                <option value="">Select Teacher</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                  </option>
                ))}
              </FormSelect>
              <label htmlFor="floatingTeacherCustom">Teacher</label>
            </Form.Floating>

            <Form.Floating className="mt-3">
              <Form.Control
                id="start_date"
                type="date"
                placeholder="start_date"
                name="start_date"
                value={course.start_date}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingStartDateCustom">Start Date</label>
            </Form.Floating>
            <Form.Floating className="mt-3">
              <Form.Control
                id="classes_days"
                type="text"
                placeholder="days"
                name="classes_days"
                value={course.classes_days}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingClassDateCustom">Clases days</label>
            </Form.Floating>
            <Form.Floating className="mt-3">
              <Form.Control
                id="total_days"
                type="number"
                placeholder="total_days"
                name="total_days"
                value={course.total_days}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingClassDateCustom">Total days</label>
            </Form.Floating>
            <div className="addCoursebtn">
              <Button variant="primary" onClick={onSumitCourseHandler}>
                Add
              </Button>
            </div>
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
