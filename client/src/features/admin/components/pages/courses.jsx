import { React, useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Table, Row, Col, Modal, Button } from 'react-bootstrap';
import '../../mainadmin.css';
import Course from './course';
import AdminContext from '../../../../context/admin/admincontext';
function Courses() {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const { getAllCourses, courses, addCourse } = useContext(AdminContext);
  //   add course btn

  const handleAddNewCourse = () => {
    setShowAddCourse(true);
  };
  const handleCloseAddCourse = () => setShowAddCourse(false);

  useEffect(() => {
    getAllCourses();
  }, []);

  // add course get data
  const [course, setCourse] = useState({
    course_name: '',
    teacher: '',
    start_date: '',
    classes_date: '',
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
      classes_date: course.classes_date.replace(/-/g, '/'),
    };
    // Now, you can send the request with the updated course object
    console.log(formattedCourse);
    addCourse(formattedCourse);
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
              {courses.map((item) => {
                return (
                  <Course
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    teacher={item.teacher}
                    start_date={item.start_date}
                    end_date={item.end_date}
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
                name="course_name"
                value={course.course_name}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingInputCustom">Course Name</label>
            </Form.Floating>
            <Form.Floating>
              <Form.Control
                id="Teacher"
                type="text"
                placeholder="Teacher's name"
                name="teacher"
                value={course.teacher}
                onChange={onChangeHandler}
              />
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
                id="classes_date"
                type="date"
                placeholder="classes_date"
                name="classes_date"
                value={course.classes_date}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingClassDateCustom">Clases date</label>
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