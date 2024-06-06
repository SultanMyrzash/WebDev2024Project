import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

export function useAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAuthorized(true);
      fetchUserRole();
    } else {
      setIsAuthorized(false);
      setUserRole(null);
    }
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await api.get('/api/users/me/');
      setUserRole(response.data.is_staff ? "admin" : "user");
    } catch (error) {
      console.error("Failed to fetch user role:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthorized(false);
    setUserRole(null);
  };

  return { isAuthorized, userRole, logout };
}
