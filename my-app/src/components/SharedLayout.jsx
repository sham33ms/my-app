import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";

const SharedLayout = () => {
  const [isValid, setIsValid] = useState(null); // Track token validation
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        console.log("No token found. Redirecting to login.");
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/validate-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Token Validation Response:", data);

        if (response.ok && data.valid) {
          setIsValid(true);
        } else {
          console.warn("Token validation failed:", data.message);
          localStorage.removeItem("token"); // Remove invalid token
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    return <p>Loading...</p>; 
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
