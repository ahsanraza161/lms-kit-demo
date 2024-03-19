import React, { useContext } from 'react';
import "../../mainadmin.css"
import AdminContext from '../../../../context/admin/admincontext';

const Pending_student = ({ name, id, email }) => {
  const { approveHandler } = useContext(AdminContext);
  const onApproveHandler = () => {
    approveHandler(id);
  };
  return (
    <div className='pendingStudent'>
      <h1 className='psName'>{name}</h1>
      <p>{email}</p>
      <p>{id}</p>
      <button onClick={onApproveHandler}>Approve</button>
    </div>
  );
};

export default Pending_student;
