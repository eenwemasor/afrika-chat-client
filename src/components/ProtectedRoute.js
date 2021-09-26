import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

const ProtectedRoute = ({ children, saveUser }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!localStorage.hasOwnProperty("auth_token")) {
      setError(true);
    }
  }, []);

  if (error) return <Redirect to="/sign-in" />;
  return <>{children}</>;
};

export default ProtectedRoute;
