import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import background from '../images/background.jpg';
import { CssBaseline } from '@mui/material';

interface LoginState {
  username: string;
  password: string;
  rememberMe: boolean;
}

// const theme = createTheme();

const LoginPage: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, username: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, password: event.target.value });
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginState({ ...loginState, rememberMe: event.target.checked });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      loginState.username === 'desafiosharenergy' &&
      loginState.password === 'sh@r3n3rgy'
    ) {
      // Autenticação bem-sucedida
      if (loginState.rememberMe) {
        // Armazena username e password no localStorage
        localStorage.setItem('username', loginState.username);
        localStorage.setItem('password', loginState.password);
      } else {
        // Remove username e password do localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      navigate('/landing');
    } else {
      // Autenticação falhou
      alert('Nome de usuário ou senha incorretos');
    }
  };

  const appTheme = createTheme({
    palette: {
      primary: blue,
    },
  });

  const autoLogin = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      setLoginState({
        username: username,
        password: password,
        rememberMe: true,
      });
    }
  };

  React.useEffect(() => {
    autoLogin();
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 20,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={loginState.username}
                onChange={handleUsernameChange}
              />
              <br />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginState.password}
                onChange={handlePasswordChange}
              />
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={loginState.rememberMe}
                    onChange={handleRememberMeChange}
                    color="primary"
                  />
                }
                label="Lembre-me"
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
