import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const handleLogout = () => {
        // Implement logout functionality
        console.log("Logging out...");
        // For example, clear user token or state
        // Optionally clear the token from localStorage/sessionStorage
		localStorage.removeItem("token")
        localStorage.removeItem("userID")
        // navigate to login or home
        navigate('/login'); 
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">University Societies</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/findroom">Find Group</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/userroom">Create Group</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/myrooms">My Groups</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mysessions">My Sessions</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
