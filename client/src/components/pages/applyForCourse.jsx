import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Box, Avatar, Button, CssBaseline, TextField, Link, Grid,
  Typography, Select, MenuItem, FormControl, InputLabel, RadioGroup,
  FormControlLabel, Radio, ThemeProvider, createTheme, Dialog,
  DialogTitle, DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { Toaster, toast } from 'react-hot-toast';
import AdminContext from '../../context/admin/admincontext';
import Topbar from '../common/navbar/navbar';

const defaultTheme = createTheme();

const degrees = ['Masters', 'Bachelor', 'Intermediate', 'Matric', 'Other'];
const branches = ['Main Branch - FB Area, Gulberg', 'Orangi Branch'];
const subjects = [
  'Computer Science', 'Electrical Engineering', 'Mechanical Engineering',
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics',
  'Business Administration', 'Law', 'Medicine', 'Other'
];
const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];
const courses = [
  { value: 'Freelance Workshop', label: 'Freelance Workshop' }
];

const ApplyCourseForm = () => {
  const { AppliedForaCourse, messageServer } = useContext(AdminContext);
  const [formData, setFormData] = useState({
    branch: '', name: '', fatherName: '', whatsappNumber: '', dateOfBirth: '',
    gender: '', cnic: '', address: '', qualification: '', subject: '',
    completionYear: '', universityCollege: '', course: '', email: ''
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await AppliedForaCourse(formData);
    setLoading(false);
  };

  useEffect(() => {
    if (messageServer) {
      if (messageServer.msg) {
        toast.success(messageServer.msg);
        setShowModal(true);
        setCourseInfo({ courseName: formData.course });
        setFormData({
          branch: '', name: '', fatherName: '', whatsappNumber: '', dateOfBirth: '',
          gender: '', cnic: '', address: '', qualification: '', subject: '',
          completionYear: '', universityCollege: '', course: '', email: ''
        });
      } else if (messageServer.message) {
        toast.error(messageServer.message);
      }
    }
  }, [messageServer]);

  const handleCloseModal = () => {
    setShowModal(false);
    setCourseInfo(null);
  };

  const isFormValid = Object.values(formData).every((value) => value !== '') && !Object.values(formData).includes(null);

  return (
    <>
      <header className="App-header">
        <Topbar />
      </header>
      <main className="App-main-all container">
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h5">
                Apply for Course
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl variant="filled" required fullWidth>
                      <InputLabel id="branch-label">Branch</InputLabel>
                      <Select
                        labelId="branch-label"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                      >
                        {branches.map((branch) => (
                          <MenuItem key={branch} value={branch}>
                            {branch}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="Father's Name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="WhatsApp Number"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      type="date"
                      label="Date of Birth"
                      InputLabelProps={{ shrink: true }}
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl required component="fieldset">
                      <Typography component="legend">Gender</Typography>
                      <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                        {genders.map((gender) => (
                          <FormControlLabel
                            key={gender.value}
                            value={gender.value}
                            control={<Radio />}
                            label={gender.label}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="CNIC"
                      name="cnic"
                      value={formData.cnic}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="Address"
                      multiline
                      rows={2}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="filled" required fullWidth>
                      <InputLabel id="qualification-label">Highest Qualification</InputLabel>
                      <Select
                        labelId="qualification-label"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                      >
                        {degrees.map((degree) => (
                          <MenuItem key={degree} value={degree}>
                            {degree}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="filled" required fullWidth>
                      <InputLabel id="subject-label">Subject of Studies</InputLabel>
                      <Select
                        labelId="subject-label"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        {subjects.map((subject) => (
                          <MenuItem key={subject} value={subject}>
                            {subject}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      type="number"
                      label="Completion Year"
                      name="completionYear"
                      value={formData.completionYear}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="University/College"
                      name="universityCollege"
                      value={formData.universityCollege}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="filled" required fullWidth>
                      <InputLabel id="course-label">Select Course</InputLabel>
                      <Select
                        labelId="course-label"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                      >
                        {courses.map((course) => (
                          <MenuItem key={course.value} value={course.value}>
                            {course.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  disabled={!isFormValid || loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Apply'}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </main>
      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>Course Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have successfully applied for the course "{courseInfo?.courseName}".
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster />
    </>
  );
};

export default ApplyCourseForm;
