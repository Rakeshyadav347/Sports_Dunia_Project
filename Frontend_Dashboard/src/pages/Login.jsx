import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to Dashboard
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect to Dashboard
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Company Logo and Name */}
      <div className="text-center mb-4">
        <img src="\src\assets\logo.png" alt="Sports Dunia Logo" className="mb-2" style={{ width: '100px', height: 'auto' }} />
        <h2 className="fw-bold">Sports Dunia</h2>
      </div>

      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleEmailLogin} className="w-50">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <button
        className="btn btn-danger mt-3 w-50"
        onClick={handleGoogleLogin}
      >
        Login with Google
      </button>
    </div>
  );
}

export default Login;
