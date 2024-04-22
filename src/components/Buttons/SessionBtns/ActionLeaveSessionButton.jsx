import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../../../context/AuthContext';

function ActionLeaveSessionButton({ sessionID, setIsSessionMember }) {
    const userID = localStorage.getItem("userID");
    const { authDeleteRequest } = useAuth();

    const url = 'usersession/' + userID + '/' + sessionID;
    const handleLeaveClick = () => {
        setIsSessionMember(false);
        authDeleteRequest(url, 
            (error) => {
                console.error('Error:', error);
                // Optionally update UI to show error
            }).then(() => {
                setIsSessionMember(false); // Update state to reflect the user has left the session
            });
    };

    return (
        <button onClick={handleLeaveClick} className="btn btn-danger">
            Leave Session
        </button>
    );
}

export default ActionLeaveSessionButton;

ActionLeaveSessionButton.propTypes = {
    sessionID: PropTypes.number.isRequired,
    setIsSessionMember: PropTypes.func.isRequired,
};

