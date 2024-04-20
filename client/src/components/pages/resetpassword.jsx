import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Resetpassword = () => {
  const { token } = useParams();
  console.log(token);
  return <div>Reset Password</div>;
};

export default Resetpassword;
