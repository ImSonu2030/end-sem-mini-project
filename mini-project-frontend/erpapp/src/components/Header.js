import React from "react";
import './App.css';
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation(); // Get the current route
  
    const isSignUpPage = location.pathname === "/signup";
  
    return (
      <header className="header">
        <div className="nav-left">
          <h1 className="logo">
            <Link to="/" className="logo-link">
              ErpCloud
            </Link>
          </h1>
        </div>
        <nav className="nav-right">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              <button onClick={logout} className="logout-button">
                Logout
                <span className="material-symbols-outlined">logout</span>
              </button>
            </>
          ) : (
            <Link to={isSignUpPage ? "/login" : "/signup"} className="nav-link">
              <button className="signup-button">
                {isSignUpPage ? "Log In" : "Sign Up"}
                <img
                  src={
                    isSignUpPage
                    ? "https://img.icons8.com/?size=30&id=14919&format=png&color=000000"
                    : "https://img.icons8.com/?size=30&id=qgQGGYaaHG8F&format=png&color=000000"
                  }
                  alt={isSignUpPage ? "Login icon" : "Sign Up icon"}
                />
              </button>
            </Link>
          )}
        </nav>
      </header>
    );
};  
// https://img.icons8.com/?size=30&id=qgQGGYaaHG8F&format=png&color=000000
// https://img.icons8.com/?size=30&id=14919&format=png&color=000000

export default Header;
