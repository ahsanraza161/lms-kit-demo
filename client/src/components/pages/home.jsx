import React from 'react';
// import Topbar from '../common/navbar/navbar';
import Login from '../pages/login';
import { Container, Row, Col } from 'react-bootstrap';
import Link from '@mui/material/Link';

function home() {
  return (
    <div>
      <main className=" home container">
        <Container fluid>
          <Row>
            <Col className="login" xs={12} md={6}>
              <Link href="/login">
                <Login className="text-decoration-none" />
              </Link>
            </Col>
            <Col xs={12} md={6}>
              <div className="App-main-all mainpagecontent">
                <h1>Welcome To The</h1>
                <h1>Learning Managment System (KIT)</h1>
                <p>
                  KIT is an educational organization with focus on IT education
                  for Pakistani youth with emphasize on project base learning
                  enabling youngsters for high quality work worldwide.
                </p>
                <a
                  href="https://karachi-it-educators.org/"
                  className="mainpagebtn"
                >
                  Learn More
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default home;
