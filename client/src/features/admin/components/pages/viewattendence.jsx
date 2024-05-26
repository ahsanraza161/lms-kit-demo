import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';

const ViewAttendance = () => {
  const { getAttendanceData } = useContext(AdminContext);

  useEffect(() => {
getAttendanceData();
  }, []);

  const calculateAttendancePercentage = (studentId, courseId) => {
    const studentData = getAttendanceData.find(
      (item) => item.studentId === studentId && item.courseId === courseId
    );
    if (!studentData) {
      return 'N/A';
    }
    const attendancePercentage = (studentData.attendedClasses / studentData.totalClasses) * 100;
    return attendancePercentage.toFixed(2);
  };

  if (!getAttendanceData || getAttendanceData.length === 0) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <div className="container mt-5">
      <Table striped bordered hover>
        <thead style={{ textAlign: 'center' }}>
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
          {getAttendanceData.map((attendanceItem) => (
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
    </div>
  );
};

export default ViewAttendance;
