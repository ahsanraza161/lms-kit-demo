import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const AdminStudentsTable = () => {
  const [students, setStudents] = useState([]);

  // Fetch approved students from Node.js backend (replace with your actual API endpoint)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students/approved');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Table striped bordered hover responsive className="mt-5 p-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Father's Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>CNIC</th>
          <th>Address</th>
          <th>Qualification</th>
          <th>Subject</th>
          <th>Completion Year</th>
          <th>University/College</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.fatherName}</td>
            <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>{' '}
            {/* Format date */}
            <td>{student.gender}</td>
            <td>{student.cnic}</td>
            <td>{student.address}</td>
            <td>{student.qualification}</td>
            <td>{student.subject}</td>
            <td>{student.completionYear}</td>
            <td>{student.universityCollege}</td>
            <td>{student.email}</td>
            <td>
              <Button variant="danger" size="sm">
                Delete {/* Replace with actual delete functionality */}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminStudentsTable;
