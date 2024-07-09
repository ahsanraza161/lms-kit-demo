import { React, useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '../../context/auth/authcontext';
import Topbar from '../common/navbar/navbar';

const defaultTheme = createTheme();

const SignIn = () => {
  const { LoginHandler, error, isStudentAuthenticated, isTeacherAuthenticated, isAdminAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prevdata) => {
      return { ...prevdata, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await LoginHandler(formData);
    setLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (error !== null && error !== undefined) {
      toast.error(error);
    }
    if (isAdminAuthenticated) {
      navigate('/dashboard');
    }
    if (isStudentAuthenticated) {
      navigate('/user/allnotes');
    }
    if (isTeacherAuthenticated) {
      navigate('/teacher/allnotes');
    }
  }, [error, isStudentAuthenticated, isTeacherAuthenticated, isAdminAuthenticated]);

  return (
    <>
      <Topbar />
      <div>
        <div className="App-main-all">
          <Container>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, alignItems: 'center', bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  variant="filled"
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
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Log in'}
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
