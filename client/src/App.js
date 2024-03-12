import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/about';
import Home from './components/pages/home';
import Registration from './components/pages/Registration';
import Login from './components/pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authstate from './context/auth/authstate';
import Admindashboard from './features/admin';
import Student from './features/admin/components/pages/students';
import Teacher from './features/admin/components/pages/teachers';

function App() {
  return (
    <Authstate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Admindashboard />}>
            <Route path="student" element={<Student />}></Route>
            <Route path="teacher" element={<Student />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Authstate>
  );
}

export default App;
