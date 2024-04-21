import { React, useContext, useEffect, useState } from 'react';
import Topbar from '../common/navbar/navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../../context/auth/authcontext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();
const SignIn = () => {
  const {
    LoginHandler,
    error,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    isAdminAuthenticated,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prevdata) => {
      return { ...prevdata, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData((prevdata) => {
      return { email: '', password: '' };
    });
    LoginHandler(formData);
  };

  useEffect(() => {
    if (error !== null && error !== undefined) {
      toast.error(error);
    }

    if (isAdminAuthenticated) {
      navigate('/dashboard');
    }
    if (isStudentAuthenticated) {
      navigate('/user/yourdashboard');
    }
    if (isTeacherAuthenticated) {
      navigate('/teacher/yourdashboard');
    }
  }, [
    error,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    isAdminAuthenticated,
  ]);
  return (
    <>
      <Topbar />
      <div>
        <div className="App-main-all">
          <Container>
            <CssBaseline />
            <Box
              sx={{
                // marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{ m: 1, alignItems: 'center', bgcolor: 'secondary.main' }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log in
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgetpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/registration" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;
    