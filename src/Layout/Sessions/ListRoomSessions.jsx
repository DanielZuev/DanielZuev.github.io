import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types'; // Import PropTypes
import SessionDescription from './SessionDescription';
import Session from './Session';


const ListRoomSessions = (roomID) => {

    const [selectedSession, setSelectedSession] = useState()
    const [isSessionSelected, setIsSessionSelected] = useState(false);
    const [sessions, setSessions] = useState([]);
    const { authGetRequest } = useAuth();

    const url = `usersession/detailsByRoomID/${roomID.roomID}`;
    useEffect(() => {
        console.log(roomID.roomID)
            // Set the correct URL here
            authGetRequest(url, 
            (error) => {
                console.error('Error:', error);
                
                // Handle error (e.g., display error message)
            }).then(data => {
                setSessions(data); // Set the rooms data on successful fetch
            });
        }, [authGetRequest, url]); 

        return (
            <div>
                 {!isSessionSelected ? 
            (<div>
                <ul className="list-unstyled">
                <h1 className="card-title h4">My Sessions</h1>
                    {sessions.map((session, index) => (
                        <li key={index}>
                            <SessionDescription
                                sessionDetails={session} 
                                selectedSessionSetter = {setSelectedSession} 
                                isSessionSelectedSetter = {setIsSessionSelected} 
                            />
                        </li> // Adjust based on your room object structure
                    ))}
                </ul>
            </div> ) :
            (
                <div>
                <Session
                    sessionDetails = {selectedSession} 
                    isSessionSelectedSetter = {setIsSessionSelected}
                />
                </div>
            )}
            </div>
        );
}


ListRoomSessions.propTypes = {
    roomID: PropTypes.number.isRequired,
};

export default ListRoomSessions