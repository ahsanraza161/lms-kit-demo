import React, { useContext } from 'react';
import AdminContext from '../../../../context/admin/admincontext';

const Pending_student = ({ name, id, email }) => {
  const { approveHandler } = useContext(AdminContext);
  const onApproveHandler = () => {
    approveHandler(id);
  };
  return (
    <div style={{ background: '#fff' }}>
      <h1>{name}</h1>
      <p>{email}</p>
      <p>{id}</p>
      <button onClick={onApproveHandler}>Approve</button>
    </div>
  );
};

export default Pending_student;
