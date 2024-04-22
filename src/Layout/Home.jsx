import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/Navigation/NavBar';
import Insights from '../components/Insights/SessionInsights/Insights';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const { authGetRequest } = useAuth();

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (!userID) return;
        fetchRooms(userID);
    }, []);

    const fetchRooms = async (userID) => {
        const url = `room/findByUserIdAdmin/${userID}`;
        try {
            const fetchedRooms = await authGetRequest(url, 
              (error) => {
                console.error('Error:', error);
                
                // Handle error (e.g., display error message)
              });
            setRooms(fetchedRooms);
            if (fetchedRooms && fetchedRooms.length > 0) {
                setSelectedRoomId(fetchedRooms[0].roomID); // Default to the first room
            }
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    const handleRoomSelection = (roomId) => {
        setSelectedRoomId(roomId);
    };

    return (
        <>
            <NavBar />
            <div className="container mt-4">
                <h1>Dashboard</h1>
                <h3>Select Room to view Insights</h3>
                <div className="flex-grow-1 d-flex">
                  <div className="btn-group mb-4 w-100 d-flex flex-wrap">
                      {rooms.map(room => (
                          <button key={room.roomID}
                                  onClick={() => handleRoomSelection(room.roomID)}
                                  className={`btn btn-outline-secondary flex-fill ${selectedRoomId === room.roomID ? 'active' : ''}`}>
                              {room.roomName}
                          </button>
                      ))}
                  </div>
                </div>
                {selectedRoomId && <Insights roomID={selectedRoomId} />}
            </div>
        </>
    );
};

export default Home;
