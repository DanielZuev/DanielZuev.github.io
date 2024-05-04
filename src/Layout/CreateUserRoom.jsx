import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import NavigationButton from '../components/Buttons/NavigationButton';
import NavBar from '../components/Navigation/NavBar';
import { useNavigate } from 'react-router-dom';

const CreateUserRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomHeading, setRoomHeading] = useState('');
    const [error, setError] = useState(''); // State to store error messages

    const navigate = useNavigate();
    const { authPostRequest, authGetRequest } = useAuth();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // Clear previous errors

      // Create the room
      await authPostRequest(
        'room/roomAdd', 
        { 
          "roomName": roomName,
          "roomDescription": roomDescription,
          "roomHeading": roomHeading, 
        },
        // On Success
        (data) => {
          console.log('Success:', data);            
        },
        // Error
        (error) => {
          console.error('Error:', error);
          // Handle error (e.g., display error message)
        }
      );
      // Find the created roomID by its name
      const url = 'room/findByName/' + roomName;
      const data = await authGetRequest(url, 
      (error) => {
        console.error('Error:', error);
        
        // Handle error (e.g., display error message)
      });

      const idUser = localStorage.getItem('userID');

      // Create new userRoom relationship
      authPostRequest('userroom/userroomAdd', 
        { 
          "userID": idUser,
          "roomID": data.roomID,
          "role": "ADMIN"
         },
        (data) => {
          console.log('Success:', data);

          // Handle success (e.g., navigate, display message)
          navigate("/myrooms"); // Navigate to "/myrooms" on successful room creation
        },
        (error) => {
          console.error('Error:', error);
          navigate("/myrooms"); // Navigate to "/myrooms" on successful room creation
          // Handle error (e.g., display error message)
        });
        console.log(data)
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
          <h2>Create New Group</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="roomName" className="form-label">Group Name</label>
                  <input type="text" className="form-control" id="roomName" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Room Name" required />
              </div>
              <div className="mb-3">
                  <label htmlFor="roomDescription" className="form-label">Group Description</label>
                  <input type="text" className="form-control" id="roomDescription" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} placeholder="Room Description" required />
              </div>
              <div className="mb-3">
                  <label htmlFor="roomHeading" className="form-label">Group Heading</label>
                  <input type="text" className="form-control" id="roomHeading" value={roomHeading} onChange={(e) => setRoomHeading(e.target.value)} placeholder="Room Heading" required />
              </div>
              <button type="submit" className="btn btn-primary">Create Group</button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </>
  );
}

export default CreateUserRoom;