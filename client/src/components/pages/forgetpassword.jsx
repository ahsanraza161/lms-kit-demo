import React, { useState , useContext } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Topbar from '../common/navbar/navbar';
import { Form, Button } from 'react-bootstrap';
import Link from '@mui/material/Link';
import "../../global.css"
import AuthContext from '../../context/auth/authcontext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const {ForgetPassword} = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(email)
    ForgetPassword(email);
  };

  return (
    <>
    <Topbar/>
    <div className="ForgetPass">
      <div className="one">
    <Form className='form' onSubmit={handleSubmit}>
  <LockOutlinedIcon className='icon' sx={{ bgcolor: 'secondary.main' }} />
      <Form.Group controlId="formGroupEmail">
    <h2 className='headingReset' >
Forget Password
</h2>
<p className='notereset'><span>*</span> Reset Password Will be Sent to your Email Address So kindly put the valid address!! </p>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button className='resetBtn' variant="primary" xs={12} sm={12} type="submit">
        Reset Password
      </Button>
    </Form>
    <div className='resetLink'>
                  <div>
                    <Link href="/login" variant="body2">
                      Login
                    </Link>
                  </div>
                  <div >
                    <Link href="/registration" variant="body2">
                      Create New Account
                    </Link>
                  </div>
                </div>
    </div>
    </div>
    </>
  );
};

export default ForgotPassword;
