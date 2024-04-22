import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function ActionRemoveUsersFromRoomButton({ userID, roomID }) {
    const { authDeleteRequest } = useAuth();
    const [isRemoved, setIsRemoved] = useState(false);
    const url = `userroom/${userID}/${roomID}`;

    const handleLeaveClick = () => {
        authDeleteRequest(url,
            (error) => {
                if (error) {
                    console.error('Error:', error);
                    // Optionally handle error by showing a Bootstrap alert or similar
                    setIsRemoved(false); // Reset in case of error if desired
                } else {
                    setIsRemoved(true); // Only set to true if no error
                }
            });
    };

    return (
        <div>
            {!isRemoved ? 
                <button className="btn btn-danger" onClick={handleLeaveClick}>
                    Remove Member
                </button>
                :
                <div className="alert alert-success" role="alert">
                    Member Removed
                </div>
            }
        </div>
    );
}

ActionRemoveUsersFromRoomButton.propTypes = {
    userID: PropTypes.number.isRequired,
    roomID: PropTypes.number.isRequired,
};

export default ActionRemoveUsersFromRoomButton;
