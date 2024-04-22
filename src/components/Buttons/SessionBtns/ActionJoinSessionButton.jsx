import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../../../context/AuthContext';

function ActionJoinSessionButton({ sessionID, roomID, setIsSessionMember }) {
    const userID = localStorage.getItem("userID");
    const { authPostRequest } = useAuth();

    const handleJoinClick = () => {
        setIsSessionMember(true);
        authPostRequest(
        'usersession/usersessionAdd',
        {
            "userID": userID,
            "sessionID": sessionID,
            "roomID": roomID,
            "role": "USER"
        },
        (data) => {
            console.log('Success:', data);
            setIsSessionMember(true); // Update UI to reflect that the user has joined the session
        },
        (error) => {
            console.error('Error:', error);
            // Optionally update UI to show error
        }
        );
    };

    return (
        <button onClick={handleJoinClick} className="btn btn-success">
            Join Session
        </button>
    );
}

export default ActionJoinSessionButton;

ActionJoinSessionButton.propTypes = {
    sessionID: PropTypes.number.isRequired,
    roomID: PropTypes.number.isRequired,
    setIsSessionMember: PropTypes.func.isRequired,
};
