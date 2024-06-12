import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RouteGuard = ({ children, guardRoute }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("JOBLY_TOKEN");

  useEffect(() => {
    if (!token && guardRoute) {
      navigate("/login");
    }

    if (
      (token && location.pathname === "/login") ||
      (token && location.pathname === "/signup")
    ) {
      navigate("/");
    }
  }, [token, guardRoute, navigate, location.pathname]);

  return <>{children}</>;
};
