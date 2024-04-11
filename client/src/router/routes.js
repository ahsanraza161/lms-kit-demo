import Register from '../components/pages/Registration';
import Login from '../components/pages/login';
import Home from '../components/pages/home';
import About from '../components/pages/about';
import Forgetpassword from '../components/pages/forgetpassword';
import Dashboard from '../features/admin/components/pages/dashboard';
import StudentPanel from '../features/student';
import TeacherPanel from '../features/teacher';

const routes = {
  homePage: {
    path: '/',
    component: <Home />,
  },
  register: {
    path: '/registration',
    component: <Register />,
  },
  login: {
    path: '/login',
    component: <Login />,
  },
  about: {
    path: '/about',
    component: <About />,
  },
  ForgetPassword: {
    path: '/forgetpassword',
    component: <Forgetpassword />,
  },
  Dashboard: {
    path: '/dashboard',
    component: <Dashboard />,
  },
  StudentPanel: {
    path: '/user/:activepage',
    component: <StudentPanel />,
  },
  TeacherPanel: {
    path: '//teacher/:activepage',
    component: <TeacherPanel />,
  },
};

const defaultRoutes = {
  publicRoutes: [
    routes.login,
    routes.register,
    routes.homePage,
    routes.about,
    routes.ForgetPassword,
  ],
  protectedRoutes: [routes.Dashboard, routes.StudentPanel, routes.TeacherPanel],
};

export default defaultRoutes;
