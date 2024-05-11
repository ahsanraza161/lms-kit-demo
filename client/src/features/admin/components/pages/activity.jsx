import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const ActivityLog = () => {
  const [activityLog, setActivityLog] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState({});

  useEffect(() => {
    // fetch activity log data from API or database
    const fetchData = async () => {
      const response = await fetch('/api/activity-log');
      const data = await response.json();
      setActivityLog(data);
    };
    fetchData();
  }, []);

  const handleShowModal = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Activity Log</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Activity</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {activityLog.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.user}</td>
              <td>{log.activity}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(log)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Activity Log Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Date:</strong> {selectedLog.date}
          </p>
          <p>
            <strong>User:</strong> {selectedLog.user}
          </p>
          <p>
            <strong>Activity:</strong> {selectedLog.activity}
          </p>
          <p>
            <strong>Details:</strong> {selectedLog.details}
          </p>
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

export default ActivityLog;
