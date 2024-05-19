// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import uplogo from '../assets/uplogo.jpeg'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentID, setStudentID] = useState('');
    const [error, setError] = useState(''); // State to hold error messages


    const { postRequest, authGetRequest } = useAuth();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log(
            { 
                "firstName": firstName,
                "lastName": lastName,
                "email": email, 
                "password": password,
                "studentID": studentID
            },
        )
        e.preventDefault();
        postRequest(
            'auth/register', 
            { 
                "firstName": firstName,
                "lastName": lastName,
                "email": email, 
                "password": password,
                "studentID": studentID
            },
            (data) => {
            console.log('Success: hello:', data);
            localStorage.setItem("token", data.token)
            // localStorage.setItem("userID", data.userID)
            // Handle success (e.g., navigate, display message)
            const token = data.token;
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(window.atob(payload));
            const url = 'user/findByEmail/' + decodedPayload.sub;
            authGetRequest(url, 
                (error) => {
                    console.error('Error:', error);
                    
                    // Handle error (e.g., display error message)
                }).then(data => {
                    console.log('Success:', data);
                    localStorage.setItem("userID", data.userID) // Set the rooms data on successful fetch
                    // Handle success (e.g., navigate, display message)
                    data.userID ? navigate('/', { replace: true }) : setError('Wrong password or email. Please try again.');
                });

            
            },
            (error) => {
            console.error('Error:', error);
            // Handle error (e.g., display error message)
            setError('Registration failed. Please try again.'); // Set error message
            }
        );
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row border rounded-5 p-3 bg-white shadow box-area">
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#103cbe' }}>
                    <div className="featured-image mb-3">
                        <img src={uplogo} className="img-fluid rounded-4" style={{ width: '300px' }} alt="Feature" />
                    </div>
                    <p className="text-white fs-2" style={{ fontWeight: 600 }}>
                        University Society
                    </p>
                    <small className="text-white text-wrap text-center" style={{ width: '20rem', fontWeight: 450 }}>
                        Connect with Societies and Clubs
                    </small>
                </div>
                
                <div className="col-md-6 right-box">
                    <div className="row align-items-center">
                        <div className="header-text mb-4">
                            <h2>Welcome</h2>
                            <p>We are happy to have you registered with us.</p>
                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Display error message */}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg bg-light fs-6" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    placeholder="FirstName" 
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg bg-light fs-6" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    placeholder="LastName"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg bg-light fs-6" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Email" 
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg bg-light fs-6" 
                                    value={studentID} 
                                    onChange={(e) => setStudentID(e.target.value)} 
                                    placeholder="StudentID"
                                />
                            </div>
                            <div className="input-group mb-1">
                                <input 
                                    type="password" 
                                    className="form-control form-control-lg bg-light fs-6" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Password"
                                />
                            </div>
                            
                            <div className="input-group mb-3">
                                <button 
                                    type="submit" 
                                    className="btn btn-lg btn-primary w-100 fs-6"
                                >Register</button>
                            </div>
                        </form>
                    
                        <div className="row">
                            <small>Already have an account? <Link to="/login">Log in</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;



// (
//     <form onSubmit={handleSubmit}>
//         <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="FirstName" />
//         <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="LastName" />
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//         <input type="text" value={studentID} onChange={(e) => setStudentID(e.target.value)} placeholder="StudentID" />
//         <button type="submit">Click to Register</button>
//     </form>

    
// );

// //login(email, password);
// fetch('http://localhost:8080/api/v1/auth/register', {
//     method: 'POST', // or 'PUT'
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         firstname: firstName,
//         lastname: lastName,
//         email: email,
//         password: password,
//     }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => console.error('Error:', error));
//     console.log(JSON.stringify({email, password}))
// };