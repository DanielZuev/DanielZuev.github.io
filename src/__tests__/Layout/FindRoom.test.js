import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import FindRoom from '../../Layout/FindRoom';

describe('FindRoom Component', () => {
    test('renders the find group form', () => {
        render(
            <AuthProvider>
                <Router>
                    <FindRoom />
                </Router>
            </AuthProvider>
        );

        // Check if the essential elements are rendered
        expect(screen.getByText('Find a Group')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter group name...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });
});
