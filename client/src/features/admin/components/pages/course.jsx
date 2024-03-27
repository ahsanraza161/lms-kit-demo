import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';

const Course = ({ name, teacher, start_date, id }) => {
  const { deleteCourse } = useContext(AdminContext);
  const inputDate = start_date;

  // Parse the input date string into a Date object
  const dateObj = new Date(inputDate);

  // Format the date using built-in toLocaleDateString() method
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  const deleteHandler = () => {
    deleteCourse(id);
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{teacher}</td>
      <td>{formattedDate}</td>
      <td>Every Saturday & Sunday</td>
      <td className="actionBtnStudent">
        {/* <Button variant="primary" onClick={handleShowUserDataModal}>
          Show Students
        </Button> */}
        <Button variant="danger" onClick={deleteHandler}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Course;
