import React from "react";
import { Route, Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const isLogin = () => {
    return sessionStorage.getItem("accessToken") ? true : false;
  };

  return isLogin() ? <>{children}</> : <Navigate to="/" replace={true} />;
};

export default AuthRoute;
