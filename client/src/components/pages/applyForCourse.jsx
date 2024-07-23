import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import {
  Container,
  Box,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
// import AdminContext from '../../context/admin/admincontext';
import Topbar from '../common/navbar/navbar';

// const defaultTheme = createTheme();

// const degrees = ['Masters', 'Bachelor', 'Intermediate', 'Matric', 'Other'];
// const subjects = [
//   'Computer Science',
//   'Electrical Engineering',
//   'Mechanical Engineering',
//   'Mathematics',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Economics',
//   'Business Administration',
//   'Law',
//   'Medicine',
//   'Other',
// ];
// const genders = [
//   { value: 'male', label: 'Male' },
//   { value: 'female', label: 'Female' },
//   { value: 'other', label: 'Other' },
// ];
// const courses = [
//   {
//     value: 'Freelance Workshop for CS Student',
//     label: 'Freelance Workshop for CS Student',
//   },
//   {
//     value: 'Freelance Workshop for Non CS Student',
//     label: 'Freelance Workshop for Non CS Student',
//   },
// ];

// const whatsappLinks = {
//   'Freelance Workshop for CS Student':
//     'https://chat.whatsapp.com/BCBgeLcafow3fXxh21Md43',
//   'Freelance Workshop for Non CS Student':
//     'https://chat.whatsapp.com/IR7bZNfJAVT0dKc10Xrxpq',
// };

const ApplyCourseForm = () => {
  // const { AppliedForaCourse, applications, error } = useContext(AdminContext);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   fatherName: '',
  //   whatsappNumber: '',
  //   dateOfBirth: '',
  //   gender: '',
  //   cnic: '',
  //   address: '',
  //   qualification: '',
  //   subject: '',
  //   completionYear: '',
  //   universityCollege: '',
  //   course: '',
  //   email: '',
  // });

  // const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [courseInfo, setCourseInfo] = useState(null);
  // const [whatsappLink, setWhatsappLink] = useState('');

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!emailRegex.test(formData.email)) {
  //     toast.error('Please enter a valid email address.');
  //     return;
  //   }

  //   const duplicateEmail = applications.some(
  //     (app) => app.email === formData.email
  //   );

  //   if (duplicateEmail) {
  //     toast.error('Email already used. Please use a different email.');
  //     return;
  //   }

  //   setLoading(true);
  //   await AppliedForaCourse(formData);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (applications.length > 0) {
  //     toast.success('Successfully applied for the course!');
  //     setShowModal(true);
  //     setCourseInfo({ courseName: formData.course });
  //     setWhatsappLink(whatsappLinks[formData.course]);
  //     setFormData({
  //       name: '',
  //       fatherName: '',
  //       whatsappNumber: '',
  //       dateOfBirth: '',
  //       gender: '',
  //       cnic: '',
  //       address: '',
  //       qualification: '',
  //       subject: '',
  //       completionYear: '',
  //       universityCollege: '',
  //       course: '',
  //       email: '',
  //     });
  //   }

  //   if (error) {
  //     toast.error(
  //       'Form submission failed. Please try again or contact us for assistance.'
  //     );
  //   }

  //   return () => {
  //     setShowModal(false);
  //     setCourseInfo(null);
  //     setWhatsappLink('');
  //   };
  // }, [applications, error]);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setCourseInfo(null);
  //   setWhatsappLink('');
  // };

  // const isFormValid =
  //   Object.values(formData).every((value) => value !== '') &&
  //   !Object.values(formData).includes(null);

  return (
    <>
      <header className="App-header">
        <Topbar />
      </header>
      <div className="registration-closed">
      <h1>
      Required number of registrations are completed on first come first served basis.
      Follow us on social media for any future update and announcement.
      </h1>
      <div className="social-icons">
        <a href="https://www.facebook.com/KarachiInstituteOfTechnology" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="icon" />
        </a>
        <a href="https://www.instagram.com/karachiinstituteoftechnology" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </a>
        <a href="https://www.linkedin.com/in/karachiinstituteoftechnology" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="icon" />
        </a>
      </div>
    </div>        
    {/* <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Apply for Course
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
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
                      <RadioGroup
                        row
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
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
                      <InputLabel id="qualification-label">
                        Highest Qualification
                      </InputLabel>
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
                      <InputLabel id="subject-label">
                        Subject of Studies
                      </InputLabel>
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
                      error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                      helperText={
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                          ? 'Please enter a valid email address.'
                          : ''
                      }
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
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="mailto:learningmanagmentsystem.kit@gmail.com" variant="body2">
                      Facing Issue
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography>
                A confrmation email is send to your email id If you dont receive
                the confirmation Massege kindly check/Change the Email Address
                or/and try again after few minutes
              </Typography>
            </Box>
          </Container>
        </ThemeProvider> */}
      {/* <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>Course Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have successfully applied for the course "
            {courseInfo?.courseName}".
          </Typography>
          {whatsappLink && (
            <Typography>
              Join our WhatsApp group:{' '}
              <Link href={whatsappLink} target="_blank">
                {whatsappLink}
              </Link>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* <Toaster /> */}
    </>
  );
};

export default ApplyCourseForm;
