import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthProtectedRoute({ children }) {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))

  return !loggedIn ? children : <Navigate to="/" />;
}
