import './AccountSettings.css';
import { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AuthContext from '../../../context/auth/authcontext';
import toast, { Toaster } from 'react-hot-toast';

const degrees = ['Masters', 'Bachelor', 'Intermediate', 'Matric', 'Other'];
const branch = ['Main Branch - FB Area, Gulberg', 'Orangi Branch'];

const subjects = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Business Administration',
  'Law',
  'Medicine',
  'Other',
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    cnic: '',
    address: '',
    qualification: '',
    subject: '',
    completionYear: '',
    universityCollege: '',
    email: '',
  });

  const { GetUserData, data, UpdateUser } = useContext(AuthContext);

  useEffect(() => {
    GetUserData().then(() => {
      if (data) {
        setFormData({
          name: data.name,
          branch: data.branch,
          fatherName: data.fatherName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          cnic: data.cnic,
          address: data.address,
          qualification: data.qualification,
          subject: data.subject,
          completionYear: data.completionYear,
          universityCollege: data.universityCollege,
          email: data.email,
        });
      }
    });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UpdateUser(formData);
      toast.success('Profile updated successfully', {
        position: 'top-center', // Center position
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile', {
        position: 'top-center', // Center position
      });
    }
  };

  return (
    <div className="accountSettings">
      <Typography component="h1" variant="h5">
        Account Settings
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <FormControl variant="filled" required style={{ width: '100%' }}>
              <InputLabel id="branch-label">Select our Branch</InputLabel>
              <Select
                labelId="branch-label"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              >
                {branch.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              style={{ width: '100%' }}
              label="Name"
              required
              name="name"
              sx={{ bgcolor: 'none', color: 'text.primary' }}
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Father's Name"
              style={{ width: '100%' }}
              sx={{ bgcolor: 'none', color: 'text.primary' }}
              required
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              style={{ width: '100%' }}
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              required
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required>
              <Typography component="heading" variant="h6">
                Gender
              </Typography>
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
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="CNIC"
              style={{ width: '100%' }}
              required
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Address"
              style={{ width: '100%' }}
              required
              multiline
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <FormControl required style={{ width: '100%' }}>
              <InputLabel id="qualification-label">
                Highest Qualification
              </InputLabel>
              <Select
                variant="filled"
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
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: '100%' }} required>
              <InputLabel id="subject-label">Subject of Studies</InputLabel>
              <Select
                variant="filled"
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
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              id="filled-basic"
              label="Completion Year"
              style={{ width: '100%' }}
              required
              type="number"
              name="completionYear"
              value={formData.completionYear}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              id="filled-basic"
              label="University/College Name"
              style={{ width: '100%' }}
              required
              name="universityCollege"
              value={formData.universityCollege}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              id="filled-basic"
              label="email"
              style={{ width: '100%' }}
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          style={{ width: '20%' }}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Box>
      <Toaster position="top-center" /> {/* Ensure toaster is centered */}
    </div>
  );
};

export default AccountSettings;
