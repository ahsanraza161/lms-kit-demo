import React from 'react';
import '../global.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import defaultRoutes from './routes';
import Admindashboard from '../features/admin';
import Dashboard from '../features/admin/components/pages/dashboard';
import Student from '../features/admin/components/pages/students';
import Usermanagement from '../features/admin/components/pages/pending-registration';
import AddUser from '../features/admin/components/pages/adduser';
import Calender from '../features/admin/components/pages/CalenderShedule';
import Courses from '../features/admin/components/pages/courses';
import StudentPanel from '../features/student';
import TeacherPanel from '../features/teacher';

const AppRouter = () => {
  const { publicRoutes } = defaultRoutes;

  const publicPageRoutes = publicRoutes.map(({ label, path, component }) => {
    return <Route key={label} path={`/${path}`} element={component} />;
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {publicPageRoutes}

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Admindashboard />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="students" element={<Student />} />
            <Route path="teachers" element={<Student />} />
            <Route path="usermanagement" element={<Usermanagement />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="courses" element={<Courses />} />
            <Route path="shedulecalender" element={<Calender />} />
          </Route>
          <Route path="/user/:activepage" element={<StudentPanel />} />
          <Route path="/teacher/:activepage" element={<TeacherPanel />} />
        </Route>
        <Route path="*" element={<h1 className='notfound'>Not found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
