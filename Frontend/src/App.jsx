import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Owner Components
import OwnerLogin from './components/Owner/OwnerLogin';
import OwnerRegister from './components/Owner/OwnerRegister';
import OwnerDashboard from './components/Owner/OwnerDashboard';

// User Components
import UserLogin from './components/user/UserLogin';
import UserRegister from './components/user/UserRegister';
import UserDashboard from './components/user/UserDashboard';
import Wishlist from './components/user/Wishlist';
import Properties from './components/user/Properties';
import About from './components/user/About';
import PropertyDetails from './components/user/PropertyDetails';

const App = () => {
  const [owner, setOwner] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const ownerEmail = localStorage.getItem('ownerEmail');
    const ownerName = localStorage.getItem('ownerName');
    if (ownerEmail && ownerName) {
      setOwner({ email: ownerEmail, fullName: ownerName });
    }

    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    if (userEmail && userName) {
      setUser({ email: userEmail, fullName: userName });
    }
  }, []);

  return (
    <Router>
      <Routes>

        {/* Owner Routes */}
        <Route
          path="/owner/login"
          element={
            <OwnerLogin
              setOwner={(ownerData) => {
                setOwner(ownerData);
                localStorage.setItem('ownerName', ownerData.fullName);
                localStorage.setItem('ownerEmail', ownerData.email);
              }}
            />
          }
        />
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route
          path="/owner/dashboard"
          element={
            owner ? <OwnerDashboard owner={owner} /> : <Navigate to="/owner/login" replace />
          }
        />

        {/* User Routes */}
        <Route
          path="/user/login"
          element={
            <UserLogin
              setUser={(userData) => {
                setUser(userData);
                localStorage.setItem('userName', userData.fullName);
                localStorage.setItem('userEmail', userData.email);
              }}
            />
          }
        />
        <Route path="/user/register" element={<UserRegister />} />
        <Route
          path="/user/dashboard"
          element={
            user ? <UserDashboard user={user} /> : <Navigate to="/user/login" replace />
          }
        />
        <Route
          path="/user/wishlist"
          element={
            user ? <Wishlist user={user} /> : <Navigate to="/user/login" replace />
          }
        />
        <Route
          path="/user/properties"
          element={
            user ? <Properties user={user} /> : <Navigate to="/user/login" replace />
          }
        />
        <Route
          path="/user/property/:id"
          element={
            user ? <PropertyDetails /> : <Navigate to="/user/login" replace />
          }
        />
        <Route path="/user/about" element={<About />} />

        {/* Default redirect fallback */}
        <Route path="*" element={<Navigate to={user ? "/user/dashboard" : "/user/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
