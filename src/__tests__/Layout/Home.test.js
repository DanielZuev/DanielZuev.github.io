import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Home from '../../Layout/Home';

describe('Home Component', () => {
    test('renders the dashboard and select room to view insights text', () => {
        render(
            <AuthProvider>
                <Router>
                    <Home />
                </Router>
            </AuthProvider>
        );

        // Check if the essential elements are rendered
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Select Room to view Insights')).toBeInTheDocument();
    });
});
