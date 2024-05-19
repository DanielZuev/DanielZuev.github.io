import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import MyRooms from '../../Layout/MyRooms';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('MyRooms Component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders the My Groups page', async () => {
        const mockRooms = [
            { roomID: 1, roomName: 'Room 1', roomDescription: 'Description 1' },
            { roomID: 2, roomName: 'Room 2', roomDescription: 'Description 2' },
        ];
        fetchMock.mockResponseOnce(JSON.stringify(mockRooms));

        render(
            <AuthProvider>
                <Router>
                    <MyRooms />
                </Router>
            </AuthProvider>
        );

        // Check if "My Groups" heading is rendered
        expect(screen.getByRole('heading', { name: 'My Groups' })).toBeInTheDocument();

        // Wait for the rooms to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Room 1')).toBeInTheDocument();
            expect(screen.getByText('Room 2')).toBeInTheDocument();
        });
    });
});