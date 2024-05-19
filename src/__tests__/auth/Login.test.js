import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext.jsx'; 
import Login from '../../auth/Login'; 

describe('Login Component', () => {
  test('renders the login form', () => {
    render(
      <AuthProvider>
        <Router>
          <Login />
        </Router>
      </AuthProvider>
    );

    // Check if all elements are rendered
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
