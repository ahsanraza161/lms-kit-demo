import React, { useState, useContext } from 'react';
import Topbar from '../common/navbar/navbar';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '../../context/auth/authcontext';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { ResetPassword } = useContext(AuthContext);

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      ResetPassword(password, confirmPassword, token)
    }
  };

  return (
    <>
    <Topbar/>
      <div className='container'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="mt-5">Reset Password</h2>
            <Form onSubmit={handleResetPassword} className="mt-3">
              <Form.Group controlId="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
      <Toaster />
    </>
  );
};

export default ResetPassword;
