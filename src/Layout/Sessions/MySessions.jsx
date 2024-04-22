import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SessionDescription from "./SessionDescription";
import Session from "./Session";
import NavBar from "../../components/Navigation/NavBar";


const MySessions = () => {
    
    const [selectedSession, setSelectedSession] = useState()
    const [isSessionSelected, setIsSessionSelected] = useState(false);

    const [sessions, setSessions] = useState([]);
    const { authGetRequest } = useAuth();
    const userID = localStorage.getItem('userID');
    const url = `usersession/mysessions/${userID}`;
    useEffect(() => {
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
            <>
                <NavBar />
                <div className="container mt-5">
                    {!isSessionSelected ? 
                (<div>
                    <ul className="list-unstyled">
                        <h1 className="my-4">My Sessions</h1>
                        {sessions.length ? (
                        <div className="list-group">
                        {sessions.map((session, index) => (
                            <li key={index}>
                            
                                <SessionDescription
                                    sessionDetails={session} 
                                    selectedSessionSetter = {setSelectedSession} 
                                    isSessionSelectedSetter = {setIsSessionSelected} 
                                />
                            </li> // Adjust based on your room object structure
                        ))}
                        </div>
                    ) : (
                            <p className="text-center">You are not part of any rooms yet.</p>
                        )}
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
            </>
        );
}

export default MySessions

