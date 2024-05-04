import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ActionJoinRoomButton from '../components/Buttons/ActionJoinRoomButton';
import ActionLeaveRoomButton from '../components/Buttons/ActionLeaveRoomButton';
import ListOfMembers from './ListOfMembers';
import CreateSession from './Sessions/CreateSession';
import ListRoomSessions from './Sessions/ListRoomSessions';
import NavBar from '../components/Navigation/NavBar';
import ListAllRoomSessions from './Sessions/ListAllRoomSessions';
import '../style/Room.css';
import Insights from '../components/Insights/SessionInsights/Insights';
const Room = ({ roomDetails, userRoomRelationship, isRoomSelectedSetter }) => {
    const [view, setView] = useState('info'); // 'info', 'sessions', 'members', 'createSession'
    const [isRoomMember, setIsRoomMember] = useState(userRoomRelationship.role !== "Not a member");

    const isAdmin = userRoomRelationship.role === "ADMIN"; // Assuming 'ADMIN' is the role for admins

    const getViewComponent = () => {
        switch (view) {
            case 'allSessions':
                return <ListAllRoomSessions roomID={roomDetails.roomID} />;
            case 'mySessions':
                return <ListRoomSessions roomID={roomDetails.roomID} />;
            case 'members':
                return isAdmin && <ListOfMembers roomID={roomDetails.roomID} />;
            case 'createSession':
                return isAdmin && <CreateSession roomID={roomDetails.roomID} />;
            case 'insights':
                return isAdmin && <Insights roomID={roomDetails.roomID} />;
            case 'info':
            default:
                return (
                    <>
                        <h2>Group Information</h2>
                        <p><strong>Group Name:</strong> {roomDetails.roomName}</p>
                        <p><strong>Group Heading:</strong> {roomDetails.roomHeading}</p>
                        <p><strong>Group Description:</strong> {roomDetails.roomDescription}</p>
                        {isRoomMember ? (
                            !isAdmin ? 
                            <>
                                <ActionLeaveRoomButton roomID={roomDetails.roomID} setIsRoomMember = {setIsRoomMember}/>
                                
                            </>
                            :
                            <></>
                        ) : (
                            <ActionJoinRoomButton roomID={roomDetails.roomID} setIsRoomMember = {setIsRoomMember}/>
                        )}
                                </>
                );
        }
    };

    return (
        <div className="container mt-4 d-flex flex-column" style={{ height: '100%' }}>
            <h1 className="display-4">Group Information</h1>
            <div className="flex-grow-1 d-flex">
                <div className="btn-group mb-3 w-100 d-flex flex-wrap">
                    <button className="btn btn-outline-secondary flex-fill" onClick={() => setView('info')}>Info</button>
                    <button className="btn btn-outline-secondary flex-fill" onClick={() => setView('allSessions')}>All Sessions</button>
                    <button className="btn btn-outline-secondary flex-fill" onClick={() => setView('mySessions')}>My Sessions</button>
                    {isAdmin && <button className="btn btn-outline-secondary flex-fill" onClick={() => setView('members')}>Members</button>}
                    {isAdmin && <button className="btn btn-outline-secondary flex-fill" onClick={() => setView('createSession')}>Create Session</button>}
                    {isAdmin && <button className="btn btn-outline-secondary flex-fill" onClick={() => setView('insights')}>Insights</button>}
                    <button className="btn btn-secondary flex-fill" onClick={() => isRoomSelectedSetter(false)}>Back to Search</button>
                </div>
            </div>
            <div>
                {getViewComponent()}
            </div>
            
        </div>
    );
};

Room.propTypes = {
    roomDetails: PropTypes.shape({
        roomID: PropTypes.number.isRequired,
        roomName: PropTypes.string.isRequired,
        roomDescription: PropTypes.string.isRequired,
        roomHeading: PropTypes.string.isRequired
    }).isRequired,
    userRoomRelationship: PropTypes.shape({
        userID: PropTypes.number,
        roomID: PropTypes.number,
        role: PropTypes.string.isRequired,
    }).isRequired,
    isRoomSelectedSetter: PropTypes.func.isRequired,
};

export default Room;
