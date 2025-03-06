import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">EduGrade-AI</div>
      <ul className="nav-links">
        <li><a href="#contact">Our Goals</a></li>
        <li><a href="#contact">Team</a></li>
        <li><a href="#features">About Us</a></li>
        <li><a href="#testimonials">Contact Us</a></li>
        <li>
          {user ? (
            <>
              <span className="user-name">{user.email}</span>
              <button className="auth-button" onClick={() => signOut(auth)}>Logout</button>
            </>
          ) : (
            <button className="auth-button" onClick={() => navigate("/auth")}>Sign-in/Sign-up</button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
