import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  
  const [validFields, setValidFields] = useState({
    nombreCompleto: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  
  const [isFormValid, setIsFormValid] = useState(false);
  
  const navigate = useNavigate();
  
  const validateNombreCompleto = (value) => {
    if (!value.trim()) {
      return 'El nombre completo es obligatorio';
    }
    return '';
  };
  
  const validateEmail = (value) => {
    if (!value) {
      return 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Ingresa un correo electrónico válido';
    }
    return '';
  };
  
  const validatePassword = (value) => {
    if (!value) {
      return 'La contraseña es obligatoria';
    } else if (value.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  };
  
  const validateConfirmPassword = (value) => {
    if (!value) {
      return 'Debes confirmar la contraseña';
    } else if (value !== password) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  };
  
  const handleNombreCompletoChange = (e) => {
    const value = e.target.value;
    setNombreCompleto(value);
    
    const error = validateNombreCompleto(value);
    setErrors(prev => ({ ...prev, nombreCompleto: error }));
    setValidFields(prev => ({ ...prev, nombreCompleto: !error }));
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    const error = validateEmail(value);
    setErrors(prev => ({ ...prev, email: error }));
    setValidFields(prev => ({ ...prev, email: !error }));
    
    if (errorMessage) setErrorMessage('');
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    const error = validatePassword(value);
    setErrors(prev => ({ ...prev, password: error }));
    setValidFields(prev => ({ ...prev, password: !error }));
    
    if (confirmPassword) {
      const confirmError = value === confirmPassword ? '' : 'Las contraseñas no coinciden';
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      setValidFields(prev => ({ ...prev, confirmPassword: !confirmError }));
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    const error = validateConfirmPassword(value);
    setErrors(prev => ({ ...prev, confirmPassword: error }));
    setValidFields(prev => ({ ...prev, confirmPassword: !error }));
  };
  
  useEffect(() => {
    setIsFormValid(
      !errors.nombreCompleto && nombreCompleto.trim() !== '' &&
      !errors.email && email !== '' &&
      !errors.password && password !== '' &&
      !errors.confirmPassword && confirmPassword !== ''
    );
  }, [errors, nombreCompleto, email, password, confirmPassword]);
  
  const isEmailRegistered = (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
  };
  
  const saveUser = (user) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      if (isEmailRegistered(email)) {
        setErrorMessage('Este correo electrónico ya está registrado');
        return;
      }
      
      const newUser = { 
        nombreCompleto, 
        email, 
        password,
        createdAt: new Date().toISOString()
      };
      
      console.log('Registro exitoso:', newUser);
      
      saveUser(newUser);
      
      setSuccessMessage('¡Registro exitoso! Tus datos han sido guardados correctamente.');
      
      setTimeout(() => {
        setNombreCompleto('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage('');
        setValidFields({
          nombreCompleto: false,
          email: false,
          password: false,
          confirmPassword: false
        });
        
        // Redirigir a la página de inicio de sesión
        navigate('/');
      }, 2000);
    }
  };
  
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Registro de Usuario
          </Typography>
          
          {successMessage && (
            <Box sx={{ 
              bgcolor: '#dff0d8', 
              color: '#3c763d', 
              p: 2, 
              borderRadius: 1,
              mb: 2 
            }}>
              <Typography>{successMessage}</Typography>
            </Box>
          )}
          
          {errorMessage && (
            <Box sx={{ 
              bgcolor: '#f8d7da', 
              color: '#721c24', 
              p: 2, 
              borderRadius: 1,
              mb: 2 
            }}>
              <Typography>{errorMessage}</Typography>
            </Box>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre completo"
              value={nombreCompleto}
              onChange={handleNombreCompletoChange}
              error={!!errors.nombreCompleto}
              helperText={errors.nombreCompleto || "Ej: Juan Pérez López"}
              FormHelperTextProps={{ 
                sx: { 
                  color: errors.nombreCompleto ? 'error.main' : 'text.secondary' 
                } 
              }}
              InputProps={{
                sx: validFields.nombreCompleto ? {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                } : {}
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email || "Ej: ejemplo@correo.com"}
              FormHelperTextProps={{ 
                sx: { 
                  color: errors.email ? 'error.main' : 'text.secondary' 
                } 
              }}
              InputProps={{
                sx: validFields.email ? {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                } : {}
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password || "Mínimo 6 caracteres"}
              FormHelperTextProps={{ 
                sx: { 
                  color: errors.password ? 'error.main' : 'text.secondary' 
                } 
              }}
              InputProps={{
                sx: validFields.password ? {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                } : {}
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirmar contraseña"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword || "Repite tu contraseña"}
              FormHelperTextProps={{ 
                sx: { 
                  color: errors.confirmPassword ? 'error.main' : 'text.secondary' 
                } 
              }}
              InputProps={{
                sx: validFields.confirmPassword ? {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4caf50',
                    borderWidth: '2px'
                  },
                } : {}
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={!isFormValid}
            >
              Registrar
            </Button>
            
            <Button
              component={Link}
              to="/"
              fullWidth
              variant="text"
              sx={{ mt: 1 }}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;