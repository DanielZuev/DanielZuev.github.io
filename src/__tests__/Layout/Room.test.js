import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Room from '../../Layout/Room';

describe('Room Component', () => {
    test('renders the Room component with group information', () => {
        const mockRoomDetails = {
            roomID: 1,
            roomName: 'Test Room',
            roomDescription: 'This is a test room description',
            roomHeading: 'Test Room Heading'
        };

        const mockUserRoomRelationship = {
            userID: 1,
            roomID: 1,
            role: 'USER'
        };

        const mockIsRoomSelectedSetter = jest.fn();

        render(
            <AuthProvider>
                <Router>
                    <Room
                        roomDetails={mockRoomDetails}
                        userRoomRelationship={mockUserRoomRelationship}
                        isRoomSelectedSetter={mockIsRoomSelectedSetter}
                    />
                </Router>
            </AuthProvider>
        );

        // Check if the main heading is rendered
        const mainHeading = screen.getByRole('heading', { level: 1, name: /group information/i });
        expect(mainHeading).toBeInTheDocument();

        // Check if the secondary heading is rendered
        const secondaryHeading = screen.getByRole('heading', { level: 2, name: /group information/i });
        expect(secondaryHeading).toBeInTheDocument();

        // Check if group information is rendered
        expect(screen.getByText('Group Name:')).toBeInTheDocument();
        expect(screen.getByText('Test Room')).toBeInTheDocument();
        expect(screen.getByText('Group Heading:')).toBeInTheDocument();
        expect(screen.getByText('Test Room Heading')).toBeInTheDocument();
        expect(screen.getByText('Group Description:')).toBeInTheDocument();
        expect(screen.getByText('This is a test room description')).toBeInTheDocument();

        // Check if "Back to Search" button is rendered
        expect(screen.getByRole('button', { name: 'Back to Search' })).toBeInTheDocument();

        // Check if "Info" button is rendered and can be clicked
        const infoButton = screen.getByRole('button', { name: 'Info' });
        expect(infoButton).toBeInTheDocument();
        fireEvent.click(infoButton);

        // Check if "All Sessions" button is rendered
        expect(screen.getByRole('button', { name: 'All Sessions' })).toBeInTheDocument();

        // Check if "My Sessions" button is rendered
        expect(screen.getByRole('button', { name: 'My Sessions' })).toBeInTheDocument();
    });
});