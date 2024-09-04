import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../Store/userSlice";

const ProtectedAdmin = ({ children }) => {
  let activeUser = useSelector(selectUser);
  try {
    if (activeUser.role == 1) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedAdmin;
