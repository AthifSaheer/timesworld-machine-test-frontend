import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../Navbar';
import { LoginAPI } from '../API/APIService'
import Popup from '../Popup/Popup';

import axios from 'axios';

const theme = createTheme();

export default function SignUp() {
  const [error, setError] = React.useState('');
  const [popup, setPopup] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    var data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    axios.post(LoginAPI, data).then(
      (res) => {
        console.log("success-- ", res.data)
        if (res.data.Token) {
          localStorage.setItem("Token", res.data.Token);
          setPopup(true)
        } else {
          setError(res.data)
        }
      }).catch((err) => {
        console.log(err)
        // setAxiosError(err)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {popup? <Popup from="/" /> : null}

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
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Create a new account!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}