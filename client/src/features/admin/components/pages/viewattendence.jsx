import React, { useEffect, useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import AdminContext from '../../../../context/admin/admincontext';

const ViewAttendance = () => {
  const { getAttendanceData, attendances } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAttendanceData();
      setLoading(false);
    };
    fetchData();
  }, []);

  const calculateAttendancePercentage = (totalClasses, attendedClasses) => {
    if (totalClasses === 0) {
      return 'N/A';
    }
    const attendancePercentage = (attendedClasses / totalClasses) * 100;
    return attendancePercentage.toFixed(2);
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
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
            {attendances.map((item) => (
              <tr key={item._id}>
                <td>{item.student?.name}</td>
                <td>{item.course.name}</td>
                <td>{item.course.total_days}</td>
                <td>{item.status}</td>
                <td>
                  {calculateAttendancePercentage(
                    item.totalClasses,
                    item.attendedClasses
                  )}
                </td>
                <td>
                  <Button variant="primary">Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ViewAttendance;
