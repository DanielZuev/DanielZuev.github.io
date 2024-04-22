import { useState } from 'react'
import PropTypes from 'prop-types'; // Import PropTypes


const SessionDescription = ({ sessionDetails, selectedSessionSetter, isSessionSelectedSetter }) => {

    const [isSessionSelected, setIsSessionSelected] = useState(false);
    // Function to handle navigation

    return (
        <div>
            {!isSessionSelected ? (
                <div className="card my-4">
                    <div className="card-body">
                        <p className="card-text">
                            <strong>Session Name:</strong> {sessionDetails.sessionName}
                        </p>
                        <p className="card-text">
                            <strong>Role: </strong> {sessionDetails.Role || "Not a member"}
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                selectedSessionSetter(sessionDetails);
                                isSessionSelectedSetter(true);
                                setIsSessionSelected(true);  // Optional for now
                            }}>
                            Open Session Details
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h1>Nothing here for now</h1>
                </div>
            )}
        </div>
    );

}

SessionDescription.propTypes = {
    sessionDetails: PropTypes.shape({
        // Nested object
        Role: PropTypes.string.isRequired,
        sessionID: PropTypes.number.isRequired,
        sessionName: PropTypes.string.isRequired,
        sessionDescription: PropTypes.string.isRequired,
        sessionLocation: PropTypes.string.isRequired,
        sessionDateTime: PropTypes.any,
        userID:PropTypes.number.isRequired

        }).isRequired,
    selectedSessionSetter: PropTypes.func.isRequired,
    isSessionSelectedSetter: PropTypes.func.isRequired,
};

export default SessionDescription

{/* <RoomDescription roomID={`${room.roomID}`} roomSetter = {setRoomName} roomNameSetter = {setIsRoomSelected} roomRoleSetter = {setRoomRole}/> */}