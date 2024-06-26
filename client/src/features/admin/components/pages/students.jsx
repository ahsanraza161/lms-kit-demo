import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import AdminContext from '../../../../context/admin/admincontext';
import Approved_Student from './approved_student';
import './students.css';
import * as XLSX from 'xlsx';

const AdminStudentsTable = () => {
  const { getApprovedStudents, approvedStudents } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Call API
  useEffect(() => {
    const fetchData = async () => {
      await getApprovedStudents();
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  // Function to download Excel file
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(approvedStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Approved Students");

    XLSX.writeFile(wb, "Approved_Students.xlsx");
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = approvedStudents.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination buttons
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(approvedStudents.length / itemsPerPage)));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <Button onClick={downloadExcel} variant="success" style={{ marginBottom: '10px' }}>
            Download as Excel
          </Button>
          <div className='tableContainer'>
            <Table striped bordered hover responsive className="studentTable">
              <thead>
                <tr className='sHeading'>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>CNIC</th>
                  <th>Address</th>
                  <th>Highest Qualification</th>
                  <th>Subject</th>
                  <th>Completion Year</th>
                  <th>University / College</th>
                  <th>Branch</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <Approved_Student item={item} key={item._id} />
                ))}
              </tbody>
            </Table>
            <div className="paginationBtn">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(approvedStudents.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminStudentsTable;
