import * as React from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Navbar from '../Navbar';
import { RegisterAPI } from '../API/APIService'
import Popup from '../Popup/Popup';
import { useHistory } from "react-router-dom";

import axios from 'axios';

const theme = createTheme();

export default function SignUp() {
  const [role, setRole] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState("");
  const [axiosError, setAxiosError] = React.useState('');
  const [popup, setPopup] = React.useState(false);
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    var data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: role,
      country: formData.get('country'),
      nationality: formData.get('nationality'),
      mobile_no: formData.get('mobile'),
    }

    axios.post(RegisterAPI, data).then(
      (res) => {
        console.log("success-- popup true ", res.data)
        if (res.data.success) {
          setPopup(true)
        } else {
          setError(res.data)
        }
      }).catch((err) => {
        console.log(err)
        setAxiosError(err)
    })
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {popup? <Popup from="signin" /> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <p style={{ color: 'red', fontSize: '14px' }}>{axiosError? axiosError : null}</p>
          <p style={{ color: 'green', fontSize: '18px' }}>{success? success : null}</p>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                />
                <p style={{ color: 'red', fontSize: '14px' }}>{error.username? error.username[0] : null}</p>
              </Grid>
                
              <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={handleChangeRole}
                    >
                      <MenuItem value={'student'}>Student</MenuItem>
                      <MenuItem value={'staff'}>Staff</MenuItem>
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'editor'}>Editor</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <p style={{ color: 'red', fontSize: '14px' }}>{error.role? error.role[0] : null}</p>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Country"
                  label="Country"
                  name="country"
                  autoComplete="family-name"
                />
                <p style={{ color: 'red', fontSize: '14px' }}>{error.country? error.country[0] : null}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Nationality"
                  label="Nationality"
                  name="nationality"
                  autoComplete="family-name"
                />
                <p style={{ color: 'red', fontSize: '14px' }}>{error.nationality? error.nationality[0] : null}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <p style={{ color: 'red', fontSize: '14px' }}>{error.email? error.email[0] : null}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Mobile"
                  label="Mobile No"
                  name="mobile"
                  autoComplete="Mobile"
                />
                <p style={{ color: 'red', fontSize: '14px' }}>{error.mobile_no? error.mobile_no[0] : null}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <p style={{ color: 'red', fontSize: '14px' }}>{error.password? error.password[0] : null}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}