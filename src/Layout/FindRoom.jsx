import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth is correctly set up to provide authGetRequest
import RoomDescription from './RoomDescription';
import Room from './Room';
import NavBar from '../components/Navigation/NavBar';

const FindRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [roomRole, setRoomRole] = useState('');
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    const { authGetRequest } = useAuth();
    const [isRoomSelected, setIsRoomSelected] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState()
    const [userRoomRelationship, setUserRoomRelationship] = useState()

    const handleInputChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `room/findByPartialName/${roomName}`; // Update with the correct URL for your API

        authGetRequest(url,
            (error) => {
                console.error('Error:', error);
                setError('Failed to fetch rooms');
                setRooms([]);
            }).then((data) => {
                setRooms(data); // Assuming the API returns an array of rooms
                setError('');
            }).catch(err => {
                console.error('Error processing data:', err);
                setError('Error processing room details');
                
            });
    };

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                {!isRoomSelected ? (
                <div>
                    <h1 className="my-4">Find a Group</h1>
                    <form onSubmit={handleSubmit} className="mb-3">
                        <div className="input-group">
                            <input
                                id="roomName"
                                type="text"
                                className="form-control"
                                placeholder="Enter room name..."
                                value={roomName}
                                onChange={handleInputChange}
                            />
                        <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </form>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div> ) : (<div></div>)}
                {!isRoomSelected ? 
                (<div>
                    <ul className="list-unstyled">
                        
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
                            <p className="text-center">You are not part of any groups yet.</p>
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
};

export default FindRoom;
