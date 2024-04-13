import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Input,
  Button,
  Table,
  Modal,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // For navigation

// Assuming you have separate components for CourseDetails and EditAttendance

const AttendanceForm = () => {
  // State management for form data and attendance details
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  // State for modal visibility
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  // for filtering the course
  const [filteredAttendanceData, setFilteredAttendanceData] =
    useState(attendanceData); // Initialize with original data

  // Navigation hook
  const navigate = useNavigate();

  // Fetch courses on component mount
  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  // Fetch students and attendance data based on selected course
  useEffect(() => {
    if (selectedCourseId) {
      fetch(`/api/students?courseId=${selectedCourseId}`)
        .then((response) => response.json())
        .then((data) => setStudents(data));

      fetch(`/api/attendance?courseId=${selectedCourseId}`)
        .then((response) => response.json())
        .then((data) => setAttendanceData(data));
    } else {
      setStudents([]);
      setAttendanceData([]);
    }
  }, [selectedCourseId]);

  // Handle form field changes
  const handleCourseChange = (event) => setSelectedCourseId(event.target.value);
  const handleStudentChange = (event) =>
    setSelectedStudentId(event.target.value);
  const handleDateTimeChange = (event) => setDateTime(event.target.value);

  // Submit attendance data (replace with your actual API call)
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedCourseId || !selectedStudentId || !dateTime) {
      alert('Please select a course, student, and date/time.');
      return;
    }

    fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: selectedCourseId,
        studentId: selectedStudentId,
        dateTime,
      }),
    }).then((response) => {
      if (response.ok) {
        alert('Attendance marked successfully!');
        // Clear form after successful submission (optional)
        setSelectedCourseId('');
        setSelectedStudentId('');
        setDateTime('');
        fetch(`/api/attendance?courseId=${selectedCourseId}`)
          .then((response) => response.json())
          .then((data) => setAttendanceData(data));
      } else {
        alert('Error marking attendance. Please try again.');
      }
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

  // JSX for attendance form and modal
  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="course">Course</FormLabel>
          <FormSelect
            id="course"
            value={selectedCourseId}
            onChange={handleCourseChange}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="student">Student</FormLabel>
          <FormSelect
            id="student"
            value={selectedStudentId}
            onChange={handleStudentChange}
            disabled={!selectedCourseId}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="dateTime">Date and Time</FormLabel>
          <Form.Control
            type="date"
            id="dateTime"
            value={dateTime}
            onChange={handleDateTimeChange}
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
          <Form.Select
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
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
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
            <tbody>
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
            </tbody>
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
