//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from "./auth/Login"
import Register from "./auth/Register"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./Routing/ProtectedRoute"
import Home from "./Layout/Home"
import CreateUserRoom from "./Layout/CreateUserRoom"
import MyRooms from "./Layout/MyRooms"
import Room from "./Layout/Room"
import FindRoom from "./Layout/FindRoom"
import MySessions from "./Layout/Sessions/MySessions"
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css'

function App() {

  return (
    <AuthProvider>
            <HashRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<ProtectedRoute component={Home} />} />
                  {/* Add more protected routes as needed */}
                  <Route path="/" element={<ProtectedRoute component={Home} />} />
                  <Route path="/userroom" element={<ProtectedRoute component={CreateUserRoom} />} />
                  <Route path="/myrooms" element={<ProtectedRoute component={MyRooms} />} />
                  <Route path="/mysessions" element={<ProtectedRoute component={MySessions} />} />
                  <Route path="/roomByName/:roomName" element={<ProtectedRoute component={Room} />} />
                  <Route path="/findRoom" element={<ProtectedRoute component={FindRoom} />} />
                  
                </Routes>
            </HashRouter>
        </AuthProvider>
  )
}

export default App
