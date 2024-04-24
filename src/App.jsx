//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { HashRouter, Routes, Route } from 'react-router-dom';
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
import { HashRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <AuthProvider>
            <HashRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Add more protected routes as needed */}
                  <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                  <Route path="/userroom" element={<ProtectedRoute element={<CreateUserRoom />} />} />
                  <Route path="/myrooms" element={<ProtectedRoute element={<MyRooms />} />} />
                  <Route path="/mysessions" element={<ProtectedRoute element={<MySessions />} />} />
                  <Route path="/roomByName/:roomName" element={<ProtectedRoute element={<Room />} />} />
                  <Route path="/findRoom" element={<ProtectedRoute element={<FindRoom />} />} />
                  {/* <Route path="*" element={<ProtectedRoute component={Home} />} /> */}
                  
                </Routes>
            </HashRouter>
        </AuthProvider>
  )
}

export default App
