import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config"; // Firebase auth instance
import "./Auth.css"; // Import CSS file

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  // Email validation function
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsEmailVerified(currentUser.emailVerified);
        if (!currentUser.emailVerified) {
          setSuccessMessage("Your email is not verified. Please check your inbox.");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign-up with email & password
  const handleSignUp = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccessMessage("Verification email sent! Please verify before signing in.");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sign-in with email & password
  const handleSignIn = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert("Please verify your email before signing in.");
        return;
      }
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset your password.");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend email verification
  const handleResendVerification = async () => {
    if (user && !user.emailVerified) {
      try {
        setLoading(true);
        await sendEmailVerification(user);
        alert("Verification email resent. Please check your inbox.");
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{user ? "Welcome Back" : "Sign In / Sign Up"}</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}

        {user && isEmailVerified ? (
          <p className="welcome-message">You're signed in as {user.email}</p>
        ) : (
          <>
            <input
              type="email"
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-button primary" onClick={handleSignIn} disabled={!isValidEmail(email) || loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <button className="auth-button primary" onClick={handleSignUp} disabled={!isValidEmail(email) || loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="separator">OR</div>

            <button className="auth-button google" onClick={handleGoogleSignIn} disabled={loading}>
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>

            <div className="auth-footer">
              <p>
                Forgot your password?{" "}
                <a href="#" onClick={handleForgotPassword}>
                  Reset here
                </a>
              </p>
            </div>

            {user && !isEmailVerified && (
              <p>
                Your email is not verified.{" "}
                <a href="#" onClick={handleResendVerification}>
                  Resend verification email
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
