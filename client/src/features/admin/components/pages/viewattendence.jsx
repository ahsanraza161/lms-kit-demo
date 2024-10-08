import React, { useEffect, useContext, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { utils, writeFile } from 'xlsx';
import AdminContext from '../../../../context/admin/admincontext';

const ViewAttendance = () => {
  const { getAttendanceData, attendances } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentAttendanceDetails, setCurrentAttendanceDetails] = useState({
    present: [],
    absent: [],
    cancelled: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAttendanceData();
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function roundToSignificantDigits(num, digits) {
    if (num === 0) return 0;
    const d = Math.ceil(Math.log10(num < 0 ? -num : num));
    const power = digits - d;
    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);
    return shifted / magnitude;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  function combineAttendancesByCourseAndStudent(attendances = []) {
    const combined = {};

    attendances.forEach((attendance) => {
      if (!attendance.course || !attendance.student) return;

      const courseId = attendance.course._id;
      const studentId = attendance.student._id;
      const key = `${courseId}_${studentId}`;

      if (!combined[key]) {
        combined[key] = {
          course: attendance.course,
          student: attendance.student,
          totalClasses: attendance.course.total_days, // Use total days from course
          totalPresent: 0,
          presentDates: [],
          absentDates: [],
          cancelledDates: [],
        };
      }

      if (attendance.status === 'present') {
        combined[key].totalPresent += 1;
        combined[key].presentDates.push(attendance.date);
      } else if (attendance.status === 'absent') {
        combined[key].absentDates.push(attendance.date);
      } else if (attendance.status === 'cancelled') {
        combined[key].cancelledDates.push(attendance.date);
      }
    });

    return Object.values(combined);
  }

  const combinedAttendances = combineAttendancesByCourseAndStudent(attendances || []);

  const handleShowDetails = (attendanceItem) => {
    setCurrentAttendanceDetails({
      present: attendanceItem.presentDates,
      absent: attendanceItem.absentDates,
      cancelled: attendanceItem.cancelledDates,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAttendanceDetails({
      present: [],
      absent: [],
      cancelled: [],
    });
  };

  const handleDownload = () => {
    const data = combinedAttendances.map((item) => ({
      Student: item.student.name,
      Course: item.course.name,
      'Total Classes': item.totalClasses,
      'Total Present': item.totalPresent,
      'Attendance Percentage': roundToSignificantDigits(
        (item.totalPresent / item.totalClasses) * 100,
        2
      ),
      'Present Dates': item.presentDates.map(formatDate).join(', '),
      'Absent Dates': item.absentDates.map(formatDate).join(', '),
      'Cancelled Dates': item.cancelledDates.map(formatDate).join(', '),
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Attendance');
    writeFile(wb, 'attendance_data.xlsx');
  };

  if (loading) {
    return (
      <div className="container mt-5 d-flex justify-content-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={handleDownload}>
          Download as Excel
        </Button>
      </div>
      <Table striped bordered hover>
        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Total Classes</th>
            <th>Total Present</th>
            <th>Attendance Percentage</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {combinedAttendances.map((attendanceItem) => (
            <tr key={`${attendanceItem.student._id}_${attendanceItem.course._id}`}>
              <td>{attendanceItem.student.name}</td>
              <td>{attendanceItem.course.name}</td>
              <td>{attendanceItem.totalClasses}</td>
              <td>{attendanceItem.totalPresent}</td>
              <td>
                {roundToSignificantDigits(
                  (attendanceItem.totalPresent / attendanceItem.totalClasses) * 100,
                  2
                )}
                %
              </td>
              <td>
                <Button variant="info" onClick={() => handleShowDetails(attendanceItem)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Attendance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentAttendanceDetails.present.map((date, index) => (
                <tr key={`present-${index}`}>
                  <td>{formatDate(date)}</td>
                  <td>Present</td>
                </tr>
              ))}
              {currentAttendanceDetails.absent.map((date, index) => (
                <tr key={`absent-${index}`}>
                  <td>{formatDate(date)}</td>
                  <td>Absent</td>
                </tr>
              ))}
              {currentAttendanceDetails.cancelled.map((date, index) => (
                <tr key={`cancelled-${index}`}>
                  <td>{formatDate(date)}</td>
                  <td>Class Cancelled</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAttendance;
