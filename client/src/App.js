import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/about';
import Home from './components/pages/home';
import ForgetPassword from './components/pages/forgetpassword';
import Registration from './components/pages/Registration';
import Login from './components/pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authstate from './context/auth/authstate';
import Adminstate from './context/admin/adminstate';
import Admindashboard from './features/admin';
import Dashboard from './features/admin/components/pages/dashboard';
import Student from './features/admin/components/pages/students';
import Usermanagement from './features/admin/components/pages/pending-registration';
import AddUser from './features/admin/components/pages/adduser';
import Courses from './features/admin/components/pages/courses';
import StudentPanel from './features/student';
import TeacherPanel from './features/teacher';
import AppRouter from './router';

function App() {
  return (
    <Authstate>
      <Adminstate>
        <BrowserRouter>
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/dashboard" element={<Admindashboard />}>
              <Route index element={<Dashboard />}></Route>
              <Route path="students" element={<Student />} />
              <Route path="teachers" element={<Student />} />
              <Route path="usermanagement" element={<Usermanagement />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="courses" element={<Courses />} />
            </Route>
            <Route path="/user/:activepage" element={<StudentPanel />} />
            <Route path="/teacher/:activepage" element={<TeacherPanel />} />
          </Routes> */}
          <AppRouter />
        </BrowserRouter>
      </Adminstate>
    </Authstate>
  );
}

export default App;
