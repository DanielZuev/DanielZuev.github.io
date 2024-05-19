
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../../context/AuthContext';
import React from 'react';
function ActionJoinRoomButton({ roomID, setIsRoomMember }) {
    const userID = localStorage.getItem("userID");
    const { authPostRequest } = useAuth();

    const handleJoinClick = () => {
        setIsRoomMember(true)
        authPostRequest(
        'userroom/userroomAdd',
        {
            "userID": userID,
            "roomID": roomID,
            "role": "USER"
        },
        (data) => {
            console.log('Success:', data);
            // Handle success (e.g., navigate, display message)
            setIsRoomMember(true)
        },
        (error) => {
            console.error('Error:', error);
            // Handle error (e.g., display error message)
        }
        );
    };

    return (
        <button onClick={handleJoinClick} className="btn btn-primary">
            Join Room
        </button>
    );
}

export default ActionJoinRoomButton;

ActionJoinRoomButton.propTypes = {
    roomID: PropTypes.number.isRequired,
    setIsRoomMember: PropTypes.func.isRequired,
};