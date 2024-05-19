import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../context/AuthContext';
import ActionRemoveUsersFromRoomButton from '../components/Buttons/ActionRemoveUsersFromRoomButton';
import ActionUpdateUserRoleButton from '../components/Buttons/ActionUpdateUserRoleButton';

function ListOfMembers({ roomID }) {
    const [userRooms, setUserRooms] = useState([]);
    const [error, setError] = useState('');
    const { authGetRequest } = useAuth(); // Ensure this is correctly implemented in your AuthContext

    const accountUserID = localStorage.getItem("userID");

    useEffect(() => {
        const url = `userroom/byRoomID/${roomID}`; // Adjust URL to match your API endpoint structure
        authGetRequest(url)
            .then(userRoomRelationship => {
                setUserRooms(userRoomRelationship || []);
            })
            .catch(err => {
                console.error('Error processing data:', err);
                setError('Error processing room details');
            });
    }, [roomID, authGetRequest]);

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="list-group">
            {userRooms.map((user, index) => (
                <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    {user.firstName} {user.lastName} ({user.studentID || 'No Student ID'})
                    <div>
                        {user.userID !== accountUserID ? 
                            <>
                                <ActionRemoveUsersFromRoomButton userID={user.userID} roomID={roomID} />
                                <ActionUpdateUserRoleButton userID={user.userID} roomID={roomID} newRole={user.role === 'ADMIN' ? 'USER' : 'ADMIN'} />
                            </>
                            :
                            <span className="badge bg-secondary">Role: {user.role}</span>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

ListOfMembers.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default ListOfMembers;
