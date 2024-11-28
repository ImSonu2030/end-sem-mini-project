import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Contact from "./Pages/Contact";
import StudentDetails from "./Pages/StudentDetails";
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

function App() {
    // Inline the PrivateRoute logic
    const PrivateRoute = ({ element }) => {
        const { isAuthenticated } = useAuth();
        return isAuthenticated ? element : <Navigate to="/login" replace />;
    };

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<PrivateRoute element={<Home />} />} />
                            <Route path="/register" element={<PrivateRoute element={<Register />} />} />
                            <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/student-details" element={<PrivateRoute element={<StudentDetails />} />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
