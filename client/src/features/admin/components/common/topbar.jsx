// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import '../../mainadmin.css';

function Topbar() {
  return (
    <div className="topBar">
      <div className="topbarProfile">
        <h3>Learning Managment System</h3>
        <h5>
          Signed in as: <a href="/">Jawed Sahab</a>
        </h5>
      </div>
    </div>
  );
}

export default Topbar;
