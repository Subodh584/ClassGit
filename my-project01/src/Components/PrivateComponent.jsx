import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthService from "./AuthService";

export default function PrivateComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const authenticated = await AuthService.checkAuthentication();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    verifyAuth();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}