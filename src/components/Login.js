import React, { useState } from 'react';
import '../Style/Login.css'; // Import CSS for Login page styling
import logo from '../Assert/logo1.png'; // Import logo image
import Shashwat from '../Assert/Shashwat.jpeg';
import bgimage from '../Assert/bg.png'
import Mansi from '../Assert/Mansi.jpg';
import Saurabh from '../Assert/Saurabh.jpg';
import Jayan from '../Assert/jayan.jpg';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';



const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Shashwat' && password === '123') {
      handleLogin({ username, role: 'admin', profilePicture: Shashwat });
    } else if (username === 'Mansi' && password === '1234') {
      handleLogin({ username, role: 'creator', profilePicture: Mansi });
    } else if (username === 'Saurabh' && password === '12345') {
      handleLogin({ username, role: 'approver', profilePicture: Saurabh });
    } else if (username === 'Jayan' && password === '123456') {
      handleLogin({ username, role: 'user', profilePicture: Jayan });
    } 
    else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
      </div>
      <div className="login-right">
        <div className="login-form">
          <div className='into'>
          <spam className='welcome'>Welcome to</spam>
          <br></br>
          <br></br>
          <spam className='scb'><strong>Standard chartered</strong></spam>
          <br></br>
          <spam className= 'global'><strong>Global Policy Management</strong></spam>
           
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">


            <TextField
              id="input-with-icon-textfield"
              
              value={username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                  <AccountCircle />
                  </InputAdornment>
                ),
              
               }}
              onChange={(e) => setUsername(e.target.value)}
              required
              variant="standard"
            />
              

            </div>
            <div className="form-control">
            <TextField id="standard-basic"  label="Password" variant="standard" value={password}  onChange={(e) => setPassword(e.target.value)}
                required type='password'/>
              
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me" className='remember' >Remember Me</label>
            </div>
            <Button type="submit" variant="outlined" className='loginButton' >Login</Button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
