import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const user = localStorage.getItem("user");
    return user ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;