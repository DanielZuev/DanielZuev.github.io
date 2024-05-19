import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext.jsx'; 
import Register from '../../auth/Register.jsx';

describe('Register Component', () => {
  test('renders the registration form', () => {
    render(
      <AuthProvider>
        <Router>
          <Register />
        </Router>
      </AuthProvider>
    );

    // Check if all elements are rendered
    expect(screen.getByPlaceholderText('FirstName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('LastName')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('StudentID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
