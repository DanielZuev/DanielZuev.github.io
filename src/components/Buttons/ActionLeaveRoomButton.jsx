
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../../context/AuthContext';

function ActionLeaveRoomButton({ roomID, setIsRoomMember }) {
    const userID = localStorage.getItem("userID");
    const { authDeleteRequest } = useAuth();

    const url = 'userroom/' + userID + '/' + roomID;
    const handleLeaveClick = () => {
        setIsRoomMember(false)
        authDeleteRequest(url, 
            (error) => {
                console.error('Error:', error);
                
                // Handle error (e.g., display error message)
            }).then(() => {
                setIsRoomMember(false); // Set the rooms data on successful fetch
            });
    };

    return (
        <button onClick={handleLeaveClick} className="btn btn-danger">
            Leave Room
        </button>
    );
}

export default ActionLeaveRoomButton;

ActionLeaveRoomButton.propTypes = {
    roomID: PropTypes.number.isRequired,
    setIsRoomMember: PropTypes.func.isRequired,
};