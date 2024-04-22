import {  useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import uplogo from '../assets/uplogo.jpeg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to hold error messages
    const { postRequest } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        postRequest('auth/authenticate', { "email": email, "password": password },
        (data) => {
          console.log('Success:', data);
          localStorage.setItem("token", data.token)
          localStorage.setItem("userID", data.userID)
          // Handle success (e.g., navigate, display message)
          navigate('/', { replace: true });
        },
        (error) => {
          console.error('Error:', error);
          // Handle error (e.g., display error message)
          
          setError('Wrong password or email. Please try again.'); // Set error message
        });
    };

    const handleLogout = () => {

		// Optionally clear the token from localStorage/sessionStorage
		localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.removeItem("userID")
	}

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
                            <h2>Hello, Again</h2>
                            <p>We are happy to have you back.</p>
                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Display error message */}
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg bg-light fs-6" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Email address" 
                                />
                            </div>
                            <div className="input-group mb-1">
                                <input 
                                    type="password" 
                                    className="form-control form-control-lg bg-light fs-6" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-5 d-flex justify-content-between">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="formCheck" />
                                    <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Remember Me</small></label>
                                </div>
                                <div className="forgot">
                                    <small><a href="#">Forgot Password?</a></small>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <button 
                                    type="submit" 
                                    className="btn btn-lg btn-primary w-100 fs-6"
                                >Login</button>
                            </div>
                        </form>
                    
                        <div className="row">
                            <small>Don't have an account? <Link to="/register">Sign Up</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default Login;


{/* 
{/* <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        <form onSubmit={handleLogout}>
            <button type="submit">Log Out</button>
        </form>
        </> */}

        {/* // fetch('http://localhost:8080/api/v1/auth/authenticate', { */}
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //     }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => console.error('Error:', error));
//         console.log(JSON.stringify({email, password}))
//     }; */}