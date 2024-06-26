import React, { useContext, useEffect, useState } from 'react';
import Pending_student from './pending_student';
import CircularProgress from '@mui/material/CircularProgress';
import { Table, Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
import './students.css';

const PendingRegistrations = () => {
  const { getPendingStudents, pendingStudents } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      await getPendingStudents();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingStudents.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination buttons
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(pendingStudents.length / itemsPerPage)));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      {loading ? (
        <div className="loading"><CircularProgress color="success" /></div>
      ) : (
        <>
          <h1 className="text-center m-3">Pending Registrations</h1>
          <div className='tableContainer'>
            <Table striped bordered hover responsive className="studentTable">
              <thead>
                <tr className='sHeading'>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Usertype</th>
                  <th>Branch</th>
                  <th>Id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <Pending_student
                    key={item._id}
                    name={item.name}
                    email={item.email}
                    branch={item.branch}
                    id={item._id}
                    usertype={item.usertype}
                    fatherName={item.fatherName}
                    dateOfBirth={item.dateOfBirth}
                    qualification={item.qualification}
                    gender={item.gender}
                  />
                ))}
              </tbody>
            </Table>
            <div className="paginationBtn">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(pendingStudents.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PendingRegistrations;
