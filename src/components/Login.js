import React, { useState } from 'react';
import '../Style/Login.css'; // Import CSS for Login page styling
import logo from '../Assert/logo1.png'; // Import logo image
import Shashwat from '../Assert/Shashwat.jpeg';
import Mansi from '../Assert/Mansi.jpg';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Shashwat' && password === 'pass123') {
      handleLogin({ username, role: 'admin', profilePicture: Shashwat });
    } else if (username === 'Mansi' && password === '123') {
      handleLogin({ username, role: 'creator', profilePicture: Mansi });
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="path_to_your_image" alt="Background" />
      </div>
      <div className="login-right">
        <div className="login-form">
          <img src={logo} alt="Logo" className="logo" />
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
