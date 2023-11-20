import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ShopOwnerPrivateRoute = ({ children }) => {
  const { token, userData } = useSelector((state) => state.userReducer);

  if (token && userData.role === "shopOwner") return children;
  else return <Navigate to="/" />;
};

export default ShopOwnerPrivateRoute;
