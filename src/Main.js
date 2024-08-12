
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/App';
import Policies from './components/Policies'; // Create this component
import Users from './components/Users'; // Create this component
import Roles from './components/Roles'; // Create this component

function Main() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<App loggedIn={loggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />} 
        />
        <Route path="/policies" element={<Policies />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </Router>
  );
}

export default Main;
