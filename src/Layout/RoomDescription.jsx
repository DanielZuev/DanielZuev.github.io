import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../context/AuthContext';
import Room from './Room';

const RoomDescription = ({ roomDetails, selectedRoomSetter, isRoomSelectedSetter, userRoomRelationshipSetter }) => {

    const userID = localStorage.getItem('userID');
    const [error, setError] = useState(null);  // State to store any potential errors
    const { authGetRequest } = useAuth();
    const [isRoomSelected, setIsRoomSelected] = useState(false);
    // Function to handle navigation

    const [userRoom, setUserRoom] = useState({ role: null });
    const url = 'userroom/' + userID + '/' + roomDetails.roomID;

    useEffect(() => {
        authGetRequest(url, 
            (error) => {
                console.error('Error:', error);
                
                // Handle error (e.g., display error message)
            }).then(userRoomRelationship => {
                 // Set the userRoom data on successful fetch
                userRoomRelationship ? setUserRoom(userRoomRelationship) : setUserRoom({ role: "Not a member" })
                setError(null);
            }).catch(err => {
                console.error('Error processing data:', err);
                setError('Error processing room details');

                
            });
    }, [authGetRequest, url, isRoomSelected]);
    


    return (
        <div className="card mb-3">
        {
            !isRoomSelected ? (
            <div className="card-body">
                
                {error ? <div className="alert alert-danger">{error}</div> : (
                    <>
                        
                        <h3 className="card-title"><strong>Group Name: </strong>{roomDetails.roomName}</h3>
                        <h6 className="card-subtitle mb-2 text-muted"><strong>About the group: </strong>{roomDetails.roomHeading}</h6>
                        <p className="card-text"><strong>Role: </strong> {userRoom?.role || "Not a member"}</p>
                        <button className="btn btn-primary" onClick={() => {
                        selectedRoomSetter(roomDetails)
                        isRoomSelectedSetter(true)
                        userRoomRelationshipSetter(userRoom)
                        //Optional for now 
                        setIsRoomSelected(true)}}>Open Group</button>
                        
                    </>
                )}
            </div>
        ) : 
            <div>
                <h1>Nothing here for now</h1>
            </div>
        }
        </div>
    );
}


RoomDescription.propTypes = {
    roomDetails: PropTypes.shape({
        // Nested object
        roomID: PropTypes.number.isRequired,
        roomName: PropTypes.string.isRequired,
        roomDescription: PropTypes.string.isRequired,
        roomHeading: PropTypes.string.isRequired
        }).isRequired,
    selectedRoomSetter: PropTypes.func.isRequired,
    isRoomSelectedSetter: PropTypes.func.isRequired,
    userRoomRelationshipSetter: PropTypes.func.isRequired,  
};

export default RoomDescription

{/* <RoomDescription roomID={`${room.roomID}`} roomSetter = {setRoomName} roomNameSetter = {setIsRoomSelected} roomRoleSetter = {setRoomRole}/> */}