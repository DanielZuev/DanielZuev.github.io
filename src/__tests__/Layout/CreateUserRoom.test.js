import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import CreateUserRoom from '../../Layout/CreateUserRoom';

describe('CreateUserRoom Component', () => {
    test('renders the create group form', () => {
        render(
            <AuthProvider>
                <Router>
                    <CreateUserRoom />
                </Router>
            </AuthProvider>
        );

        // Check if all elements are rendered
        expect(screen.getByLabelText('Group Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Group Description')).toBeInTheDocument();
        expect(screen.getByLabelText('Group Heading')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Group' })).toBeInTheDocument();
    });
});
