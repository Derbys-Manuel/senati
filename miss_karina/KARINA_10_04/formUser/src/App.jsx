import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './assets/components/login';
import Form from './assets/components/form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
