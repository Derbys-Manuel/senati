import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const error = {};
    if (!email) error.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(email)) error.email = 'Correo inválido';

    if (!password) error.password = 'La contraseña es obligatoria';
    else if (password.length < 6) error.password = 'Mínimo 6 caracteres';

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const verifyCredentials = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(user => 
      user.email === email && user.password === password
    );
    
    return foundUser;
  };

  const submit = (e) => {
    e.preventDefault();
    
    setSuccessMessage('');
    setErrorMessage('');
    
    if (validate()) {
      const user = verifyCredentials();
      
      if (user) {
        console.log('Login correcto:', { email, password });
        setSuccessMessage(`¡Bienvenido ${user.nombreCompleto}! Has iniciado sesión correctamente.`);
        
        sessionStorage.setItem('currentUser', JSON.stringify({
          nombreCompleto: user.nombreCompleto,
          email: user.email,
          isLoggedIn: true
        }));
        
      } else {
        setErrorMessage('Correo electrónico o contraseña incorrectos');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Iniciar Sesión
          </Typography>
          
          {successMessage && (
            <Box sx={{  bgcolor: '#dff0d8', color: '#3c763d', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography>{successMessage}</Typography>
            </Box>
          )}
          
          {errorMessage && (
            <Box sx={{  bgcolor: '#f8d7da', color: '#721c24', p: 2, borderRadius: 1,mb: 2 }}>
              <Typography>{errorMessage}</Typography>
            </Box>
          )}
  
          <Box component="form" onSubmit={submit} noValidate sx={{ mt: 2 }}>
            <TextField margin="normal"required fullWidth label="Correo electrónico" type="email" value={email}
              onChange={(e) => {
                setEmail(e.target.value); 
                setErrorMessage('');
                setSuccessMessage('');
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
  
            <TextField margin="normal" required fullWidth label="Contraseña" type="password" value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
  
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} >
              Iniciar Sesión
            </Button>

            <Button component={Link} to="/register" fullWidth variant="text" sx={{ mt: 1 }}  >
              ¿Nuevo usuario? Regístrate
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
  
};

export default Login;