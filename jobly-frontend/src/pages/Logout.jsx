import { useNavigate } from "react-router-dom";
import { JoblyApi } from "../lib/api";
import { useEffect } from "react";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("JOBLY_TOKEN");
    JoblyApi.token = null;
    navigate("/login");
  }, [navigate]);
  return <p>Logging out...</p>;
};
