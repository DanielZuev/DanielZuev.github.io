import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


const CreateSession = ({ roomID }) => {
    const [sessionName, setSessionName] = useState('');
    const [sessionDescription, setSessionDescription] = useState('');
    const [sessionLocation, setSessionLocation] = useState('');
    const [sessionDateTime, setSessionDateTime] = useState(new Date());


    
    const { authPostRequest, authGetRequest } = useAuth();
    const userID = localStorage.getItem("userID")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDateTime = sessionDateTime.toISOString(); // Formatting to ISO string for backend compatibility
        
        const createSession = await authPostRequest('session/sessionAdd', {
            roomID,
            sessionName,
            sessionDescription,
            sessionLocation,
            sessionDateTime: formattedDateTime
        }, (data) => console.log("successfull creating of session: " + data),
        (error) => console.error('Error with doing it:', error));

        // Fetch the session data by sessionName
        const url = `session/findBySessionName/${sessionName}`;
        const data = await authGetRequest(url, (error) => {console.error('Error with doing it:', error);})
        // .then((data) => console.log("Exoooee" + data));
        console.log(data.sessionID)
        //-----------------
        const addUserSessionResponse = await authPostRequest('usersession/usersessionAdd', {
            "userID": userID,
            "sessionID": data.sessionID,
            "roomID": roomID,
            "role": "ADMIN"
        },(data) => console.log("successfull creating of userSession: " + data),
        (error) => console.error('Error with doing it:', error));
        
    }
    return (
        <div className="container mt-4">
            <h2>Create New Session</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="sessionName" className="form-label">Session Name</label>
                    <input type="text" className="form-control" id="sessionName" placeholder="Enter session name" value={sessionName} onChange={e => setSessionName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="sessionDescription" className="form-label">Session Description</label>
                    <input type="text" className="form-control" id="sessionDescription" placeholder="Enter session description" value={sessionDescription} onChange={e => setSessionDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="sessionLocation" className="form-label">Session Location</label>
                    <input type="text" className="form-control" id="sessionLocation" placeholder="Enter session location" value={sessionLocation} onChange={e => setSessionLocation(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <div>
                        <label htmlFor="sessionDateTime" className="form-label">Session Date and Time</label>
                    </div>
                    <div className="mb-3">
                        
                        <DatePicker
                            id="sessionDateTime"
                            selected={sessionDateTime}
                            onChange={date => setSessionDateTime(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary form-control mb-3">Create Session</button>
            </form>
        </div>
    );
}

CreateSession.propTypes = {
    roomID: PropTypes.number.isRequired, // Only roomID is required from props
};

export default CreateSession;




   
// const CreateSession = ({ roomID }) => {
//     const [sessionName, setSessionName] = useState('');
//     const [sessionDescription, setSessionDescription] = useState('');
//     const [sessionLocation, setSessionLocation] = useState('');
//     const [sessionDateTime, setSessionDateTime] = useState(new Date());

//     const { authPostRequest, authGetRequest } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Attempt to create the session
//             const postData = await authPostRequest('session/sessionAdd', {
//                 roomID,
//                 sessionName,
//                 sessionDescription,
//                 sessionLocation,
//                 sessionDateTime: sessionDateTime.toISOString()
//             });

//             console.log('Session Add Success:', postData);
//             if (postData?.success) {
//                 // Fetch the session data by sessionName
//                 const url = `session/findBySessionName/${encodeURIComponent(sessionName)}`;
//                 const sessionData = await authGetRequest(url, (error) => {console.error('Error with doing it:', error);});
                
//                 if (sessionData && sessionData.id) {
//                     // Use the session ID from the fetched data
//                     const userID = localStorage.getItem('userID');
//                     const addUserSessionResponse = await authPostRequest('usersession/usersessionAdd', {
//                         "userID": userID,
//                         "sessionID": sessionData.id,
//                         "roomID": roomID,
//                         "role": "ADMIN"
//                     });
//                     console.log('UserSession Add Success:', addUserSessionResponse);
//                 } else {
//                     console.error('Failed to retrieve session by name.');
//                 }
//             } else {
//                 console.error('Session creation failed:123Failed here' );
//             }
//         } catch (error) {
//             console.error('Error in form submission:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={sessionName} onChange={e => setSessionName(e.target.value)} placeholder="Session Name" />
//             <input type="text" value={sessionDescription} onChange={e => setSessionDescription(e.target.value)} placeholder="Session Description" />
//             <input type="text" value={sessionLocation} onChange={e => setSessionLocation(e.target.value)} placeholder="Session Location" />
//             <input type="datetime-local" value={sessionDateTime.toISOString().substring(0, 16)} onChange={e => setSessionDateTime(new Date(e.target.value))} placeholder="Session Date and Time" />
//             <button type="submit">Create Session</button>
//         </form>
//     );
// }

// CreateSession.propTypes = {
//     roomID: PropTypes.number.isRequired, // Only roomID is required from props
// };

// export default CreateSession;





























// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useAuth } from '../../context/AuthContext';

// const CreateSession = ({ roomID }) => {
//     const [sessionName, setSessionName] = useState('');
//     const [sessionDescription, setSessionDescription] = useState('');
//     const [sessionLocation, setSessionLocation] = useState('');
//     const [sessionDateTime, setSessionDateTime] = useState(new Date());
//     const [session, setSession] = useState();

//     const { authPostRequest, authGetRequest } = useAuth();

//     useEffect(() => {
//         if (session) {
//             console.log(session + "tuuuukkaaa"); // Logs when session updates
//             const userID = localStorage.getItem('userID');

//             authPostRequest('usersession/usersessionAdd', 
//                 { 
//                     "userID": userID,
//                     "sessionID": session.id, // Assuming the session object has an id field
//                     "roomID": roomID,
//                     "role": "ADMIN"
//                 },
//                 (data) => {
//                     console.log('UserSession Add Success:', data);
//                     // Handle success (e.g., navigate, display message)
//                 },
//                 (error) => {
//                     console.error('Error in creating user-session relationship:', error);
//                 }
//             );
//         }
//     }, [session]); // This effect runs whenever session changes

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await authPostRequest(
//                 'session/sessionAdd', {
//                     roomID,
//                     sessionName,
//                     sessionDescription,
//                     sessionLocation,
//                     sessionDateTime: sessionDateTime.toISOString()
//                 },
//                 (data) => {
//                     console.log('Session Add Success:', data);
//                     // Handle success
//                 },
//                 (error) => {
//                     console.error('Error in adding session:', error);
//                 }
//             );
//             const url = 'session/findBySessionName/' + sessionName;
//             const getSession = authGetRequest(url, (error) => {
//                 console.error('Error with doing it:', error);
                
//                 // Handle error (e.g., display error message)
//               });
//             setSession(getSession);
//             console.log(session + "asdasdasd")
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={sessionName} onChange={e => setSessionName(e.target.value)} placeholder="Session Name" />
//             <input type="text" value={sessionDescription} onChange={e => setSessionDescription(e.target.value)} placeholder="Session Description" />
//             <input type="text" value={sessionLocation} onChange={e => setSessionLocation(e.target.value)} placeholder="Session Location" />
//             <input type="datetime-local" value={sessionDateTime.toISOString().substring(0, 16)} onChange={e => setSessionDateTime(new Date(e.target.value))} placeholder="Session Date and Time" />
//             <button type="submit">Create Session</button>
//         </form>
//     );
// }

// CreateSession.propTypes = {
//     roomID: PropTypes.number.isRequired, // Only roomID is required from props
// };

// export default CreateSession
