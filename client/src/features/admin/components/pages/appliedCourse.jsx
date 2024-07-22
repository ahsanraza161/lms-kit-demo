import React, { useEffect, useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx';
import AdminContext from '../../../../context/admin/admincontext';
import './students.css';

const AppliedCourse = () => {
  const { getAllAppliedaCourseData, applications } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Call API
  useEffect(() => {
    const fetchData = async () => {
      await getAllAppliedaCourseData();
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to download Excel file
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(applications);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AppliedForCourseCandidates');
    XLSX.writeFile(wb, 'AppliedForCourseCandidates.xlsx');
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination buttons
  const handleNextPage = () => {
    if (currentPage < Math.ceil(applications.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <Button
            onClick={downloadExcel}
            variant="success"
            style={{ marginBottom: '10px' }}
          >
            Download as Excel
          </Button>
          <div className="tableContainer">
            <Table striped bordered hover responsive className="studentTable">
              <thead>
                <tr className="sHeading">
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>Course</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>CNIC</th>
                  <th>Address</th>
                  <th>Qualification</th>
                  <th>Subject</th>
                  <th>Completion Year</th>
                  <th>University/College</th>
                  {/* <th>Branch</th> */}
                  <th>Email</th>
                  <th>WhatsApp Number</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((application, index) => (
                  <tr key={application._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{application.name}</td>
                    <td>{application.fatherName}</td>
                    <td>{application.course}</td>
                    <td>{application.dateOfBirth}</td>
                    <td>{application.gender}</td>
                    <td>{application.cnic}</td>
                    <td>{application.address}</td>
                    <td>{application.qualification}</td>
                    <td>{application.subject}</td>
                    <td>{application.completionYear}</td>
                    <td>{application.universityCollege}</td>
                    {/* <td>{application.branch}</td> */}
                    <td>{application.email}</td>
                    <td>{application.whatsappNumber}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="paginationBtn">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <span>
                Page {currentPage} of {Math.ceil(applications.length / itemsPerPage)}
              </span>
              
              <span>
                Total Items: {applications.length}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(applications.length / itemsPerPage)
                }
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

export default AppliedCourse;
