import React, { useState, useEffect, useContext } from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Button,
  Table,
  Modal,
} from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';

const AttendanceForm = () => {
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const { courses, markAttendance } = useContext(AdminContext);

  const [data, setData] = useState({
    course: courses[0]?.name,
    student: '',
    date: '',
    student: courses[0]?.students[0]?.name,
    students: [],
    courseId: courses[0]?._id,
    studentId: courses[0]?.students[0]?._id,
  });

  // Submit attendance data (replace with your actual API call)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      courseId: data.courseId,
      studentId: data?.studentId,
      date: data.date,
    });
    markAttendance({
      courseId: data.courseId,
      studentId: data.studentId,
      date: data.date,
    });
  };

  const onChangeHandler = (e) => {
    setData((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value,
      };
    });
  };

  // Open attendance modal on button click
  const handleViewAttendance = () => setShowAttendanceModal(true);

  // Close attendance modal on close button click
  const handleCloseAttendanceModal = () => setShowAttendanceModal(false);

  // Calculate attendance percentage based on API response format (replace with your actual logic)
  const calculateAttendancePercentage = (studentId, courseId) => {
    const studentData = attendanceData.find(
      (item) => item.studentId === studentId && item.courseId === courseId
    );
    if (!studentData) {
      return 'N/A';
    }
    const attendancePercentage =
      (studentData.attendedClasses / studentData.totalClasses) * 100;
    return attendancePercentage.toFixed(2); // Round to two decimal places
  };

  useEffect(() => {
    courses.forEach((item) => {
      if (data.course === item.name) {
        setData((prevdata) => {
          return {
            ...prevdata,
            students: item.students,
            courseId: item._id,
          };
        });
      }
    });
    if (data.students.length > 0) {
      data.students.forEach((student) => {
        if (student.name === data.student) {
          setData((prevdata) => {
            return {
              ...prevdata,
              studentId: student._id,
            };
          });
        }
      });
    }
  }, [data.course, data.student]);

  // JSX for attendance form and modal
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="course">Course</FormLabel>
          <FormSelect id="course" onChange={onChangeHandler} name="course">
            {courses.length > 0 &&
              courses.map((course) => {
                return (
                  <option
                    value={course?.name}
                    key={course?._id}
                    couurseId={course?._id}
                  >
                    {course?.name}
                  </option>
                );
              })}
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="student">Student</FormLabel>
          <FormSelect
            id="student"
            onChange={onChangeHandler}
            name="student"
            disabled=""
          >
            {data.students.length > 0
              ? data.students.map((student) => {
                  return (
                    <option value={student?.name} key={student?._id}>
                      {student?.name}
                    </option>
                  );
                })
              : 'No student enrooled in course'}
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="dateTime">Date and Time</FormLabel>
          <Form.Control
            type="date"
            id="dateTime"
            onChange={onChangeHandler}
            name="date"
          />
        </FormGroup>{' '}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {' '}
          <Button variant="primary" type="submit">
            Mark Attendance
          </Button>
          <Button variant="success" onClick={handleViewAttendance}>
            View Attendance
          </Button>
        </div>
      </Form>
      <Modal
        show={showAttendanceModal}
        onHide={handleCloseAttendanceModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Attendance Details</Modal.Title>
          {/* Filter dropdown for courses */}
          {/* <Form.Select
            aria-label="Filter by Course"
            onChange={(event) =>
              setFilteredAttendanceData(
                event.target.value
                  ? attendanceData.filter(
                      (item) => item.courseId === event.target.value
                    )
                  : attendanceData
              )
            }
            style={{ marginLeft: '160px', width: '50%' }}
          >
            <option value="">All Courses</option>
          </Form.Select> */}
        </Modal.Header>
        <Modal.Body>
          {/* Table displaying attendance details */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Total Classes</th>
                <th>Total Present</th>
                <th>Attendance Percentage</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* <tbody>
              {filteredAttendanceData.map((attendanceItem) => (
                <tr key={attendanceItem.id}>
                  <td>{attendanceItem.studentName}</td>
                  <td>{attendanceItem.courseName}</td>
                  <td>{attendanceItem.totalClasses}</td>
                  <td>{attendanceItem.attendedClasses}</td>
                  <td>
                    {calculateAttendancePercentage(
                      attendanceItem.studentId,
                      attendanceItem.courseId
                    )}
                    %
                  </td>
                  <td>
                    <Button variant="info">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAttendanceModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AttendanceForm;
