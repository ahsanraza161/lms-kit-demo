import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';

const PendingRegistrations = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  useEffect(() => {
    const fetchPendingRegistrations = async () => {
      try {
        const response = await fetch('/api/pending-registrations');
        if (!response.ok) {
          throw new Error('Failed to fetch pending registrations');
        }
        const data = await response.json();
        setPendingRegistrations(data);
      } catch (error) {
        console.error('Error fetching pending registrations:', error);
        // Handle errors appropriately (e.g., display notification)
      }
    };

    fetchPendingRegistrations();
  }, []);

  const handleApprove = async (registrationId) => {
    try {
      const response = await fetch(`/api/register/${registrationId}/approve`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to approve registration');
      }

      // Send email notification logic (see optional section below)
      const updatedRegistrations = pendingRegistrations.filter((reg) => reg.id !== registrationId);
      setPendingRegistrations(updatedRegistrations);
    } catch (error) {
      console.error('Error approving registration:', error);
      // Handle errors appropriately (e.g., display notification)
    }
  };

  const handleReject = async (registrationId) => {
    // Implement similar logic for rejection with a PUT request (or DELETE depending on API design)
    // ...
  };

  return (
    <div>
      <h1>Pending Registrations</h1>
      {pendingRegistrations.length > 0 ? (
        <Table striped bordered hover>
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
            {pendingRegistrations.map((registration) => (
              <tr key={registration.id}>
                <td>{registration.name}</td>
                <td>{registration.fatherName}</td>
                <td>{registration.dateOfBirth}</td>
                <td>{registration.gender}</td>
                <td>{registration.cnic}</td>
                <td>{registration.address}</td>
                <td>{registration.qualification}</td>
                <td>{registration.subject}</td>
                <td>{registration.completionYear}</td>
                <td>{registration.universityCollege}</td>
                <td>{registration.email}</td>
                <td>
                  <ButtonGroup>
                    <Button variant="primary" size="sm" onClick={() => handleApprove(registration.id)}>
                      Approve
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => handleReject(registrationId)}>
                      Reject
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No pending registrations found.</p>
      )}
    </div>
  );
};

export default PendingRegistrations;
