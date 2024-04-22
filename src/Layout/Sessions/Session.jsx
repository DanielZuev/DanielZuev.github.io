import { useEffect, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import ActionLeaveSessionButton from "../../components/Buttons/SessionBtns/ActionLeaveSessionButton";
import ActionJoinSessionButton from "../../components/Buttons/SessionBtns/ActionJoinSessionButton";

const Session = ({ sessionDetails, isSessionSelectedSetter }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSessionMember, setIsSessionMember] = useState(sessionDetails.Role !== "Not a member")

    useEffect(() => {
        // Check if the props are loaded
        if (!sessionDetails) {
            setIsLoading(true);
            setError(''); // Clear any previous errors
        } else {
            setIsLoading(false);
            if (!sessionDetails.sessionName) {
                setError('Missing required data');
            }
        }

        console.log('isSessionMember changed:', isSessionMember);
    }, [sessionDetails, isSessionMember]);

    if (isLoading) {
        return <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">
            Error: {error}
        </div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="display-4">Detailed Session Information</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{sessionDetails.sessionName}</h5>
                    <p className="card-text"><strong>Session Name:</strong> {sessionDetails.sessionName}</p>
                    <div className="container d-flex justify-content-between">
                    {isSessionMember ? (
                        sessionDetails.Role !== "ADMIN" ? 
                        <>
                            <ActionLeaveSessionButton sessionID={sessionDetails.sessionID} setIsSessionMember={setIsSessionMember} />
                        </>
                        :
                        <></>
                    ) : (
                        <ActionJoinSessionButton sessionID={sessionDetails.sessionID} roomID={sessionDetails.roomID} setIsSessionMember={setIsSessionMember} />
                    )}
                    <button className="btn btn-primary" onClick={() => isSessionSelectedSetter(false)}>Back to Sessions</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Session.propTypes = {
    sessionDetails: PropTypes.shape({
        // Nested object
        Role: PropTypes.string.isRequired,
        sessionID: PropTypes.number.isRequired,
        roomID: PropTypes.number.isRequired,
        sessionName: PropTypes.string.isRequired,
        sessionDescription: PropTypes.string.isRequired,
        sessionLocation: PropTypes.string.isRequired,
        sessionDateTime: PropTypes.any,
        userID:PropTypes.number.isRequired
        }).isRequired,
    isSessionSelectedSetter: PropTypes.func.isRequired,
};

export default Session;
