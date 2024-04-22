import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RoomDescription from './RoomDescription';
import Room from './Room';
import NavBar from '../components/Navigation/NavBar';

function MyRooms() {
    const [selectedRoom, setSelectedRoom] = useState()
    const [userRoomRelationship, setUserRoomRelationship] = useState()
    const [isRoomSelected, setIsRoomSelected] = useState(false);


    const [rooms, setRooms] = useState([]);
    const { authGetRequest } = useAuth();
    const userId = localStorage.getItem('userID');
    const url = 'room/findByUserId/' + userId;
    useEffect(() => {
            // Set the correct URL here
            authGetRequest(url, 
            (error) => {
                console.error('Error:', error);
                
                // Handle error (e.g., display error message)
            }).then(data => {
                setRooms(data); // Set the rooms data on successful fetch
            });
        }, [authGetRequest, url]); 

        return (
            <>
            <NavBar />
            <div className="container mt-5">
                {!isRoomSelected ? 
                (<div>
                    <ul className="list-unstyled">
                        <h1 className="my-4">My Groups</h1>
                        {rooms.length ? (
                        <div className="list-group">
                        {rooms.map((room, index) => (
                            <li key={index}>
                                <RoomDescription 
                                roomDetails={room} 
                                selectedRoomSetter = {setSelectedRoom} 
                                isRoomSelectedSetter = {setIsRoomSelected} 
                                userRoomRelationshipSetter = {setUserRoomRelationship}
                                />
                            </li> // Adjust based on your room object structure
                        ))}
                        </div>
                    ) : (
                            <p className="text-center">You are not part of any rooms yet.</p>
                        )}
                    </ul>
                </div> ) :
                (
                    <div>
                    <Room roomDetails = {selectedRoom} userRoomRelationship = {userRoomRelationship} isRoomSelectedSetter = {setIsRoomSelected}/>
                    </div>
                )}
                </div>
            </>
        );
}

export default MyRooms;
