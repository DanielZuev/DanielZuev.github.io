import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import RoomDescription from '../../Layout/RoomDescription';

// Mock the useAuth hook
jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
    AuthProvider: ({ children }) => <div>{children}</div>
}));

describe('RoomDescription Component', () => {
    const mockRoomDetails = {
        roomID: 1,
        roomName: 'Test Room',
        roomDescription: 'This is a test room description',
        roomHeading: 'Test Room Heading'
    };

    const mockUserRoomRelationshipSetter = jest.fn();
    const mockSelectedRoomSetter = jest.fn();
    const mockIsRoomSelectedSetter = jest.fn();

    beforeEach(() => {
        // Mock localStorage
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => '1');

        // Mock the authGetRequest function
        useAuth.mockReturnValue({
            authGetRequest: jest.fn().mockResolvedValue({ role: 'USER' })
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the RoomDescription component with group information', async () => {
        render(
            <AuthProvider>
                <Router>
                    <RoomDescription
                        roomDetails={mockRoomDetails}
                        selectedRoomSetter={mockSelectedRoomSetter}
                        isRoomSelectedSetter={mockIsRoomSelectedSetter}
                        userRoomRelationshipSetter={mockUserRoomRelationshipSetter}
                    />
                </Router>
            </AuthProvider>
        );

        // Check if group information is rendered
        expect(screen.getByText('Group Name:')).toBeInTheDocument();
        expect(screen.getByText('Test Room')).toBeInTheDocument();
        expect(screen.getByText('About the group:')).toBeInTheDocument();
        expect(screen.getByText('Test Room Heading')).toBeInTheDocument();
        expect(screen.getByText('Role:')).toBeInTheDocument();

        // Wait for the role to be fetched and rendered
        await waitFor(() => expect(screen.getByText('USER')).toBeInTheDocument());

        // Check if "Open Group" button is rendered
        const openGroupButton = screen.getByRole('button', { name: 'Open Group' });
        expect(openGroupButton).toBeInTheDocument();

        // Click the "Open Group" button
        fireEvent.click(openGroupButton);

        // Ensure the setters are called
        expect(mockSelectedRoomSetter).toHaveBeenCalledWith(mockRoomDetails);
        expect(mockIsRoomSelectedSetter).toHaveBeenCalledWith(true);
        expect(mockUserRoomRelationshipSetter).toHaveBeenCalledWith({ role: 'USER' });

        // Check if the component shows "Nothing here for now" after selecting the room
        expect(screen.getByText('Nothing here for now')).toBeInTheDocument();
    });

    test('displays an error message when there is an error fetching data', async () => {
        useAuth.mockReturnValue({
            authGetRequest: jest.fn().mockRejectedValue(new Error('Fetch error'))
        });

        render(
            <AuthProvider>
                <Router>
                    <RoomDescription
                        roomDetails={mockRoomDetails}
                        selectedRoomSetter={mockSelectedRoomSetter}
                        isRoomSelectedSetter={mockIsRoomSelectedSetter}
                        userRoomRelationshipSetter={mockUserRoomRelationshipSetter}
                    />
                </Router>
            </AuthProvider>
        );

        // Wait for the error message to be rendered
        await waitFor(() => expect(screen.getByText('Error processing room details')).toBeInTheDocument());
    });
});
