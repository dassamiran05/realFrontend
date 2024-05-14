import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  let location = useLocation();
  const { user } = useContext(UserContext);
  const local = localStorage.getItem("user");

  if (!user && !local) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default Protected;
