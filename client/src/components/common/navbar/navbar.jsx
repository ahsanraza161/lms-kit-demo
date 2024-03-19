import '../../../global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function Topbar() {
  return (
    <>
      <Navbar
        className="navSmart container"
        data-bs-theme="dark"
        expand="lg"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/">LMS-KIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" navmain align-items-center">
              <Link className="navitem" to="/">
                Home
              </Link>
              <Link className="navitem" to="/about">
                About
              </Link>
              <Link className="navitem" to="/login">
                Login
              </Link>
              <Link className="regnavitem navitem" to="/registration">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Topbar;
