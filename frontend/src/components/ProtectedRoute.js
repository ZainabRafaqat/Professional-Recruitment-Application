import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ Component }) => {
  const token = localStorage.getItem("accessToken");

  return token ? <Component /> : <Navigate to="/" />;
};
export default ProtectedRoute;